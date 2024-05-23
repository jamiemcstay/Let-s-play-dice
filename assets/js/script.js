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

        circle.removeEventListener('click', clickToStart);

        circle.addEventListener('click', highRoll);

    }


    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
    
    function highRoll() {
    
        console.log('Youre in the high roll');
        let heading = document.getElementById('')
        let circle = document.getElementById('main-section-circle');
        circle.removeEventListener('click', highRoll);
    
        let num1 = rollDice();
        let num2 = rollDice();
    
        let highRollResult = [num1, num2]; 
    
        checkHighRoll(highRollResult);
    
        return highRollResult;

            function checkHighRoll(highRollResult) {

                let heading = document.getElementById('h1-large-screens');
                
        
                if (highRollResult[0] > highRollResult[1]) {
                    console.log('Your number is higher, leaving checkHighRoll');
    
                    heading.textContent = `You rolled a ${highRollResult[0]} Computer rolled a ${highRollResult[1]}, set the stakes`;

                    playerRoll(); 
                
                } else {
                    heading.textContent  = `Computer rolled a ${highRollResult[1]}, the stakes are stakes, leaving checkHighRoll`;
                    computerRoll();
                }   
        }
    
    }
    
    
    
    //Function for running the game
    
    function runGame() {
    
        console.log("You're in the game"); 
    
        let circle = document.getElementById('main-section-circle');
    
        let heading = document.getElementById('h1-large-screens');
    
        
        
    
    }
    
    //function for checking high roll
    
    //Function for rolling three dice
    
    //Function for checking the roll of dice
    
    
    function playerRoll() {
    
        console.log("You're in playerRoll"); 
    
    };

    
    function computerRoll() {
        console.log("You're in computer roll");
    }


    //Function for finding winnner of round/game
    
    //Function for increasing stakes and updating piggy bank


    circle.addEventListener('click', clickToStart);

});

