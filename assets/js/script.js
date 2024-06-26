//Function for screen on loading
document.addEventListener('DOMContentLoaded', function () {

    let rulesLogo = document.getElementById('rules-logo');
    let rulesLogoOverlay = document.getElementById('rules-logo-overlay');
    let rulesOverlay = document.getElementById('rules-overlay');

    rulesLogo.classList.add('pulse');

    //Click dice in top left to read game rules
    rulesLogo.addEventListener('click', function () {

        rulesLogo.classList.remove('pulse');

        rulesLogoOverlay.classList.add('pulse');
        if (rulesOverlay.style.display === 'flex') {
            rulesOverlay.style.display = 'none';
        } else {
            rulesOverlay.style.display = 'flex';
        }
    });

    //Click to remove rules
    rulesLogoOverlay.addEventListener('click', function () {
        if (rulesOverlay.style.display === 'flex') {
            rulesOverlay.style.display = 'none';
        }
    });

    //Global variables to help with gameflow management
    let userDiceRolls = [];
    let computerDiceRolls = [];
    let userRollOutcome;
    let computerRollOutcome;
    let currentPlayer = 'user';
    let roundWinner = null;
    let banker;
    let mainSection = document.getElementById('main-section');
    let piggyBankContainer = document.getElementById('piggy-bank-container');

    //Hide on screen onload
    if (window.innerWidth <= 425) {
        piggyBankContainer.style.display = "none";
    } else {
        piggyBankContainer.style.display = 'flex';
    }

    //Global variables for display and updating user with game information 
    let circle = document.getElementById('main-section-circle');
    let heading = document.getElementById('h1-large-screens');
    let headingSmall = document.getElementById('h1-small-screens');

    //Global variables for updating bank rolls and piggy bank
    let bankRollUser = document.getElementById('bank-roll-user');
    let bankRollComputer = document.getElementById('bank-roll-computer');
    let piggyBankInput = document.getElementById('piggy-bank-input');

    circle.addEventListener('click', clickToStart);

    function clickToStart() {

        piggyBankContainer.style.display = 'flex';

        //Set piggy bank to 0 
        let piggyBankValue = parseInt(piggyBankInput.value);
        piggyBankValue = 0;

        //Initialize styles for headings
        heading.style.top = '33%';
        headingSmall.style.top = '33%';
        heading.textContent = "Click for high roll";
        headingSmall.textContent = "Click for high roll";

        //Remove left and right dice to display one die for high roll
        highRollDiceDisplay();

        //Add event Listener to start the high roll and begin game 
        circle.removeEventListener('click', clickToStart);
        circle.removeEventListener('click', highRoll);
        circle.addEventListener('click', highRoll);
    }


    /*reStartGame resets the game to its initial state
     *This function re-displays the the second die for the high roll and removes event listeners,
     *resets game values, updates the DOM elements with new values, hides other dice,
     *and then calls clickToStart to reininialize the game interface
     */
    function reStartGame() {

        let diceTwo = document.getElementById('die2');
        diceTwo.style.display = 'inline-flex';

        circle.removeEventListener('click', reStartGame);
        mainSection.removeEventListener('click', reStartGame);

        banker = null;
        roundWinner = null;

        let bankRollUserValue = parseInt(bankRollUser.value);
        bankRollUserValue = 500;
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        bankRollComputerValue = 500;
        let piggyBankValue = parseInt(piggyBankInput.value);
        piggyBankValue = 0;

        //update DOM elements with new values
        bankRollUser.value = bankRollUserValue;
        bankRollComputer.value = bankRollComputerValue;
        piggyBankInput.value = piggyBankValue;

        //remove other two dice for high roll
        let diceOne = document.getElementById('die1');
        let diceThree = document.getElementById('die3');
        diceOne.style.display = 'none';
        diceThree.style.display = 'none';

        clickToStart();

    }

    //rollDice to generate a random number between 1 and 6
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    //rollThreeDice to return an array of three random numbers
    function rollThreeDice() {
        return [rollDice(), rollDice(), rollDice()];
    }

    //Rolls three dice for user
    function userRollDice() {
        return rollThreeDice();
    }

    //Rolls three dice for computer
    function computerRollDice() {
        return rollThreeDice();
    }

    /*Executes the highRoll to start the game
     *This funciton handles the rolling of the dice for the players
     *and updates the display tp show the rolling process and the results, 
     *then determines who is the banker
     */
    function highRoll() {

        circle.removeEventListener('click', highRoll);

        let diceTwo = document.getElementById('die2');
        let diceTwoChange = diceTwo.querySelector('.die');

        if (diceTwoChange) {
            diceTwoChange.classList.add('fa-spin');
        }

        let num1;
        let num2;

        do {
            num1 = rollDice();
            num2 = rollDice();
        } while (num1 === num2);

        heading.style.top = '33%';
        headingSmall.style.top = '25%';
        heading.textContent = "Rolling";
        headingSmall.textContent = "Rolling";

        startSpinningBorder(circle);
        startBlinking(heading);
        startBlinking(headingSmall);

        //Users high roll 
        setTimeout(function () {
            updateDieFace(diceTwoChange, num1);
        }, 1000);

        setTimeout(function () {
            stopSpinningBorder(circle);
            stopBlinking(heading);
            stopBlinking(headingSmall);
        }, 2000);

        setTimeout(function () {
            diceTwo.style.display = 'none';
            heading.style.top = '45%';
            headingSmall.style.top = '45%';
            heading.innerHTML = `You rolled <span class="big-text">${num1}</span>`;
            headingSmall.innerHTML = `You rolled <span class="big-text">${num1}</span>`;
        }, 3000);

        //Computers high roll 
        setTimeout(function () {
            if (diceTwoChange) {
                diceTwo.style.display = 'inline-flex';
                diceTwoChange.classList.add('fa-spin');
                startSpinningBorder(circle);
                startBlinking(heading);
                startBlinking(headingSmall);
                heading.style.top = '33%';
                headingSmall.style.top = '25%';
                heading.textContent = "Computer Rolling";
                headingSmall.textContent = "Computer Rolling";
            }
        }, 4000);

        setTimeout(function () {
            updateDieFace(diceTwoChange, num2);
            stopSpinningBorder(circle);
            stopBlinking(heading);
            stopBlinking(headingSmall);
        }, 5000);

        setTimeout(function () {
            heading.style.top = '45%';
            headingSmall.style.top = '45%';
            diceTwo.style.display = 'none';
            heading.innerHTML = `Computer rolled <span class="big-text">${num2}</span>`;
            headingSmall.innerHTML = `Computer rolled <span class="big-text">${num2}</span>`;
        }, 6000);

        setTimeout(function () {
            if (num1 > num2) {
                threeDiceNoDisplay();
                heading.textContent = "You're the banker";
                headingSmall.textContent = "You're the banker";
                currentPlayer = 'user';
                diceTwoChange.classList.remove('fa-spin');
                diceTwoChange.classList.remove('fa-beat');
                setTheStakes();
            } else {
                threeDiceNoDisplay();
                heading.textContent = "Computer is the banker";
                headingSmall.textContent = "Computer is the banker";
                diceTwoChange.classList.remove('fa-spin');
                diceTwoChange.classList.remove('fa-beat');
                currentPlayer = 'computer';
                setComputerStakes();
            }
        }, 7000);

        let highRollResult = [num1, num2];

        return highRollResult;
    }

    /* Configures the display for the highRoll,
     * Hides the first and third dice, and adds a beating class
     * to the second die whil removin any spinning class if it exists
     */
    function highRollDiceDisplay() {

        let diceOne = document.getElementById('die1');
        diceOne.style.display = 'none';
        let diceThree = document.getElementById('die3');
        diceThree.style.display = 'none';

        let diceTwo = document.getElementById('die2');

        let diceTwoChange = diceTwo.querySelector('.die');
        if (diceTwoChange) {
            diceTwoChange.classList.add('fa-beat');
            if (diceTwoChange.classList.contains('fa-spin')) {
                diceTwoChange.classList.remove('fa-spin');
            }
        }
        return;
    }

    /* UpdateDieFace updates the die face to matach the specified number. 
     * This function changes the class name of the die element to reflect the correct
     * face based on the number provided
     */
    function updateDieFace(dice, number) {
        //template literal to update dice face for high roll result
        //[number - 1] to select correct dice face

        if (number >= 1 && number <= 6) {
            dice.className = `fa-solid fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][number - 1]} die`;
        } else {}
    }

    /*Set's the stakes for the user.
     * This function updates the banker to 'user and displays in the heading,
     * and sets up the event lister on the increase stakes button to increase the stakes.
     */
    function setTheStakes() {

        banker = 'user';

        let increaseStakesButton = document.getElementById('increase-stakes');

        setTimeout(function () {
            threeDiceNoDisplay();
            heading.style.top = '45%';
            headingSmall.style.top = '45%';
            heading.textContent = `Set the stakes`;
            headingSmall.textContent = `Set the stakes`;
        }, 2000);

        increaseStakesButton.addEventListener('click', updateStakes);

        startPulsing(increaseStakesButton);
    }

    /*updateStakes updates the stakes when the user increases them,
     * handles the deducting og the stakes from the usrs and computers
     * bankrolls, updates the piggy bank value, and sets up the users
     * turn to roll.
     */
    function updateStakes() {

        let increaseStakesButton = document.getElementById('increase-stakes');

        stopPulsing(increaseStakesButton);

        let userStakes = 100;
        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);
        let piggyBankContainer = document.getElementById('piggy-bank-container');

        piggyBankContainer.classList.remove('pop');

        if (bankRollUserValue >= userStakes && bankRollComputerValue >= userStakes) {
            bankRollUserValue -= userStakes;
            bankRollComputerValue -= userStakes;
            bankRollUser.value = bankRollUserValue;
            bankRollComputer.value = bankRollComputerValue;

            let totalStakes = userStakes * 2;

            piggyBankInput.value = parseInt(piggyBankInput.value) + totalStakes;

            setTimeout(function () {
                piggyBankContainer.classList.add('pop');
            }, 5);
        } else {
            heading.textContent = "Insuffient funds";
        }

        threeDiceBounceDisplay();
        heading.style.top = '33%';
        headingSmall.style.top = '25%';
        heading.textContent = "Click to roll";
        headingSmall.textContent = "Click to roll";
        currentPlayer = 'user';
        circle.removeEventListener('click', userTurn);
        circle.addEventListener('click', userTurn);
    }

    /* Sets the stakes for the computer.
     * Randomly detemermines the computers stakes,
     * updates the bankrolls and piggy bank, displays
     * appropriate heading, and sets up for computer
     * to roll. 
     */
    function setComputerStakes() {

        roundWinner = null;

        banker = 'computer';

        let multiplier = Math.floor(Math.random() * 5) + 1;
        let computerStakes = multiplier * 100;

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);

        let piggyBankContainer = document.getElementById('piggy-bank-container');

        setTimeout(function () {
            threeDiceNoDisplay();
            heading.style.top = '45%';
            headingSmall.style.top = '45%';
            heading.textContent = "Computer setting stakes";
            headingSmall.textContent = "Computer setting stakes";
        }, 1000);

        setTimeout(function () {
            if (computerStakes > bankRollUserValue) {
                computerStakes = bankRollUserValue;
            }

            threeDiceNoDisplay();
            piggyBankContainer.classList.add('pop');
            heading.style.top = '45%';
            headingSmall.style.top = '45%';
            heading.innerHTML = `The stakes are <span class="big-text">$${computerStakes}</span>`;
            headingSmall.innerHTML = `The stakes are <span class="big-text">$${computerStakes}</span>`;
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

        return computerStakes;
    }

    /* Initiates the user's turn by removing the click event listener
     * and calling the user turn function. 
     */
    function startUserTurn() {
        circle.removeEventListener('click', startUserTurn);
        userTurn();
    }

    /*Executes the users turn in the game
     * Handles dice rolling, determining their
     * turns outcome, UI updates, and switches to
     * the computers turn. 
     */
    function userTurn() {

        roundWinner = null;

        circle.removeEventListener('click', userTurn);

        threeDiceSpinningDisplay();
        startSpinningBorder(circle);
        startBlinking(heading);
        startBlinking(headingSmall);
        heading.style.top = '33%';
        headingSmall.style.top = '25%';
        heading.textContent = "Rolling";
        headingSmall.textContent = "Rolling";

        setTimeout(function () {
            stopSpinningBorder(circle);
            stopBlinking(heading);
            stopBlinking(headingSmall);

            do {
                userDiceRolls = userRollDice();
                userRollOutcome = checkRoll(userDiceRolls, 'user');
            } while (userRollOutcome === '');

            if (checkInstantWinOrLoss(userRollOutcome, userDiceRolls, 'user')) {
                return;
            }

            updateDiceFace(userRollOutcome);

            setTimeout(function () {
                threeDiceNoDisplay();
                heading.style.top = '45%';
                headingSmall.style.top = '45%';
                let noCommaString = userDiceRolls.join(' ');
                heading.innerHTML = `You rolled <span class="big-text">${noCommaString}</span>`;
                headingSmall.innerHTML = `You rolled <span class="big-text">${noCommaString}</span>`;

                setTimeout(function () {
                    currentPlayer = 'computer';
                    displayScore(userRollOutcome, 'user');
                    runGame();
                }, 1000);
            }, 1000);
        }, 2000);
        return userRollOutcome;
    }

    /* Executes the computers turn in the game.
     * Handles dice rolling, determines outcome,
     * handles UI updating, and switches back to
     * users turn. 
     */
    function computerTurn() {

        threeDiceSpinningDisplay();
        startSpinningBorder(circle);
        startBlinking(heading);
        startBlinking(headingSmall);
        heading.style.top = '33%';
        headingSmall.style.top = '25%';
        heading.textContent = "Computer Rolling";
        headingSmall.textContent = "Computer Rolling";

        setTimeout(function () {
            stopSpinningBorder(circle);
            stopBlinking(heading);
            stopBlinking(headingSmall);

            do {
                computerDiceRolls = computerRollDice();
                computerRollOutcome = checkRoll(computerDiceRolls, 'computer');
            } while (computerRollOutcome === '');

            if (checkInstantWinOrLoss(computerRollOutcome, computerDiceRolls, 'computer')) {
                updateDiceFace(computerRollOutcome);
                return;
            }

            updateDiceFace(computerRollOutcome);

            setTimeout(function () {
                threeDiceNoDisplay();
                heading.style.top = '45%';
                headingSmall.style.top = '45%';
                let noCommaString = computerDiceRolls.join(' ');
                heading.innerHTML = `Computer rolled <span class="big-text">${noCommaString}</span>`;
                headingSmall.innerHTML = `Computer rolled <span class="big-text">${noCommaString}</span>`;
                setTimeout(function () {
                    currentPlayer = 'user';
                    displayScore(computerRollOutcome, 'computer');
                    runGame();
                }, 1000);
            }, 1000);
        }, 2000);
        return computerRollOutcome;
    }

    /* Handles the data to be passed to updateScoreDisplay.  
     * removes spaces from strings to correctly convert 
     * to integers, and converts arrays to strings.
     */
    function displayScore(roll, player) {

        //check if roll is an array and convert to string if so

        if (Array.isArray(roll)) {
            roll = roll.join('');
        }

        //Remove spaces from strings to at correct index

        roll = String(roll).replace(/\s+/g, '');

        //Stop function if roll is not a number string
        if (isNaN(roll)) {
            return;
        }

        if (roll.length === 3) {
            let rollValueOne = parseInt(roll[0]);
            let rollValueTwo = parseInt(roll[1]);
            let rollValueThree = parseInt(roll[2]);

            if (player === 'user') {
                let userScoreDieOne = document.getElementById('user-score-die1');
                let userScoreDieTwo = document.getElementById('user-score-die2');
                let userScoreDieThree = document.getElementById('user-score-die3');

                let userScoreDieOneChange = userScoreDieOne ? userScoreDieOne.querySelector('i') : null;
                let userScoreDieTwoChange = userScoreDieTwo ? userScoreDieTwo.querySelector('i') : null;
                let userScoreDieThreeChange = userScoreDieThree ? userScoreDieThree.querySelector('i') : null;

                if (!isNaN(rollValueOne) && !isNaN(rollValueTwo) && !isNaN(rollValueThree)) {
                    if (userScoreDieOneChange) updateScoreDisplay(userScoreDieOneChange, rollValueOne);
                    userScoreDieOneChange.classList.add('pop');
                    if (userScoreDieTwoChange) updateScoreDisplay(userScoreDieTwoChange, rollValueTwo);
                    userScoreDieTwoChange.classList.add('pop');
                    if (userScoreDieThreeChange) updateScoreDisplay(userScoreDieThreeChange, rollValueThree);
                    userScoreDieThreeChange.classList.add('pop');
                }
            } else {

                let computerScoreDieOne = document.getElementById('computer-score-die1');
                let computerScoreDieTwo = document.getElementById('computer-score-die2');
                let computerScoreDieThree = document.getElementById('computer-score-die3');

                let computerScoreDieOneChange = computerScoreDieOne ? computerScoreDieOne.querySelector('i') : null;
                let computerScoreDieTwoChange = computerScoreDieTwo ? computerScoreDieTwo.querySelector('i') : null;
                let computerScoreDieThreeChange = computerScoreDieThree ? computerScoreDieThree.querySelector('i') : null;

                if (!isNaN(rollValueOne) && !isNaN(rollValueTwo) && !isNaN(rollValueThree)) {
                    if (computerScoreDieOneChange) updateScoreDisplay(computerScoreDieOneChange, rollValueOne);
                    computerScoreDieOneChange.classList.add('pop');
                    if (computerScoreDieTwoChange) updateScoreDisplay(computerScoreDieTwoChange, rollValueTwo);
                    computerScoreDieTwoChange.classList.add('pop');
                    if (computerScoreDieThreeChange) updateScoreDisplay(computerScoreDieThreeChange, rollValueThree);
                    computerScoreDieThreeChange.classList.add('pop');
                }
            }
        }
    }

    /* Updates the players score display with the
     * corresponding class for font-awesome icons.
     */
    function updateScoreDisplay(dice, value) {

        let diceClasses = {
            1: 'fa-dice-one',
            2: 'fa-dice-two',
            3: 'fa-dice-three',
            4: 'fa-dice-four',
            5: 'fa-dice-five',
            6: 'fa-dice-six',
        };

        if (dice) {
            dice.classList.remove('fa-solid', 'fa-question', 'fa-dice-one', 'fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six');
            dice.classList.add('fa-solid');
            dice.classList.add(diceClasses[value]);
        }
    }

    /* Starts a shaking effect to be applied to the circle
     * div when user loses the game.
     */
    function startGameLoseAnimation(element) {
        element.classList.add('game-lose-shake');
    }

    /* Stops shaking effect to be applied to the circle
     * div when user loses the game.
     */
    function stopGameLoseAnimation(element) {
        element.classList.remove('game-lose-shake');
    }

    /* Executes shaking effect on text when user
     * loses a round. 
     */
    function startLossAnimation(element) {
        element.classList.add('round-lose-shake');
    }

    /* Stops shaking effect when user loses a 
     * a round. 
     */
    function stopLossAnimation(element) {
        element.classList.remove('round-lose-shake');
    }

    /* Starts spinning the border of the cirle on large screens
     * when players dice are rolling. 
     */
    function startSpinningBorder(element) {

        element.classList.add('spin');
    }

    /* Stops spinning the border of the cirle on large screens
     * when players dice are rolling. 
     */
    function stopSpinningBorder(element) {
        element.classList.remove('spin');
    }

    function startBlinking(element) {
        element.classList.add('blink');
    }

    /* Starts texts blinking when 
     * players are rolling dice.  
     */
    function stopBlinking(element) {
        element.classList.remove('blink');
    }

    /* Stops texts blinking when 
     * players are rolling dice.  
     */
    function startPulsing(element) {
        element.classList.add('pulse');
    }

    /* Adds pulsing effect to increase stakes
     * button. 
     */
    function stopPulsing(element) {
        element.classList.remove('pulse');
    }

    /* Removes the display of the three main
     * dice to allow for headings to update
     * user with roll and game flow information. 
     */
    function threeDiceNoDisplay() {

        let diceOne = document.getElementById('die1');
        let diceTwo = document.getElementById('die2');
        let diceThree = document.getElementById('die3');

        diceOne.style.display = 'none';
        diceTwo.style.display = 'none';
        diceThree.style.display = 'none';
    }

    /* Adds bouncing effect to main three 
     * when its users turn to roll.   
     */
    function threeDiceBounceDisplay() {

        let diceOne = document.getElementById('die1');
        let diceTwo = document.getElementById('die2');
        let diceThree = document.getElementById('die3');

        //Unhide the parent div to see icons
        if (diceOne) {
            diceOne.style.display = 'inline-flex';
            diceOne.style.transform = 'rotate(0deg)';
        }

        if (diceTwo) {
            diceTwo.style.display = 'inline-flex';
        }

        if (diceThree) {
            diceThree.style.display = 'inline-flex';
            diceThree.style.transform = 'rotate(0deg)';
        }

        //Change to beating dice
        let diceOneChange = diceOne.querySelector('.die');
        let diceTwoChange = diceTwo.querySelector('.die');
        let diceThreeChange = diceThree.querySelector('.die');

        if (diceOneChange) {
            diceOneChange.style.display = 'inline-flex';
            diceOneChange.classList.add('fa-beat');
        }

        if (diceTwoChange) {
            diceTwoChange.style.display = 'inline-flex';
            diceTwoChange.classList.add('fa-beat');
        }

        if (diceThreeChange) {
            diceThreeChange.style.display = 'inline-flex';
            diceThreeChange.classList.add('fa-beat');
        }
    }

    /* Adds spinning effect to dice when 
     * players are rolling their dice. 
     */
    function threeDiceSpinningDisplay() {

        let diceOne = document.getElementById('die1');
        let diceTwo = document.getElementById('die2');
        let diceThree = document.getElementById('die3');

        //Unhide the parent div to see icon
        if (diceOne) {
            diceOne.style.display = 'inline-flex';
            diceOne.style.transform = 'rotate(0deg)';
        }

        if (diceTwo) {
            diceTwo.style.display = 'inline-flex';
        }

        if (diceThree) {
            diceThree.style.display = 'inline-flex';
            diceThree.style.transform = 'rotate(0deg)';
        }

        //Change to spinning dice

        let diceOneChange = diceOne.querySelector('.die');
        let diceTwoChange = diceTwo.querySelector('.die');
        let diceThreeChange = diceThree.querySelector('.die');

        if (diceOneChange) {
            diceOneChange.style.display = 'inline-flex';
            diceOneChange.classList.add('fa-spin');
        }

        if (diceTwoChange) {
            diceTwoChange.style.display = 'inline-flex';
            diceTwoChange.classList.add('fa-spin');
        }

        if (diceThreeChange) {
            diceThreeChange.style.display = 'inline-flex';
            diceThreeChange.classList.add('fa-spin');
        }
    }

    /* Updates the bank roll values based on the winner of the round, taking 
     * user or computer as arguments for winner, and the piggyBankValue set
     * by players updating the stakes. 
     */
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

    }

    /* Updates the UI when players roll outcome is
     * and instant-win or loss. Sets the round 
     * winner for allocating the winnings in 
     * updateBankRolls, and calls newRound. 
     */
    function checkInstantWinOrLoss(playerRollOutcome, playersRoll, player) {

        let piggyBankValue = parseInt(piggyBankInput.value);

        if (player === 'user') {
            if (playerRollOutcome) {
                if (playersRoll) {
                    if (playerRollOutcome === 'instant-win') {
                        roundWinner = 'user';
                        banker = 'user';
                        setTimeout(function () {
                            updateDiceFace(playersRoll);
                            displayScore(playersRoll, 'user');
                            stopSpinningBorder(circle);
                            stopBlinking(heading);
                            stopBlinking(headingSmall);
                        }, 2000);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `You rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                            headingSmall.innerHTML = `You rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                        }, 3000);
                        setTimeout(function () {
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.textContent = 'INSTANT WIN';
                            headingSmall.textContent = 'INSTANT WIN';
                        }, 4000);
                        setTimeout(function () {
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                            headingSmall.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                            updateBankRolls('user', piggyBankValue);
                        }, 5000);
                        setTimeout(function () {
                            newRound('user');
                        }, 6000);
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        roundWinner = 'computer';
                        banker = 'computer';
                        setTimeout(function () {
                            updateDiceFace(playersRoll);
                            displayScore(playersRoll, 'user');
                            stopSpinningBorder(circle);
                            stopBlinking(heading);
                            stopBlinking(headingSmall);
                        }, 2000);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `You rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                            headingSmall.innerHTML = `You rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                        }, 3000);
                        setTimeout(function () {
                            startLossAnimation(heading);
                            startLossAnimation(headingSmall);
                            heading.textContent = 'INSTANT LOSS';
                            headingSmall.textContent = 'INSTANT LOSS';
                        }, 4000);
                        setTimeout(function () {
                            stopLossAnimation(heading);
                            stopLossAnimation(headingSmall);
                            heading.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                            headingSmall.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                            updateBankRolls('computer', piggyBankValue);
                        }, 5000);
                        setTimeout(function () {
                            newRound('computer');
                        }, 6000);
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
                            displayScore(playersRoll, 'computer');
                            stopSpinningBorder(circle);
                            stopBlinking(heading);
                            stopBlinking(headingSmall);
                        }, 2000);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `Computer rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                            headingSmall.innerHTML = `Computer rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                        }, 3000);
                        setTimeout(function () {
                            startLossAnimation(heading);
                            startLossAnimation(headingSmall);
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.textContent = 'COMPUTER INSTANT WIN';
                            headingSmall.textContent = 'COMPUTER INSTANT WIN';
                        }, 4000);
                        setTimeout(function () {
                            stopLossAnimation(heading);
                            stopLossAnimation(headingSmall);
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                            headingSmall.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                            updateBankRolls('computer', piggyBankValue);
                        }, 5000);
                        setTimeout(function () {
                            newRound('computer');
                        }, 6000);
                        return true;
                    } else if (playerRollOutcome === 'instant-loss') {
                        roundWinner = 'user';
                        banker = 'user';
                        setTimeout(function () {
                            updateDiceFace(playersRoll);
                            displayScore(playersRoll, 'computer');
                            stopSpinningBorder(circle);
                            stopBlinking(heading);
                            stopBlinking(headingSmall);
                        }, 2000);
                        setTimeout(function () {
                            threeDiceNoDisplay();
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `Computer rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                            headingSmall.innerHTML = `Computer rolled <span class="big-text">${playersRoll.join(' ')}</span>`;
                        }, 3000);
                        setTimeout(function () {
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.textContent = 'COMPUTER INSTANT LOSS';
                            headingSmall.textContent = 'COMPUTER INSTANT LOSS';
                        }, 4000);
                        setTimeout(function () {
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                            headingSmall.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                            updateBankRolls('user', piggyBankValue);
                        }, 5000);
                        setTimeout(function () {
                            newRound('user');
                        }, 6000);
                        return true;
                    }
                }
            }
            return false;
        }
    }

    /* Handles the data from the players rolls, converts arrays
     * to strings, removes spaces in strings, and passes strings
     * to updateDieFace. 
     */
    function updateDiceFace(roll) {

        //Check if roll is an array and if so convert to string 
        if (Array.isArray(roll)) {
            roll = roll.join('');
        }

        //remove spaces from string so strings are 3 characters
        roll = String(roll).replace(/\s+/g, '');

        if (isNaN(roll)) {
            return;
        }

        if (roll.length === 3) {

            let diceOneValue = parseInt(roll[0]);
            let diceTwoValue = parseInt(roll[1]);
            let diceThreeValue = parseInt(roll[2]);

            //Find the elements
            let diceOne = document.getElementById('die1');
            let diceTwo = document.getElementById('die2');
            let diceThree = document.getElementById('die3');

            //find the i element in the divs
            let diceOneChange = diceOne ? diceOne.querySelector('.die') : null;
            let diceTwoChange = diceTwo ? diceTwo.querySelector('.die') : null;
            let diceThreeChange = diceThree ? diceThree.querySelector('.die') : null;

            if (!isNaN(diceOneValue) && !isNaN(diceTwoValue) && !isNaN(diceThreeValue)) {
                if (diceOneChange) updateDieFace(diceOneChange, diceOneValue);
                if (diceTwoChange) updateDieFace(diceTwoChange, diceTwoValue);
                if (diceThreeChange) updateDieFace(diceThreeChange, diceThreeValue);
            }
        }
    }

    //Resets the score display for both players for the next round
    function resetScoreDisplay() {

        let userScoreDieOne = document.getElementById('user-score-die1');
        let userScoreDieTwo = document.getElementById('user-score-die2');
        let userScoreDieThree = document.getElementById('user-score-die3');

        let userScoreDieOneChange = userScoreDieOne ? userScoreDieOne.querySelector('i') : null;
        let userScoreDieTwoChange = userScoreDieTwo ? userScoreDieTwo.querySelector('i') : null;
        let userScoreDieThreeChange = userScoreDieThree ? userScoreDieThree.querySelector('i') : null;

        let computerScoreDieOne = document.getElementById('computer-score-die1');
        let computerScoreDieTwo = document.getElementById('computer-score-die2');
        let computerScoreDieThree = document.getElementById('computer-score-die3');

        let computerScoreDieOneChange = computerScoreDieOne ? computerScoreDieOne.querySelector('i') : null;
        let computerScoreDieTwoChange = computerScoreDieTwo ? computerScoreDieTwo.querySelector('i') : null;
        let computerScoreDieThreeChange = computerScoreDieThree ? computerScoreDieThree.querySelector('i') : null;

        //Remove exisiting classes and replace with question mark icon classes
        if (userScoreDieOneChange) {
            userScoreDieOneChange.className = '';
            userScoreDieOneChange.classList.add('fa-solid', 'fa-question');
        }

        if (userScoreDieTwoChange) {
            userScoreDieTwoChange.className = '';
            userScoreDieTwoChange.classList.add('fa-solid', 'fa-question');
        }

        if (userScoreDieThreeChange) {
            userScoreDieThreeChange.className = '';
            userScoreDieThreeChange.classList.add('fa-solid', 'fa-question');
        }

        if (computerScoreDieOneChange) {
            computerScoreDieOneChange.className = '';
            computerScoreDieOneChange.classList.add('fa-solid', 'fa-question');
        }

        if (computerScoreDieTwoChange) {
            computerScoreDieTwoChange.className = '';
            computerScoreDieTwoChange.classList.add('fa-solid', 'fa-question');
        }

        if (computerScoreDieThreeChange) {
            computerScoreDieThreeChange.className = '';
            computerScoreDieThreeChange.classList.add('fa-solid', 'fa-question');
        }
    }

    /* Ends the game based on the bank roll values of the players.
     * Updates the UI to display the game over message, and allow 
     * user to click to play again. 
     */
    function endGame() {

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);

        heading.textContent = "GAME OVER";
        headingSmall.textContent = "GAME OVER";

        if (bankRollUserValue === 0) {
            setTimeout(function () {
                heading.style.top = '45%';
                headingSmall.style.top = '45%';
                startGameLoseAnimation(circle);
                heading.textContent = "YOU LOSE";
                headingSmall.textContent = "YOU LOSE";
            }, 2000);
            setTimeout(function () {
                heading.style.top = '45%';
                headingSmall.style.top = '45%';
                stopGameLoseAnimation(circle);
                heading.textContent = "Play Again?";
                headingSmall.textContent = "Play Again?";
                circle.addEventListener('click', reStartGame);
            }, 3000);
        } else if (bankRollComputerValue === 0) {
            setTimeout(function () {
                heading.style.top = '45%';
                headingSmall.style.top = '45%';
                heading.textContent = "YOU WON";
                headingSmall.textContent = "YOU WON";
            }, 2000);
            setTimeout(function () {
                heading.style.top = '45%';
                headingSmall.style.top = '45%';
                heading.textContent = "Play Again?";
                headingSmall.textContent = "Play Again?";
                circle.removeEventListener('click', reStartGame);
                circle.addEventListener('click', reStartGame);
            }, 3000);
        }
        if (window.innerWidth <= 425) {
            mainSection.removeEventListener('click', reStartGame);
            mainSection.addEventListener('click', reStartGame);
        }
    }


    /*Runs the game flow logic based on the players turn,
     * Updates the UI with their rolls, and passes to either
     * determineWinner function or instantWinOrLoss depending 
     * on their roll outcomes.
     */
    function runGame() {

        let increaseStakesButton = document.getElementById('increase-stakes');

        increaseStakesButton.removeEventListener('click', updateStakes);

        circle.removeEventListener('click', runGame);

        if (roundWinner !== null) {
            return;
        }

        if (currentPlayer === 'user') {
            if (userRollOutcome === undefined) {
                setTimeout(function () {
                    threeDiceBounceDisplay();
                    heading.style.top = '33%';
                    headingSmall.style.top = '25%';
                    heading.textContent = "Click to roll";
                    headingSmall.textContent = "Click to roll";
                    circle.removeEventListener('click', startUserTurn);
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

    /* Evaluates the outcome of the roll for the playeres.
     * Returns the outcome of their roll as either an instant-win, instant
     * -loss, or a pair+point. 
     */
    function checkRoll(roll, player) {

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
            }
        }
        return outcome;
    }


    /* Starts a new round based on the winner of the previous round,
     * Resets the roll outcomes and prepares for next round, updating
     * UI accordingly. Checks if either players bank roll is at 0, and
     * calls endGame function if so. 
     */
    function newRound(roundWinner) {

        userRollOutcome = undefined;
        computerRollOutcome = undefined;

        let bankRollUserValue = parseInt(bankRollUser.value);
        let bankRollComputerValue = parseInt(bankRollComputer.value);

        if (bankRollUserValue <= 0 || bankRollComputerValue <= 0) {
            if (bankRollUserValue <= 0) {
                //Call end game function with computer as argument
                setTimeout(function () {
                    resetScoreDisplay();
                    endGame('computer');
                }, 1000);

            } else if (bankRollComputerValue <= 0) {
                //Call endGame function with user as argument 
                setTimeout(function () {
                    resetScoreDisplay();
                    endGame('user');
                }, 1000);
            }
        } else {
            if (roundWinner === 'user') {
                setTimeout(function () {
                    heading.style.top = '45%';
                    headingSmall.style.top = '45%';
                    heading.textContent = "New Round";
                    headingSmall.textContent = "New Round";
                    resetScoreDisplay();
                    setTheStakes();
                }, 2000);
            } else if (roundWinner === 'computer') {
                setTimeout(function () {
                    heading.style.top = '45%';
                    headingSmall.style.top = '45%';
                    heading.textContent = "New Round";
                    headingSmall.textContent = "New Round";
                    resetScoreDisplay();
                    setComputerStakes();
                }, 2000);
            }
        }
    }

    /* Resets the game when neither player has won. 
     * Resets the roll outcomes, roundWinner, and diceRolls.
     * Updates the UI to inform users of re-starting of round,
     * with the current banker to roll first.  
     */
    function itsATie() {

        userRollOutcome = undefined;
        computerRollOutcome = undefined;
        roundWinner = null;
        userDiceRolls = undefined;
        computerDiceRolls = undefined;

        setTimeout(function () {
            heading.textContent = "Roll Again";
            headingSmall.textContent = "Roll Again";
        }, 2000);

        if (banker) {
            if (banker === 'user') {
                currentPlayer = 'user';
                setTimeout(function () {
                    heading.style.top = '45%';
                    headingSmall.style.top = '45%';
                    heading.textContent = "You roll first";
                    headingSmall.textContent = "You roll first";
                }, 3000);
                setTimeout(function () {
                    heading.style.top = '28%';
                    headingSmall.style.top = '25%';
                    heading.textContent = "Click to roll";
                    headingSmall.textContent = "Click to roll";
                    threeDiceBounceDisplay();
                    circle.addEventListener('click', startUserTurn);
                }, 4000);

            } else if (banker === 'computer') {
                setTimeout(function () {
                    heading.style.top = '45%';
                    headingSmall.style.top = '45%';
                    heading.textContent = "Computer Rolls first";
                    headingSmall.textContent = "Computer Rolls first";
                }, 3000);
                setTimeout(function () {
                    currentPlayer = 'computer';
                    runGame();
                }, 4000);
            }
        }
    }

    /* Compares the players roll when neither players
     * roll is an instant-win or loss. Splits the strings
     * into pairs and points and compares the values. Declares
     * roundWinner, calls updateBankRolls to allocate winnings,
     * and calls newRound, or itsATie. 
     */
    function determineWinner(userRollOutcome, computerRollOutcome) {

        let piggyBankValue = parseInt(piggyBankInput.value);

        setTimeout(function () {

            let userPairValue = (typeof userRollOutcome === 'string' && userRollOutcome) ? parseInt(userRollOutcome.split(' ')[0]) : null;
            let computerPairValue = (typeof computerRollOutcome === 'string' && computerRollOutcome) ? parseInt(computerRollOutcome.split(' ')[0]) : null;

            if (userPairValue !== null && computerPairValue !== null) {
                // Isolate single point for user and computer roll 
                let userPoint = parseInt(userRollOutcome.split(' ')[2]);
                let computerPoint = parseInt(computerRollOutcome.split(' ')[2]);

                if (userPairValue === computerPairValue) {
                    // If the pair values are equal, compare the points
                    if (userPoint === computerPoint) {
                        heading.textContent = "It's a tie!";
                        headingSmall.textContent = "It's a tie!";
                        itsATie();
                    } else if (userPoint > computerPoint) {
                        heading.style.top = '45%';
                        headingSmall.style.top = '45%';
                        heading.textContent = "You win this round";
                        headingSmall.textContent = "You win this round";
                        roundWinner = 'user';
                        banker = 'user';
                        setTimeout(function () {
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                            headingSmall.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                            updateBankRolls('user', piggyBankValue);
                        }, 1000);
                        setTimeout(function () {
                            newRound('user');
                        }, 2000);
                    } else {
                        startLossAnimation(heading);
                        startLossAnimation(headingSmall);
                        heading.style.top = '45%';
                        headingSmall.style.top = '45%';
                        heading.textContent = "Computer wins this round";
                        headingSmall.textContent = "Computer wins this round";
                        roundWinner = 'computer';
                        banker = 'computer';
                        setTimeout(function () {
                            stopLossAnimation(heading);
                            stopLossAnimation(headingSmall);
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                            headingSmall.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
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
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.textContent = "You win this round";
                            headingSmall.textContent = "You win this round";
                            roundWinner = 'user';
                            banker = 'user';
                            setTimeout(function () {
                                heading.style.top = '45%';
                                headingSmall.style.top = '45%';
                                heading.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                                headingSmall.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                                updateBankRolls('user', piggyBankValue);
                            }, 1000);
                            newRound('user');
                        } else {
                            startLossAnimation(heading);
                            startLossAnimation(headingSmall);
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.textContent = "Computer wins this round";
                            headingSmall.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            banker = 'computer';
                            setTimeout(function () {
                                stopLossAnimation(heading);
                                stopLossAnimation(headingSmall);
                                heading.style.top = '45%';
                                headingSmall.style.top = '45%';
                                heading.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                                headingSmall.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                                updateBankRolls('computer', piggyBankValue);
                            }, 1000);
                            setTimeout(function () {
                                newRound('computer');
                            }, 2000);
                        }
                    } else {
                        //If points are not equal, the higher point wins
                        if (userPoint > computerPoint) {
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.textContent = "You win this round";
                            headingSmall.textContent = "You win this round";
                            roundWinner = 'user';
                            banker = 'user';
                            setTimeout(function () {
                                heading.style.top = '45%';
                                headingSmall.style.top = '45%';
                                heading.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                                headingSmall.innerHTML = `You win <span class="big-text">$${piggyBankValue}</span>`;
                                updateBankRolls('user', piggyBankValue);
                            }, 1000);
                            setTimeout(function () {
                                newRound('user');
                            }, 2000);
                        } else {
                            startLossAnimation(heading);
                            startLossAnimation(headingSmall);
                            heading.style.top = '45%';
                            headingSmall.style.top = '45%';
                            heading.textContent = "Computer wins this round";
                            headingSmall.textContent = "Computer wins this round";
                            roundWinner = 'computer';
                            banker = 'computer';
                            setTimeout(function () {
                                stopLossAnimation(heading);
                                stopLossAnimation(headingSmall);
                                heading.style.top = '45%';
                                headingSmall.style.top = '45%';
                                heading.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
                                headingSmall.innerHTML = `Computer wins <span class="big-text">$${piggyBankValue}</span>`;
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