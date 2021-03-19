let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {}, false);

document.addEventListener(
  "dragstart",
  function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    console.log(dragged);

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
    // highlight potential drop target when the draggable element enters it
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
      player1.color == "red"
        ? "#ff000082"
        : player1.color == "blue"
        ? "#090fd582"
        : player1.color == "green"
        ? "#076c2382"
        : "#ffc70082",
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
      player1.color == "red"
        ? "#ff000082"
        : player1.color == "blue"
        ? "#090fd582"
        : player1.color == "green"
        ? "#076c2382"
        : "#ffc70082",
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
      player1.color == "red"
        ? "#ff000082"
        : player1.color == "blue"
        ? "#090fd582"
        : player1.color == "green"
        ? "#076c2382"
        : "#ffc70082",
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
    console.log(
      "Items are duplicated and here we need popup HTML CSS and function to put pieces and players on the field"
    );
  } else {
    document.getElementById("popup-players").style.display = "none";
    press.classList.add(player1.arrowturn);
    enableDrag(player1);
    CreatePlayersBoard();
    document.querySelector(
      "#playersboard div:nth-child(2)"
    ).style.background = `${player1.boardcolor()}`;
  }
};

/*players Board*/
let playersboard = document.getElementById("playersboard");

const CreatePlayersBoard = () => {
  playersboard.style.display = "block";
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
    let currentdivIndex = currentPlayerIndex + 2;
    currentPlayer = activeplayers[currentPlayerIndex];
    enableDrag(currentPlayer);
    press.classList.add(currentPlayer.arrowturn);
    document.querySelector(
      `#playersboard div:nth-child(${currentdivIndex})`
    ).style.background = currentPlayer.boardcolor();
  } else {
    firstTurn = false;
    currentPlayer = player1;
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

/********************** Dice roll functionality **********************/
let dicenumber;
let press = document.getElementById("dice");
const PresstheDice = () => {
  dicenumber = Math.floor(Math.random() * 6) + 1;

  press.textContent = dicenumber;
  turn++;
  press.classList.remove(currentPlayer?.arrowturn);
  document.querySelector(`#playersboard div`).style.background = "none";
  newTurn();

  //FirstMove();
};
press.addEventListener("click", PresstheDice);

/*Game Start*/
const CheckWinner = () => {
  let winner = [];

  currentPlayer.piecesId.forEach((el) => {
    if (document.getElementById(el).parentNode.parentNode.id == "goalbase") {
      winner.push(el);
      if (winner.length == 4) {
        document.getElementById("popup-winner").style.display = "block";
        document.getElementById("winnertext").textContent =
          "You WON! CONGRATULATIONS";
      }
      console.log("Already in win pos: ", winner.length);
    }
  });
};

startnewgame.addEventListener("click", function () {
  window.location.reload();
});

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
