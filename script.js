// Dataset of Pets and Toys
const itemsPool = [
  // --- Pets ---
  { emoji: '🐶', name: 'Milo', trait: 'Dog' },
  { emoji: '🐱', name: 'Luna', trait: 'Cat' },
  { emoji: '🐰', name: 'Barnaby', trait: 'Rabbit' },
  { emoji: '🦜', name: 'Cleo', trait: 'Parrot' },
  { emoji: '🐹', name: 'Peanut', trait: 'Hamster' },
  { emoji: '🐢', name: 'Shelby', trait: 'Turtle' },
  { emoji: '🐕', name: 'Bella', trait: 'Senior Dog' },
  { emoji: '🐈', name: 'Oliver', trait: 'Tabby Cat' },
  { emoji: '🦊', name: 'Rusty', trait: 'Fox' },
  { emoji: '🐼', name: 'Panda', trait: 'Panda' },
  { emoji: '🦔', name: 'Spike', trait: 'Hedgehog' },
  { emoji: '🐨', name: 'Koa', trait: 'Koala' },

  // --- Toys & Items ---
  { emoji: '🎾', name: 'Tennis Ball', trait: 'Toy' },
  { emoji: '🧸', name: 'Teddy Bear', trait: 'Toy' },
  { emoji: '🦴', name: 'Chew Bone', trait: 'Toy' },
  { emoji: '🧶', name: 'Yarn Ball', trait: 'Toy' },
  { emoji: '🪀', name: 'Squeaky Ring', trait: 'Toy' },
  { emoji: '🥕', name: 'Chew Carrot', trait: 'Toy' },
  { emoji: '🐟', name: 'Fish Treat', trait: 'Snack' },
  { emoji: '🛏️', name: 'Pet Bed', trait: 'Item' },
  { emoji: '📦', name: 'Cat Box', trait: 'Toy' },
  { emoji: '🪶', name: 'Feather Wand', trait: 'Toy' }
];

// Grid Configurations
const difficultyConfigs = {
  easy: { pairs: 6 },   // 3x4 grid = 12 cards = 6 pairs
  medium: { pairs: 8 }, // 4x4 grid = 16 cards = 8 pairs
  hard: { pairs: 15 }   // 5x6 grid = 30 cards = 15 pairs
};

const gameContainer = document.getElementById('gameContainer');
const gameBoard = document.getElementById('gameBoard');
const matchesDisplay = document.getElementById('matches');
const flipsDisplay = document.getElementById('flips');
const winModal = document.getElementById('winModal');
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

  // Apply grid layout classes
  gameBoard.className = `game-board mode-${currentDifficulty}`;
  gameContainer.className = `game-container container-${currentDifficulty}`;

  // Pick random items for current level pairs and duplicate them
  const selectedItems = [...itemsPool].sort(() => 0.5 - Math.random()).slice(0, targetMatches);
  cardsDeck = [...selectedItems, ...selectedItems].sort(() => 0.5 - Math.random());

  // Render cards
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

// Difficulty Selector Event Handlers
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
