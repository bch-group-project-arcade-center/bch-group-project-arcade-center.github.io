let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {}, false);

document.addEventListener(
  "dragstart",
  function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
  },
  false
);

document.addEventListener(
  "dragend",
  function (event) {
    // reset the transparency
    event.target.style.opacity = "";
    event.target.style.left = "-1px";
    event.target.style.top = "-1px";
  },
  false
);

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

      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
    }
  },
  false
);

let dicenumber = 0;
let press = document.getElementById("dice");

const PresstheDice = () => {
  dicenumber = Math.floor(Math.random() * 6) + 1;
  console.log(dicenumber);
  press.textContent = dicenumber;
  FirstMove();
};
press.addEventListener("click", PresstheDice);

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
let turns = document.getElementById("turns");

const ShowPopupplayers = () => {
  document.getElementById("popup-players").style.display = "block";
};
document.onload = ShowPopupplayers();

const GetPlayers = () => {
  player1 = {
    nickname: `${document.getElementById("player1").value}`,
    color: document.getElementById("color1").value,
    arrowturn: document.getElementById("color1").value + "turn",
  };
  player2 = {
    nickname: document.getElementById("player2").value,
    color: document.getElementById("color2").value,
    arrowturn: document.getElementById("color2").value + "turn",
  };
  player3 = {
    nickname: document.getElementById("player3").value,
    color: document.getElementById("color3").value,
    arrowturn: document.getElementById("color3").value + "turn",
  };
  player4 = {
    nickname: document.getElementById("player4").value,
    color: document.getElementById("color4").value,
    arrowturn: document.getElementById("color4").value + "turn",
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
    turns.classList.add(player1.arrowturn);
    FirstMove();
  }
};
const StopRefresh = (event) => {
  event.preventDefault();
  GetPlayers();
};

form.addEventListener("submit", StopRefresh);

/*Game Start*/
/*dice*/
const FirstMove = () => {
  console.log(dicenumber);
  if (dicenumber > 1 && dicenumber < 6) {
    console.log("next turn for" + activeplayers[1]);
    turns.classList.remove(player1.arrowturn);
    turns.classList.add(activeplayers[1].arrowturn);
  } else {
    /*GameStart();*/
  }
};
