# CS50 Final Project (Capstone): Stock Planner
## Overview
Stock Planner is a trading journal site that allows users, who register for a free profile, to record trading activities by first creating stock watchlist and then adding entries and exits. For any added or deleted entry, Stock Planner will automatically calculate trading performance such as net-worth and profit/loss. Stock Planner also provides the basic info on stock performance such as market price, previous close, day range, market cap, average volume, P/E Ratio and Dividend Yield.

## Distinctiveness and Complexity
Stock Planner is a website that is completely different compare to the previous projects in terms of theme (trading journal), functionality (allowing users to add any stock into watchlist, adding and delete trade entry, viewing trade and stock performance) and designs (provides better user interface in terms of flexibility and viewing experience). This website is designed to be mobile-responsive, which no matter the size of your display, it will blend with your screen nicely and thus allow user to better control the website in any device. To ensure it is accessible to everyone, Stock Planner is uploaded and deployed on heroku server, where it can be run using this link - https://tp-tradeplanner.herokuapp.com/. 

## Files
The starter files that are generated when creating Django project will not be mentioned. 

### invest/
`views.py` - Contains all of the program functions with comment for clarification

`urls.py` - Contains 6 URLs and 7 API routes, where the API routes have comment included for clarification. 

`models.py` - Contains 2 models (User model and Stock model)

### invest/static/invest
#### Javascript and CSS
`sidebar.js` - Sidebar animation for `layout.html`

`createbtn_animation.js` - Animation for create button (button to create stock watchlist) in `index.html` file 

`createbtn_postReq.js` - Listen for form submission on creating a new stock watchlist

`dashboard.js` - Animation for all of the button of stock watchlist in `index.html` file

`reatimePrice.js` - Update the market price and net worth gain/loss for each of the button of stock watchlist in `index.html` file

`myTrading.js` - Contains all of the necessary functions for `stock.html`. Comments are added to each of the functions for clarification. 

`stock_info.js` - Update the market price and stock info on the selected stock in `stock.html`

`bootstrap-datepicker.css` & `bootstrap-datepicker.js` - Codes downloaded from a public library that provides a flexible datepicker widget in the Bootstrap style. This effect is applied on `stock.html` file (https://github.com/uxsolutions/bootstrap-datepicker)

`styles.css` - Contain codes for the website design and feel. Comments are added for clarification.

#### Media
`Default_User_Icon.png` - User icon

`Error.jpg` - Image for `404.html`
 
### invest/templates/invest
`404.html` - HTML content for error page

`about.html` - HTML content for about page with about us and FAQ sections

`index.html` - HTML content for main page

`layout.html` - HTML content for the entire look and feel of the website.

`stock.html` - HTML content for selected stock page

`login.html` - HTML content for login page

`register.html` - HTML content for register page

### Other files
`Procfile`, `runtime.txt` and `requirements.txt` - Files required to succesfully deploy this website onto Heroku

## Additional Information
This website obtains market price and stock info through the implementation of Beautiful Soup for web-scraping, a python-package that parse HTML and XML documents, pulling the data needed out from Google Finance. Hence, the best method to create stock watchlist is explained and shown on FAQ section in `about.html`. Other python packages that are required for this project to work are listed on `requirements.txt` file

#### Video Demonstration
Here is the demonstration video link - https://www.youtube.com/watch?v=_XCULDBPvI4

#### How to run this website
Just access to this link - https://tp-tradeplanner.herokuapp.com/




