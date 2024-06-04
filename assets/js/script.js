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
                bankRollComputerValue -= 100; 
                bankRollUser.value = bankRollUserValue;
                bankRollComputer.value = bankRollComputerValue; 
            }   
            

            heading.textContent = "Click to roll"
            circle.addEventListener('click', userRollDice);
            
        }

        increaseStakesButton.addEventListener('click', updateStakes); 

    }


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

        computerRollDice();
        return computerStakes;

    }

    function updateBankRolls(winner, piggyBankValue) {

        if(winner === 'user') {
            bankRollUserValue +=parseInt(piggyBankValue);
            bankRollUser.value = bankRollUserValue; 
        } else {
            bankRollComputerValue += parseInt(piggyBankValue);
            bankRollComputer.value = bankRollComputerValue; 
        }

        piggyBankInput.value = 0; 

    }

    function computerRollDice() {
        console.log("You're in computerRollDice"); 

        heading.textContent = "Computer rolling..."; 

        setTimeout(function () {
            let computerRoll = rollThreeDice();
            let computerRollOutcome = checkRoll(computerRoll);

            console.log(computerRoll); 
            console.log(computerRollOutcome);      


            heading.textContent = `Computer rolled ${computerRoll}`; 
        }, 2000); 

        setTimeout(function () {
            determineWinner(userOutcome, computerOutcome);
        }, 2000); 


    }


    function userRollDice() {
        console.log("You're in userRollDice"); 

        circle.removeEventListener('click', userRollDice); 
        
        let userRoll = rollThreeDice();
        let userRollOutcome = checkRoll(userRoll);

        heading.textContent = `You rolled a ${userRoll}`;

        setTimeout(function () {
            computerRollDice(userRollOutcome); 
        }, 2000); 

    }

    function checkRoll(roll) {

        console.log("You're in checkRoll");

        let rolls = {};

        for (i = 0; i < roll.length; i++) {
            let die = roll[i];
            rolls[die] = (rolls[die] || 0) + 1;
        }

        //check for instant wins and instant losses
        if (rolls[4] && rolls[5] && rolls[6]) return 'instant-win';
        if (rolls[1] && rolls[2] && rolls[3]) return 'instant-loss';

        //Check for three of a kind
        for (let die in rolls) {
            if (rolls[die] === 3) return 'three-of-a-kind';
        }

        //Check if two of the three die are a match
        let pairDie = null; 
        for (let die in rolls) {
            if (rolls[die] === 2) {
                pairDie = parseInt(die); 
                break; 
            }
        }

        //Check for the point with the pair of matching dice

        if (pairDie !== null) {
            let point = roll.find(die => die !== pairDie);
            return pairDie + `${point}`; 
        }

    }

    //create function for checking winner of rounds

    function determineWinner(userOutcome, computerOutcome) {
        if(userOutcome === 'instant-win' || computerOutcome === 'instant-loss') {
            updateBankRolls('user', piggyBankInput.value);
            heading.textContent = "You win this round!"; 
        } else if (computerOutcome === 'instant-win' || userOutcome === 'instant-loss') {
            updateBankRolls('computer', piggyBankInput.value); 
            heading.textContent = "Computer wins this round!";
        } else if (userOutcome === 'three of a kind' || userOutcome === pairDie + 6) {
            updateBankRolls('user', piggyBankInput.value);
            heading.textContent = "You win this round!";
        } else if(computerOutcome === 'three-of-a-kind' || computerOutcome === pairDie + 6); {
            updateBankRolls('computer', piggyBankInput.value);
            heading.textContent = "Computer wins this round!"; 
        }              
    }   
});