document.addEventListener('DOMContentLoaded', function() {

    // Size of input form
    document.querySelectorAll(".buysell-input").forEach(input => {

        // Size of input form when window is loaded
        window.addEventListener('load', () => {

            if (window.innerWidth >= 885) {
                input.classList.remove("form-control-sm");
                document.querySelectorAll('.btn').forEach(button => {
                    button.classList.remove("btn-sm");
                });
            } else if (window.innerWidth < 885) {
                input.classList.add("form-control-sm");
                document.querySelectorAll('.btn').forEach(button => {
                    button.classList.add("btn-sm");
                });
            }
        });

        // Size of input form when window is resize
        window.addEventListener('resize', () => {
            if (input.classList.contains("form-control-sm") && window.innerWidth >= 885) {
                input.classList.remove("form-control-sm");
                document.querySelectorAll('.btn').forEach(button => {
                    button.classList.remove("btn-sm");
                });
            } else if (!input.classList.contains("form-control-sm") && window.innerWidth < 885) {
                input.classList.add("form-control-sm");
                document.querySelectorAll('.btn').forEach(button => {
                    button.classList.add("btn-sm");
                });
            }
        });

    })

    // Form animation
    const dashb = document.querySelector("#trading-record-dashboard");
    const submitBtn = document.querySelector("#form-submit-btn");

    dashb.addEventListener('mouseenter', () => {
        dashb.querySelector('.bg-border-radius').style.opacity = '1';
        dashb.querySelector('#trading-form').style.color = 'white';
        dashb.querySelectorAll('.box-4a').forEach(label => {
            label.style.color = 'white';
        });
        dashb.querySelectorAll('.box-4b').forEach(label => {
            label.style.color = 'white';
        });
        document.querySelectorAll('#item2').forEach(label => {
            label.style.borderTop = "2px solid white";
        });
        submitBtn.classList.remove("btn-outline-dark");
        submitBtn.classList.add("btn-outline-light");
        document.querySelector("#item1").style.color = "white"
    });
    
    dashb.addEventListener('mouseleave', () => {
        dashb.querySelector('.bg-border-radius').style.opacity = '0';
        dashb.querySelector('#trading-form').style.color = 'black';
        dashb.querySelectorAll('.box-4a').forEach(label => {
            label.style.color = 'black';
        });
        dashb.querySelectorAll('.box-4b').forEach(label => {
            label.style.color = 'rgb(121, 121, 121)';
        });
        document.querySelectorAll('#item2').forEach(label => {
            label.style.borderTop = "2px solid rgb(167, 167, 167)";
        });
        submitBtn.classList.add("btn-outline-dark");
        submitBtn.classList.remove("btn-outline-light");
        document.querySelector("#item1").style.color = "rgb(105, 105, 105)"
    });

    // Uncheck radio when outside of the trading form is click
    document.addEventListener("click", (evt) => {

        const recordElement = document.querySelector("#trading-record-dashboard");
        let targetElement = evt.target; // clicked element
        let targetClass = targetElement.className // class name of the clicked element
        console.log(targetClass)
        
        const condition = ["day", "month", "year", "datepicker-switch", "next", "prev"]
        try {
            logic = condition.some(item => targetClass.includes(item))
        } catch (e) {
            console.log(`${e instanceof TypeError}: Refer line83 from 'myTrading.js'`);
            logic = false;
        }

        if (!(recordElement.contains(targetElement) || logic)) {
            var radio1 = document.querySelector('input[type=radio][id=inlineRadio1]');
            var radio2 = document.querySelector('input[type=radio][id=inlineRadio2]');
            const bg = document.querySelector("#trading-form-bg");
            if (radio1.checked || radio2.checked) {
                radio1.checked = false;
                radio2.checked = false;
                setTimeout(function() {
                    bg.classList.remove("buy-bg");
                    bg.classList.remove("sell-bg");
                    bg.classList.add("purple-blue");
                }, 290);  
            }
        }
    });

    // Background animation when trading-form is click
    dashb.addEventListener('click', () => {
        dashb.querySelector('.bg-border-radius').style.opacity = '1';
        dashb.querySelector('#trading-form').style.color = 'white';
        dashb.querySelectorAll('.box-4a').forEach(label => {
            label.style.color = 'white';
        })
        dashb.querySelectorAll('.box-4b').forEach(label => {
            label.style.color = 'white';
        })
        submitBtn.classList.remove("btn-outline-dark");
        submitBtn.classList.add("btn-outline-light");
        document.querySelector("#item1").style.color = "white"
        document.querySelector("#item2").style.borderTop = "2px solid white"
    });
    
    // Change background when buy/sell option is selected
    document.querySelector("#inlineRadio1").addEventListener('click', () => {
        const bg = document.querySelector("#trading-form-bg");
        bg.classList.remove("purple-blue");
        bg.classList.remove("sell-bg");
        bg.classList.add("buy-bg");
    })

    document.querySelector("#inlineRadio2").addEventListener('click', () => {
        const bg = document.querySelector("#trading-form-bg");
        bg.classList.remove("purple-blue");
        bg.classList.remove("buy-bg");
        bg.classList.add("sell-bg");
    })

    // Remove is-invalid class on the form when a key is pressed
    const symbol = document.querySelector('#price');
    const marketExchange = document.querySelector('#quantity');
    const additionalFees = document.querySelector('#additional-fees');
    
    symbol.addEventListener('keypress', () => { 
        symbol.classList.remove("is-invalid");
        symbol.classList.remove("is-valid");
    });

    marketExchange.addEventListener('keypress', () => { 
        marketExchange.classList.remove("is-invalid");
        marketExchange.classList.remove("is-valid");
    });

    additionalFees.addEventListener('keypress', () => { 
        additionalFees.classList.remove("is-invalid");
    });
    
    // Prefill value in datetime as now when checkbox is clicked
    var dateTimeNow = document.querySelector('input[type=checkbox]')
    dateTimeNow.addEventListener('click', () => {
        if (dateTimeNow.checked == true) {
            setDateTime();
        } else if (dateTimeNow.checked == false) {
            removeDateTime();
        }
    });
    
    // Reset checkbox when date/time input detected change in value
    document.querySelector('#date-input').addEventListener('keypress', () => { 
        document.querySelector('input[type=checkbox]').checked = false;
    })

    document.querySelector('#time-input').addEventListener('keypress', () => { 
        document.querySelector('input[type=checkbox]').checked = false;
    })

    document.querySelector('#date-input').onclick = function () {
        document.querySelector('input[type=checkbox]').checked = false;
    }

    document.querySelector('#time-input').onclick = function () {
        document.querySelector('input[type=checkbox]').checked = false;
    }

    // Load record content
    load_tradingRecord();

    // Load performance content
    load_performance();

    // Load portfolio info
    load_portfolioInfo();

    // Submit Form (POST Request)
    document.querySelector('#trading-form').addEventListener('submit', submit_record);
})




/*
    Program function 
*/


// Program for loading record content
function load_tradingRecord() {

    const symb = document.querySelector("#S-ME").dataset.symbol;

    fetch(`/trading_info/${symb}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            document.querySelector('#trade-record').innerHTML = "";
            console.log(result);
            if (result == "") {
                document.querySelector('#trade-portfolio').style.display = "none";
                console.log('No record');
            } else {
                document.querySelector('#trade-portfolio').style.display = "block";
                result.forEach(trade => record_info(result, trade));
            };
        });
}


function submit_record(event) {

    event.preventDefault();    
    
    // Verify if the radio input is selected
    if (document.querySelector('input[type=radio][name=inlineRadioOptions]:checked') == null) {
        tradingType_alert();
        return;
    } 

    // Else proceed to the submit_record program
    const marketPrice = parseFloat(document.querySelector('#price').value);
    const unit = parseFloat(document.querySelector('#quantity').value);
    const tradingType = document.querySelector('input[type=radio][name=inlineRadioOptions]:checked').value;
    const symb = document.querySelector("#S-ME").dataset.symbol;
    const marketEx = document.querySelector("#S-ME").dataset.marketExchange;
    const date = document.querySelector('#date-input').value;
    const time = document.querySelector('input[type="time"][id="time-input"]').value;
    const fees = parseFloat(document.querySelector('#additional-fees').value);

    fetch('/trading', {
        method: 'POST',
        body: JSON.stringify({
            date: date,
            time: time,
            tradingType: tradingType,
            marketPrice: marketPrice,
            unit: unit,
            symbol: symb,
            marketExchange: marketEx,
            fees: fees,
        })
    })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
            const err = Object.keys(result)

            const condition = ["msg1", "msg2", "msg3", "msg4"]
            const errors = condition.some(item => err.includes(item))

            if (!result.error && !errors) {
                load_performance();
                load_portfolioInfo();
                document.querySelector('#trade-portfolio').style.display = "block";
                resetForm();
                success_alert();
                document.querySelector('#trade-record').innerHTML = "";
                result.forEach(trade => record_info(result, trade))
            };
            
            if (errors) {
                if (result.msg2 || result.msg3) {
                    resetInputs();
                    if (result.msg2 && result.msg3) { /* Alert msg for both invalid market price & quantity */
                        priceAndUnit_alert(result.msg2, result.msg3);
                        document.querySelector('#price').classList.add("is-invalid");
                        document.querySelector('#quantity').classList.add("is-invalid");
                    } else if (result.msg2) { /* Alert msg for invalid market price */
                        single_alert(result.msg2);
                        document.querySelector('#price').classList.add("is-invalid");
                        document.querySelector('#quantity').classList.add("is-valid");
                    } else if (result.msg3) { /* Alert msg for invalid quantity */
                        single_alert(result.msg3);
                        document.querySelector('#quantity').classList.add("is-invalid");
                        document.querySelector('#price').classList.add("is-valid");
                    } else if (result.msg4) {
                        single_alert(result.msg4);
                        document.querySelector('#additional-fees').classList.add("is-invalid");
                        document.querySelector('#quantity').classList.add("is-valid");
                        document.querySelector('#price').classList.add("is-valid");
                    }
                } else if (result.msg1) {
                    console.log('Trading type is None (Buy/Sell option is not selected)')
                    tradingType_alert();
                };
            };

            if (result.error) {
                console.log(result.error);
                other_alert(result.error);
            };
        });
    
}


// Prefill value in datetime as now
function setDateTime() {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var hour = now.getHours();
    var min = now.getMinutes();

    if (hour < 10) {
        hour = "0" + hour;
    };

    if (min < 10) {
        min = "0" + min;
    };

    var dateControl = document.querySelector('#date-input');
    var timeControl = document.querySelector('input[type="time"][id="time-input"]');
    dateControl.value = `${day}/${month}/${year}`;
    timeControl.value = `${hour}:${min}`;
}

// Remove value in datetime 
function removeDateTime() {
    var dateControl = document.querySelector('#date-input');
    var timeControl = document.querySelector('input[type="time"][id="time-input"]');
    dateControl.value = "";
    timeControl.value = "";
}

// Alert if Buy/Sell option not selected
function tradingType_alert() {
    document.querySelector('#alert-msg-trading-form').innerHTML = `<div class="alert alert-light d-flex align-items-center alert-dismissible fade show" role="alert">
                                                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                                                            <use xlink:href="#exclamation-triangle-fill"/>
                                                                        </svg>
                                                                        <div class="ms-2">
                                                                            Buy/Sell option is not selected
                                                                        </div>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
}


// Alert for any error detected
function single_alert(msg) {
    document.querySelector('#alert-msg-trading-form').innerHTML = `<div class="alert alert-light d-flex align-items-center alert-dismissible fade show" role="alert">
                                                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                                                            <use xlink:href="#exclamation-triangle-fill"/>
                                                                        </svg>
                                                                        <div class="ms-2">
                                                                            ${msg}
                                                                        </div>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
}

// Alert for both invalid market price and quantity
function priceAndUnit_alert(msg2, msg3) {
    document.querySelector('#alert-msg-trading-form').innerHTML = `<div class="alert alert-light d-flex align-items-center alert-dismissible fade show" role="alert">
                                                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                                                            <use xlink:href="#exclamation-triangle-fill"/>
                                                                        </svg>
                                                                        <div class="d-flex flex-column ms-2">
                                                                            <div>
                                                                                ${msg2}
                                                                            </div>
                                                                            <div>
                                                                                ${msg3}
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
}


// Alert for other error
function other_alert(msg) {
    document.querySelector('#alert-msg-trading-form').innerHTML = `<div class="alert alert-light d-flex align-items-center alert-dismissible fade show" role="alert">
                                                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                                                            <use xlink:href="#exclamation-triangle-fill"/>
                                                                        </svg>
                                                                        <div class="ms-2">
                                                                            ${msg}
                                                                        </div>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
}


// Reset the form input after record is successfully created
function resetForm() {

    const bg = document.querySelector("#trading-form-bg");

    resetInputs();
    document.querySelector('#date-input').value = "";
    document.querySelector('input[type="time"][id="time-input"]').value = "";
    document.querySelector('#price').value = "";
    document.querySelector('#quantity').value = "";
    document.querySelector('#additional-fees').value = "";
    document.querySelector('input[type=checkbox]').checked = false;
    document.querySelector('input[type=radio][name=inlineRadioOptions]:checked').checked = false;
    setTimeout(function() {
        bg.classList.remove("buy-bg");
        bg.classList.remove("sell-bg");
        bg.classList.add("purple-blue");
    }, 290);  

}


// Success alert after record is successfully created
function success_alert() {
    document.querySelector('#alert-msg-trading-form').innerHTML = `<div class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
                                                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                                                                            <use xlink:href="#check-circle-fill"/>
                                                                        </svg>
                                                                        <div class="ms-2">
                                                                            Record is created successfully
                                                                        </div>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
}


// Load all the trade activities
function record_info(result, trade) {

    const currency = document.querySelector("#S-ME").dataset.currency;
    const trade_index = result.indexOf(trade);
    const dateStr = trade.Date.split(' ');
    const timeStr = trade.Time.split(':');
    const hour = parseInt(timeStr[0]);
    const minute = timeStr[1];

    if (trade.Option == "Buy") {
        classOption = "box-5c-green";
        classbg = "buytrade";
    } else if (trade.Option == "Sell") {
        classOption = "box-5c-red";
        classbg = "selltrade";
    }

    if (trade.Notes == undefined || trade.Notes == "") {
        notification = ""
    } else {
        notification = `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                            Note
                        </span>`
    }

    const trading = document.createElement('div');
    trading.className = 'tradeList';

    trading.innerHTML = `<div id="idBtn-${trade_index}" class="mytradingBtn" style="position: relative;">
                            <div id="mytrading" data-id="${trade_index}" class="dashboard-btn mb-4" type="button" style:>
                                <div id="dashboard-bg" class="bg-border-radius ${classbg}"></div>
                                <a href="#" id="tradingbtn" class="dashboard-record row px-4" data-bs-toggle="modal" data-bs-target="#myTradingModal"> 
                                    <div id="stock-price" class="col-12 text-center mt-2 mb-3">
                                        <p class="badge rounded-pill my-auto ${classOption}">${trade.Option}</p>
                                    </div> 
                                    <div class="row">
                                        <div class="col-7 my-auto text-center">
                                            <span class="box-5b">Price:</span>
                                            <span class="box-5a">${currency}${trade.Price}</span>
                                        </div>
                                        <div class="col-5 my-auto text-center">
                                            <span class="box-5b">Unit:</span>
                                            <span class="box-5a">${trade.Unit}</span> 
                                        </div>
                                    </div>
                                    <hr class="line-style mt-3 mb-2">
                                    <div class="row mt-1">
                                        <div class="col-7 my-auto text-center">
                                            <span class="box-5b">Date:</span>
                                            <span class="box-5a">${parseInt(dateStr[0])} ${dateStr[1]} ${trade.Year}</span>
                                        </div>
                                        <div class="col-5 my-auto text-center">
                                            <span class="box-5b">Time:</span>
                                            <span class="box-5a">${hour}:${minute}</span>
                                        </div> 
                                    </div>
                                </a>
                                <div class="overlay">
                                    <div class="overlay-item">
                                        <button class="deleteBtn" data-bs-toggle="modal" data-bs-target="#myTradingModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" style="margin-bottom: 3px;" viewBox="0 0 16 16">
                                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                        </svg>
                                        </button>
                                    </div>
                                </div>
                                <div id="notification-${trade_index}">
                                    ${notification}
                                </div>
                            </div>
                        </div>`;

    document.querySelector('#trade-record').append(trading); 
    myTradingBtnAnimation(trading);
    trading.querySelector('#tradingbtn').addEventListener('click', (event) => {
        event.preventDefault();
        const tradingID = trading.querySelector('#mytrading').dataset.id;
        console.log(tradingID);
        showNote(tradingID, trade, currency, dateStr);
    })

    trading.querySelector('.deleteBtn').addEventListener('click', (event) => {
        event.preventDefault();
        const tradingID = trading.querySelector('#mytrading').dataset.id;
        console.log('delete');
        deleteTrade(tradingID, trade, currency, dateStr);
    })
}


// Remove is-valid and is-invalid on every input
function resetInputs() {
    document.querySelector('#quantity').classList.remove("is-valid");
    document.querySelector('#price').classList.remove("is-valid");
    document.querySelector('#additional-fees').classList.remove("is-invalid");
    document.querySelector('#quantity').classList.remove("is-invalid");
    document.querySelector('#price').classList.remove("is-invalid");
}


function myTradingBtnAnimation(trading) {

    trading.addEventListener('mouseenter', () => {
        trading.querySelector('.bg-border-radius').style.opacity = '1';
        trading.querySelector('.dashboard-record').style.color = 'white';
        try {
            trading.querySelector('.line-style').style.borderTop = '2px solid white';
        } catch (e) {}
    });
    
    trading.addEventListener('mouseleave', () => {
        trading.querySelector('.bg-border-radius').style.opacity = '0';
        trading.querySelector('.dashboard-record').style.color = 'black';
        try {
            trading.querySelector('.line-style').style.borderTop = '2px solid rgb(167, 167, 167)';
        } catch (e) {}
    });

    trading.addEventListener('click', () => {
        trading.querySelector('.bg-border-radius').style.opacity = '1';
        trading.querySelector('.dashboard-record').style.color = 'white';
        try {
            trading.querySelector('.line-style').style.borderTop = '2px solid white';
        } catch (e) {}
    });

}

function showNote(tradingID, trade, currency, dateStr) {

    const modalBody = document.querySelector('#modalBody');
    const modalLabel1 = document.querySelector('#modalLabel1');
    const modalLabel2 = document.querySelector('#modalLabel2');
    const modalLabel3 = document.querySelector('#modalLabel3');
    const btnSubmit = document.querySelector('#btnSubmit');
    const btnDelete = document.querySelector('#btnDelete');
    const btnEdit = document.querySelector('#btnEdit');
    const btnAdd = document.querySelector('#btnAdd');

    btnSubmit.style.display = "none";
    btnDelete.style.display = "none";

    modalLabel1.innerHTML = 'Notes';
    modalLabel2.innerHTML = `${trade.Option} - ${trade.Unit} unit at ${currency}${trade.Price} each`;
    modalLabel3.innerHTML = `${parseInt(dateStr[0])} ${dateStr[1]} ${trade.Year}, ${trade.Time}`;

    if (trade.Notes == undefined || trade.Notes == "") {
        modalBody.innerHTML = 'No saved note';
        btnEdit.style.display = "none";
        btnAdd.style.display = "block";

        btnAdd.addEventListener('click', () => {
            modalLabel1.innerHTML = 'Add Notes';
            modalBody.innerHTML = `<form class="my-3">
                                        <div>
                                            <textarea class="form-control" id="notes-text" rows="5"></textarea>
                                        </div>
                                        <p class="box-4b mt-0 ms-1">Max 1000 character</p>
                                    </form>`;
            btnAdd.style.display = "none";
            btnSubmit.style.display = "block";
            btnSubmit.addEventListener('click', () => {
                saveNotes(tradingID);
            })
        });
    } else {
        modalBody.innerHTML = `${trade.Notes}`;
        btnEdit.style.display = "block";
        btnAdd.style.display = "none";

        btnEdit.addEventListener('click', () => {
            try {
                notes = trade.Notes.replace(/<br\s*[\/]?>/gi, "\n");
            } catch (e) {
                console.log(`${e instanceof TypeError}: <br> replace can't be found`);
                notes = trade.Notes;
            }
            modalLabel1.innerHTML = 'Edit Notes';
            modalBody.innerHTML = `<form class="my-3">
                                        <div>
                                            <textarea class="form-control" id="notes-text" rows="5">${notes}</textarea>
                                        </div>
                                        <p class="box-4b mt-0 ms-1">Max 1000 character</p>
                                    </form>`;
            btnEdit.style.display = "none";
            btnSubmit.style.display = "block";
            btnSubmit.addEventListener('click', () => {
                saveNotes(tradingID);
            })
        });
    }
}

function saveNotes(tradingID) {

    const tradingIndex = parseInt(tradingID);
    const notesText = document.querySelector('#notes-text').value;
    const symb = document.querySelector("#S-ME").dataset.symbol;
    const notesRawText = notesText.split("\n").join("<br>");

    fetch('/edit_trading', {
        method: 'PUT',
        body: JSON.stringify({
            tradingIndex: tradingIndex,
            notesRawText: notesRawText,
            task: 'updateNotes',
            symbol: symb,
        })
    })
    .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
            if (result.error) {
                document.querySelector(`#alert-msg-modal`).innerHTML = `<div class="alert alert-warning d-flex align-items-center alert-dismissible fade show" role="alert">
                                                                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                                                                <use xlink:href="#exclamation-triangle-fill"/>
                                                                            </svg>
                                                                            <div class="ms-2">
                                                                                ${result.error}
                                                                            </div>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                        </div>`;
            } else {
                $("#myTradingModal").modal('hide');
                document.querySelector(`#notification-${result.id}`).innerHTML = `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                                                                    Note
                                                                                </span>`
                window.location.reload();
            }
        })
}


function deleteTrade(tradingID, trade, currency, dateStr) {

    const modalBody = document.querySelector('#modalBody');
    const modalLabel1 = document.querySelector('#modalLabel1');
    const modalLabel2 = document.querySelector('#modalLabel2');
    const modalLabel3 = document.querySelector('#modalLabel3');
    const btnSubmit = document.querySelector('#btnSubmit');
    const btnDelete = document.querySelector('#btnDelete');
    const btnEdit = document.querySelector('#btnEdit');
    const btnAdd = document.querySelector('#btnAdd');

    btnDelete.style.display = "block";
    btnSubmit.style.display = "none";
    btnEdit.style.display = "none";
    btnAdd.style.display = "none";

    modalLabel1.innerHTML = 'Delete Activity';
    modalLabel2.innerHTML = "";
    modalLabel3.innerHTML = "";
    modalBody.innerHTML = `<p>Are you sure you want to delete this activity?</p>
                            <div class="d-flex flex-column my-3">
                                <div>${trade.Option} - ${trade.Unit} unit at ${currency}${trade.Price} each</div>
                                <div>${parseInt(dateStr[0])} ${dateStr[1]} ${trade.Year}, ${trade.Time}</div>
                            </div>`;

    btnDelete.addEventListener('click', () => {

        const tradingIndex = parseInt(tradingID);
        const symb = document.querySelector("#S-ME").dataset.symbol;
    
        fetch('/edit_trading', {
            method: 'PUT',
            body: JSON.stringify({
                tradingIndex: tradingIndex,
                task: 'deleteActivity',
                symbol: symb,
            })
        })
        .then(response => response.json())
            .then(result => {
                // Print result
                console.log(result);
                if (result.error) {
                    document.querySelector(`#alert-msg-modal`).innerHTML = `<div class="alert alert-warning d-flex align-items-center alert-dismissible fade show" role="alert">
                                                                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                                                                    <use xlink:href="#exclamation-triangle-fill"/>
                                                                                </svg>
                                                                                <div class="ms-2">
                                                                                    ${result.error}
                                                                                </div>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                            </div>`;
                } else {
                    load_performance();
                    load_portfolioInfo();
                    $("#myTradingModal").modal('hide');
                    console.log(result.id)
                    document.querySelector(`#idBtn-${result.id}`).style.animationPlayState = 'running';
                    document.querySelector(`#idBtn-${result.id}`).addEventListener('animationend', () => {
                        document.querySelector(`#idBtn-${result.id}`).remove();
                    })
                }
            })
    });
}

// Program for loading trade performance
function load_performance() {

    const symb = document.querySelector("#S-ME").dataset.symbol;

    fetch(`/performance/${symb}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.length == 1) {
                document.querySelector('#history-performance').style.display = "none"
                document.querySelector('#performance').style.display = "none";
            } else {
                document.querySelector('#history-performance').style.display = "block"
                document.querySelector('#performance').style.display = "block";
                filteredResult = result.pop();
                calculate_PL(filteredResult);
                document.querySelector('#performance-record').innerHTML = "";
                result.forEach(trade => performance_info(trade));
                console.log(filteredResult);
                console.log(result);
            }
        })
}


function performance_info(trade) {

    const currency = document.querySelector("#S-ME").dataset.currency;
    const income = trade.Income;
    const timeStr = trade.Time.split(':');
    const hour = parseInt(timeStr[0]);
    const minute = timeStr[1]
    const list = document.createElement('div');

    let roundedIncome = round(income)
    if (income > 0) {
        state = "Profit";
        revenue = `+ ${currency}${roundedIncome}`;
        stateClass = "box-6a-green";
        valueClass = "box-6b-green";
    } else if (income < 0) {
        state = "Loss";
        revenue = roundedIncome.toString().replace(/\-/g, `- ${currency}`);
        stateClass = "box-6a-red";
        valueClass = "box-6b-red";
    } else if (income = 0) {
        state = "Even";
        revenue = `${currency}${roundedIncome}`
        stateClass = "box-6a-grey";
        valueClass = "box-6b-grey";
    }

    list.innerHTML = `<div class="row p-2">
                        <div class="col-7">
                            <div class="d-flex flex-column"> 
                                <div class="box-5a">${trade.Date} ${trade.Year}, ${hour}.${minute} </div>
                                <div class="${stateClass}">${state}</div>
                            </div>
                        </div>
                        <div class="col-5 text-end my-auto">
                            <div class="${valueClass}">${revenue}</div>
                        </div>
                    </div>`;
    document.querySelector('#performance-record').append(list)
}

function calculate_PL(filteredResult) {

    const currency = document.querySelector("#S-ME").dataset.currency;
    const PL = filteredResult["PL"];
    const fees = filteredResult["Fees"];
    
    if (fees == 0) {
        document.querySelector('#additionalFees').innerHTML = `<p>${fees}</p>`;
        document.querySelector('#additionalFees').className = `box-3b me-4`;
    } else if (fees > 0) {
        document.querySelector('#additionalFees').innerHTML = `<p>- ${currency}${fees}</p>`;
        document.querySelector('#additionalFees').className = `red-losses me-4`;
    };

    if (PL > 0) {
        roundedPL = round(PL)
        earning = `+ ${currency}${roundedPL}`
        statusClass = `green-profit me-4`
    } else if (PL < 0) {
        roundedPL = round(PL)
        earning = `- ${currency}${roundedPL}`
        statusClass = `red-losses me-4`
    } else if (PL == 0) {
        earning = `0`
        statusClass = `box-3b me-4`
    };

    document.querySelector('#realized-value').innerHTML = earning;
    document.querySelector('#realized-value').className = statusClass;

    let totalPL = round(PL - fees);
    if (totalPL > 0) {
        PLstatus = 'NET PROFIT'
        PLvalue = `+ ${currency}${totalPL}`
        PLclass = `PL-green badge rounded-pill ms-4 me-3 px-3 py-2`
        valueClass = 'green-profit me-4'
    } else if (totalPL < 0) {
        PLstatus = 'NET LOSS'
        PLvalue = `- ${currency}${totalPL}`
        PLclass = `PL-red badge rounded-pill ms-4 me-3 px-3 py-2`
        valueClass = 'red-losses me-4'
    } else if (totalPL = 0) {
        PLstatus = 'EVEN'
        PLvalue = `0`
        PLclass = `PL-even badge rounded-pill ms-4 me-3 px-3 py-2`
        valueClass = 'box-3b me-4'
    }

    document.querySelector('#statusPL').innerHTML = PLstatus;
    document.querySelector('#statusPL').className = PLclass;
    document.querySelector('#profit-loss').innerHTML = PLvalue;
    document.querySelector('#profit-loss').className = valueClass;
}

function load_portfolioInfo() {

    const symb = document.querySelector("#S-ME").dataset.symbol;
    const marketEx = document.querySelector("#S-ME").dataset.marketExchange;
    const currency = document.querySelector("#S-ME").dataset.currency;

    fetch(`/market_price`, {
        method: 'PUT',
        body: JSON.stringify({
            symbol: symb,
            marketExchange: marketEx,
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            const stockPrice = parseFloat(result.message.replace(/[^\d.]/g, ''));
            let investedCapital = round((result.averagePrice)*(result.holdingUnits));
            let netWorth = round((stockPrice)*(result.holdingUnits));
            let PLvalue = netWorth-investedCapital;
            
            if (PLvalue > 0) {
                pct = round((Math.abs(PLvalue) / investedCapital)*100);
                pctText = `<div class="green-profit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-up mb-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                </svg>
                                <span class="my-0">${pct}%</span>
                            </div>`
                editedValue = round(Math.abs(PLvalue))
                value = `+ ${currency}${editedValue}`;
                unrealizedClass = 'green-profit'
            } else if (PLvalue < 0) {
                pct = round((Math.abs(PLvalue) / investedCapital)*100);
                pctText = `<div class="red-losses">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-down mb-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                                <span class="my-0">${pct}%</span>
                            </div>`
                editedValue = round(Math.abs(PLvalue))
                value = `- ${currency}${editedValue}`;
                unrealizedClass = 'red-losses';
            } else if (PLvalue == 0) {
                pctText = '-';
                value = '-';
                unrealizedClass = 'box-7a';
            }

            document.querySelector('#invested-capital').innerHTML = `${currency}${investedCapital}`;
            document.querySelector('#net-worth').innerHTML = `${currency}${netWorth}`;
            document.querySelector('#unrealized-value').className = `me-2 ${unrealizedClass}`;
            document.querySelector('#unrealized-pct').className = `me-2 ${unrealizedClass}`;
            document.querySelector('#unrealized-value').innerHTML = value;
            document.querySelector('#unrealized-pct').innerHTML = pctText;
        })
}

function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}
