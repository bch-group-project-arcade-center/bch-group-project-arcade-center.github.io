function jackpot() {
    const WHEEL_COUNT = 3;
    const RESULT_OPTIONS = 6; // Counting from 0

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
            alert("Congratulations, you won the jackpot of 300 coins!");
        } else if (oneCounter === WHEEL_COUNT) {
            // If all numbers are 1s, announce smaller jackpot
            alert("Congratulations, you won 100 coins");
        } else if (twoCounter === WHEEL_COUNT || threeCounter === WHEEL_COUNT) {
            // If all numbers are all 2s or all 3s, annnouce prize
            alert("You win 15 coins");
        } else if (fourCounter === WHEEL_COUNT || fiveCounter === WHEEL_COUNT) {
            // If all numbers are all 4s or all 5s, annnouce prize
            alert("You win 8 coins");
        } else if (sixCounter === 2) {
            // If there are 2 pokeballs, announce prize
            alert("You win 6 coins");
        } else if (sixCounter === 1) {
            // If there is 1 pokeballs, announce prize
            alert("You win 2 coins");
        } else {
            // If player doesn't win anything, tell them to try again
            alert("Sorry, try again!");
        }
    }, 3000);
}

// Start game when lever is down
document.querySelector("#lever").addEventListener("change", () => {
    let x = document.querySelector("#lever").value;
    if (x < 20) {
        jackpot();
    }
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
