/**
 * Sound setting function wrapper. Adds event listeners to webpage.
 * @param {DOM element} btnSoundOn // Button shown when sound is on
 * @param {DOM element} btnSoundOff // Button shown when sound if off
 */
function enableSoundSetting(btnSoundOn, btnSoundOff) {
  let soundOn = true;
  /* 
// Get sound option from session storage, unless sound is set to false, set sound on
let soundOn = localStorage.getItem("sound") == "false" ? false : true;
    // Display volume icon matching soundOn
if (soundOn) {
    // Show sound on btn
    btnSoundOn.style.display = "block";
  } else {
    // Show sound off btn
    btnSoundOff.style.display = "block";
  } */

  // If sound is on...
  btnSoundOn.addEventListener("click", () => {
    // Set sound on to false
    soundOn = false;
    // Pause bg music if playing
    if (audioBg) audioBg.pause();
    // Hide sound on btn
    btnSoundOn.style.display = "none";
    // Show sound off btn
    btnSoundOff.style.display = "block";
  });

  // If sound if off...
  btnSoundOff.addEventListener("click", () => {
    soundOn = true;
    // Resume bg music if paused
    if (audioBg) audioBg.play();
    // Show sound on btn
    btnSoundOn.style.display = "block";
    // Hide sound off btn
    btnSoundOff.style.display = "none";
  });
}

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

/** Sharing on Twitter; To replace player and score with variables from local storage*/
let shareBtnTwitter = document.getElementById("shareBtnTwitter");
shareBtnTwitter.addEventListener("click", function () {
  makePopupPage(
    "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(
        `Try to beat my high score of [score] on ${currentURL}`
      )
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
