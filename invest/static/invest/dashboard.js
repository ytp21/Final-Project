document.addEventListener('DOMContentLoaded', function() {

    // Animation of dashboard-record item 
    document.querySelectorAll('.dashboard-btn').forEach(button => {

        let btnStatus = button.querySelector('#status')

        button.addEventListener('click', () => {
            button.querySelector('.bg-border-radius').style.opacity = '1';
            button.querySelector('.dashboard-record').style.color = 'white';
            btnStatus.style.color = "white";
        });

    });

})