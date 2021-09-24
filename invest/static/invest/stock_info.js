document.addEventListener('DOMContentLoaded', function() {

    const symb = document.querySelector("#S-ME").dataset.symbol;
    const marketEx = document.querySelector("#S-ME").dataset.marketExchange;

    // Real-time stock market price update
    window.onload = update_marketPrice(symb, marketEx);
    let min = 5;
    setInterval(update_marketPrice(symb, marketEx), (min*60*1000));
    
    // Load stock info 
    window.onload = stock_info(symb, marketEx);
    
})


function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}


function update_marketPrice(symb, marketEx) {

    fetch('/market_price', {
        method: 'PUT',
        body: JSON.stringify({
            symbol: symb,
            marketExchange: marketEx,
        })
    })
        .then(response => response.json())
        .then(result => {
            // Print result

            let dateInfo = result.date
            date = dateInfo.split('·')[0]
            const stockPrice = parseFloat(result.message.replace(/[^\d.]/g, ''));
            const previousClose = parseFloat(result.previous_close.replace(/[^\d.]/g, ''));
            const currency = result.message.replace(/[\d.]/g, '');

            let priceDiff = round(stockPrice - previousClose);

            if (priceDiff === 0) {
                document.querySelector('#individual-price').innerHTML = `<p class="mb-0 ms-2 me-1 box-2b">${result.message}</p>
                                                                        <p class="ms-2 box-2g">${date}</p>`;
            } else if (priceDiff > 0) {
                let pct = round(((priceDiff)/previousClose)*100)
                document.querySelector('#individual-price').innerHTML = `<div class="d-block text-center w-100">
                                                                            <p class="mb-0 ms-2 mt-2 me-1 box-2b d-inline-block align-middle">${result.message}</p>
                                                                            <div class="ms-1 mt-2 d-inline-block">
                                                                                <div class="d-flex flex-row box-2c-green ">
                                                                                    <div class="d-flex flex-column align-items-center">
                                                                                        <div>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-up mb-1" viewBox="0 0 16 16">
                                                                                                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                                                                            </svg>
                                                                                            <span class="my-0 box-2d">${pct}%</span>
                                                                                        </div>
                                                                                        <p class="my-0 box-2e">(+${currency}${priceDiff})</p>
                                                                                    </div>
                                                                                    <div class="align-self-center box-2f">Today</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <p class="ms-2 mt-2 box-2g">${date}</p>`;
            } else if (priceDiff < 0) {
                let pct = round(((Math.abs(priceDiff))/previousClose)*100)
                document.querySelector('#individual-price').innerHTML = `<div class="d-block text-center w-100">
                                                                            <p class="mb-0 ms-2 mt-2 me-1 box-2b d-inline-block align-middle">${result.message}</p>
                                                                            <div class="ms-1 mt-2 d-inline-block">
                                                                                <div class="d-flex flex-row box-2c-red ">
                                                                                    <div class="d-flex flex-column align-items-center">
                                                                                        <div>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-down mb-1" viewBox="0 0 16 16">
                                                                                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                                                                            </svg>
                                                                                            <span class="my-0 box-2d">${pct}%</span>
                                                                                        </div>
                                                                                        <p class="my-0 box-2e">(-${currency}${Math.abs(priceDiff)})</p>
                                                                                    </div>
                                                                                    <div class="align-self-center box-2f">Today</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <p class="ms-2 mt-2 box-2g">${date}</p>`;
            }

        })
}



function stock_info(symb, marketEx) {

    fetch('/market_info', {
        method: 'PUT',
        body: JSON.stringify({
            symbol: symb,
            marketExchange: marketEx,
        })
    })
        .then(response => response.json())
        .then(result => {
            // Print result
            document.querySelector('#prev-close').innerHTML = `<p class="box-3b">${result.previous_close}</p>`;
            document.querySelector('#day-range').innerHTML = `<p class="box-3b">${result.day_range}</p>`;
            document.querySelector('#market-cap').innerHTML = `<p class="box-3b">${result.market_cap}</p>`;
            document.querySelector('#volume').innerHTML = `<p class="box-3b">${result.volume}</p>`;
            document.querySelector('#pe-ratio').innerHTML = `<p class="box-3b">${result.pe_ratio}</p>`;
            document.querySelector('#dividend').innerHTML = `<p class="box-3b">${result.dividend}</p>`;
        })
}