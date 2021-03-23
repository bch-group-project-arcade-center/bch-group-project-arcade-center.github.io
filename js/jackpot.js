let score = 0;
let numOfGames = 0;
// Bg Music
audioBg = new Audio("./music/jackpot/title-screen.mp3");
let audioSpin = new Audio("./music/jackpot/wheelspin.wav");

function jackpot() {
  numOfGames++;
  let thisRound = 0;
  const WHEEL_COUNT = 3;
  const RESULT_OPTIONS = 6; // Counting from 0
  if (soundOn) audioSpin.play();
  let slotCounter = 0;
  let counter = 0;

  while (counter < WHEEL_COUNT) {
    // Start the slot machine, one wheel at a time
    setTimeout(() => {
      // Add spinning class to each wheel
      document
        .getElementsByClassName("wheel")
        [slotCounter].classList.add("spinning");
      slotCounter++;
      // Start spinning wheel at 200ms interval
    }, 200 * counter);
    counter++;
  }

  // Create an array of 5 elements
  let myNumbers = [];
  for (let i = 0; i < WHEEL_COUNT; i++) {
    // Generate random number between 0 and 6
    let randomNum = Math.round(Math.random() * RESULT_OPTIONS);
    // Add number to array
    myNumbers.push(randomNum);
  }

  // Initialize variables to track results
  let zeroCounter = 0,
    oneCounter = 0,
    twoCounter = 0,
    threeCounter = 0,
    fourCounter = 0,
    fiveCounter = 0,
    sixCounter = 0;

  // Loop through myNumbers and add results to counter
  while (counter) {
    switch (myNumbers[counter - 1]) {
      case 0:
        zeroCounter++;
        counter--;
        break;
      case 1:
        oneCounter++;
        counter--;
        break;
      case 2:
        twoCounter++;
        counter--;
        break;
      case 3:
        threeCounter++;
        counter--;
        break;
      case 4:
        fourCounter++;
        counter--;
        break;
      case 5:
        fiveCounter++;
        counter--;
        break;
      case 6:
        sixCounter++;
        counter--;
        break;
    }
  }

  // setTimeout requires a new counter
  let index = 0;

  // Display the results, one slot at a time
  while (counter < WHEEL_COUNT) {
    setTimeout(() => {
      // Replace class of each wheel with result that correspond to randomized number
      document.getElementsByClassName("wheel")[index].className =
        "wheel " + result(myNumbers[index]);
      index++;
      // Let wheel spin for a second and stop wheels at 200ms interval
    }, 2000 + 200 * counter);
    counter++;
  }

  // Announce results after wheels stopped spinning
  setTimeout(() => {
    if (zeroCounter === WHEEL_COUNT) {
      // If all numbers are 0s, announce jackpot
      score += 300;
      thisRound = 300;
      if (soundOn) audioWin.play();
    } else if (oneCounter === WHEEL_COUNT) {
      // If all numbers are 1s, announce smaller jackpot
      score += 100;
      thisRound = 100;
      if (soundOn)  audioWin.play();
    } else if (twoCounter === WHEEL_COUNT || threeCounter === WHEEL_COUNT) {
      // If all numbers are all 2s or all 3s, annnouce prize
      score += 15;
      thisRound = 15;
      if (soundOn) audioWin.play();
    } else if (fourCounter === WHEEL_COUNT || fiveCounter === WHEEL_COUNT) {
      // If all numbers are all 4s or all 5s, annnouce prize
      score += 8;
      thisRound = 8;
      if (soundOn)  audioWin.play();
    } else if (sixCounter === 2) {
      // If there are 2 pokeballs, announce prize
      score += 6;
      thisRound = 6;
      if (soundOn) audioWin.play();
    } else if (sixCounter === 1) {
      // If there is 1 pokeballs, announce prize
      score += 2;
      thisRound = 2;
      if (soundOn) audioWin.play();
    } else {
      // If player doesn't win anything, tell them to try again
      thisRound = 0;
    }
    document.getElementById("totalScore").textContent = `Score: ${parseFloat(
      score / numOfGames
    ).toFixed(2)}`;
    document.getElementById(
      "score"
    ).textContent = `${score} coins won in ${numOfGames} games`;
    document.getElementById(
      "roundResult"
    ).textContent = `You won ${thisRound} coins this round`;
  }, 3000);
}

// Start game when lever is down
document.getElementById("lever").addEventListener("click", () => {
  jackpot();
});

// Function to pick result class depending on number
const result = (num) => {
  switch (num) {
    case 0:
      return "result-0";
      break;
    case 1:
      return "result-1";
      break;
    case 2:
      return "result-2";
      break;
    case 3:
      return "result-3";
      break;
    case 4:
      return "result-4";
      break;
    case 5:
      return "result-5";
      break;
    case 6:
      return "result-6";
      break;
  }
};

// quit game and save sores
let quit = document.getElementById("quit");
let gameResultTitile = document.getElementById("resultTitle");
let gameResultScore = document.getElementById("final-score");
let playerNameInput = document.getElementById("playerName");
let btnSaveNameScore = document.getElementById("SaveNameScore");
let btnSaveScore = document.getElementById("saveScore");
let overLay = document.getElementById("overlay");
let smallPopup = document.getElementById("small_pop");
let btnClose = document.getElementById("close");
let playerNameForm = document.getElementById("playerName");
let btnNameSaver = document.getElementById("SaveNameScore");

quit.addEventListener("click", () => {
  overLay.style.visibility = "visible";
  smallPopup.style.visibility = "visible";
  gameResultTitile.textContent = "Do you wish to quit?";

  if (numOfGames > 0 && parseFloat(score / numOfGames).toFixed(2) > 0) {
    btnSaveScore.style.visibility = "visible";
    gameResultScore.textContent = `Score: ${parseFloat(
      score / numOfGames
    ).toFixed(2)}`;
  }
});

btnClose.addEventListener("click", () => {
  overLay.style.visibility = "hidden";
  smallPopup.style.visibility = "hidden";
  scoreSaveMsg.style.visibility = "hidden";
  btnSaveScore.style.visibility = "hidden";
  btnNameSaver.style.visibility = "hidden";
  playerNameForm.style.visibility = "hidden";
});

//saving the score
btnSaveScore.addEventListener("click", () => {
  btnSaveScore.style.visibility = "hidden";
  playerNameInput.style.visibility = "visible";
  btnSaveNameScore.style.visibility = "visible";
});

btnSaveNameScore.addEventListener("click", () => {
  let scoreToBeSaved = {
    playerName: playerNameInput.value,
    gameDate: new Date(),
    gameScore: parseFloat(score / numOfGames).toFixed(2),
  };
  let jackpotLeadBorad = JSON.parse(localStorage.getItem("jackpotGame"));

  if (localStorage.getItem("jackpotGame") !== null) {
    jackpotLeadBorad.push(scoreToBeSaved);
    localStorage.setItem("jackpotGame", JSON.stringify(jackpotLeadBorad));
  } else {
    let newBoard = [];
    newBoard.push(scoreToBeSaved);
    localStorage.setItem("jackpotGame", JSON.stringify(newBoard));
  }
  playerNameInput.style.visibility = "hidden";
  btnSaveNameScore.style.visibility = "hidden";
  scoreSaveMsg.style.visibility = "visible";
});

/** Sharing on Twitter **/
let shareBtnTwitter = document.getElementById("shareBtnTwitter");
shareBtnTwitter.addEventListener("click", function () {
  let message =
    score / numOfGames
      ? `my score of ${parseFloat(score / numOfGames).toFixed(2)}`
      : "me";
  makePopupPage(
    "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(`Try to beat ${message} on ${currentURL}`)
  );
});
