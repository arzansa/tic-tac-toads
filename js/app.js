/*-------------------------------- Constants --------------------------------*/
const startButton = document.getElementById('startButton');
const titleEls = document.querySelectorAll('.title');
const gameBoard = document.getElementById('board');
const textBox = document.getElementById('textBox');
const continueButton = document.getElementById('continueButton');
const hpBars = document.querySelectorAll('.hp-bar');
const dialogues = ['You will need to find the missing parts of your ship to return home.',
    'As you venture out into the strange land, you encounter a giant toad! He snarls menacingly...',
    'As you draw your weapon, he begins drawing something in the sand.',
    'He wants to play... Tic-Tac-Toe?',
    'This is the game board. When it is your attack turn, you will play first.',
    "You and the enemy toad both have hit points. The first to 0 loses the battle. If you lose, it's game over!",
    'Each round of Tic-Tac-Toe has 3 outcomes.',
    'You win: You do full damage to the toad.',
    'Tie: The toad blocks some of your damage.',
    'Toad wins: The toad evades your attack, dealing no damage.',
    "Got it? Good! Let's begin. Choose your first move!"
];
const gameText = document.getElementById('gameText');

/*---------------------------- Variables (state) ----------------------------*/
let onTitleScreen = true;
let textIdx = 0;
let playerHP;
let enemyHP;
let playerAtk = 1;
let enemyAtk = 1;
let playerBlk = 1;
let enemyBlk = 1;

// variables defined by lab requirements
let board;
let turn;
let winner;
let tie;
let playerAttacking;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');


/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    playerAttacking = true;
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((square, sqrIdx) => {
        if (board[sqrIdx] === '') {
            console.log(sqrIdx);
            squareEls[sqrIdx].innerText = 'A';
        }
    });
}

function updateMessage() {
    if (winner === false && tie === false) {
        if (turn === 'X') {
            messageEl.innerText = 'Your turn';
        } else if (turn === 'O') {
            messageEl.innerText = "Toad's turn";
        }
    } else if (winner === false && tie === true) {
        if (playerAttacking) {
            messageEl.innerText = `You tied! You deal ${playerAtk - enemyBlk} damage (${enemyBlk} damage blocked by the toad).`;
        } else {
            messageEl.innerText = `You tied! The toad deals ${enemyAtk - playerBlk} damage (${playerBlk} damage blocked by you).`;
        }
    } else {
        if (playerAttacking) {
            if (turn === 'X') {
                messageEl.innerText = `You won! You deal ${playerAtk} damage!`;
            } else if (turn === 'O') {
                messageEl.innerText = `Toad won! You miss, dealing 0 damage...`;
            }
        } else {
            if (turn === 'X') {
                messageEl.innerText = `Toad wins! You take ${enemyAtk} damage. Oof!!!`;
            } else if (turn === 'O') {
                messageEl.innerText = `You win! You evade the toad's attack completely.`;
            }
        }
    }
}

function startGame() {
    textBox.style.display = 'flex';
}

function showBoard() {
    gameBoard.style.display = 'flex';
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
        init();
        messageEl.style.display = 'block';
    }
});

