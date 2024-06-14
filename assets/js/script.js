//Function for screen on loading
document.addEventListener('DOMContentLoaded', function () {
    //hide piggy-bank and score area on screen onload

    let userDiceRolls = [];
    let computerDiceRolls = [];
    let userRollOutcome;
    let computerRollOutcome;
    let currentPlayer = 'user';
    let roundWinner = null;

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

    circle.addEventListener('click', clickToStart);


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



    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function rollThreeDice() {
        return [rollDice(), rollDice(), rollDice()];
    }

    function highRoll() {

        console.log('Youre in the high roll');

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

        if (num1 > num2) {
            currentPlayer = 'user';
            heading.textContent = `You rolled a ${num1}`;
            setTimeout(function () {
                heading.textContent = `Computer rolled a ${num2}`;
            }, 2000);
            setTimeout(function () {
                heading.textContent = `Set the stakes`;
                setTheStakes();
            }, 4000);
        } else {
            currentPlayer = 'computer';
            heading.textContent = `You rolled a ${num1}`;
            setTimeout(function () {
                heading.textContent = `Computer rolled a ${num2}`;
            }, 2000);
            setTimeout(function () {
                setComputerStakes();
            }, 2000);

        }


        let highRollResult = [num1, num2];

        return highRollResult;

    }



    function setTheStakes() {

        roundWinner = null;

        console.log("You're in user stakes");

        let increaseStakesButton = document.getElementById('increase-stakes');

        function updateStakes() {

            bankRollUserValue -= 100;
            bankRollComputerValue -= 100;
            bankRollUser.value = bankRollUserValue;
            bankRollComputer.value = bankRollComputerValue;

            setTimeout(function () {
                heading.textContent = "Click to roll";
                currentPlayer = 'user';
                circle.addEventListener('click', runGame);
            }, 2000);

        }


        increaseStakesButton.addEventListener('click', updateStakes);

    }


    function setComputerStakes() {


        console.log("You're in computer stakes");

        let multiplier = Math.floor(Math.random() * 5) + 1;
        let computerStakes = multiplier * 100;

        if (roundWinner == null) {
            setTimeout(function () {
                heading.innerText = `The stakes are ${computerStakes}`;
                setTimeout(function () {
                    bankRollComputerValue -= computerStakes;
                    bankRollUserValue -= computerStakes;
                    bankRollComputer.value = bankRollComputerValue;
                    bankRollUser.value = bankRollUserValue;

                    piggyBankInput.value = computerStakes * 2;

                    heading.textContent = "Computer Rolling";
                    currentPlayer = 'computer';
                    setTimeout(function () {
                        runGame();
                    }, 4000);
                }, 1000);
            }, 3000);
        }

        roundWinner = null;

        return computerStakes;

    }

    function updateBankRolls(winner, piggyBankValue) {

        if (winner === 'user') {
            bankRollUserValue += parseInt(piggyBankValue);
            bankRollUser.value = bankRollUserValue;
        } else {
            bankRollComputerValue += parseInt(piggyBankValue);
            bankRollComputer.value = bankRollComputerValue;
        }

        piggyBankInput.value = 0;

    }

    function userTurn() {

        console.log("Its users turn");

        do {
            userDiceRolls = userRollDice();
            userRollOutcome = checkRoll(userDiceRolls, 'user');
        } while (userRollOutcome === '');

        heading.textContent = `You rolled a ${userDiceRolls}`;

        console.log(userDiceRolls);

        currentPlayer = 'computer';
        runGame();

    }

    function computerTurn() {

        console.log("Its computers turn");

        do {
            computerDiceRolls = computerRollDice();
            computerRollOutcome = checkRoll(computerDiceRolls, 'computer');
        } while (computerRollOutcome === '');

        heading.textContent = `Computer rolled a ${computerDiceRolls}`;
        console.log(computerDiceRolls);
        
        currentPlayer = 'user';
        runGame(); 
    }

    function runGame() {

        console.log(currentPlayer);

        circle.removeEventListener('click', runGame)

        if (roundWinner !== null) {
            return;
        }

        if (currentPlayer === 'user') {
            if(userRollOutcome === undefined) {
                setTimeout(function () {
                    userTurn();
                }, 2000);
            }
        }

        if (currentPlayer === 'computer') {
            if(computerRollOutcome === undefined) {    
                setTimeout(function () {
                    computerTurn();
                }, 2000);
            }    
        }



        if (userRollOutcome !== undefined && computerRollOutcome !== undefined) {
            setTimeout(function () {
                determineWinner(userRollOutcome, computerRollOutcome);
            }, 1000);

            userRollOutcome = undefined;
            computerRollOutcome = undefined;
        }


    }

    function userRollDice() {

        console.log('Your in userRollDice');

        return rollThreeDice();


    }

    function computerRollDice() {
        console.log('Your in computerRollDice');
        return rollThreeDice();

    }




    function checkRoll(roll, player) {

        console.log("You're in checkRoll");

        let rolls = {};
        let outcome = '';

        for (let i = 0; i < roll.length; i++) {
            let die = roll[i];
            rolls[die] = (rolls[die] || 0) + 1;
        }

        //check for instant wins and instant losses
        if (rolls[4] && rolls[5] && rolls[6]) {
            outcome = 'instant-win';
        } else if (rolls[1] && rolls[2] && rolls[3]) {
            outcome = 'instant-loss';
        }

        //Check for three of a kind
        for (let die in rolls) {
            if (rolls[die] === 3) {
                outcome = 'three-of-a-kind';
            }
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
            outcome = `${pairDie} ${pairDie} ${point}`;
        }

        console.log(`${player} outcome is: ${outcome}`);

        return outcome;


    }

    function newRound(winner) {
        //if either players bankroll is at 0, other player wins

        circle.removeEventListener('click', )
        
        if(roundWinner === 'user'){
            setTheStakes(); 
        }

        if(roundWinner === 'computer') {
            setComputerStakes();             
        }


    }

    //create function for checking winner of rounds

    function determineWinner(userRollOutcome, computerRollOutcome) {

        console.log("You're in determineWinner");

        setTimeout(function () {
            if (userRollOutcome === 'instant-win' || computerRollOutcome === 'instant-loss') {
                // updateBankRolls('user', piggyBankInput.value);
                heading.textContent = "You win this round!";
                roundWinner = 'user';
                setTheStakes(); 
            } else if (computerRollOutcome === 'instant-win' || userRollOutcome === 'instant-loss') {
                // updateBankRolls('computer', piggyBankInput.value);
                heading.textContent = "Computer wins this round!";
                roundWinner = 'computer';
                setComputerStakes(); 
                //Check if user has three of a kind computer does not
            } else {
                if (userRollOutcome === 'three-of-a-kind') {
                    if (computerRollOutcome !== 'three-of-a-kind') {
                        // updateBankRolls('user', piggyBankInput.value);
                        heading.textContent = "You win this round!";
                        roundWinner = 'user';
                        setTheStakes(); 
                        //Check for the values of users and computers roll if both have three-of-a-kind    
                    } else {
                        let userThreeValue = parseInt(userDiceRolls[0]);
                        let computerThreeValue = parseInt(computerDiceRolls[0]);
                        if (userThreeValue > computerThreeValue) {
                            // updateBankRolls('user', piggyBankInput.value);
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            setTheStakes(); 
                        } else if (userThreeValue < computerThreeValue) {
                            // updateBankRolls('computer', piggyBankInput.value);
                            heading.textContent = "Computer wins this round!";
                            roundWinner = 'computer';
                            setComputerStakes(); 
                        } else {
                            heading.textContent = "It's a tie!";
                        }
                    }
                    //Check if computer has three of a kind and user does not
                } else if (computerRollOutcome === 'three-of-a-kind') {
                    // updateBankRolls('computer', piggyBankInput.value);
                    heading.textContent = "Computer wins this round!";
                    roundWinner = 'computer';
                    setComputerStakes(); 
                    //Check pairs and numbers against each other
                } else {
                    //Check if outcomes are null and use .split to on arrays if not 
                    let userPairValue = (typeof userRollOutcome === 'string' && userRollOutcome) ? parseInt(userRollOutcome.split(' ')[0]) : null;
                    let computerPairValue = (typeof computerRollOutcome === 'string' && computerRollOutcome) ? parseInt(computerRollOutcome.split(' ')[0]) : null;

                    if (userPairValue === computerPairValue) {
                        //Check if rolls are null and isolate single die if not
                        let userSingleDie = userDiceRolls ? userDiceRolls.find(die => die !== userPairValue) : null;
                        let computerSingleDie = computerDiceRolls ? computerDiceRolls.find(die => die !== computerPairValue) : null;
                        if (userSingleDie > computerSingleDie) {
                            // updateBankRolls('user', piggyBankInput.value);
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            setTheStakes(); 
                        } else if (userSingleDie < computerSingleDie) {
                            // updateBankRolls('computer', piggyBankInput.value);
                            heading.textContent = "Computer wins this round!";
                            roundWinner = 'computer';
                            setComputerStakes(); 
                        } else {
                            heading.textContent = "It's a tie!";
                        }

                    } else {
                        //Check if rolls are null and compare points if not
                        let userPoint = userDiceRolls ? userDiceRolls.find(die => die !== userPairValue) : null;
                        let computerPoint = computerDiceRolls ? computerDiceRolls.find(die => die !== computerPairValue) : null;

                        if (userPoint > computerPoint) {
                            // updateBankRolls('user', piggyBankInput.value);
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            setTheStakes(); 
                        } else if (userPoint < computerPoint) {
                            // updateBankRolls('computer', piggyBankInput.value);
                            heading.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            setComputerStakes(); 
                        } else {
                            heading.textContent = "It's a tie!";
                        }
                    }
                }
            }

        }, 2000);

    }

});