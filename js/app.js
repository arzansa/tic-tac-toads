/*-------------------------------- Constants --------------------------------*/
const startButton = document.getElementById('startButton');
const titleEls = document.querySelectorAll('.title');
const board = document.getElementById('board');
const textBox = document.getElementById('textBox');
const continueButton = document.getElementById('continueButton');
const dialogues = ['You will need to find the missing parts of your ship to return home.',
    'As you venture out into the strange land, you encounter a giant toad!',
    'As you draw your weapon, he begins drawing something in the sand.',
    'He wants to play... Tic Tac Toe?'
];
const tutorialDialogues = [
];
const gameText = document.getElementById('gameText');

/*---------------------------- Variables (state) ----------------------------*/
let onTitleScreen = true;
let textIdx = 0;

/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
function startGame() {
    textBox.style.display = 'flex';
}

function showBoard() {
    board.style.display = 'flex';
}


/*----------------------------- Event Listeners -----------------------------*/
startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    titleEls.forEach((titleEl) => {
        titleEl.style.display = 'none';
      });
      onTitleScreen = false;
      startGame();
});

continueButton.addEventListener('click', function() {
    if(dialogues[textIdx]) {
        gameText.innerText = dialogues[textIdx];
        textIdx++;
    } else {
        showBoard();
        gameText.innerText = 'This is the game board. When it is your attack turn, you will play first.';

    }
});

