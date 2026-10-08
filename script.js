// Expanded rescue animals dataset to support up to 12 pairs (Hard Mode)
const pets = [
  { emoji: '🐶', name: 'Milo', trait: 'Energetic' },
  { emoji: '🐱', name: 'Luna', trait: 'Cuddly' },
  { emoji: '🐰', name: 'Barnaby', trait: 'Gentle' },
  { emoji: '🦜', name: 'Cleo', trait: 'Playful' },
  { emoji: '🐹', name: 'Peanut', trait: 'Curious' },
  { emoji: '🐢', name: 'Shelby', trait: 'Calm' },
  { emoji: '🐕', name: 'Bella', trait: 'Senior Love' },
  { emoji: '🐈', name: 'Oliver', trait: 'Acrobatic' },
  { emoji: '🦊', name: 'Rusty', trait: 'Clever' },
  { emoji: '🐼', name: 'Panda', trait: 'Chill' },
  { emoji: '🦔', name: 'Spike', trait: 'Shy' },
  { emoji: '🐨', name: 'Koa', trait: 'Sleepy' }
];

// Difficulty settings defining number of pairs and grid columns
const difficultyConfigs = {
  easy: { pairs: 4, cols: 4 },
  medium: { pairs: 8, cols: 4 },
  hard: { pairs: 12, cols: 4 }
};

const gameBoard = document.getElementById('gameBoard');
const matchesDisplay = document.getElementById('matches');
const flipsDisplay = document.getElementById('flips');
const winModal = document.getElementById('winModal');
const resetBtn = document.getElementById('resetBtn');
const modalQuizBtn = document.getElementById('modalQuizBtn');
const modalPlayAgainBtn = document.getElementById('modalPlayAgainBtn');
const diffButtons = document.querySelectorAll('.diff-btn');

let currentDifficulty = 'medium';
let targetMatches = 8;
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

  const config = difficultyConfigs[currentDifficulty];
  targetMatches = config.pairs;

  matchesDisplay.textContent = `0 / ${targetMatches}`;
  flipsDisplay.textContent = '0';

  // Apply responsive grid columns dynamically
  gameBoard.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;

  // Select pets for selected difficulty level and shuffle
  const selectedPets = [...pets].sort(() => 0.5 - Math.random()).slice(0, targetMatches);
  cardsDeck = [...selectedPets, ...selectedPets].sort(() => 0.5 - Math.random());

  // Render cards
  cardsDeck.forEach((pet) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = pet.name;

    card.innerHTML = `
      <div class="card-face card-back"></div>
      <div class="card-face card-front">
        <span class="card-emoji">${pet.emoji}</span>
        <span class="card-name">${pet.name}</span>
        <span class="card-trait">${pet.trait}</span>
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
    }, 900);
  }
}

function resetTurn() {
  [firstCard, lockBoard] = [null, false];
}

// Difficulty Selector Handlers
diffButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    diffButtons.forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    currentDifficulty = e.target.dataset.level;
    initGame();
  });
});

// Event Listeners
resetBtn.addEventListener('click', initGame);
modalPlayAgainBtn.addEventListener('click', initGame);
modalQuizBtn.addEventListener('click', initGame);

// Initialize game on load
document.addEventListener('DOMContentLoaded', initGame);
