//Function for screen on loading
document.addEventListener('DOMContentLoaded', function () {
    //hide piggy-bank and score area on screen onload
    let scoreArea = document.getElementById('score-area');
    scoreArea.style.display = 'none';

    let piggyBank = document.getElementById('piggy-bank-container');
    piggyBank.style.display = 'none';

    //increase size of main section to take up surplace space 
    let mainSection = document.getElementById('main-section');
    mainSection.style.height = '90%';

    let circle = document.getElementById('main-section-circle');

    let heading = document.getElementById('h1-large-screens');
    let bankRollUser = document.getElementById('bank-roll-user');
    let bankRollUserValue = parseInt(bankRollUser.value);
    let bankRollComputer = document.getElementById('bank-roll-computer');
    let bankRollComputerValue = parseInt(bankRollComputer.value);
    let piggyBankInput = document.getElementById('piggy-bank-input');
    let piggyBankValue = parseInt(piggyBankInput.value);
    piggyBankValue = 0; 


    function clickToStart() {
        scoreArea.style.display = 'flex';
        piggyBank.style.display = 'flex';
        mainSection.style.height = '72%';

 
        heading.textContent = "Click for high roll";

        let diceOne = document.getElementById('die1');
        diceOne.style.display = 'none';

        let diceTwoChange = document.querySelector('.fa-solid.fa-dice-five.die');
        if (diceTwoChange) {
            diceTwoChange.setAttribute('class', 'fa-solid fa-dice-five fa-beat die');
        }

        let diceThree = document.getElementById('die3');
        diceThree.style.display = 'none';

        circle.removeEventListener('click', clickToStart);

        circle.addEventListener('click', highRoll);

    }

    circle.addEventListener('click', clickToStart);


    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function rollThreeDice() {
        return [rollDice(), rollDice(), rollDice()]; 
    } 

    function highRoll() {

        console.log('Youre in the high roll');
        // let heading = document.getElementById('h1-large-screens'); 
        let circle = document.getElementById('main-section-circle');
        circle.removeEventListener('click', highRoll);

        setTimeout(function () {
            let diceTwoChange = document.querySelector('.fa-solid.fa-dice-five.fa-beat.die');
            if (diceTwoChange) {
                diceTwoChange.setAttribute('class', 'fa-solid fa-dice-five die');
            }
        }, 200);

        let num1;
        let num2;

        do {
            num1 = rollDice();
            num2 = rollDice();
        } while (num1 === num2);


        let highRollResult = [num1, num2];

        checkHighRoll(highRollResult);

        return highRollResult;

    }

    function checkHighRoll(highRollResult) {
        console.log('Your in check high roll');
        let heading = document.getElementById('h1-large-screens');
        heading.style.fontSize = '300%';

        piggyBank.value = 0;

        if (highRollResult[0] > highRollResult[1]) {

            //If user roll is higher than computer
            heading.textContent = `You rolled a ${highRollResult[0]}`;

            setTimeout(function () {
                heading.textContent = `Computer rolled a ${highRollResult[1]}`;
            }, 2000);

            setTimeout(function () {
                heading.textContent = "Set the stakes";
                setTheStakes('user');
            }, 4000);


            //If computer roll is higher than user
        } else {
            heading.textContent = `You rolled a ${highRollResult[0]}`;

            setTimeout(function () {
                heading.textContent = `Computer rolled a ${highRollResult[1]}`;
                setComputerStakes();
            }, 2000);

        }

    }


    function setTheStakes(player) {
        console.log("You're in player stakes");


        let increaseStakesButton = document.getElementById('increase-stakes');

        function updateStakes() {
            
            if (player === 'user') {
                bankRollUserValue -= 100;
                bankRollUser.value = bankRollUserValue; 
            } else {
                bankRollComputerValue -= 100; 
                bankRollComputer.value = bankRollComputerValue; 
            }

            heading.textContent = "Set the stakes! Click to toll."
            circle.addEventListener('click', player === 'user' ? userRoll : computerRoll); 

        } if (player === 'user') {
            increaseStakesButton.addEventListener('click', updateStakes);                        
        } else {
            updateStakes(); 
        }
        

    }

    // increaseStakesButton.removeEventListener('click'){

    // };



    function setComputerStakes() {

        console.log("You're in computer stakes");
        let bankRollComputer = document.getElementById('bank-roll-computer');
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        let piggyBankInput = document.getElementById('piggy-bank-input');
        let piggyBankValue = parseInt(piggyBankInput.value);
        let increaseStakesButton = document.getElementById('increase-stakes');

        let multiplier = Math.floor(Math.random() * 5) + 1;

        let computerStakes = multiplier * 100;

        setTimeout(function () {
            let heading = document.getElementById('h1-large-screens');
            heading.innerText = `The stakes are ${computerStakes}`;
        }, 1000);

        updateBankRolls(computerStakes);
        computerRoll();
        return computerStakes;

    }

    function updateBankRolls(player, result) {

        if(result === 'instant-win' || result === 'pair-6') {
            if(player === 'computer') {
                bankRollComputerValue += piggyBankValue; 
                bankRollComputer.value =  bankRollComputerValue; 
            }
        }
    }

    function computerRoll() {

        let roll = rollThreeDice();
        let result = checkRoll(roll);
        heading.textContent = `Computer rolled a ${roll}`;

        //check for wether roll wins against user roll or bank roll balance

    }


    function userRoll() {

        let roll = rollThreeDice(); 
        let result = checkRoll(roll);
        heading.textContent = `You rolled a ${roll}`;

    }

    function checkRoll(roll) {
        let rolls = {};
        
        for(i = 0; i < roll.length; i++) {
            let die = roll[i];
            rolls[die] = (rolls[die] || 0) + 1; 
        }

        if (rolls[4] && rolls[5] && rolls[6]) return 'instant-win';
        if (rolls[1] && rolls[2] && rolls[3]) return 'instant-loss';

        for (let die in rolls) {
            if(rolls[die] === 3) return 'three-of-a-kind';           
        }

        for (let die in rolls) {
            if (rolls[die] === 2) {
                let point = roll.find(die => rolls[die] !== 2);
                return `pair ${point}`;
            }
        }
    } 

});