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

    function checkInstantWinOrLoss(playerRollOutcome, playersRoll, player) {

        console.log('You\'re in instantWinOrLoss');

        if (player === 'user') {
            if (playerRollOutcome) {
                if (playersRoll) {
                    if (playerRollOutcome === 'instant-win') {
                        heading.textContent = `You rolled a ${playersRoll}`;
                        console.log(`players roll is: ${playersRoll}`); 
                        setTimeout(function () {
                            heading.textContent = 'Instant Win!'
                        }, 2000);
                        roundWinner = 'user';
                        updateBankRolls('user', piggyBankValue);
                        endGame();
                        setTheStakes();
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        heading.textContent = `You rolled a ${playersRoll}`;
                        console.log(`${playersRoll}`);
                        setTimeout(function () {
                            heading.textContent = 'Instant Loss!'
                        }, 2000);
                        setTimeout(function () {
                            heading.textContent = 'Computer Wins this round!';
                        }, 2000);
                        roundWinner = 'computer';
                        updateBankRolls('computer', piggyBankValue);
                        endGame();
                        setTheStakes();
                        return true;
                    }
                }
            }

            return false;

        } else if (player === 'computer') {
                if (playerRollOutcome) {
                    if (playersRoll) {
                        if (playerRollOutcome === 'instant-win') {
                            setTimeout( function () {
                                heading.textContent = `Computer rolled a ${playersRoll}`;
                                console.log(`Computer rolled a ${playersRoll}`)                                
                            }, 2000); 
                        }
                        setTimeout(function () {
                            heading.textContent = 'Instant Win!';
                        }, 2000);
                        setTimeout(function () {
                            heading.textContent = 'Computers wins this round!';
                        }, 2000); 
                        roundWinner = 'computer';
                        updateBankRolls('computer', piggyBankValue);
                        endGame();
                        setComputerStakes();
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        setTimeout(function () {
                            heading.textContent = `Computer rolled a ${playersRoll}`;
                        }, 2000);                        
                        setTimeout(function () {
                            heading.textContent = 'Instant Loss!';
                        }, 2000);
                        setTimeout(function () {
                            heading.textContent = 'You Win this round!';
                        }, 2000);
                        roundWinner = 'user';
                        updateBankRolls('user', piggyBankValue);
                        endGame();
                        setComputerStakes();
                        return true;
                    }
                }

            }

                return false;


    }





    function userTurn() {

        console.log("Its users turn");

        do {
            userDiceRolls = userRollDice();
            userRollOutcome = checkRoll(userDiceRolls, 'user');
        } while (userRollOutcome === '');

        if (checkInstantWinOrLoss(userRollOutcome, userDiceRolls, 'user')) {
            return;
        }

        heading.textContent = `You rolled a ${userDiceRolls}`;

        console.log(userDiceRolls);

        currentPlayer = 'computer';
        console.log(`UsersTurn is returning: ${userRollOutcome}`);
        runGame();
        return userRollOutcome;


    }

    function computerTurn() {

        console.log("Its computers turn");

        do {
            computerDiceRolls = computerRollDice();
            computerRollOutcome = checkRoll(computerDiceRolls, 'computer');
        } while (computerRollOutcome === '');

        if (checkInstantWinOrLoss(computerRollOutcome, computerDiceRolls, 'computer')) {
            return;
        } else {
            heading.textContent = `Computer rolled a ${computerDiceRolls}`;
            console.log(computerDiceRolls);
            currentPlayer = 'user';
            console.log(`computersTurn is returning: ${computerRollOutcome}`);
            runGame();
        }

        return computerRollOutcome;
    }

    function endGame() {
        console.log("Your in end game");
    }

    function runGame() {

        console.log(currentPlayer);

        circle.removeEventListener('click', runGame)

        if (roundWinner !== null) {
            return;
        }

        if (currentPlayer === 'user') {
            if (userRollOutcome === undefined) {
                setTimeout(function () {
                    userTurn();
                    // return userRollOutcome; 
                }, 2000);
            }
        }

        if (currentPlayer === 'computer') {
            if (computerRollOutcome === undefined) {
                setTimeout(function () {
                    computerTurn();
                    // return computerRollOutcome; 
                }, 2000);
            }
        }


        if (userRollOutcome !== undefined && computerRollOutcome !== undefined) {
            setTimeout(function () {
                determineWinner(userRollOutcome, computerRollOutcome);
            }, 1000);

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

    function newRound(winner) {
        //if either players bankroll is at 0, other player wins

        // circle.removeEventListener('click', )

        if (roundWinner === 'user') {
            setTheStakes();
        }

        if (roundWinner === 'computer') {
            setComputerStakes();
        }


    }

    //create function for checking winner of rounds

    function determineWinner(userRollOutcome, computerRollOutcome) {

        console.log(`determineWinner computerRollOutcome is ${computerRollOutcome}`);
        console.log(`determineWinner userRollOutcome is ${userRollOutcome}`);

        console.log("You're in determineWinner");

        setTimeout(function () {

            //Check for instant-wins and losses
            // if (userRollOutcome === 'instant-win' || computerRollOutcome === 'instant-loss') {
            //     updateBankRolls('user', piggyBankInput.value);
            //     heading.textContent = "You win this round!";
            //     roundWinner = 'user';
            //     endGame()
            //     setTheStakes();
            // } else if (computerRollOutcome === 'instant-win' || userRollOutcome === 'instant-loss') {
            //     updateBankRolls('computer', piggyBankInput.value);
            //     heading.textContent = "Computer wins this round!";
            //     roundWinner = 'computer';
            //     endGame()
            //     setComputerStakes();
            // } else {


            //Check if outcomes are null and use .split on strings if not 

            console.log(`User roll outcome before split: ${userRollOutcome}`);
            console.log(`Computer roll outcome before split: ${computerRollOutcome}`);

            let userPairValue = (typeof userRollOutcome === 'string' && userRollOutcome) ? parseInt(userRollOutcome.split(' ')[0]) : null;
            let computerPairValue = (typeof computerRollOutcome === 'string' && computerRollOutcome) ? parseInt(computerRollOutcome.split(' ')[0]) : null;

            console.log(`Users pair value is ${userPairValue}`);
            console.log(`Computers pair value is ${computerPairValue}`);

            if (userPairValue !== null && computerPairValue !== null) {
                //Isolate single point for user and computer roll 
                let userPoint = parseInt(userRollOutcome.split('')[2]);
                let computerPoint = parseInt(computerRollOutcome.split('')[2]);

                console.log(`Users point is ${userPoint}`);
                console.log(`computers point is ${computerPoint}`);

                if (userPairValue === computerPairValue) {
                    if (userPoint === computerPoint) {
                        heading.textContent = "It's a tie!";
                        console.log("Its a tie");
                    } else if (userPoint > computerPoint) {
                        heading.textContent = "You win this round!";
                        roundWinner = 'user';
                        console.log("You win");
                        endGame()
                        setTheStakes();
                    } else if (computerPoint > userPoint) {
                        heading.textContent = "Computer wins this round";
                        roundWinner = 'computer';
                        console.log("Computer wins");
                        endGame()
                        setComputerStakes();
                    }
                    if (userPairValue !== computerPairValue) {
                        if (userPoint > computerPoint) {
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            endGame()
                            setTheStakes();
                        } else if (computerPoint > userPoint) {
                            heading.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            console.log("Computer wins");
                            endGame()
                            setComputerStakes();
                        }
                    }

                }

            }

            // }

        }, 2000);

    }

});