from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT

from bs4 import BeautifulSoup
from datetime import datetime
from .models import User, Stock, Info
import requests
import json
import re

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

def index(request):
    if request.user.is_authenticated:

        stockInfo = Stock.objects.filter(user=request.user)

        # Return stocks in reverse chronologial order
        stocks = stockInfo.order_by("-timestamp").all()

        if stocks.count() == 0:
            return render(request, "invest/index.html", {
                'message': "You have no record",
            })
        else:
            return render(request, "invest/index.html", {
                'stocks': stocks,
            })
    elif not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))

@csrf_exempt
def market_price(request):

    # Must be logged in to create record
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))

    # Get real-time market price info
    if request.method == "PUT":
        data = json.loads(request.body)
        symbol = data.get("symbol", "")
        marketExchange = data.get("marketExchange", "")
        content = requests.get(f'https://www.google.com/finance/quote/{symbol}:{marketExchange}')
        soup = BeautifulSoup(content.text, 'html.parser')
        price = soup.find('div', attrs={'class': 'YMlKec fxKbKc'}).text
        last_updated = soup.find('div', attrs={'class': 'ygUjEc', 'jsname': 'Vebqub'}).text
        previous_close = soup.find_all('div', attrs={'class': 'P6K39c'})[0].text

        try:
            stock = Stock.objects.get(user=request.user, symbol=symbol, market_exchange=marketExchange)
            averagePrice = stock.average_buy_price
            holdingUnits = stock.holding_units
        except Stock.DoesNotExist:
            averagePrice = 0
            holdingUnits = 0

        return JsonResponse({
            "message": f"{price}", 
            "date": f"{last_updated}", 
            "previous_close": f"{previous_close}",
            "averagePrice": f"{averagePrice}", 
            "holdingUnits": f"{holdingUnits}", 
            }, safe=False)
    else: 
        return JsonResponse({"error": "PUT request required."}, status=400)


@csrf_exempt
def market_info(request):

    # Must be logged in to create record
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))

    # Get real-time market price info
    if request.method == "PUT":
        data = json.loads(request.body)
        symbol = data.get("symbol", "")
        marketExchange = data.get("marketExchange", "")
        content = requests.get(f'https://www.google.com/finance/quote/{symbol}:{marketExchange}')
        soup = BeautifulSoup(content.text, 'html.parser')
        previous_close = soup.find_all('div', attrs={'class': 'P6K39c'})[0].text
        day_range = soup.find_all('div', attrs={'class': 'P6K39c'})[1].text
        market_cap = soup.find_all('div', attrs={'class': 'P6K39c'})[3].text
        volume = soup.find_all('div', attrs={'class': 'P6K39c'})[4].text
        pe_ratio = soup.find_all('div', attrs={'class': 'P6K39c'})[5].text
        dividend = soup.find_all('div', attrs={'class': 'P6K39c'})[6].text
        return JsonResponse({
            "previous_close": f"{previous_close}",
            "day_range": f"{day_range}", 
            "market_cap": f"{market_cap}", 
            "volume": f"{volume}", 
            "pe_ratio": f"{pe_ratio}", 
            "dividend": f"{dividend}", 
            }, safe=False)
    else: 
        return JsonResponse({"error": "PUT request required."}, status=400)


@csrf_exempt
def create(request):

    # Must be logged in to create record
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    
    # Create record must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
  
    # Check if data is blank
    data = json.loads(request.body)
    symbol = data.get("symbol", "").upper()
    marketExchange = data.get("marketExchange", "").upper()
    if symbol == "" or marketExchange == "":
        return JsonResponse({
            "error": "Content is blank"
        }, status=400)

    # Check if data is valid
    content = requests.get(f'https://www.google.com/finance/quote/{symbol}:{marketExchange}')
    soup = BeautifulSoup(content.text, 'html.parser')
    try:
        name = soup.find('h1', attrs={'class': 'zzDege'}).text
        price = soup.find('div', attrs={'class': 'YMlKec fxKbKc'}).text
        currency = re.sub('[\d\.\,]+', '', price)
    except AttributeError:
        return JsonResponse({"error": "Invalid symbol/market exchange"}, status=400)
    
    # Check if data has already exist
    try: 
        stock = Stock.objects.get(user=request.user, symbol=symbol, market_exchange=marketExchange)
        return JsonResponse({"error": "Record has already exist"}, status=400)
    except Stock.DoesNotExist:
        Stock.objects.create(user=request.user, name=name, symbol=symbol, market_exchange=marketExchange, currency = currency)
        return JsonResponse({"message": f"Successful created a new record for stock {symbol}"}, status=201)


def trading_info(request, abbrev):

    # Request must be via GET
    if request.method != "GET":
        JsonResponse({"error": "GET request required"}, status=400)

    # Query for requested stock
    try:
        stock = Stock.objects.get(user=request.user, symbol=abbrev.upper())
        activities = stock.activity
        return JsonResponse(activities, safe=False)
    except Stock.DoesNotExist:
        return JsonResponse({"error": "Record for this stock does not exist"}, status=404)


@csrf_exempt
def trading(request):

    # Creating a trade record must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    # Validate the data input
    data = json.loads(request.body)
    tradingType = data.get("tradingType")
    marketPrice = data.get("marketPrice")
    unit = data.get("unit")
    fees = data.get("fees")
    
    if fees is None:
        fees = 0

    alertmsg = {}
    if tradingType is None: 
        alert1 = {'msg1': 'Buy/Sell option is not selected'}
        alertmsg.update(alert1)
    
    if marketPrice is None or marketPrice <= 0:
        alert2 = {'msg2': 'Price is invalid'}
        alertmsg.update(alert2)
    
    if unit is None or unit <= 0:
        alert3 = {'msg3': 'Quantity is invalid'}
        alertmsg.update(alert3)

    if fees < 0:
        alert4 = {'msg4': 'Additional Fees is invalid'}
        alertmsg.update(alert4)

    if alertmsg != {}:
        return JsonResponse(alertmsg, safe=False)

    # Verify if record exist
    symbol = data.get("symbol", "")
    marketExchange = data.get("marketExchange", "")
    try:
        stock = Stock.objects.get(user=request.user, symbol=symbol.upper(), market_exchange=marketExchange)
    except Stock.DoesNotExist:
        return JsonResponse({"error": "Record for this stock does not exist"}, status=400)

    # Acquire date 
    dateinfo = data.get("date", "")
    dateStr = dateinfo.split("/")
    day = int(dateStr[0])
    mth = int(dateStr[1])
    yrs = int(dateStr[2])

    # Acquire time
    timeinfo = data.get("time", "")
    timeStr = timeinfo.split(":")
    hrs = int(timeStr[0])
    min = int(timeStr[1])

    
    total_unit = stock.holding_units
    setdatetime = datetime(yrs, mth, day, hrs, min)
    date = setdatetime.strftime("%d %b")
    year = setdatetime.strftime("%Y")
    time = setdatetime.strftime("%I:%M%p")
    record = {"Option": tradingType, "Price": marketPrice, "Unit": unit, "Date": date, "Year": year, "Time": time, "Fees": fees}
    activities = stock.activity
    activities.append(record)
    sorted_activities = sorted(activities, key = lambda i: (datetime.strptime(i['Year'],'%Y'), datetime.strptime(i['Date'],'%d %b'), datetime.strptime(i['Time'],'%I:%M%p')))

    # Verify if the sell trading activity is valid
    if tradingType == "Sell":
        if total_unit == 0:
            return JsonResponse({"error": "You have no holding units"}, status=400)
    
        position = sorted_activities.index(record)
        increment = 0
        unitAmount = 0
        endOnNextSell = False
        for trade in sorted_activities:
            tradeunit = trade["Unit"]
            if endOnNextSell:
                if trade["Option"] == 'Buy':
                    break
                if trade["Option"] == 'Sell':
                    unitAmount -= tradeunit
            elif increment != position:
                if trade["Option"] == 'Buy':
                    unitAmount += tradeunit
                if trade["Option"] == 'Sell':
                    unitAmount -= tradeunit
            elif increment == position:
                endOnSell = True
            increment += 1

        if unit > unitAmount: 
            return JsonResponse({"error": "Cannot create this activity. You have not enough purchased unit before this trade"}, status=404)

    stock.activity = sorted_activities

    # Update holding units model field
    if tradingType == "Buy":
        stock.holding_units = total_unit + unit
    elif tradingType == "Sell":
        stock.holding_units = total_unit - unit

    # Update average buy price model field
    total_unitAmount = 0
    total_cashInvested = 0
    invests = []
    increment = 0
    lastIndex = len(sorted_activities) - 1

    for trade in sorted_activities: # refer 'sorted_activities' from 'update activity model field' section
        if trade["Option"] == 'Buy':
            price = trade["Price"]
            unit = trade["Unit"]
            amountInvested = price*unit
            invests.append(amountInvested)
            total_unitAmount += unit

        if trade["Option"] == 'Sell' and increment == lastIndex:
            break
        elif trade["Option"] == 'Sell' and increment != lastIndex:
            amountInvest = 0
            for invest in invests:
                amountInvest += invest
            average_price = amountInvest/total_unitAmount
            invests.clear()
            unit = trade["Unit"]
            total_unitAmount -= unit
            adjusted = average_price*total_unitAmount
            invests.append(adjusted)
        
        increment += 1

    for invest in invests:
        total_cashInvested += invest

    stock.average_buy_price = round(total_cashInvested/total_unitAmount, 2)

    # Save all of the updated fields
    stock.save()
    return JsonResponse(sorted_activities, safe=False)


@csrf_exempt
def edit_trading(request):

    # Editing trading activity must be via PUT
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required"}, status=400)

    data = json.loads(request.body)
    tradingIndex = data.get("tradingIndex")
    task = data.get("task")
    symbol = data.get("symbol")

    # Query for requested stock
    try:
        stock = Stock.objects.get(user=request.user, symbol=symbol.upper())
        activities = stock.activity
    except Stock.DoesNotExist:
        return JsonResponse({"error": "Record for this stock does not exist"}, status=404)

    if task == "updateNotes":
        notesRawText = data.get("notesRawText")
        if len(notesRawText) > 1000:
            return JsonResponse({"error": "Notes exceed 1000 characters"}, status=404)
        activities[tradingIndex]['Notes'] = notesRawText
    

    if task == "deleteActivity":
        if len(activities) == 1:
            stock.holding_units = 0
            stock.average_buy_price = 0
        elif activities[tradingIndex]['Option'] == 'Buy':
            # Validate if deleting buy activity will contradict with the existing activity
            increment = 0
            total_unit = 0
            endOnNextSell = False
            for trade in activities:
                unit = trade["Unit"]
                if endOnNextSell:
                    if trade["Option"] == 'Buy':
                        total_unit += unit
                    if trade["Option"] == 'Sell':
                        total_unit -= unit
                        break
                elif increment != tradingIndex:
                    if trade["Option"] == 'Buy':
                        total_unit += unit
                    if trade["Option"] == 'Sell':
                        total_unit -= unit
                elif increment == tradingIndex:
                    endOnSell = True
                increment += 1

            if total_unit < 0: 
                return JsonResponse({"error": "Cannot delete this activity. It contradicts with the sell activity after this"}, status=404)
            elif total_unit >= 0:
                deletedUnit = activities[tradingIndex]["Unit"]
                previousHoldingUnit = stock.holding_units
                stock.holding_units = previousHoldingUnit - deletedUnit

        elif activities[tradingIndex]['Option'] == 'Sell':
            deletedUnit = activities[tradingIndex]["Unit"]
            previousHoldingUnit = stock.holding_units
            stock.holding_units = previousHoldingUnit + deletedUnit
        
        # Delete activity
        del activities[tradingIndex]

        # Update average buy price model field
        if len(activities) != 0:
            total_unitAmount = 0
            total_cashInvested = 0
            invests = []
            increment = 0
            lastIndex = len(activities) - 1

            for trade in activities: 
                if trade["Option"] == 'Buy':
                    price = trade["Price"]
                    unit = trade["Unit"]
                    amountInvested = price*unit
                    invests.append(amountInvested)
                    total_unitAmount += unit

                if trade["Option"] == 'Sell' and increment == lastIndex:
                    break
                elif trade["Option"] == 'Sell' and increment != lastIndex:
                    amountInvest = 0
                    for invest in invests:
                        amountInvest += invest
                    average_price = amountInvest/total_unitAmount
                    invests.clear()
                    unit = trade["Unit"]
                    total_unitAmount -= unit
                    adjusted = average_price*total_unitAmount
                    invests.append(adjusted)
                
                increment += 1

            for invest in invests:
                total_cashInvested += invest

            stock.average_buy_price = round(total_cashInvested/total_unitAmount, 2)


    # Save all of the updated fields
    stock.save()
    return JsonResponse({"id": tradingIndex, "task": task}, status=200)

def performance(request, abbrev):

    # Query stock record
    try:
        record_details = Stock.objects.get(user=request.user, symbol=abbrev.upper())
    except Stock.DoesNotExist:
        return render(request, "invest/404.html", {})

    performance = []
    invested = []
    average_price = 0
    units_hold = 0
    additional_fees = 0
    realized_PL = 0
    for trade in record_details.activity:
        if trade["Option"] == "Buy":
            buy_cost = trade["Price"]*trade["Unit"]
            invested.append(buy_cost)
            units_hold += trade["Unit"]
            
            amountInvested = 0
            for invest in invested:
                amountInvested += invest
                
            average_price = amountInvested / units_hold

        if trade["Option"] == "Sell":
            units_hold -= trade["Unit"]
            result = (trade["Price"] - average_price) * trade["Unit"]
            realized_PL += result
            record = {"Income": result, "Date": trade["Date"], "Year": trade["Year"], "Time": trade["Time"]}
            performance.append(record)
            invested.clear()
            holding_value = average_price*units_hold
            invested.append(holding_value)
        
        additional_fees += trade["Fees"]

    calc_info = {"Fees": additional_fees, "PL": realized_PL}
    performance.append(calc_info)
    return JsonResponse(performance, safe=False)


def stock(request, abbrev):
    try:
        record_details = Stock.objects.get(user=request.user, symbol=abbrev.upper())
        return render(request, "invest/stock.html", {
            "details": record_details,
        })
    except Stock.DoesNotExist:
        return render(request, "invest/404.html", {})

def about(request):
    return render(request, "invest/about.html", {
        "login_register_view": True,
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "invest/login.html", {
                "message": "Invalid username and/or password.",
                "username": username,
                "login_register_view": True,
            })
    else:
        return render(request, "invest/login.html", {
            "login_register_view": True,
        })


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "invest/register.html", {
                "message": "Passwords must match.",
                "login_register_view": True,
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "invest/register.html", {
                "message": "Username already taken.",
                "login_register_view": True,
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "invest/register.html", {
            "login_register_view": True,
        })



    


