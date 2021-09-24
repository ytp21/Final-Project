document.addEventListener('DOMContentLoaded', function() {

     // Real-time stock market price update
     window.onload = update_marketPrice();
     let min = 5;
     setInterval(update_marketPrice, (min*60*1000));
     
 })

 function update_marketPrice() {
    document.querySelectorAll('.dashboard-record').forEach( (stock) => {
        fetch('/market_price', {
            method: 'PUT',
            body: JSON.stringify({
                symbol: stock.dataset.symbol,
                marketExchange: stock.dataset.marketExchange,
            })
        })
            .then(response => response.json())
            .then(result => {
                // Print result
                const stockPrice = parseFloat(result.message.replace(/[^\d.]/g, ''));
                const avgBuyPrice = parseFloat(stock.dataset.averageBuyPrice);
                if (avgBuyPrice === 0) {
                    stock.querySelector('#status').innerHTML = `No purchase`;
                } else if (stockPrice >= avgBuyPrice) {
                    pct = round(((stockPrice-avgBuyPrice)/avgBuyPrice)*100);
                    stock.querySelector('#status').innerHTML = `Profit by ${pct}%`;
                    stock.querySelector('#status').style.color = "rgb(0, 197, 0)";
                } else if (stockPrice <= avgBuyPrice) {
                    pct = round(((avgBuyPrice-stockPrice)/avgBuyPrice)*100);
                    stock.querySelector('#status').innerHTML = `Loss by ${pct}%`;
                    stock.querySelector('#status').style.color = "rgb(247, 47, 47)";
                } else if (stockPrice === avgBuyPrice) {
                    stock.querySelector('#status').innerHTML = `Even`;
                }

                stock.querySelector('#stock-price-value').innerHTML = `<p class="m-0 stock-price-label">Market Price</p>
                                                                        <p class="m-0">${result.message}</p>`;
                stock.querySelector('#stock-price-value').classList.add("stock-price-theme")
            })
    })
}

function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}