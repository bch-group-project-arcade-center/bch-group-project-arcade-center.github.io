
/**        START OF EXTRA CODE TO STYLE BULBS        */
/**
 * You don't have to care about this fn unless you want to
 * @param {NodeList} nodes the list of elements to be arranged in a circle
 * @return {void}
 */
const arrangeBulbsInACircle = (nodes) => {
  const radius = "12em",
    start = -90,
    $els = [...nodes], // turn nodelist into a real array
    numberOfEls = $els.length,
    slice = 360 / numberOfEls,
    index = 0;

  $els.forEach((el, index) => {
    const rotate = slice * index + start;
    const rotateReverse = rotate * -1;

    el.style.transform = `rotate(${rotate}deg) translate(${radius}) rotate(${rotateReverse}deg)`;
  });
};
/**        END OF EXTRA CODE           */

// group project stuff

// start settings
let sessionStorage = window.sessionStorage;
let localStorage = window.localStorage;
let score = sessionStorage.getItem("score")
    ? parseInt(sessionStorage.getItem("score"))
    : 0;
const NUMBER_OF_BULBS = 20;
let BLINKING_SPEED = sessionStorage.getItem("blinkspeed")
    ? parseInt(sessionStorage.getItem("blinkspeed"))
    : 150;
let highscore = sessionStorage.getItem("highscore")
    ? parseInt(sessionStorage.getItem("highscore"))
    : 0;

//elements
let highScoreTitle = document.getElementById("highScoreTitle");
let scoreTitle = document.getElementById("scoreTitle");
let gameResultTitile = document.getElementById("resultTitle");
let gameResultScore = document.getElementById("final-score");
let playerNameInput = document.getElementById("playerName");
let btnSaveNameScore = document.getElementById("SaveNameScore");
let btnSaveScore = document.getElementById("saveScore");
let overLay = document.getElementById("overlay");
let btnClose = document.getElementById("close");

highScoreTitle.textContent = `High score ${highscore}`;
scoreTitle.textContent = `Score ${score}`;


// Game code
const cycloneArcade = () => {
  // Prevent start button from being pressed again
  document.getElementById("start-btn").disabled = true;
  // Allow user to press the stop button
  document.getElementById("stop-btn").disabled = false;

  // Randomly select winning bulb
  const CHOSEN_BULB_INDEX = Math.round(Math.random() * NUMBER_OF_BULBS);

  let counter = 0;
  let bulbContainer = document.querySelector("#bulbs");

  // Create bulbs
  while (counter < NUMBER_OF_BULBS) {
    // Create a bulb
    const newBulb = document.createElement("div");
    // Assign class bulb to newly created div
    newBulb.className = "bulb";
    // Add bulb to bulbs div
    bulbContainer.appendChild(newBulb);
    // Move on to next bulb
    counter++;
  }

  // Assign list of bulbs to a variable
  const bulbs = document.querySelectorAll(".bulb");
  // invoke the fn on the class bulb elements to create the effect
  arrangeBulbsInACircle(bulbs);
  // Select chosen bulb
  bulbs[CHOSEN_BULB_INDEX].classList.add("chosen");
  // Reset counter
  counter = 0;
  //Switch on first bulb
    bulbs[counter].classList.add("active");

  const startInterval = setInterval(() => {
    // switch off the current bulb
    bulbs[counter].classList.remove("active");

    // Go to next bulb until last bulb index is reached then reset counter
    counter < NUMBER_OF_BULBS - 1 ? counter++ : (counter = 0);

    // Switch on current bulb
    bulbs[counter].classList.add("active");
  }, BLINKING_SPEED);

  const stopInterval = () => {
    // Stops blinking
    clearInterval(startInterval);

      if (bulbs[counter].classList.value == "bulb chosen active") {
          
          //let currentScore = parseInt(sessionStorage.getItem("score"));
          let currentScore = score;
          let newScore = currentScore + 1;
          sessionStorage.setItem("score", `${newScore}`);
          if (newScore > highscore) {
              sessionStorage.setItem("highscore", `${newScore}`);
              btnSaveScore.style.visibility = "visible";
              btnSaveScore.addEventListener("click", () => {
                  btnSaveScore.style.visibility = "hidden";
                  playerNameInput.style.visibility = "visible";
                  btnSaveNameScore.style.visibility = "visible";
              });

              btnSaveNameScore.addEventListener("click", () => {
                  let scoreToBeSaved = {
                      playerName: playerNameInput.value,
                      gameDate: new Date(),
                      gameScore: newScore
                  };
                  let cycloneLeadBorad = JSON.parse(localStorage.getItem("cycloneGame"));

                  if (localStorage.getItem("cycloneGame") !== null) {
                      cycloneLeadBorad.push(scoreToBeSaved);
                      localStorage.setItem("cycloneGame", JSON.stringify(cycloneLeadBorad));
                  } else {
                      let newBoard = [];
                      newBoard.push(scoreToBeSaved);
                      localStorage.setItem("cycloneGame", JSON.stringify(newBoard));
                  }
                  playerNameInput.style.visibility = "hidden";
                  btnSaveNameScore.style.visibility = "hidden";
                  scoreSaveMsg.style.visibility = "visible";
              });
          };
          let currentSpeed = BLINKING_SPEED;
          let newSpeed = currentSpeed - 10;
          sessionStorage.setItem("blinkspeed", `${newSpeed}`);
          gameResultWin();
      
      } else {
          if (score > 0) {
              let currentScore = score;
              let newScore = currentScore - 1;
              sessionStorage.setItem("score", `${newScore}`);
              gameResultLose();
          } else {
              gameOver();
          }
      }
      
  };

  // Stop interval when stop button is pressed
    document.getElementById("stop-btn").addEventListener("click", stopInterval);
    
    
};

//game result after each play
function gameResultWin() {
    overLay.style.visibility = 'visible';
    gameResultTitile.textContent = 'You won, play more!';
    gameResultScore.textContent = `Score: ${sessionStorage.getItem("score")}`;
    
    //local storage
}

function gameResultLose() {
    overLay.style.visibility = 'visible';
    gameResultTitile.textContent = 'You lost, try again!';
    gameResultScore.textContent = `Score: ${sessionStorage.getItem("score")}`;
}

function gameOver() {
    sessionStorage.setItem("score", '0')
    overLay.style.visibility = 'visible';
    gameResultTitile.textContent = 'Game Over';
    gameResultScore.textContent = `Your score hit the rock bottom, start over!`;
    sessionStorage.setItem("blinkspeed", '150')
}


btnClose.addEventListener("click", () => {
    overLay.style.visibility = 'hidden';
    
    btnSaveScore.style.display = "none";
    location.reload();
});

// Start game code when start button is pressed
document.getElementById("start-btn").addEventListener("click", cycloneArcade);



