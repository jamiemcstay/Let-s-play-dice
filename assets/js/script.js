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

        piggyBank.value = 0;

        if (highRollResult[0] > highRollResult[1]) {

            //If user roll is higher than computer
            heading.textContent = `You rolled a ${highRollResult[0]}`;

            setTimeout(function () {
                heading.textContent = `Computer rolled a ${highRollResult[1]}`;
            }, 2000);

            setTimeout(function () {
                heading.textContent = "Set the stakes";
                setTheStakes();
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


    function setTheStakes() {
        console.log("You're in player stakes");

        let bankRollUser = document.getElementById('bank-roll-user');
        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputer = document.getElementById('bank-roll-computer');
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        let piggyBankInput = document.getElementById('piggy-bank-input');
        let piggyBankValue = parseInt(piggyBankInput.value);
        let increaseStakesButton = document.getElementById('increase-stakes');


        increaseStakesButton.addEventListener('click', function () {
            // Get the current bank roll value

            // Check if the bank roll value is valid and greater than or equal to 100
            if (!isNaN(bankRollUserValue) && bankRollUserValue >= 100) {
                // Decrease the bank roll by 100
                bankRollUserValue -= 100;

                // Update the bank roll input value
                bankRollUser.value = bankRollUserValue;

                // Get the current piggy bank value

                // Update the piggy bank value by adding 100
                piggyBankValue += 100;

                // Update the piggy bank input value
                piggyBankInput.value = piggyBankValue;


            }

            if (!isNaN(bankRollComputerValue) && bankRollComputerValue >= 100) {
                bankRollComputerValue -= 100;

                bankRollComputer.value = bankRollComputerValue;

                piggyBankValue += 100;

                piggyBankInput.value = piggyBankValue;


            }
        });
    }



    function setComputerStakes() {

        let bankRollUser = document.getElementById('bank-roll-user');
        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputer = document.getElementById('bank-roll-computer');
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        let piggyBankInput = document.getElementById('piggy-bank-input');
        let piggyBankValue = parseInt(piggyBankInput.value);
        let increaseStakesButton = document.getElementById('increase-stakes');

        console.log("You're in computer stakes");

        let multiplier = Math.floor(Math.random() * 5) + 1;

        let computerStakes = multiplier * 100;

        setTimeout(function () {
            let heading = document.getElementById('h1-large-screens');
            heading.innerText = `The stakes are ${computerStakes}`;
        }, 1000);


        function updateBankRolls(stakes) {

            if (!isNaN(bankRollUserValue) && bankRollUserValue >= 100) {
                bankRollUserValue -= stakes;
                bankRollUser.value = bankRollUserValue;

            }

            if (!isNaN(bankRollComputerValue) && bankRollUserValue >= 100) {
                bankRollComputerValue -= stakes;
                bankRollComputer.value = bankRollComputerValue;

            }

            if (!isNaN(piggyBankValue)) {
                piggyBankValue += stakes * 2;
                piggyBankInput.value = piggyBankValue;
            }

        }

        

        updateBankRolls(computerStakes);
        return computerStakes;

    }


});