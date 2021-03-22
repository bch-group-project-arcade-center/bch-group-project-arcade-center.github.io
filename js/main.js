/**
 * Sound setting function wrapper. Adds event listeners to webpage.
 * @param {DOM element} btnSoundOn // Button shown when sound is on
 * @param {DOM element} btnSoundOff // Button shown when sound if off
 */
function enableSoundSetting(btnSoundOn, btnSoundOff) {
  let soundOn = true;

  // Get sound option from session storage, unless sound is set to false, set sound on

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
