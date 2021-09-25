from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("stock/<str:abbrev>", views.stock, name="stock"), 
    path("about", views.about, name="about"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("create", views.create, name="create"), # create stock watchlist on index.html
    path("trading", views.trading, name="trading"), # create trade activity (buy/sell entry) 
    path("edit_trading", views.edit_trading, name="edit_trading"), # Add note for each entry OR delete entry
    path("trading_info/<str:abbrev>", views.trading_info, name="trading_info"), # Query all of the trade activities on the requested stock
    path("market_price", views.market_price, name="market_price"), # Query market price on the requested stock
    path("market_info", views.market_info, name="market_info"), # Query info on stock performance on the requested stock
    path('performance/<str:abbrev>', views.performance, name="performance"), # Calculate every profit/loss for each sell entry 
]
