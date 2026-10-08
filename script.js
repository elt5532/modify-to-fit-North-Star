// Dataset of 72 Pets and Toys (36 Pets + 36 Toys/Items)
const itemsPool = [
  // --- Pets (36) ---
  { emoji: '🐶', name: 'Milo', trait: 'Dog' },
  { emoji: '🐱', name: 'Luna', trait: 'Cat' },
  { emoji: '🐰', name: 'Barnaby', trait: 'Rabbit' },
  { emoji: '🦜', name: 'Cleo', trait: 'Parrot' },
  { emoji: '🐹', name: 'Peanut', trait: 'Hamster' },
  { emoji: '🐢', name: 'Shelby', trait: 'Turtle' },
  { emoji: '🐕', name: 'Bella', trait: 'Dog' },
  { emoji: '🐈', name: 'Oliver', trait: 'Cat' },
  { emoji: '🦊', name: 'Rusty', trait: 'Fox' },
  { emoji: '🐼', name: 'Panda', trait: 'Panda' },
  { emoji: '🦔', name: 'Spike', trait: 'Hedgehog' },
  { emoji: '🐨', name: 'Koa', trait: 'Koala' },
  { emoji: '🐠', name: 'Finny', trait: 'Fish' },
  { emoji: '🦎', name: 'Ziggy', trait: 'Lizard' },
  { emoji: '🐸', name: 'Hoppy', trait: 'Frog' },
  { emoji: '🦆', name: 'Waddles', trait: 'Duck' },
  { emoji: '🦉', name: 'Hoot', trait: 'Owl' },
  { emoji: '🐴', name: 'Scout', trait: 'Pony' },
  { emoji: '🐷', name: 'Oinkers', trait: 'Pig' },
  { emoji: '🐑', name: 'Wooly', trait: 'Lamb' },
  { emoji: 'Otter', emoji: '🦦', name: 'Otto', trait: 'Otter' },
  { emoji: '🦝', name: 'Bandit', trait: 'Raccoon' },
  { emoji: '🐿️', name: 'Nuts', trait: 'Squirrel' },
  { emoji: '🦩', name: 'Pinky', trait: 'Flamingo' },
  { emoji: '🦥', name: 'Snooze', trait: 'Sloth' },
  { emoji: '🦨', name: 'Stinky', trait: 'Skunk' },
  { emoji: '🦡', name: 'Badger', trait: 'Badger' },
  { emoji: '🦫', name: 'Chippy', trait: 'Beaver' },
  { emoji: '🦘', name: 'Roo', trait: 'Kangaroo' },
  { emoji: '🦙', name: 'Llama', trait: 'Llama' },
  { emoji: '🐓', name: 'Clucky', trait: 'Rooster' },
  { emoji: '🐁', name: 'Squeak', trait: 'Mouse' },
  { emoji: '🐩', name: 'Poodle', trait: 'Dog' },
  { emoji: '🐈‍⬛', name: 'Shadow', trait: 'Black Cat' },
  { emoji: '🐥', name: 'Peep', trait: 'Chick' },
  { emoji: '🦮', name: 'Buddy', trait: 'Guide Dog' },

  // --- Toys & Items (36) ---
  { emoji: '🎾', name: 'Tennis Ball', trait: 'Toy' },
  { emoji: '🧸', name: 'Teddy Bear', trait: 'Toy' },
  { emoji: '🦴', name: 'Chew Bone', trait: 'Toy' },
  { emoji: '🧶', name: 'Yarn Ball', trait: 'Toy' },
  { emoji: '🪀', name: 'Yo-Yo', trait: 'Toy' },
  { emoji: '🪁', name: 'Kite', trait: 'Toy' },
  { emoji: '🔔', name: 'Bell Toy', trait: 'Toy' },
  { emoji: '🎀', name: 'Bow Ribbon', trait: 'Toy' },
  { emoji: '🥕', name: 'Chew Carrot', trait: 'Toy' },
  { emoji: '🐟', name: 'Fish Treat', trait: 'Snack' },
  { emoji: '🛏️', name: 'Pet Bed', trait: 'Item' },
  { emoji: '📦', name: 'Cat Box', trait: 'Toy' },
  { emoji: '🎡', name: 'Wheel', trait: 'Toy' },
  { emoji: '🪵', name: 'Perch Wood', trait: 'Item' },
  { emoji: '🍼', name: 'Milk Bottle', trait: 'Item' },
  { emoji: '🍲', name: 'Food Bowl', trait: 'Item' },
  { emoji: '🪮', name: 'Pet Brush', trait: 'Item' },
  { emoji: '🦮', name: 'Walk Leash', trait: 'Item' },
  { emoji: '👑', name: 'Pet Crown', trait: 'Item' },
  { emoji: '🕶️', name: 'Cool Shades', trait: 'Item' },
  { emoji: '🎁', name: 'Gift Box', trait: 'Toy' },
  { emoji: '🎈', name: 'Balloon', trait: 'Toy' },
  { emoji: '🥏', name: 'Flying Disc', trait: 'Toy' },
  { emoji: '🪢', name: 'Rope Toy', trait: 'Toy' },
  { emoji: '🧀', name: 'Cheese Bite', trait: 'Snack' },
  { emoji: '🥩', name: 'Steak Bone', trait: 'Snack' },
  { emoji: '🍪', name: 'Pet Biscuit', trait: 'Snack' },
  { emoji: '🏠', name: 'Dog House', trait: 'Item' },
  { emoji: '🧼', name: 'Pet Soap', trait: 'Item' },
  { emoji: '🥾', name: 'Chew Boot', trait: 'Toy' },
  { emoji: '🪶', name: 'Feather Wand', trait: 'Toy' },
  { emoji: '🌽', name: 'Corn Chew', trait: 'Toy' },
  { emoji: '🎪', name: 'Play Tunnel', trait: 'Toy' },
  { emoji: '🏆', name: 'Best Pet Cup', trait: 'Item' },
  { emoji: '🪀', name: 'Squeak Ring', trait: 'Toy' },
  { emoji: '🎯', name: 'Target Disc', trait: 'Toy' }
];

// Grid Configurations
const difficultyConfigs = {
  easy: { pairs: 8 },    // 4x4 grid = 16 cards = 8 pairs
  medium: { pairs: 32 }, // 8x8 grid = 64 cards = 32 pairs
  hard: { pairs: 72 }    // 12x12 grid = 144 cards = 72 pairs
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

  targetMatches = difficultyConfigs[currentDifficulty].pairs;
  matchesDisplay.textContent = `0 / ${targetMatches}`;
  flipsDisplay.textContent = '0';

  // Apply layout classes based on mode
  gameBoard.className = `game-board mode-${currentDifficulty}`;
  gameContainer.className = `game-container container-${currentDifficulty}`;

  // Pick random items for current level and duplicate
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

// Difficulty selector click handler
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
