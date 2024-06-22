//Function for screen on loading
document.addEventListener('DOMContentLoaded', function () {


    let userDiceRolls = [];
    let computerDiceRolls = [];
    let userRollOutcome;
    let computerRollOutcome;
    let currentPlayer = 'user';
    let roundWinner = null;
    let banker;

    //hide piggy-bank and score area on screen onload
    let scoreArea = document.getElementById('score-area');
    scoreArea.style.display = 'none';
    let piggyBank = document.getElementById('piggy-bank-container');
    piggyBank.style.display = 'none';

    //increase size of main section to take up surplas space on screen on load
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

        piggyBankValue = 0;

        heading.textContent = "Click for high roll";

        //Remove left and right dice to display sole dice for high roll

        highRollDiceDisplay();

        circle.removeEventListener('click', clickToStart);

        circle.addEventListener('click', highRoll);

    }

    function reStartGame() {

        circle.removeEventListener('click', reStartGame);

        banker = null;
        roundWinner = null;

        let bankRollUserValue = parseInt(bankRollUser.value);
        bankRollUserValue = 500;
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        bankRollComputerValue = 500;
        piggyBankValue = 0;

        //update DOM elements with new values
        bankRollUser.value = bankRollUserValue;
        bankRollComputer.value = bankRollComputerValue;
        piggyBankInput.value = piggyBankValue;

        let diceTwo = document.getElementById('die2');
        diceTwo.style.display = 'inline-flex'; 

        clickToStart();


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

        let diceTwo = document.getElementById('die2');

        let diceTwoChange = diceTwo.querySelector('.die');
        if (diceTwoChange) {
            diceTwoChange.classList.add('fa-spin');
        } else {
            console.log("die2 not found");
        }

        let num1;
        let num2;

        do {
            num1 = rollDice();
            num2 = rollDice();
        } while (num1 === num2);

        heading.textContent = "Rolling";

        //Users high roll 

        setTimeout(function () {
            updateDieFace(diceTwoChange, num1);
        }, 1000);

        setTimeout(function () {
            heading.textContent = `You rolled a ${num1}`;
        }, 2000);

        //Computers high roll 

        setTimeout(function () {
            if (diceTwoChange) {
                diceTwoChange.classList.add('fa-spin');
                heading.textContent = "Computer Rolling";
            }
        }, 3000);

        setTimeout(function () {
            updateDieFace(diceTwoChange, num2);
            heading.textContent = `Computer rolled a ${num2}`;
        }, 4000);

        setTimeout(function () {
            ;
            if (num1 > num2) {
                threeDiceNoDisplay();
                heading.textContent = "You're the banker";
                currentPlayer = 'user';
                diceTwoChange.classList.remove('fa-spin');
                diceTwoChange.classList.remove('fa-beat');
                setTheStakes();
            } else {
                threeDiceNoDisplay();
                heading.textContent = "Computer is the banker";
                diceTwoChange.classList.remove('fa-spin');
                diceTwoChange.classList.remove('fa-beat');
                currentPlayer = 'computer';
                setComputerStakes();
            }
        }, 5000);


        let highRollResult = [num1, num2];

        return highRollResult;

    }

    function highRollDiceDisplay() {

        let diceOne = document.getElementById('die1');
        diceOne.style.display = 'none';
        let diceThree = document.getElementById('die3');
        diceThree.style.display = 'none';

        let diceTwo = document.getElementById('die2');

        let diceTwoChange = diceTwo.querySelector('.die');
        if (diceTwoChange) {
            diceTwoChange.classList.add('fa-beat');
        }

        return;

    }


    function updateDieFace(dice, number) {
        //template literal to update dice face for high roll result
        //[number - 1] to select correct dice face

        if (number >= 1 && number <= 6) {
            dice.className = `fa-solid fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][number - 1]} die`;
        } else {
            console.log('Invalid dice number:', number);
        }

    }

    function setTheStakes() {

        console.log("You're in user stakes");

        banker = 'user';

        let increaseStakesButton = document.getElementById('increase-stakes');

        setTimeout(function () {
            threeDiceNoDisplay();
            heading.textContent = `Set the stakes`;
        }, 2000);

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



        // if (!roundWinner) {
        //     setTimeout(function () {
        //         threeDiceNoDisplay();
        //         heading.textContent = "Click to begin";
        //         currentPlayer = 'user';
        //         circle.addEventListener('click', runGame);
        //     }, 2000);
        // } else {
            setTimeout(function () {
                threeDiceBounceDisplay();
                heading.textContent = "Click to roll";
                currentPlayer = 'user';
                circle.addEventListener('click', userTurn);
            }, 2000);
        // }

    }

    function setComputerStakes() {

        roundWinner = null;

        banker = 'computer';

        console.log("You're in computer stakes");

        let multiplier = Math.floor(Math.random() * 5) + 1;
        let computerStakes = multiplier * 100;

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);

        setTimeout(function () {
            threeDiceNoDisplay();
            heading.textContent = "Computer setting stakes";
        }, 1000);

        setTimeout(function () {

            if (computerStakes > bankRollUserValue) {
                computerStakes = bankRollUserValue;
            }
            threeDiceNoDisplay();
            heading.innerText = `The stakes are ${computerStakes}`;
            bankRollComputerValue -= computerStakes;
            bankRollUserValue -= computerStakes;
            bankRollComputer.value = bankRollComputerValue;
            bankRollUser.value = bankRollUserValue;

            piggyBankInput.value = computerStakes * 2;
        }, 2000);


        setTimeout(function () {
            currentPlayer = 'computer';
            runGame();
        }, 3000);

        console.log(`SetComputerStakes bankRollUserValue is ${bankRollUserValue}`);
        console.log(`SetComputerStakes bankRollComputerValue is ${bankRollComputerValue}`);
        console.log(`SetComputerStakes piggBankValueis ${piggyBankInput.value}`);

        return computerStakes;

    }

    function threeDiceNoDisplay() {

        let diceOne = document.getElementById('die1');
        let diceTwo = document.getElementById('die2');
        let diceThree = document.getElementById('die3');

        diceOne.style.display = 'none';
        diceTwo.style.display = 'none';
        diceThree.style.display = 'none';

    }

    function threeDiceBounceDisplay() {

        let diceOne = document.getElementById('die1');
        let diceTwo = document.getElementById('die2');
        let diceThree = document.getElementById('die3');

        //Unhide the parent div to see icon

        if (diceOne) {
            diceOne.style.display = 'inline-flex';
            diceOne.style.transform = 'rotate(0deg)';
        } else {
            console.log('die1 element not found');
        }

        if (diceTwo) {
            diceTwo.style.display = 'inline-flex';
        }

        if (diceThree) {
            diceThree.style.display = 'inline-flex';
            diceThree.style.transform = 'rotate(0deg)';
        } else {
            console.log('die element not found');
        }

        //Change to beating dice

        let diceOneChange = diceOne.querySelector('.die');
        let diceTwoChange = diceTwo.querySelector('.die');
        let diceThreeChange = diceThree.querySelector('.die');

        if (diceOneChange) {
            diceOneChange.style.display = 'inline-flex';
            diceOneChange.classList.add('fa-beat');
        } else {
            console.log('die1 i not found');
        }

        if (diceTwoChange) {
            diceTwoChange.style.display = 'inline-flex';
            diceTwoChange.classList.add('fa-beat');
        } else {
            console.log('die2 i not found');
        }

        if (diceThreeChange) {
            diceThreeChange.style.display = 'inline-flex';
            diceThreeChange.classList.add('fa-beat');
        } else {
            console.log('die3 not found');
        }

    }

    function threeDiceSpinningDisplay() {


        let diceOne = document.getElementById('die1');
        let diceTwo = document.getElementById('die2');
        let diceThree = document.getElementById('die3');

        //Unhide the parent div to see icon
        if (diceOne) {
            diceOne.style.display = 'inline-flex';
            diceOne.style.transform = 'rotate(0deg)';
        } else {
            console.log('die1 element not found');
        }

        if (diceTwo) {
            diceTwo.style.display = 'inline-flex';
        }

        if (diceThree) {
            diceThree.style.display = 'inline-flex';
            diceThree.style.transform = 'rotate(0deg)';
        } else {
            console.log('die element not found');
        }

        //Change to spinning dice

        let diceOneChange = diceOne.querySelector('.die');
        let diceTwoChange = diceTwo.querySelector('.die');
        let diceThreeChange = diceThree.querySelector('.die');

        if (diceOneChange) {
            diceOneChange.style.display = 'inline-flex';
            diceOneChange.classList.add('fa-spin');
        } else {
            console.log('die1 i not found');
        }

        if (diceTwoChange) {
            diceTwoChange.style.display = 'inline-flex';
            diceTwoChange.classList.add('fa-spin');
        } else {
            console.log('die2 i not found');
        }

        if (diceThreeChange) {
            diceThreeChange.style.display = 'inline-flex';
            diceThreeChange.classList.add('fa-spin');
        } else {
            console.log('die3 not found');
        }
    }


    function updateBankRolls(winner, piggyBankValue) {

        threeDiceNoDisplay();

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

        console.log(`DW playerRoll is: ${playersRoll}`);
        console.log("DW playerRoll is:", typeof playersRoll);

        console.log("You're in instantWinOrLoss");

        if (player === 'user') {
            if (playerRollOutcome) {
                if (playersRoll) {
                    if (playerRollOutcome === 'instant-win') {
                        roundWinner = 'user';
                        banker = 'user';
                        setTimeout(function () {
                            updateDiceFace(playersRoll);
                            heading.textContent = `You rolled a ${playersRoll}`;
                        }, 2000);
                        console.log(`${playersRoll}`);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.textContent = 'Instant Win!';
                        }, 3000);
                        setTimeout(function () {
                            heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                            updateBankRolls('user', piggyBankValue);
                        }, 4000);
                        setTimeout(function () {
                            newRound('user');
                        }, 5000);
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        roundWinner = 'computer';
                        banker = 'computer';
                        setTimeout(function () {
                            updateDiceFace(playersRoll);
                            heading.textContent = `You rolled a ${playersRoll}`;
                        }, 2000);
                        console.log(`${playersRoll}`);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.textContent = 'Instant Loss!';
                        }, 3000);
                        setTimeout(function () {
                            heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                            updateBankRolls('computer', piggyBankValue);
                        }, 4000);
                        setTimeout(function () {
                            newRound('computer');
                        }, 5000);
                        return true;
                    }
                }
            }
            return false;
        } else if (player === 'computer') {
            if (playerRollOutcome) {
                if (playersRoll) {
                    if (playerRollOutcome === 'instant-win') {
                        roundWinner = 'computer';
                        banker = 'computer';
                        setTimeout(function () {
                            updateDiceFace(playersRoll);
                            heading.textContent = `Computer rolled a ${playersRoll}`;
                        }, 2000);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.textContent = 'Instant Win!';
                        }, 3000);
                        setTimeout(function () {
                            heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                            updateBankRolls('computer', piggyBankValue);
                        }, 4000);
                        setTimeout(function () {
                            newRound('computer');
                        }, 5000);
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        threeDiceNoDisplay();
                        roundWinner = 'user';
                        banker = 'user';
                        setTimeout(function () {
                            updateDiceFace(playersRoll);
                            heading.textContent = `Computer rolled a ${playersRoll}`;
                        }, 2000);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.textContent = 'Instant Loss!';
                        }, 3000);
                        setTimeout(function () {
                            heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                            updateBankRolls('user', piggyBankValue);
                        }, 4000);
                        setTimeout(function () {
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
            threeDiceSpinningDisplay();
            heading.textContent = "Rolling";
        }, 1000);

        do {
            userDiceRolls = userRollDice();
            userRollOutcome = checkRoll(userDiceRolls, 'user');
        } while (userRollOutcome === '');

        if (checkInstantWinOrLoss(userRollOutcome, userDiceRolls, 'user')) {
            return;
        } else {
            setTimeout(function () {
                threeDiceSpinningDisplay();
                console.log(typeof userRollOutcome);
                console.log(typeof userDiceRolls);
                heading.textContent = `You rolled a ${userDiceRolls}`;
                currentPlayer = 'computer';
                console.log(`UsersTurn is returning: ${userRollOutcome}`);
                updateDiceFace(userRollOutcome);
                runGame();
            }, 3000);

        }

        return userRollOutcome;

    }

    function computerTurn() {

        // let diceOne = document.getElementById('die1');
        // let diceTwo = document.getElementById('die2');
        // let diceThree = document.getElementById('die3');

        // let diceOneChange = diceOne.querySelector('.die');
        // let diceTwoChange = diceTwo.querySelector('.die');
        // let diceThreeChange = diceThree.querySelector('.die');

        console.log("Its computers turn");

        setTimeout(function () {
            threeDiceSpinningDisplay();
            heading.textContent = "Computer Rolling";
            // diceOneChange.classList.add('fa-spin');
            // diceTwoChange.classList.add('fa-spin');
            // diceThreeChange.classList.add('fa-spin');
        }, 2000);

        do {
            computerDiceRolls = computerRollDice();
            computerRollOutcome = checkRoll(computerDiceRolls, 'computer');
        } while (computerRollOutcome === '');


        setTimeout(function () {

            if (checkInstantWinOrLoss(computerRollOutcome, computerDiceRolls, 'computer')) {
                updateDiceFace(computerRollOutcome);
                return;
            } else {
                heading.textContent = `Computer rolled a ${computerDiceRolls}`;
                console.log(computerDiceRolls);
                currentPlayer = 'user';
                console.log(`computersTurn is returning: ${computerRollOutcome}`);
                updateDiceFace(computerRollOutcome);
                setTimeout(function () {
                    runGame();
                }, 4000);
            }
        }, 3000);

        return computerRollOutcome;
    }

    function updateDiceFace(roll) {

        console.log("playerRoll Received:", typeof roll);

        //Check if roll is an array and if so convert to string 
        
        if (Array.isArray(roll)) {
            roll = roll.join('');
        }

        console.log(roll);

        //Find the elements

        let diceOne = document.getElementById('die1').querySelector('.die');
        let diceTwo = document.getElementById('die2').querySelector('.die');
        let diceThree = document.getElementById('die3').querySelector('.die');

        //remove spaces from string so die vars parse correctly

        roll = roll.replace(/\s+/g, '');

        if (typeof roll === 'string' && roll.length) {
            console.log('updateDiceFace - Parsing dice faces:');

            let die1 = parseInt(roll[0]);
            let die2 = parseInt(roll[1]);
            let die3 = parseInt(roll[2]);

            console.log('Dice 1:', die1);
            console.log('Dice 2:', die2);
            console.log('Dice 3:', die3);

            if (!isNaN(die1) && die1 >= 1 && die1 <= 6 &&
                !isNaN(die2) && die2 >= 1 && die2 <= 6 &&
                !isNaN(die3) && die3 >= 1 && die3 <= 6) {
                updateDieFace(diceOne, die1);
                updateDieFace(diceTwo, die2);
                updateDieFace(diceThree, die3);

            } else {
                console.log("updateDiceFace - One or more parsed dice faces are invalid");
            }
        } else {
            console.log("updateDiceFace -Invalid roll format:", roll);
        }


    }

    function endGame() {


        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value)

        if (bankRollUserValue === 0) {
            setTimeout(function () {
                heading.textContent = "You Loose";
            }, 2000);
            setTimeout(function () {
                heading.textContent = "Play Again?";
                circle.addEventListener('click', reStartGame);
            }, 3000);
        } else if (bankRollComputerValue === 0) {
            setTimeout(function () {
                heading.textContent = "You Win!";
            }, 2000);
            setTimeout(function () {
                heading.textContent = "Play Again?";
                circle.addEventListener('click', reStartGame);
            }, 3000);
        }

    }

    function runGame() {

        console.log("Your in runGame");

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
                    threeDiceBounceDisplay();
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

        console.log('You\re in newRound');

        // console.log(`roundWinner is: ${roundWinner}`);

        userRollOutcome = undefined;
        computerRollOutcome = undefined;

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        let piggyBankValue = parseInt(piggyBankInput.value);

        // heading.textContent = `${roundWinner} wins ${piggyBankValue}`;



        if (bankRollUserValue <= 0 || bankRollComputerValue <= 0) {
            if (bankRollUserValue <= 0) {
                //Call end game function with computer as argument
                setTimeout(function () {

                    endGame('computer');
                }, 1000);


            } else if (bankRollComputerValue <= 0) {
                //Call endGame function with user as argument 
                setTimeout(function () {
                    endGame('user');
                }, 1000);
            }
        } else {
            if (roundWinner === 'user') {
                setTimeout(function () {
                    heading.textContent = "New Round";
                    setTheStakes();
                }, 2000);
            } else if (roundWinner === 'computer') {
                setTimeout(function () {
                    heading.textContent = "New Round";
                    setComputerStakes();
                }, 2000);

            }
        }

    }

    function itsATie() {

        userRollOutcome = undefined;
        computerRollOutcome = undefined;
        roundWinner = undefined;
        userDiceRolls = undefined;
        computerDiceRolls = undefined;

        setTimeout(function () {
            heading.textContent = "Roll Again";
        }, 2000);

        if (banker) {
            if (banker === 'user') {
                currentPlayer = 'user';
                setTimeout(function () {
                    heading.textContent = "You roll first";
                }, 3000);
                setTimeout(function () {
                    heading.textContent = "Click to roll";
                    circle.addEventListener('click', startUserTurn);
                }, 4000);

            } else if (banker === 'computer') {
                setTimeout(function () {
                    heading.textContent = "Computer Rolls first";
                }, 3000);
                setTimeout(function () {
                    currentPlayer = 'computer';
                    runGame();
                }, 4000);
            }
        }
    }

    //create function for checking winner of rounds

    function determineWinner(userRollOutcome, computerRollOutcome) {

        console.log(`determineWinner computerRollOutcome is ${computerRollOutcome}`);
        console.log(`determineWinner userRollOutcome is ${userRollOutcome}`);

        let piggyBankValue = parseInt(piggyBankInput.value);

        console.log("You're in determineWinner");

        setTimeout(function () {

            console.log(`User roll outcome before split: ${userRollOutcome}`);
            console.log(`Computer roll outcome before split: ${computerRollOutcome}`);


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
                        itsATie();
                    } else if (userPoint > computerPoint) {
                        heading.textContent = "You win this round!";
                        roundWinner = 'user';
                        banker = 'user';
                        setTimeout(function () {
                            heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                            updateBankRolls('user', piggyBankValue);
                        }, 1000);
                        setTimeout(function () {
                            newRound('user');
                        }, 2000);
                    } else {
                        heading.textContent = "Computer wins this round";
                        roundWinner = 'computer';
                        banker = 'computer';
                        console.log("Computer wins");
                        setTimeout(function () {
                            heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                            updateBankRolls('computer', piggyBankValue);
                        }, 1000);
                        setTimeout(function () {
                            newRound('computer');
                        }, 2000);
                    }
                } else {
                    // If the pair values are not equal
                    if (userPoint === computerPoint) {
                        //If the points are equal, compare the pair values
                        if (userPairValue > computerPairValue) {
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            banker = 'user';
                            setTimeout(function () {
                                heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                                updateBankRolls('user', piggyBankValue);
                            }, 1000);
                            newRound('user');
                        } else {
                            heading.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            banker = 'computer';
                            console.log("Computer wins");
                            setTimeout(function () {
                                heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                                updateBankRolls('computer', piggyBankValue);
                            }, 1000);
                            setTimeout(function () {
                                newRound('computer');
                            }, 2000);
                        }
                    } else {
                        //If points are not equal, the higher point wins
                        if (userPoint > computerPoint) {
                            heading.textContent = "You win this round!";
                            roundWinner = 'user';
                            banker = 'user';
                            setTimeout(function () {
                                heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                                updateBankRolls('user', piggyBankValue);
                            }, 1000);
                            setTimeout(function () {
                                newRound('user');
                            }, 2000);
                        } else {
                            heading.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            banker = 'computer';
                            console.log("Computer wins");
                            setTimeout(function () {
                                heading.textContent = `${roundWinner} wins ${piggyBankValue}`;
                                updateBankRolls('computer', piggyBankValue);
                            }, 1000);
                            setTimeout(function () {
                                newRound('computer');
                            }, 2000);
                        }

                    }
                }
            }

        }, 2000);

    }

});