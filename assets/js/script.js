//Function for screen on loading
document.addEventListener('DOMContentLoaded', function () {
    //hide piggy-bank and score area on screen onload

    let userDiceRolls = [];
    let computerDiceRolls = [];
    let userRollOutcome;
    let computerRollOutcome;
    let currentPlayer = 'user';
    let roundWinner = null;
    let banker;

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
    let bankRollComputer = document.getElementById('bank-roll-computer');
    let piggyBankInput = document.getElementById('piggy-bank-input');

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
                setTheStakes();
            }, 2000);

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


        console.log("You're in user stakes");

        let increaseStakesButton = document.getElementById('increase-stakes');

        setTimeout(function () {
            heading.textContent = `Set the stakes`;
        }, 4000);


        increaseStakesButton.addEventListener('click', updateStakes);


    }

    function updateStakes() {


        let userStakes = 100;
        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);

        if (bankRollUserValue >= userStakes && bankRollComputerValue >= userStakes) {
            bankRollUserValue -= userStakes;
            bankRollComputerValue -= userStakes;
            bankRollUser.value = bankRollUserValue;
            bankRollComputer.value = bankRollComputerValue;

            let totalStakes = userStakes * 2;

            piggyBankInput.value = parseInt(piggyBankInput.value) + totalStakes;

        } else {
            heading.textContent = "Insuffient funds"; 
        }



        if (!roundWinner) {
            setTimeout(function () {
                heading.textContent = "Click to begin";
                currentPlayer = 'user';
                circle.addEventListener('click', runGame);
            }, 2000);
        } else {
            setTimeout(function () {
                heading.textContent = "Click to roll";
                currentPlayer = 'user';
                circle.addEventListener('click', userTurn);
            }, 2000);
        }
        
        

    }


    function setComputerStakes() {

        roundWinner = null;

        console.log("You're in computer stakes");

        let multiplier = Math.floor(Math.random() * 5) + 1;
        let computerStakes = multiplier * 100;

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);

        bankRollComputerValue -= computerStakes;
        bankRollUserValue -= computerStakes;
        bankRollComputer.value = bankRollComputerValue;
        bankRollUser.value = bankRollUserValue;

        piggyBankInput.value = computerStakes * 2;

        setTimeout(function () {
            heading.textContent = "Computer setting stakes";
        }, 1000);

        setTimeout(function () {
            heading.innerText = `The stakes are ${computerStakes}`;
        }, 2000);


        console.log(`SetComputerStakes bankRollUserValue is ${bankRollUserValue}`);
        console.log(`SetComputerStakes bankRollComputerValue is ${bankRollComputerValue}`);
        console.log(`SetComputerStakes piggBankValueis ${piggyBankInput.value}`);

        currentPlayer = 'computer';
        runGame();



        return computerStakes;

    }

    function updateBankRolls(winner, piggyBankValue) {

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);


        if (winner === 'user') {
            bankRollUserValue += parseInt(piggyBankValue);
            bankRollUser.value = bankRollUserValue;
        } else {
            bankRollComputerValue += parseInt(piggyBankValue);
            bankRollComputer.value = bankRollComputerValue;
        }

        piggyBankInput.value = 0;

        console.log(`UpdateBankRolls bankRollUserValue is: ${bankRollUserValue}`);
        console.log(`Update BankRolls bankRollComputerValue is ${bankRollComputerValue}`);
        console.log(`Update BankRolls piggyBankValue is: ${piggyBankInput.value}`);

    }

    function checkInstantWinOrLoss(playerRollOutcome, playersRoll, player) {

        let piggyBankValue = parseInt(piggyBankInput.value);
        console.log("You're in instantWinOrLoss");

        if (player === 'user') {
            if (playerRollOutcome) {
                if (playersRoll) {
                    if (playerRollOutcome === 'instant-win') {
                        setTimeout(function () {
                            heading.textContent = `You rolled a ${playersRoll}`;
                        }, 1000);
                        console.log(`${playersRoll}`);
                        setTimeout(function () {
                            heading.textContent = 'Instant Win!'
                        }, 2000);
                        setTimeout(function () {
                            heading.textContent = 'You win this round!';
                        }, 4000);
                        setTimeout(function () {
                            roundWinner = 'user';
                            newRound('user');
                        }, 5000);
                        roundWinner = 'user';
                        newRound('user');
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        setTimeout(function () {
                            heading.textContent = `You rolled a ${playersRoll}`;
                        }, 1000);
                        console.log(`${playersRoll}`);
                        setTimeout(function () {
                            heading.textContent = 'Instant Loss!';
                        }, 2000);
                        setTimeout(function () {
                            heading.textContent = 'Computer Wins this round!';
                        }, 4000);
                        setTimeout(function () {
                            roundWinner = 'computer';
                            newRound('computer');
                        }, 5000)
                        return true;
                    }
                }
            }
            return false;
        } else if (player === 'computer') {
            if (playerRollOutcome) {
                if (playersRoll) {
                    if (playerRollOutcome === 'instant-win') {
                        setTimeout(function () {
                            heading.textContent = `Computer rolled a ${playersRoll}`;
                        }, 1000);
                        setTimeout(function () {
                            heading.textContent = 'Instant Win!';
                        }, 2000);
                        setTimeout(function () {
                            heading.textContent = "You lose this round";
                        }, 4000);
                        setTimeout(function () {
                            roundWinner = 'computer';
                            newRound('computer');
                        }, 5000);
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        setTimeout(function () {
                            heading.textContent = `Computer rolled a ${playersRoll}`;
                        }, 1000);
                        setTimeout(function () {
                            heading.textContent = 'Instant Loss!';
                        }, 2000);
                        setTimeout(function () {
                            heading.textContent = 'You Win this round!';
                        }, 4000);
                        setTimeout(function () {
                            roundWinner = 'user';
                            newRound('user');
                        }, 5000);
                        return true;
                    }
                }
            }
            return false;
        }
    }

    function startUserTurn() {
        
        circle.removeEventListener('click', startUserTurn);
        userTurn();
    }


    function userTurn() {

        roundWinner = null;

        console.log("Its users turn");

        circle.removeEventListener('click', userTurn);

        setTimeout(function () {
            heading.textContent = "Rolling";
        }, 2000);

        do {
            userDiceRolls = userRollDice();
            userRollOutcome = checkRoll(userDiceRolls, 'user');
        } while (userRollOutcome === '');

        if (checkInstantWinOrLoss(userRollOutcome, userDiceRolls, 'user')) {
            return;
        } else {
            setTimeout(function () {
                heading.textContent = `You rolled a ${userDiceRolls}`;
                currentPlayer = 'computer';
                console.log(`UsersTurn is returning: ${userRollOutcome}`);
                runGame();
            }, 3000);

        }

        return userRollOutcome;

    }

    function computerTurn() {

        console.log("Its computers turn");

        setTimeout(function () {
            heading.textContent = "Computer Rolling";
        }, 2000);

        do {
            computerDiceRolls = computerRollDice();
            computerRollOutcome = checkRoll(computerDiceRolls, 'computer');
        } while (computerRollOutcome === '');

        if (checkInstantWinOrLoss(computerRollOutcome, computerDiceRolls, 'computer')) {
            return;
        } else {

            setTimeout(function () {
                heading.textContent = `Computer rolled a ${computerDiceRolls}`;
                console.log(computerDiceRolls);
                currentPlayer = 'user';
                console.log(`computersTurn is returning: ${computerRollOutcome}`);
                runGame();
            }, 3000);

        }

        return computerRollOutcome;
    }

    function endGame() {
        console.log("Your in end game");
    }

    function runGame() {

        console.log(currentPlayer);

        let increaseStakesButton = document.getElementById('increase-stakes');

        increaseStakesButton.removeEventListener('click', updateStakes);

        circle.removeEventListener('click', runGame)


        if (roundWinner !== null) {
            return;
        }

        if (currentPlayer === 'user') {
            if (userRollOutcome === undefined) {
                setTimeout(function () {
                    heading.textContent = "Click to roll";
                    circle.addEventListener('click', startUserTurn);
                }, 1000);
            }

        }

        if (currentPlayer === 'computer') {
            if (computerRollOutcome === undefined) {
                setTimeout(function () {
                    computerTurn();
                }, 1000);
            }
        }


        if (userRollOutcome !== undefined && computerRollOutcome !== undefined) {
            setTimeout(function () {
                determineWinner(userRollOutcome, computerRollOutcome);
            }, 3000);

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
                outcome = 'instant-win';
            }
        }

        //Check if two of the three die are a match
        let pairDie = null;
        for (let die in rolls) {
            if (rolls[die] === 2) {
                pairDie = parseInt(die);
                console.log(`Rolls:`, rolls);
                break;
            }
        }

        //Check for the point with the pair of matching dice
        if (pairDie !== null) {
            let point = roll.find(die => die !== pairDie);
            if (point === 6) {
                outcome = 'instant-win';
            } else if (point === 1) {
                outcome = 'instant-loss';
            } else if (point >= 2 && point <= 5) {
                outcome = `${pairDie} ${pairDie} ${point}`;
                console.log(`${pairDie} ${pairDie} ${point}`);
            }

        }

        console.log(`${player} outcome is: ${outcome}`);

        console.log(`Pair die:`, pairDie);

        return outcome;


    }

    function newRound(roundWinner) {

        userRollOutcome = undefined;
        computerRollOutcome = undefined;

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        let piggyBankValue = parseInt(piggyBankInput.value); 

        if (bankRollUserValue <= 0 || bankRollComputerValue <= 0) {
            if (bankRollUserValue <= 0) {
                //Call end game function with computer as argument
                endGame('computer');

            } else if (bankRollComputerValue <= 0) {
                //Call endGame function with user as argument 
            } endGame('user'); 
        } else {
            if (roundWinner === 'user') {
                setTimeout(function () {
                    updateBankRolls('user', piggyBankValue)
                }, 2000); 
                setTimeout(function () {
                    setTheStakes();
                }, 4000); 
            } else if (roundWinner === 'computer') {
                setTimeout(function () {
                    updateBankRolls('computer', piggyBankValue);
                }, 2000);
                setTimeout(function () {
                    setComputerStakes();
                }, 4000); 
                
            }
        }

    }

    //create function for checking winner of rounds

    function determineWinner(userRollOutcome, computerRollOutcome) {

        console.log(`determineWinner computerRollOutcome is ${computerRollOutcome}`);
        console.log(`determineWinner userRollOutcome is ${userRollOutcome}`);

        console.log("You're in determineWinner");

        setTimeout(function () {

            console.log(`User roll outcome before split: ${userRollOutcome}`);
            console.log(`Computer roll outcome before split: ${computerRollOutcome}`);

            let piggyBankValue = parseInt(piggyBankInput.value);
            let userPairValue = (typeof userRollOutcome === 'string' && userRollOutcome) ? parseInt(userRollOutcome.split(' ')[0]) : null;
            let computerPairValue = (typeof computerRollOutcome === 'string' && computerRollOutcome) ? parseInt(computerRollOutcome.split(' ')[0]) : null;

            console.log(`Users pair value is ${userPairValue}`);
            console.log(`Computers pair value is ${computerPairValue}`);

            if (userPairValue !== null && computerPairValue !== null) {
                // Isolate single point for user and computer roll 
                let userPoint = parseInt(userRollOutcome.split(' ')[2]);
                let computerPoint = parseInt(computerRollOutcome.split(' ')[2]);

                console.log(`Users point is ${userPoint}`);
                console.log(`computers point is ${computerPoint}`);

                if (userPairValue === computerPairValue) {
                    // If the pair values are equal, compare the points
                    if (userPoint === computerPoint) {
                        heading.textContent = "It's a tie!";
                        console.log("It's a tie");
                    } else if (userPoint > computerPoint) {
                        heading.textContent = "You win this round!";
                        roundWinner = 'user';
                        // updateBankRolls('user', piggyBankValue);
                        newRound('user');
                    } else {
                        heading.textContent = "Computer wins this round";
                        roundWinner = 'computer';
                        console.log("Computer wins");
                        // updateBankRolls('computer', piggyBankValue);
                        newRound('computer');
                    }
                } else {
                    // If the pair values are not equal
                    if (userPoint === computerPoint) {
                        //If the points are equal, compare the pair values
                        if (userPairValue > computerPairValue) {
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            // updateBankRolls('user', piggyBankValue);
                            newRound('user');
                        } else {
                            heading.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            console.log("Computer wins");
                            // updateBankRolls('computer', piggyBankValue);
                            newRound('computer');
                        }
                    } else {
                        //If points are not equal, the higher point wins
                        if (userPoint > computerPoint) {
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            // updateBankRolls('user', piggyBankValue);
                            newRound('user');
                        } else {
                            heading.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            console.log("Computer wins");
                            // updateBankRolls('computer', piggyBankValue);
                            newRound('computer');
                        }

                    }
                }
            }

        }, 2000);

    }

});