
// Mobile hamburger menu
let buttonMobile = document.getElementById("mobileButton");
// let mobileDropdownButton = document.getElementsByClassName("mobile-dropdown-item");

const mobMenu = () => {
    document.getElementById("mobile-menu").classList.toggle("show");
}

buttonMobile.addEventListener("click", mobMenu);

// mobileDropdownButton.addEventListener("click", mobMenu);



// This button opens the information popup.
let infoButton = document.getElementById("info_button");

const showInfo = () => {
    console.log("shoInfo clicked");
    document.getElementById("large_pop").classList.toggle("show");

}

infoButton.addEventListener("click", showInfo);



// This button closes the information poupup.
let closeButton = document.getElementById("close_popup");

const hideInfo = () => {
    document.getElementById("large_pop").classList.toggle("show");

}

closeButton.addEventListener("click", showInfo);