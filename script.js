{\rtf1\ansi\ansicpg1252\cocoartf2818
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Select screen elements\
const startScreen = document.getElementById('start-screen');\
const gameScreen = document.getElementById('game-screen');\
const gameOverScreen = document.getElementById('game-over-screen');\
const startButton = document.getElementById('start-button');\
const shootButton = document.getElementById('shoot-button');\
const restartButton = document.getElementById('restart-button');\
const countdownDisplay = document.getElementById('countdown');\
const messageDisplay = document.getElementById('message');\
const resultDisplay = document.getElementById('result');\
\
let gameRunning = false;\
let reactionTimeLimit = 2000; // Initial time to react in milliseconds\
let computerReactionTime;\
let playerShot = false;\
\
// Show a specific screen\
function showScreen(screen) \{\
  startScreen.classList.add('hidden');\
  gameScreen.classList.add('hidden');\
  gameOverScreen.classList.add('hidden');\
  screen.classList.remove('hidden');\
\}\
\
// Start the game\
startButton.addEventListener('click', () => \{\
  showScreen(gameScreen);\
  startGame();\
\});\
\
// Restart the game\
restartButton.addEventListener('click', () => \{\
  reactionTimeLimit = 2000; // Reset difficulty\
  showScreen(startScreen);\
\});\
\
// Start game logic\
function startGame() \{\
  playerShot = false;\
  gameRunning = true;\
  messageDisplay.textContent = '';\
  countdownDisplay.textContent = 'Get Ready...';\
\
  setTimeout(() => \{\
    countdownDisplay.textContent = 'One, two, three... SHOOT!';\
    shootButton.disabled = false;\
    computerReactionTime = Math.random() * reactionTimeLimit;\
\
    setTimeout(() => \{\
      if (!playerShot && gameRunning) \{\
        gameOver(false);\
      \}\
    \}, reactionTimeLimit);\
  \}, 2000); // Countdown delay\
\}\
\
// Player shoots\
shootButton.addEventListener('click', () => \{\
  if (!gameRunning) return;\
\
  playerShot = true;\
  if (performance.now() <= computerReactionTime) \{\
    gameOver(false);\
  \} else \{\
    messageDisplay.textContent = 'You win this round!';\
    reactionTimeLimit *= 0.9; // Make the next round harder\
    setTimeout(startGame, 2000);\
  \}\
  shootButton.disabled = true;\
\});\
\
// Game over logic\
function gameOver(playerWon) \{\
  gameRunning = false;\
  shootButton.disabled = true;\
  resultDisplay.textContent = playerWon ? 'You won the game!' : 'You lost! The computer was faster.';\
  showScreen(gameOverScreen);\
\}\
}