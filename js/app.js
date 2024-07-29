/*-------------------------------- Constants --------------------------------*/
const startButton = document.getElementById('startButton');
const titleEls = document.querySelectorAll('.title');
const board = document.getElementById('board');
const textBox = document.getElementById('textBox');
const continueButton = document.getElementById('continueButton');
const hpBars = document.querySelectorAll('.hp-bar');
const dialogues = ['You will need to find the missing parts of your ship to return home.',
    'As you venture out into the strange land, you encounter a giant toad!',
    'As you draw your weapon, he begins drawing something in the sand.',
    'He wants to play... Tic Tac Toe?',
    'This is the game board. When it is your attack turn, you will play first.',
    "You and the enemy toad both have hit points. The first to 0 loses the battle. If you lose, it's game over!",
    'Each round of Tic Tac Toe has 3 outcomes.',
    'You win: You do full damage to the toad.',
    'Tie: The toad blocks some of your damage.',
    'Toad wins: You fumble, dealing no damage.',
    "Got it? Good! Let's begin. Choose your first move!"
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

function showHP() {
    hpBars.forEach((hpBar) => {
        hpBar.style.display = 'inline';
      });
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
    if(textIdx < 4) {
        gameText.innerText = dialogues[textIdx];
        textIdx++;
    } else if (textIdx === 4) {
        showBoard();
        gameText.innerText = dialogues[textIdx];
        textIdx++;
    } else if (textIdx > 4 && textIdx < 10) {
        gameText.innerText = dialogues[textIdx];
        if (textIdx === 5) {
            showHP();
        }
        textIdx++;
    } else if (textIdx === 10) {
        gameText.innerText = dialogues[textIdx];
        textIdx++;
        continueButton.style.display = 'none';
    }
});

