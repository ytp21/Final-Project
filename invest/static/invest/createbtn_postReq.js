document.addEventListener('DOMContentLoaded', function() {

    // Create new record (POST Request)
    document.querySelector('#create-form').addEventListener('submit', create_record);

})


// Create new record (POST Request)
function create_record(event) {

    event.preventDefault();
    
    const symbol = document.querySelector('#symbol').value;
    const marketExchange = document.querySelector('#marketExchange').value;

    validation(symbol, marketExchange);

    if (symbol != "" && marketExchange != "") {
        fetch('/create', {
        method: 'POST',
        body: JSON.stringify({
            symbol: symbol,
            marketExchange: marketExchange,
        })
        })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
            const message = Object.values(result);

            if (result.error) {
                document.querySelector('#alert-msg').innerHTML = `${message}`;
            } else {
                window.location.replace("")
            };
        });
    };

}


function validation(symbol, marketExchange) {

    document.querySelector('#symbol').classList.remove("is-valid");
    document.querySelector('#symbol').classList.remove("is-invalid");
    document.querySelector('#marketExchange').classList.remove("is-valid");
    document.querySelector('#marketExchange').classList.remove("is-invalid");

    if (symbol === "" && marketExchange === "") {
        document.querySelector('#symbol').classList.add("is-invalid");
        document.querySelector('#marketExchange').classList.add("is-invalid");
        document.querySelector('#alert-msg').innerHTML = 'Content is blank';
        
    } else if (symbol === "") {
        document.querySelector('#symbol').classList.add("is-invalid");
        document.querySelector('#alert-msg').innerHTML = 'Content is blank';
    } else if (marketExchange === "") {
        document.querySelector('#marketExchange').classList.add("is-invalid");
        document.querySelector('#alert-msg').innerHTML = 'Content is blank';
    }

}
