document.addEventListener('DOMContentLoaded', function() {

    // Animation of create box item on hover 
    const createBtn = document.querySelector('#create-btn')

    createBtn.addEventListener('mouseenter', () => {
        createBtn.style.color = 'white';
        createBtn.querySelector('.bg-border-radius').style.opacity = '1';
        document.querySelector('.create-notice').style.color = 'white';
        document.querySelector('.create-notice-link').style.color = 'rgb(171, 234, 250)';
    });
    
    createBtn.addEventListener('mouseleave', () => {
        createBtn.style.color = 'black';
        createBtn.querySelector('.bg-border-radius').style.opacity = '0';
        document.querySelector('.create-notice').style.color = 'black';
        document.querySelector('.create-notice-link').style.color = 'rgb(55, 116, 231)';
    });

    document.querySelector('#create-form').onmouseover = () => {
        createBtn.style.color = 'white';
        createBtn.querySelector('.bg-border-radius').style.opacity = '1';
        document.querySelector('.create-notice').style.color = 'white';
        document.querySelector('.create-notice-link').style.color = 'rgb(171, 234, 250)';
    }
    
    // Animation of create box item when clicked
    createBtn.addEventListener('click', () => {
        if (!document.querySelector('#create-btn').classList.contains("active")) {
            btn_extend ()
        } else if (document.querySelector('#create-btn').classList.contains("active")) {
            btn_minimize ()
        }
    })


    // Create form effect when is-invalid is detected
    const symbol = document.querySelector('#symbol');
    const marketExchange = document.querySelector('#marketExchange');
    
    symbol.addEventListener('keypress', () => { 
        symbol.classList.remove("is-invalid");
        symbol.classList.remove("is-valid");
    });

    marketExchange.addEventListener('keypress', () => { 
        marketExchange.classList.remove("is-invalid");
        marketExchange.classList.remove("is-valid");
    });

})


function btn_minimize () {
    document.querySelector('#create-btn').style.height = '47px';
    document.querySelector('.create').style.opacity = '0';
    document.querySelector('.create').style.transition = "0s"
    document.querySelector('#create-btn').classList.remove("active");

    // Reset Create Form
    document.querySelector('#symbol').classList.remove("is-valid");
    document.querySelector('#symbol').classList.remove("is-invalid");
    document.querySelector('#marketExchange').classList.remove("is-valid");
    document.querySelector('#marketExchange').classList.remove("is-invalid");
    document.querySelector('#symbol').value = "";
    document.querySelector('#marketExchange').value = "";
    document.querySelector('#alert-msg').innerHTML = "";
}

function btn_extend () {
    document.querySelector('#create-btn').style.height = '210px';
    document.querySelector('.create').style.opacity = '1';
    document.querySelector('.create').style.transition = "ease-in 0.5s"
    document.querySelector('#create-btn').classList.add("active");
    document.querySelector('#create-bg').style.opacity = '1';
    document.querySelector('.create-notice').style.color = 'white';
    document.querySelector('#create-btn').style.color = 'white';
    document.querySelector('.create-notice-link').style.color = 'rgb(142, 230, 252)';
}


