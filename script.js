// Dataset of Domestic Pets, Toys & Care Items
const itemsPool = [
  // --- Domestic Pets ---
  { emoji: '🐶', name: 'Milo', trait: 'Dog' },
  { emoji: '🐱', name: 'Luna', trait: 'Cat' },
  { emoji: '🐰', name: 'Barnaby', trait: 'Rabbit' },
  { emoji: '🦜', name: 'Cleo', trait: 'Parrot' },
  { emoji: '🐹', name: 'Peanut', trait: 'Hamster' },
  { emoji: '🐢', name: 'Shelby', trait: 'Pet Turtle' },
  { emoji: '🐕', name: 'Bella', trait: 'Golden Retriever' },
  { emoji: '🐈', name: 'Oliver', trait: 'Tabby Cat' },
  { emoji: '🐩', name: 'Pippa', trait: 'Poodle' },
  { emoji: '🐤', name: 'Sunny', trait: 'Canary' },
  { emoji: '🐁', name: 'Nibbles', trait: 'Pet Mouse' },
  { emoji: '🐾', name: 'Paws', trait: 'Puppy' },

  // --- Pet Toys, Snacks & Care Items ---
  { emoji: '🎾', name: 'Tennis Ball', trait: 'Toy' },
  { emoji: '🧸', name: 'Teddy Bear', trait: 'Toy' },
  { emoji: '🦴', name: 'Chew Bone', trait: 'Toy' },
  { emoji: '🧶', name: 'Yarn Ball', trait: 'Toy' },
  { emoji: '🪀', name: 'Squeaky Ring', trait: 'Toy' },
  { emoji: '🥕', name: 'Chew Carrot', trait: 'Toy' },
  { emoji: '🛏️', name: 'Pet Bed', trait: 'Item' },
  { emoji: '📦', name: 'Scratch Box', trait: 'Toy' },
  { emoji: '🪶', name: 'Feather Wand', trait: 'Toy' },
  { emoji: '🥣', name: 'Pet Bowl', trait: 'Item' },
  { emoji: '🔔', name: 'Collar Bell', trait: 'Item' },
  { emoji: '🥓', name: 'Crunchy Treat', trait: 'Snack' }
];

// Grid Configurations
const difficultyConfigs = {
  easy: { pairs: 6 },   // 3x4 grid = 12 cards
  medium: { pairs: 8 }, // 4x4 grid = 16 cards
  hard: { pairs: 15 }   // 5x6 grid = 30 cards
};

const gameContainer = document.getElementById('gameContainer');
const gameBoard = document.getElementById('gameBoard');
const matchesDisplay = document.getElementById('matches');
const flipsDisplay = document.getElementById('flips');
const timerDisplay = document.getElementById('timer');
const winModal = document.getElementById('winModal');
const winStatsText = document.getElementById('winStatsText');
const resetBtn = document.getElementById('resetBtn');
const modalQuizBtn = document.getElementById('modalQuizBtn');
const modalPlayAgainBtn = document.getElementById('modalPlayAgainBtn');
const diffButtons = document.querySelectorAll('.diff-btn');

let currentDifficulty = 'easy';
let targetMatches = 6;
let cardsDeck = [];
let firstCard = null;
let lockBoard = false;
let matchesCount = 0;
let flipsCount = 0;

// Reliable Real-Time Timer
let timerInterval = null;
let startTime = null;
let finalTimeFormatted = '00:00';

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function startTimer() {
  stopTimer();
  startTime = Date.now();
  timerDisplay.textContent = '00:00';

  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    finalTimeFormatted = formatTime(elapsedSeconds);
    timerDisplay.textContent = finalTimeFormatted;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function initGame() {
  gameBoard.innerHTML = '';
  winModal.classList.remove('active');
  firstCard = null;
  lockBoard = false;
  matchesCount = 0;
  flipsCount = 0;

  targetMatches = difficultyConfigs[currentDifficulty].pairs;

  matchesDisplay.textContent = `0 / ${targetMatches}`;
  flipsDisplay.textContent = '0';

  gameBoard.className = `game-board mode-${currentDifficulty}`;
  gameContainer.className = `game-container container-${currentDifficulty}`;

  const selectedItems = [...itemsPool].sort(() => 0.5 - Math.random()).slice(0, targetMatches);
  cardsDeck = [...selectedItems, ...selectedItems].sort(() => 0.5 - Math.random());

  cardsDeck.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    card.innerHTML = `
      <div class="card-face card-back"></div>
      <div class="card-face card-front">
        <span class="card-emoji">${item.emoji}</span>
        <span class="card-name">${item.name}</span>
        <span class="card-trait">${item.trait}</span>
      </div>
    `;

    card.addEventListener('click', () => handleCardClick(card));
    gameBoard.appendChild(card);
  });

  // Start timer automatically when board initializes
  startTimer();
}

function handleCardClick(card) {
  if (lockBoard || card === firstCard || card.classList.contains('matched') || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flipsCount++;
  flipsDisplay.textContent = flipsCount;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  lockBoard = true;
  checkMatch(card);
}

function checkMatch(secondCard) {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchesCount++;
    matchesDisplay.textContent = `${matchesCount} / ${targetMatches}`;

    resetTurn();

    if (matchesCount === targetMatches) {
      stopTimer();
      winStatsText.textContent = `You finished in ${finalTimeFormatted} with ${flipsCount} flips!`;
      setTimeout(() => winModal.classList.add('active'), 600);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, lockBoard] = [null, false];
}

diffButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    diffButtons.forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    currentDifficulty = e.target.dataset.level;
    initGame();
  });
});

resetBtn.addEventListener('click', initGame);
modalPlayAgainBtn.addEventListener('click', initGame);
modalQuizBtn.addEventListener('click', initGame);

document.addEventListener('DOMContentLoaded', initGame);
