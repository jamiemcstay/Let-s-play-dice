//Function for screen on loading

document.addEventListener('DOMContentLoaded', function () {
    //hide piggy-bank and score on screen onload
    let scoreArea = document.getElementById('score-area');
    scoreArea.style.display = 'none';

    let piggyBank = document.getElementById('piggy-bank-container');
    piggyBank.style.display = 'none';

    let mainSection = document.getElementById('main-section');
    mainSection.style.height = '90%';

    let circle = document.getElementById('main-section-circle');

    circle.addEventListener('click', function () {
        mainSection.style.height = '72%';
        scoreArea.style.display = 'flex';
        piggyBank.style.display = 'block';
        let heading = document.getElementById('h1-large-screens');
        heading.textContent = "Click for high roll";
        circle.removeEventListener('click', arguments.callee); 
    });

    //function for high roll


});


//function for high roll
function highRoll() {
    return Math.floor(Math.random() * 6) +1;
};


//Function for running the game and the rounds

function runGame() {


}

//function for checking high roll

//Function for rolling three dice

//Function for checking three dice rolls

//Function for finding winnner of round/game

//Function for increasing stakes and updating piggy bank