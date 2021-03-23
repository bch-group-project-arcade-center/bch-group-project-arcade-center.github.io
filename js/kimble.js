// Bg Music
audioBg = new Audio("./music/kimble/title-screen.mp3");
let audioBgGame = document.getElementById("bg-audio");
audioBgGame.loop = true;

let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {}, false);

document.addEventListener(
  "dragstart",
  function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;

    // make it half transparent
    event.target.style.opacity = 0.7;
  },
  false
);
/* document.addEventListener(
  "touchstart",
  function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    console.log(dragged);

    // make it half transparent
    event.target.style.opacity = 0.7;
  },
  false
); */

document.addEventListener(
  "dragend",
  function (event) {
    // reset the transparency
    event.target.style.opacity = "";
    event.target.style.left = "-1px";
    event.target.style.top = "-1px";
    CheckWinner();
  },
  false
);
/* document.addEventListener(
  "touchend",
  function (event) {
    // reset the transparency
    event.target.style.opacity = "";
    event.target.style.left = "-1px";
    event.target.style.top = "-1px";
  },
  false
); */

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  function (event) {
    // prevent default to allow drop
    event.preventDefault();
  },
  false
);

document.addEventListener(
  "dragenter",
  function (event) {
    if (event.target.className == "place") {
      event.target.style.background = "purple";
    }
  },
  false
);
/* document.addEventListener(
  "touchmove",
  function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "place") {
      event.target.style.background = "purple";
    }
  },
  false
); */

document.addEventListener(
  "dragleave",
  function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "place") {
      event.target.style.background = "";
    }
  },
  false
);

document.addEventListener(
  "drop",
  function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "place") {
      event.target.style.background = "";

      if (dragged.draggable) {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
      }
    }
  },
  false
);

/*Conditions*/

/*how many players in the game*/
let player1, player2, player3, player4;

let activeplayers = [];
let redpices = document.querySelectorAll(".repiece");
let bluepices = document.querySelectorAll(".bluepiece");
let yellowpices = document.querySelectorAll(".yellowpiece");
let greenpices = document.querySelectorAll(".greenpiece");
let kimblestartbutton = document.querySelector("button");
let result = document.getElementById("result");
let form = document.querySelector("form");
let startnewgame = document.querySelector("#startnewgame");
let turn = 1;
let currentPlayerIndex;
let currentPlayer;
let firstTurn = true;
let field = document.getElementById("field");
let overlay = document.getElementById("overlay");
let info = document.getElementById("info_button");

info.addEventListener("click", function () {
  overlay.style.display = "block";
});

document.getElementById("close_popup").addEventListener("click", function () {
  overlay.style.display = "none";
});

const ShowPopupplayers = () => {
  document.getElementById("popup-players").style.display = "block";
};
document.onload = ShowPopupplayers();

const GetPlayers = () => {
  player1 = {
    nickname: `${document.getElementById("player1").value}`,
    color: document.getElementById("color1").value,
    arrowturn: document.getElementById("color1").value + "turn",
    piecesId: [
      `${document.getElementById("color1").value}piece1`,
      `${document.getElementById("color1").value}piece2`,
      `${document.getElementById("color1").value}piece3`,
      `${document.getElementById("color1").value}piece4`,
    ],
    boardcolor: () =>
      player1.color == "red"
        ? "#ff000082"
        : player1.color == "blue"
        ? "#090fd582"
        : player1.color == "green"
        ? "#076c2382"
        : "#ffc70082",
    homebasePos: () =>
      player1.color == "red"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("top"),
            },
          ]
        : player1.color == "blue"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("top"),
            },
          ]
        : player1.color == "green"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("top"),
            },
          ]
        : [
            {
              left: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("top"),
            },
          ],
  };

  player2 = {
    nickname: document.getElementById("player2").value,
    color: document.getElementById("color2").value,
    arrowturn: document.getElementById("color2").value + "turn",
    piecesId: [
      `${document.getElementById("color2").value}piece1`,
      `${document.getElementById("color2").value}piece2`,
      `${document.getElementById("color2").value}piece3`,
      `${document.getElementById("color2").value}piece4`,
    ],
    boardcolor: () =>
      player2.color == "red"
        ? "#ff000082"
        : player2.color == "blue"
        ? "#090fd582"
        : player2.color == "green"
        ? "#076c2382"
        : "#ffc70082",
    homebasePos: () =>
      player2.color == "red"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("top"),
            },
          ]
        : player2.color == "blue"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("top"),
            },
          ]
        : player2.color == "green"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("top"),
            },
          ]
        : [
            {
              left: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("top"),
            },
          ],
  };
  player3 = {
    nickname: document.getElementById("player3").value,
    color: document.getElementById("color3").value,
    arrowturn: document.getElementById("color3").value + "turn",
    piecesId: [
      `${document.getElementById("color3").value}piece1`,
      `${document.getElementById("color3").value}piece2`,
      `${document.getElementById("color3").value}piece3`,
      `${document.getElementById("color3").value}piece4`,
    ],
    boardcolor: () =>
      player3.color == "red"
        ? "#ff000082"
        : player3.color == "blue"
        ? "#090fd582"
        : player3.color == "green"
        ? "#076c2382"
        : "#ffc70082",
    homebasePos: () =>
      player3.color == "red"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("top"),
            },
          ]
        : player3.color == "blue"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("top"),
            },
          ]
        : player3.color == "green"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("top"),
            },
          ]
        : [
            {
              left: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("top"),
            },
          ],
  };
  player4 = {
    nickname: document.getElementById("player4").value,
    color: document.getElementById("color4").value,
    arrowturn: document.getElementById("color4").value + "turn",
    piecesId: [
      `${document.getElementById("color4").value}piece1`,
      `${document.getElementById("color4").value}piece2`,
      `${document.getElementById("color4").value}piece3`,
      `${document.getElementById("color4").value}piece4`,
    ],
    boardcolor: () =>
      player4.color == "red"
        ? "#ff000082"
        : player4.color == "blue"
        ? "#090fd582"
        : player4.color == "green"
        ? "#076c2382"
        : "#ffc70082",
    homebasePos: () =>
      player4.color == "red"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("red4")
              ).getPropertyValue("top"),
            },
          ]
        : player4.color == "blue"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("blue4")
              ).getPropertyValue("top"),
            },
          ]
        : player4.color == "green"
        ? [
            {
              left: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("green4")
              ).getPropertyValue("top"),
            },
          ]
        : [
            {
              left: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow1")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow2")
              ).getPropertyValue("top"),
            },
            {
              left: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow3")
              ).getPropertyValue("top"),
            },

            {
              left: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("left"),
              top: getComputedStyle(
                document.getElementById("yellow4")
              ).getPropertyValue("top"),
            },
          ],
  };
  console.log(player1, player2);
  let allplayers = [];
  allplayers.push(player1, player2, player3, player4);
  console.log(allplayers);
  activeplayers = allplayers.filter((el) => {
    return el.nickname != "";
  });

  console.log(activeplayers);

  /*check colors*/
  let checkcolor = activeplayers.map(function (item) {
    return item.color;
  });
  let isDuplicate = checkcolor.some(function (item, idx) {
    return checkcolor.indexOf(item) != idx;
  });
  if (isDuplicate) {
    alert("Two players cannot have the same color");
    // return;
  } else {
    document.getElementById("popup-players").style.display = "none";
    field.style.bottom = "0";
    press.classList.add(player1.arrowturn);
    enableDrag(player1);
    CreatePlayersBoard();
    document.querySelector(
      "#playersboard div:nth-child(2)"
    ).style.background = `${player1.boardcolor()}`;
    // Bg music
    if (soundOn) {
      audioBg.pause();
      audioBgGame.play();
    }
  }
};

/*players Board*/
let playersboard = document.getElementById("playersboard");

const CreatePlayersBoard = () => {
  playersboard.style.display = "flex";
  //let div = document.createElement("div");
  for (let i = 0; i < activeplayers.length; i++) {
    playersboard.innerHTML += `<div>${activeplayers[i].nickname}</div>`;
  }
  //let document.querySelectorAll("#playersboard div");
};

const StopRefresh = (event) => {
  event.preventDefault();
  GetPlayers();
};

form.addEventListener("submit", StopRefresh);

/**
 * Controls what happens when a new turn starts
 */
function newTurn() {
  if (!firstTurn) {
    disableDrag(currentPlayer);
    currentPlayerIndex = turn % activeplayers.length;
    document.querySelector(
      `#playersboard div:nth-child(${currentdivIndex})`
    ).style.background = "none";
    currentdivIndex = currentPlayerIndex + 2;
    currentPlayer = activeplayers[currentPlayerIndex];
    enableDrag(currentPlayer);
    press.classList.add(currentPlayer.arrowturn);

    document.querySelector(
      `#playersboard div:nth-child(${currentdivIndex})`
    ).style.background = currentPlayer.boardcolor();
  } else {
    firstTurn = false;
    currentPlayer = player1;
    currentdivIndex = 2;
  }
}

/**
 * Given a player object, set draggable property of each pieces belonging to player to true, making the pieces draggable.
 * @param {obj} player a player object
 */
function enableDrag(player) {
  // if player piece is an array
  player.piecesId.forEach((id) => {
    document.getElementById(id).draggable = true;
    document.getElementById(id).style.cursor = "pointer";
  });
}

/**
 * Given a player object, set draggable property of each pieces belonging to player to false.
 * @param {obj} player a player object
 */
function disableDrag(player) {
  player.piecesId.forEach((id) => {
    document.getElementById(id).draggable = false;
    document.getElementById(id).style.cursor = "default";
  });
}

/***************Dice Cube ***********************/
//select the classes we require
let dicenumber;
var cube = document.querySelector(".cube");
let press = document.getElementById("dice");
let cubeSound = document.getElementById("dicesound");
let cubeSound2 = document.getElementById("dicesound2");
var currentClass = "";

press.onclick = function () {
  //console.log('play');
  cubeSound.play();
};

//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//our main roll dice function on click
const PresstheDice = () => {
  //genberate a random number between 1 and 6 with out getRandomInt function
  var dicenumber = getRandomInt(1, 7);
  //console.log(dicenumber)
  //generate a class with the random number between 1 - 6 called showClass
  var showClass = "show-" + dicenumber;
  //console.log(showClass);

  // if there is a class already selected remove it
  if (currentClass) {
    cube.classList.remove(currentClass);
  }
  // add the new showclass with the generated number
  cube.classList.add(showClass);
  //set the current class to the randomly generated number
  currentClass = showClass;

  turn++;
  press.classList.remove(currentPlayer?.arrowturn);
  newTurn();
};
// set initial side
/*PresstheDice();*/

// on click eventlistener for the button element
press.addEventListener("click", PresstheDice);

/*Game Start*/
const CheckWinner = () => {
  let winner = [];

  currentPlayer.piecesId.forEach((el) => {
    if (document.getElementById(el).parentNode.parentNode.id == "goalbase") {
      winner.push(el);
      if (winner.length == 4) {
        document.getElementById("popup-winner").style.display = "flex";
        document.getElementById(
          "winnertext"
        ).textContent = `${currentPlayer.nickname} WON! CONGRATULATIONS`;
        audioBgGame.pause();
        if (soundOn) audioWin.play();
      }
      console.log("Already in win pos: ", winner.length);
    }
  });
};

startnewgame.addEventListener("click", function () {
  window.location.reload();
});

const GoHome = (x) => {
  console.log(currentPlayer.homebasePos()[x].left);
  document.getElementById(` ${currentPlayer.piecesId[x]}`).style.left = `${
    currentPlayer.homebasePos()[x].left
  }`;
  document.getElementById(`${currentPlayer.piecesId[x]}`).style.top = `${
    currentPlayer.homebasePos()[x].top
  }`;
};

const EatMe = () => {};

/**  const FirstMove = () => {
  console.log(dicenumber);
  if (
    dicenumber > 0 &&
    dicenumber < 6 &&
    currentPlayer.piecesId.every((el) => {
      document.getElementById(el).parentNode.id == "pieces";
    })
  ) {
    disableDrag(currentPlayer);
    console.log("continue");
  } else {
    press.classList.remove(currentPlayer.arrowturn);
    enableDrag(currentPlayer);
  }
}; */

/** Sharing on Twitter **/
let shareBtnTwitter = document.getElementById("shareBtnTwitter");
shareBtnTwitter.addEventListener("click", function () {
  makePopupPage(
    "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(`Play a fun game of Kimble on ${currentURL}`)
  );
});

/*mobile version*/

let windowsize = window.matchMedia("(max-width: 550px)");
MobilePositions(windowsize);
document.addEventListener("resize", MobilePositions);

function MobilePositions(x) {
  if (x.matches) {
    document.getElementById("field").style.display = "";
    alert("Please while playing turn your device horizontally");
    window.location.reload();
  } else {
    document.getElementById("field").style.display = "";
  }
}
