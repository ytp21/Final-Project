document.addEventListener('DOMContentLoaded', function() {


    // If URL is not user_profile page, load posts view by default
    var currentURL = location.pathname;
    const path = currentURL.split("/");
    if (String(path[1]) === "stock" || String(currentURL) === "/") {  
        document.querySelectorAll(".home-nav").forEach((nav) => {
            nav.style.backgroundColor = 'rgb(63,0,255)';
            nav.style.color = 'white';
        });
    } else if (String(path[1]) === "about") {
        document.querySelectorAll(".about-nav").forEach((nav) => {
            nav.style.backgroundColor = 'rgb(63,0,255)';
            nav.style.color = 'white';
        });
    }

    const sidebarLarge = document.querySelector('#sidebar-large');
    const sidebarSmall = document.querySelector('#sidebar-small');
    
    // Sidebar effect when window is loaded
    window.addEventListener('load', () => {

        sidebarLarge.classList.remove("active");
        sidebarSmall.classList.remove("active");

        if (window.innerWidth >= 800) {
            Window_L_Reload_one(Window_L_Reload_two);
        } else if (window.innerWidth < 800) {
            Window_S_Reload_one(Window_S_Reload_two);
        };

    });


    // Sidebar effect when window is resize
    window.addEventListener('resize', () => {

        if (!sidebarSmall.classList.contains("active")) {
            if (window.innerWidth >= 800 && !sidebarLarge.classList.contains("active")) {
                Window_L_one(Window_L_two);
            } else if (window.innerWidth < 800) {
                Window_S_one(Window_S_two);
            }
        };

    });

    // Sidebar effect when sidebar toggle button is triggered
    document.querySelector('#sidebar-toggler').addEventListener('click', () => {
        if (window.innerWidth >= 800) {
            if (sidebarLarge.classList.contains("active")) {
                sidebarLarge.classList.remove("active");
                sidebarSmall.classList.add("active");
                L_to_S_one(L_to_S_two);
                
            } else if (document.querySelector('#sidebar-small').classList.contains("active")) {
                sidebarLarge.classList.add("active");
                sidebarSmall.classList.remove("active");
                S_to_L_one(S_to_L_two);
            }
        } else if (window.innerWidth < 800) {
            if (sidebarSmall.classList.contains("active")) {
                sidebarSmall.style.display = "block";
                sidebarSmall.classList.remove("active");
                sidebarSmall.style.width = "0";
                document.querySelector("#main").style.marginLeft = "0";
                document.querySelector("#main").style.width = "100vw"; 
            } else if (!sidebarSmall.classList.contains("active")) {
                sidebarSmall.style.display = "block";
                sidebarSmall.classList.add("active");
                sidebarSmall.style.width = "4.5rem";
                document.querySelector("#main").style.marginLeft = "4.5rem";
                document.querySelector("#main").style.width = "calc(100vw - 4.5rem)";
            }
        }
    });
})





/* 
    Window Resize Effect on Sidebar
*/

// Sidebar effect when window with width >= 800px is reload
function Window_L_Reload_one(callback) {
    document.querySelector('#sidebar-large').classList.add("active");
    document.querySelector('#sidebar-large').style.transition = "0s";
    document.querySelector('#sidebar-large').style.width = "230px";
    document.querySelector("#main").style.transition = "0s";
    document.querySelector("#main").style.marginLeft = "230px";
    document.querySelector("#main").style.width = "calc(100vw - 230px)";
    setTimeout(function() {callback()}, 50);
}

function Window_L_Reload_two() {
    document.querySelector("#main").style.transition = "0.5s";
    document.querySelector('#sidebar-large').style.transition = "0.5s";
}

// Sidebar effect when window with width < 800px is reload
function Window_S_Reload_one(callback) {
    document.querySelector("#main").style.transition = "0s";
    document.querySelector("#main").style.marginLeft = "0";
    document.querySelector("#main").style.width = "100vw";
    document.querySelector('#sidebar-large').style.transition = "0s";
    document.querySelector('#sidebar-small').style.width = "0";
    setTimeout(function() {callback()}, 50);
}

function Window_S_Reload_two() {
    document.querySelector("#main").style.transition = "0.5s";
    document.querySelector('#sidebar-large').style.transition = "0.5s";
}



/* 
    Sidebar Toggle Button 
*/

// Sidebar-large to Sidebar-small
function L_to_S_one(callback) {
    document.querySelector('#sidebar-small').style.display = "block";
    document.querySelector('#sidebar-small').classList.add("sidebar-small-230");
    document.querySelector('#sidebar-small').classList.remove("sidebar-small");
    document.querySelector('#sidebar-large').style.display = "none";
    document.querySelector('#sidebar-large').style.width = "0";
    setTimeout(function() {callback()}, 50);
}

function L_to_S_two() {
    document.querySelector('#sidebar-large').style.display = "block";
    document.querySelector('#sidebar-small').classList.add("sidebar-small");
    document.querySelector('#sidebar-small').classList.remove("sidebar-small-230");
    document.querySelector('#sidebar-small').style.transition = "0.5s";
    document.querySelector('#sidebar-small').style.width = "4.5rem";
    document.querySelector("#main").style.marginLeft = "4.5rem";
    document.querySelector("#main").style.width = "calc(100vw - 4.5rem)";
}

// Sidebar-small to Sidebar-large
function S_to_L_one(callback) {
    document.querySelector("#main").style.marginLeft = "230px";
    document.querySelector('#sidebar-large').style.display = "none";
    document.querySelector('#sidebar-large').style.width = "230px";
    document.querySelector('#sidebar-small').style.width = "230px";
    setTimeout(function() {callback()}, 480);
}

function S_to_L_two() {
    document.querySelector("#main").style.width = "calc(100vw - 230px)";
    document.querySelector('#sidebar-small').style.display = "none";
    document.querySelector('#sidebar-large').style.display = "block";
}



/* 
    Window Resize Effect on Sidebar
*/

// Sidebar effect when windows' width >= 800px
function Window_L_one(callback) {
    document.querySelector("#main").style.marginLeft = "230px";
    document.querySelector('#sidebar-large').classList.add("active");
    document.querySelector('#sidebar-large').style.width = "230px";
    document.querySelector('#sidebar-small').style.transition = "0s";
    setTimeout(function() {callback()}, 500);
}

function Window_L_two() {
    document.querySelector("#main").style.width = "calc(100vw - 230px)";
    document.querySelector('#sidebar-small').style.display = "none";
    document.querySelector('#sidebar-small').style.width = "230px";
    document.querySelector('#sidebar-small').style.transition = "0.5s";
}

// Sidebar effect when windows' width < 800px
function Window_S_one(callback) {
    document.querySelector("#main").style.marginLeft = "0";
    document.querySelector("#main").style.width = "100vw";
    document.querySelector('#sidebar-large').style.width = "0";
    document.querySelector('#sidebar-large').classList.remove("active");
    document.querySelector('#sidebar-small').style.width = "0";
    setTimeout(function() {callback()}, 500);
}

function Window_S_two() {
    document.querySelector('#sidebar-small').style.display = "block";
}


