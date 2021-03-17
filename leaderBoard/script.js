// functions for filling tables
let pushToTable = (obj, table) => {
    let row = document.getElementById(table).insertRow(-1);
    row.insertCell(0).innerHTML = obj.gameScore;
    row.insertCell(1).innerHTML = obj.playerName;
    row.insertCell(2).innerHTML = obj.gameDate.slice(0, 10)
};

let tableMaker = (arr, tableID) => {
    arr.forEach(item => pushToTable(item, tableID));
}

// speed game fetching from localStorage and displaying in leaderboard
let indexLocalStorage = window.localStorage;
let speedGameScoreString = JSON.parse(indexLocalStorage.getItem("speedGame"));
let speedGameScoreArray = speedGameScoreString.sort((a, b) => {
    return b.gameScore - a.gameScore;
});

tableMaker(speedGameScoreArray, 'speedGameTable');

//cyclone game fetching from localStorage and displaying in leaderboard
let cycloneGameScoreString = JSON.parse(indexLocalStorage.getItem("cycloneGame"));
let cycloneGameScoreArray = cycloneGameScoreString.sort((a, b) => {
    return b.gameScore - a.gameScore;
});

tableMaker(cycloneGameScoreArray, 'cycloneGameTable');

//Jackpot game fetching from localStorage and displaying in leaderboard

