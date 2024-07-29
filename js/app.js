/*-------------------------------- Constants --------------------------------*/

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
    "The toad will have the same outcomes when it is his turn to attack. Got it? Good! Let's begin. Choose your first move!"
];

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/
let onTitleScreen = true;
let textIdx = 0;
let playerMaxHP = 5;
let enemyMaxHP = 3;
let playerHP = playerMaxHP;
let enemyHP = enemyMaxHP;
let playerAtk = 2;
let enemyAtk = 2;
let playerBlk = 1;
let enemyBlk = 1;
let playerAttacking = false;
// let nextRound;
let enemyList = [0, 1, 2];

// variables defined by lab requirements
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const attackerEl = document.getElementById('attacker');
const startButton = document.getElementById('startButton');
const titleEls = document.querySelectorAll('.title');
const gameBoard = document.getElementById('board');
const textBox = document.getElementById('textBox');
const continueButton = document.getElementById('continueButton');
const hpBars = document.querySelectorAll('.hp-bar');
const gameText = document.getElementById('gameText');
const clickListener = gameBoard.addEventListener('click', handleClick);
const resetBtnEl = document.getElementById('reset');


// TODO: Add event listeners for player and enemy HP
const playerHpEl = document.getElementById('playerHPFill');
const enemyHpEl = document.getElementById('enemyHPFill');
const playerHPTextEl = document.getElementById('playerHPText');
const enemyHPTextEl = document.getElementById('enemyHPText');

/*-------------------------------- Functions --------------------------------*/


function init() {

    initTTT();
    if (playerHP <= 0) {
        gameOver();
    }

    // if (!playerAttacking && winner && !nextRound) {
    //     playerAttacking = true;
    // } else if (winner && !nextRound) {
    //     playerAttacking = false;
    // }
}

function initTTT() {
    board = ['', '', '',
             '', '', '',
             '', '', ''];

    winner = false;
    tie = false;
    playerAttacking = !playerAttacking;
    renderTTT();
    
    if (playerAttacking) turn = 'X'
        else turn = 'O';
    // if (winner) {
    //     if (playerAttacking) {
    //         updateHP('enemy', playerAtk, enemyBlk);
    //     } else if (!playerAttacking) {
    //         updateHP('player', enemyAtk, playerBlk);
    //     }
    //     playerAttacking = !playerAttacking;
    // }
}

function renderTTT() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((square, sqrIdx) => {
            console.log(sqrIdx);
            squareEls[sqrIdx].innerText = board[sqrIdx];
    });
}

function nextCombatTurn() {
    initTTT();
}

function updateMessage() {
    if(playerAttacking) {
        attackerEl.innerText = 'You are attacking!';
    } else {
        attackerEl.innerText = 'You are defending!';
    }
    if (winner === false && tie === false) {
        if (turn === 'X') {
            messageEl.innerText = 'Your turn';
        } else if (turn === 'O') {
            messageEl.innerText = "Toad's turn";
        }
    } else if (winner === false && tie === true) {
        if (playerAttacking) {
            messageEl.innerText = `You tied! You deal ${playerAtk - enemyBlk} damage (${enemyBlk} damage blocked by the toad).`;
            updateHP('enemy', playerAtk, enemyBlk);
        } else {
            messageEl.innerText = `You tied! The toad deals ${enemyAtk - playerBlk} damage (${playerBlk} damage blocked by you).`;
            updateHP('player', enemyAtk, playerBlk);
        }
    } else {
        if (playerAttacking) {
            if (turn === 'X') {
                messageEl.innerText = `You won! You deal ${playerAtk} damage!`;
                updateHP('enemy', playerAtk, 0);
            } else if (turn === 'O') {
                messageEl.innerText = `Toad won! You miss, dealing 0 damage...`;
            }
        } else {
            if (turn === 'X') {
                messageEl.innerText = `Toad wins! You take ${enemyAtk} damage. Oof!!!`;
                updateHP('player', enemyAtk, 0);
            } else if (turn === 'O') {
                messageEl.innerText = `You win! You evade the toad's attack completely.`;
            }
        }
    }
}

// TODO: Either player or enemy will take given amount of damage
function updateHP(defender, damage, block) {
    const netDamage = damage - block;
    if (defender === 'player') {
        playerHP -= netDamage;
        if (playerHP <= 0) {
            gameOver();
            return;
        }
        playerHPTextEl.innerText = `Your HP: ${playerHP}/${playerMaxHP}`;
        const size = playerHP / playerMaxHP * 100;
        playerHpEl.style.width = `${size}%`;

    } else if (defender === 'enemy') {
        enemyHP -= netDamage;
        if (enemyHP <= 0) {
            nextEnemy();
            return;
        }
        enemyHPTextEl.innerText = `Toad's HP: ${enemyHP}/${enemyMaxHP}`;
        const size = enemyHP / enemyMaxHP * 100;
        enemyHpEl.style.width = `${size}%`;
    }
}

// TODO: After enemy is defeated, show some dialogue then reset the game state with new stats
function nextEnemy(hp, block) {

}

// TODO: update player stats
function levelUp(hp, block) {

}

// TODO: end the game if player's HP falls to 0
function gameOver() {
    gameBoard.style.display = none;
    attackerEl.innerText = 'You were defeated!';
    messageEl.innerText = 'Game Over...';

}


function handleClick(event) {
    if(textIdx === 11) {
        textBox.style.display = 'none';
    }

    const clickedElement = event.target;
    if (!clickedElement.classList.contains('sqr')) return;

    const squareIndex = clickedElement.getAttribute('id');

    if (clickedElement.innerText === 'X' || 
        clickedElement.innerText === 'O' ||
        winner
    ) return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    renderTTT();
}

function placePiece(index) {
    console.log('Square clicked:', index);
    board[index] = turn;
    console.log(board);
}

function checkForWinner() {
    let tally = 0;
    winningCombos.forEach((combo) => {
        combo.forEach((windex) => { // windex === winning index, I couldn't help myself
            if (board[windex] === turn) {
                tally++;
            }
            if (tally === 3) {
                winner = true;
            }
        });
        tally = 0;
    });
}

function checkForTie() {
    if (winner) return;
    if (!board.includes('')) tie = true;
    console.log(`Tie = ${tie}`);
}

function switchPlayerTurn() {
    if (winner) return;

    if (turn === 'X') {
        turn = 'O';
    } else turn = 'X';
    console.log(`It is ${turn}'s turn`);
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
        initTTT();
        messageEl.style.display = 'block';
        attackerEl.style.display = 'block';
        resetBtnEl.style.display = 'block';
    }
});

resetBtnEl.addEventListener('click', function() {
    initTTT();
});