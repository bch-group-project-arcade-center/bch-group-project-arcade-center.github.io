// Mobile hamburger menu
let buttonMobile = document.getElementById("mobileButton");
// let mobileDropdownButton = document.getElementsByClassName("mobile-dropdown-item");

const mobMenu = () => {
  document.getElementById("mobile-menu").classList.toggle("show");
};

buttonMobile.addEventListener("click", mobMenu);

// mobileDropdownButton.addEventListener("click", mobMenu);

// This button opens the information popup.
let infoButton = document.getElementById("info_button");

const showInfo = () => {
  console.log("shoInfo clicked");
  document.getElementById("large_pop").classList.toggle("show");
};

infoButton.addEventListener("click", showInfo);

// This button closes the information poupup.
let closeButton = document.getElementById("close_popup");

const hideInfo = () => {
  document.getElementById("large_pop").classList.toggle("show");
};

closeButton.addEventListener("click", showInfo);

let currentURL = window.location.href;

//** Sharing on Facebook; To replace player and score with variables from local storage*/
let shareBtnFB = document.getElementById("shareBtnFB");
shareBtnFB.addEventListener("click", function () {
  makePopupPage(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}&amp;src=sdkpreparse`
  );
});

/**
 * Opens a dialog box with given url
 * @param {String} url link with tweet web intent
 */
function makePopupPage(url) {
  window.open(
    url,
    "Share",
    "width=700, height=500, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=1"
  );
}
