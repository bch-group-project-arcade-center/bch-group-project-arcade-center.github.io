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

infoButton?.addEventListener("click", showInfo);

// This button closes the information poupup.
let closeButton = document.getElementById("close_popup");

const hideInfo = () => {
  document.getElementById("large_pop").classList.toggle("show");
};

closeButton?.addEventListener("click", showInfo);

let currentURL = window.location.href;

//** Sharing on Facebook; To replace player and score with variables from local storage*/
let shareBtnFB = document.getElementById("shareBtnFB");
shareBtnFB?.addEventListener("click", function () {
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

/*** Sound Settings ***/
let btnSoundOn = document.getElementById("soundOn");
let btnSoundOff = document.getElementById("soundOff");
let audioBg;
let audioWin = new Audio("./music/player-wins.mp3");
let audioLose = new Audio("./music/player-loses.wav");

let soundOn =
  localStorage.getItem("sound") == "false" ||
  window.location.pathname == "/index.html"
    ? false
    : true;

if (
  window.location.pathname == "/index.html" ||
  window.location.pathname == "/about.html" ||
  window.location.pathname == "/contact.html"
) {
  audioBg = new Audio("./music/title.mp3");
}

// Display volume icon matching soundOn
if (soundOn) {
  // Show sound on btn
  btnSoundOn.style.display = "block";
} else {
  // Show sound off btn
  btnSoundOff.style.display = "block";
}

btnSoundOn?.addEventListener("click", () => {
  // Set sound on to false
  soundOn = false;
  // Pause bg music if playing
  if (audioBg) audioBg.pause();
  // Hide sound on btn
  btnSoundOn.style.display = "none";
  // Show sound off btn
  btnSoundOff.style.display = "block";
  // Save setting to local storage
  localStorage.setItem("sound", "false");
});

// If sound if off...
btnSoundOff?.addEventListener("click", () => {
  soundOn = true;
  // Resume bg music if paused
  if (audioBg) audioBg.play();
  // Show sound on btn
  btnSoundOn.style.display = "block";
  // Hide sound off btn
  btnSoundOff.style.display = "none";
  // Save setting to local storage
  localStorage.setItem("sound", "true");
});

window.addEventListener("DOMContentLoaded", (event) => {
  if (audioBg && soundOn) audioBg.play();
});
