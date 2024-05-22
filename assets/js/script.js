//Function for screen on loading

document.addEventListener('DOMContentLoaded', function () {
    //hide piggy-bank and score area on screen onload
    let scoreArea = document.getElementById('score-area');

    let piggyBank = document.getElementById('piggy-bank-container');

    //increase size of main section to take up surplace space 
    let mainSection = document.getElementById('main-section');
    
    let circle = document.getElementById('main-section-circle');

    scoreArea.style.display = 'none';
    piggyBank.style.display = 'none';
    mainSection.style.height = '90%';
    
    function clickToStart() {
        scoreArea.style.display = 'flex';
        piggyBank.style.display = 'flex';
        mainSection.style.height = '72%';
        
        runGame(); 

    }

    circle.addEventListener('click', clickToStart);

});


//function for rolling dice
function rollDice() {
    return Math.floor(Math.random() * 6) +1;
};


//Function for running the game

function runGame() {
    console.log("You're running the game");
    let heading = document.getElementById('h1-large-screens');
    heading.textContent = "Click for high roll";

    let circle = document.getElementById('main-section-circle');
    circle.addEventListener('click', highRoll); 

}

//function for checking high roll

function highRoll 

//Function for rolling three dice

//Function for checking three dice rolls

//Function for finding winnner of round/game

//Function for increasing stakes and updating piggy bank