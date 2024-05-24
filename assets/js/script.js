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


    function clickToStart() {
        scoreArea.style.display = 'flex';
        piggyBank.style.display = 'flex';
        mainSection.style.height = '72%';

        let heading = document.getElementById('h1-large-screens');
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

        if (highRollResult[0] > highRollResult[1]) {

            //If user roll is higher than computer
            heading.textContent = `You rolled a ${highRollResult[0]}`;

            setTimeout(function () {
                heading.textContent = `Computer rolled a ${highRollResult[1]}`;
            }, 2000);

            setTimeout(function () {
                heading.textContent = "Set the stakes";
                setPlayerStakes();
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



    function setComputerStakes() {

        console.log("You're in computer stakes");

        let multiplier = Math.floor(Math.random() * 5) +1;
        
        let computerStakes = multiplier * 100;

        setTimeout(function () {
            let heading = document.getElementById('h1-large-screens'); 
            heading.innerText = `The stakes are ${computerStakes}`; 
        }, 1000);
        
        return computerStakes;`` 

    }



    //function for setting the stakes 
    function setPlayerStakes() {
        console.log("You're in player stakes"); 

        let playerStakes = 
    }


    //Function for running the game
    function runGame() {

        console.log("You're in the game");

        let circle = document.getElementById('main-section-circle');

        let heading = document.getElementById('h1-large-screens');

    }


});