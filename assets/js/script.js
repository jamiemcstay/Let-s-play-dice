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


        circle.addEventListener('click', clickToStart); 

});

//function for rolling dice

function rollDice() {
    return Math.floor(Math.random() * 6) +1;
};

function highRoll() {

    console.log('Youre in the high roll');
    let num1 = rollDice();
    let num2 = rollDice();

    let highRollResult = [num1, num2]
    if(num1 > num2) {
        console.log('yup'); 
    }
    checkRoll(highRollResult);
    
    let circle = document.getElementById('main-section-circle');
    circle.removeEventListener('click', highRoll); 
    
};



//Function for running the game

function runGame() { 
    
}

//function for checking high roll

//Function for rolling three dice

//Function for checking the roll of dice

function checkRoll(highRollResult) {
    if(highRollResult[0] > highRollResult[1]) {
    } else { 
    }
};

//Function for finding winnner of round/game

//Function for increasing stakes and updating piggy bank