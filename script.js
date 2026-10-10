const itemsPool = [
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

const difficultyConfigs = {
  easy: { name: 'Easy 3x4', pairs: 6 },
  medium: { name: 'Medium 4x4', pairs: 8 },
  hard: { name: 'Hard 5x6', pairs: 15 }
};

// DOM Elements
const gameContainer = document.getElementById('gameContainer');
const gameBoard = document.getElementById('gameBoard');
const matchesDisplay = document.getElementById('matches');
const flipsDisplay = document.getElementById('flips');
const timerDisplay = document.getElementById('timer');
const bestRecordDisplay = document.getElementById('bestRecord');
const currentLevelLabel = document.getElementById('currentLevelLabel');

const startModal = document.getElementById('startModal');
const winModal = document.getElementById('winModal');
const winStatsText = document.getElementById('winStatsText');
const newRecordBadge = document.getElementById('newRecordBadge');

const resetBtn = document.getElementById('resetBtn');
const changeDiffBtn = document.getElementById('changeDiffBtn');
const modalPlayAgainBtn = document.getElementById('modalPlayAgainBtn');
const startDiffButtons = document.querySelectorAll('.start-diff-btn');

// Game State
let currentDifficulty = 'easy';
let targetMatches = 6;
let cardsDeck = [];
let firstCard = null;
let lockBoard = false;
let matchesCount = 0;
let flipsCount = 0;

// Timer State
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;
let isTimerRunning = false;
let finalTimeFormatted = '00:00';

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function getBestRecord(level) {
  const record = localStorage.getItem(`petmatch_best_${level}`);
  return record ? parseInt(record, 10) : null;
}

function saveBestRecord(level, seconds) {
  localStorage.setItem(`petmatch_best_${level}`, seconds);
}

function updateRecordsUI() {
  const currentBest = getBestRecord(currentDifficulty);
  bestRecordDisplay.textContent = currentBest ? formatTime(currentBest) : '--:--';

  ['easy', 'medium', 'hard'].forEach((lvl) => {
    const rec = getBestRecord(lvl);
    const elem = document.getElementById(`startRecord${lvl.charAt(0).toUpperCase() + lvl.slice(1)}`);
    if (elem) {
      elem.textContent = rec ? `Best: ${formatTime(rec)}` : 'Best: --:--';
    }
  });
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  startTime = Date.now();

  timerInterval = setInterval(() => {
    elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    finalTimeFormatted = formatTime(elapsedSeconds);
    timerDisplay.textContent = finalTimeFormatted;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  isTimerRunning = false;
}

function resetTimer() {
  stopTimer();
  elapsedSeconds = 0;
  finalTimeFormatted = '00:00';
  timerDisplay.textContent = '00:00';
}

function openStartModal() {
  stopTimer();
  updateRecordsUI();
  startModal.classList.add('active');
}

function initGame() {
  resetTimer();
  startModal.classList.remove('active');
  winModal.classList.remove('active');
  newRecordBadge.style.display = 'none';

  firstCard = null;
  lockBoard = false;
  matchesCount = 0;
  flipsCount = 0;

  const config = difficultyConfigs[currentDifficulty];
  targetMatches = config.pairs;
  currentLevelLabel.textContent = config.name;

  matchesDisplay.textContent = `0 / ${targetMatches}`;
  flipsDisplay.textContent = '0';

  updateRecordsUI();

  gameBoard.className = `game-board mode-${currentDifficulty}`;
  gameContainer.className = `game-container container-${currentDifficulty}`;

  const selectedItems = [...itemsPool].sort(() => 0.5 - Math.random()).slice(0, targetMatches);
  cardsDeck = [...selectedItems, ...selectedItems].sort(() => 0.5 - Math.random());

  gameBoard.innerHTML = '';
  cardsDeck.forEach((item, index) => {
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

  if (!isTimerRunning) {
    startTimer();
  }

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
    firstCard.classList.add('matched', 'matched-pop');
    secondCard.classList.add('matched', 'matched-pop');

    matchesCount++;
    matchesDisplay.textContent = `${matchesCount} / ${targetMatches}`;

    resetTurn();

    if (matchesCount === targetMatches) {
      stopTimer();
      handleWin();
    }
  } else {
    firstCard.classList.add('mismatch');
    secondCard.classList.add('mismatch');

    setTimeout(() => {
      firstCard.classList.remove('flipped', 'mismatch');
      secondCard.classList.remove('flipped', 'mismatch');
      resetTurn();
    }, 800);
  }
}

function handleWin() {
  const previousRecord = getBestRecord(currentDifficulty);
  let isNewRecord = false;

  if (!previousRecord || elapsedSeconds < previousRecord) {
    saveBestRecord(currentDifficulty, elapsedSeconds);
    isNewRecord = true;
    updateRecordsUI();
  }

  winStatsText.textContent = `Completed in ${finalTimeFormatted} with ${flipsCount} flips!`;
  newRecordBadge.style.display = isNewRecord ? 'inline-block' : 'none';

  setTimeout(() => winModal.classList.add('active'), 400);
}

function resetTurn() {
  [firstCard, lockBoard] = [null, false];
}

// Event Listeners
startDiffButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    currentDifficulty = e.currentTarget.dataset.level;
    initGame();
  });
});

changeDiffBtn.addEventListener('click', openStartModal);
resetBtn.addEventListener('click', initGame);
modalPlayAgainBtn.addEventListener('click', initGame);

document.addEventListener('DOMContentLoaded', () => {
  openStartModal();
});
