/**
 * MATHEMATICAL MEMORY MATCHING GAME
 * No Frameworks, Vanilla JS, No eval().
 */

// --- 1. DATASET MATEMATIKA ---
const MATH_DATA = {
    easy: [
        { exp1: "2 + 3", exp2: "10 ÷ 2", result: 5 },
        { exp1: "8 - 4", exp2: "2 × 2", result: 4 },
        { exp1: "6 + 1", exp2: "14 ÷ 2", result: 7 },
        { exp1: "9 - 3", exp2: "3 × 2", result: 6 },
        { exp1: "4 + 4", exp2: "16 ÷ 2", result: 8 },
        { exp1: "5 × 2", exp2: "15 - 5", result: 10 },
        { exp1: "12 ÷ 3", exp2: "1 + 3", result: 4 },
        { exp1: "7 + 2", exp2: "3 × 3", result: 9 },
        { exp1: "11 - 0", exp2: "22 ÷ 2", result: 11 },
        { exp1: "6 × 2", exp2: "24 ÷ 2", result: 12 },
        { exp1: "20 - 5", exp2: "3 × 5", result: 15 },
        { exp1: "4 × 4", exp2: "8 + 8", result: 16 },
        { exp1: "10 + 8", exp2: "9 × 2", result: 18 },
        { exp1: "25 - 5", exp2: "10 × 2", result: 20 },
        { exp1: "7 × 3", exp2: "10 + 11", result: 21 }
    ],
    medium: [
        { exp1: "12 + 8 - 5", exp2: "5 × 3", result: 15 },
        { exp1: "6 × 3 - 4", exp2: "28 ÷ 2", result: 14 },
        { exp1: "20 ÷ 4 + 7", exp2: "6 × 2", result: 12 },
        { exp1: "15 - 3 × 2", exp2: "18 ÷ 2", result: 9 },
        { exp1: "10 + 4 × 2", exp2: "36 ÷ 2", result: 18 },
        { exp1: "24 ÷ 3 + 2", exp2: "5 × 2", result: 10 },
        { exp1: "30 - 5 × 4", exp2: "20 ÷ 2", result: 10 },
        { exp1: "8 × 3 - 4", exp2: "40 ÷ 2", result: 20 },
        { exp1: "7 + 2 × 5", exp2: "34 ÷ 2", result: 17 },
        { exp1: "18 ÷ 2 + 6", exp2: "5 × 3", result: 15 },
        { exp1: "4 × 4 + 4", exp2: "40 ÷ 2", result: 20 },
        { exp1: "50 - 6 × 5", exp2: "10 × 2", result: 20 },
        { exp1: "9 × 2 + 7", exp2: "50 ÷ 2", result: 25 },
        { exp1: "40 ÷ 4 - 3", exp2: "14 ÷ 2", result: 7 },
        { exp1: "22 - 4 × 3", exp2: "20 ÷ 2", result: 10 }
    ],
    hard: [
        { exp1: "8 × 4 - 12", exp2: "40 ÷ 2", result: 20 },
        { exp1: "36 ÷ 6 + 14", exp2: "10 × 2", result: 20 },
        { exp1: "7 × 5 - 18", exp2: "34 ÷ 2", result: 17 },
        { exp1: "48 ÷ 4 × 3", exp2: "72 ÷ 2", result: 36 },
        { exp1: "15 × 3 - 25", exp2: "40 ÷ 2", result: 20 },
        { exp1: "64 ÷ 8 × 4", exp2: "64 ÷ 2", result: 32 },
        { exp1: "9 × 6 - 24", exp2: "60 ÷ 2", result: 30 },
        { exp1: "81 ÷ 9 × 5", exp2: "90 ÷ 2", result: 45 },
        { exp1: "12 × 5 - 35", exp2: "50 ÷ 2", result: 25 },
        { exp1: "14 × 3 - 12", exp2: "60 ÷ 2", result: 30 },
        { exp1: "56 ÷ 7 × 3", exp2: "48 ÷ 2", result: 24 },
        { exp1: "13 × 4 - 22", exp2: "60 ÷ 2", result: 30 },
        { exp1: "72 ÷ 8 × 6", exp2: "108 ÷ 2", result: 54 },
        { exp1: "16 × 3 - 18", exp2: "60 ÷ 2", result: 30 },
        { exp1: "90 ÷ 9 × 4", exp2: "80 ÷ 2", result: 40 }
    ],
    expert: [
        { exp1: "(8 + 4) × 3", exp2: "72 ÷ 2", result: 36 },
        { exp1: "36 ÷ (3 + 3)", exp2: "12 ÷ 2", result: 6 },
        { exp1: "(15 - 3) × 4", exp2: "96 ÷ 2", result: 48 },
        { exp1: "48 ÷ (2 × 3) + 5", exp2: "26 ÷ 2", result: 13 },
        { exp1: "(10 + 5) × 2", exp2: "60 ÷ 2", result: 30 },
        { exp1: "64 ÷ (8 - 4)", exp2: "32 ÷ 2", result: 16 },
        { exp1: "(20 - 8) × 3", exp2: "72 ÷ 2", result: 36 },
        { exp1: "75 ÷ (3 + 2) + 5", exp2: "40 ÷ 2", result: 20 },
        { exp1: "(12 + 8) × 4", exp2: "160 ÷ 2", result: 80 },
        { exp1: "100 ÷ (5 × 2)", exp2: "20 ÷ 2", result: 10 },
        { exp1: "(30 - 15) × 3", exp2: "90 ÷ 2", result: 45 },
        { exp1: "96 ÷ (4 + 8) + 2", exp2: "20 ÷ 2", result: 10 },
        { exp1: "(14 + 6) × 5", exp2: "200 ÷ 2", result: 100 },
        { exp1: "120 ÷ (2 × 3) - 5", exp2: "30 ÷ 2", result: 15 },
        { exp1: "(18 - 9) × 6", exp2: "108 ÷ 2", result: 54 }
    ]
};

// --- 2. STATE MANAGEMENT ---
const state = {
    score: 0,
    moves: 0,
    matches: 0,
    time: 0,
    combo: 0,
    timerInterval: null,
    lockBoard: false,
    flippedCards: [],
    settings: {
        difficulty: 'mixed',
        sound: true,
        animation: true
    }
};

// --- 3. DOM ELEMENTS ---
const DOM = {
    screens: {
        menu: document.getElementById('main-menu'),
        game: document.getElementById('game-screen')
    },
    modals: {
        howTo: document.getElementById('modal-how-to'),
        settings: document.getElementById('modal-settings'),
        win: document.getElementById('modal-win')
    },
    stats: {
        score: document.getElementById('score-display'),
        moves: document.getElementById('moves-display'),
        matches: document.getElementById('matches-display'),
        time: document.getElementById('time-display'),
        combo: document.getElementById('combo-display'),
        progress: document.getElementById('progress-bar'),
        diffBadge: document.getElementById('diff-badge-display')
    },
    board: document.getElementById('game-board')
};

// --- 4. AUDIO SYSTEM ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq, type, duration) {
    if (!state.settings.sound) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

const Sounds = {
    flip: () => playTone(300, 'sine', 0.1),
    match: () => { playTone(600, 'sine', 0.1); setTimeout(() => playTone(800, 'sine', 0.15), 100); },
    wrong: () => playTone(150, 'sawtooth', 0.2),
    win: () => {
        [400, 500, 600, 800].forEach((freq, i) => {
            setTimeout(() => playTone(freq, 'square', 0.1), i * 150);
        });
    }
};

// --- 5. LOGIKA GAME & GENERASI KARTU ---
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getGameCards() {
    let selectedPairs = [];
    
    if (state.settings.difficulty === 'mixed') {
        const dKeys = ['easy', 'medium', 'hard', 'expert'];
        dKeys.forEach(k => {
            const shuffled = shuffle([...MATH_DATA[k]]);
            selectedPairs.push(...shuffled.slice(0, 3));
        });
    } else {
        const pool = [...MATH_DATA[state.settings.difficulty]];
        selectedPairs = shuffle(pool).slice(0, 12);
    }

    let cards = [];
    selectedPairs.forEach((pair, index) => {
        cards.push({ id: `p${index}a`, expression: pair.exp1, result: pair.result });
        cards.push({ id: `p${index}b`, expression: pair.exp2, result: pair.result });
    });

    return shuffle(cards);
}

function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function updateUI() {
    DOM.stats.score.textContent = state.score;
    DOM.stats.moves.textContent = state.moves;
    DOM.stats.matches.textContent = `${state.matches} / 12`;
    DOM.stats.time.textContent = formatTime(state.time);
    DOM.stats.progress.style.width = `${(state.matches / 12) * 100}%`;
}

function timerLoop() {
    state.time++;
    DOM.stats.time.textContent = formatTime(state.time);
}

// --- 6. EVENT LISTENER KARTU ---
function handleCardClick(e) {
    if (state.lockBoard) return;
    const clickedCard = e.currentTarget;

    if (clickedCard.classList.contains('flipped') || state.flippedCards.includes(clickedCard)) return;

    Sounds.flip();
    clickedCard.classList.add('flipped');
    state.flippedCards.push(clickedCard);

    if (state.flippedCards.length === 2) {
        state.moves++;
        state.lockBoard = true;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = state.flippedCards;
    const isMatch = card1.dataset.result === card2.dataset.result;

    if (isMatch) {
        handleMatch(card1, card2);
    } else {
        handleMismatch(card1, card2);
    }
    updateUI();
}

function handleMatch(card1, card2) {
    Sounds.match();
    card1.classList.add('matched');
    card2.classList.add('matched');
    
    state.matches++;
    state.combo++;
    
    let points = 100;
    if (state.combo > 1) {
        points += state.combo * 50;
        showComboBonus();
    }
    state.score += points;

    resetBoardState();

    if (state.matches === 12) {
        setTimeout(endGame, 500);
    }
}

function handleMismatch(card1, card2) {
    state.combo = 0;
    state.score = Math.max(0, state.score - 10);
    
    setTimeout(() => {
        Sounds.wrong();
        card1.classList.add('shake');
        card2.classList.add('shake');
    }, 400);

    setTimeout(() => {
        card1.classList.remove('flipped', 'shake');
        card2.classList.remove('flipped', 'shake');
        resetBoardState();
    }, 1200);
}

function resetBoardState() {
    state.flippedCards = [];
    state.lockBoard = false;
}

function showComboBonus() {
    DOM.stats.combo.textContent = `COMBO x${state.combo} !`;
    DOM.stats.combo.classList.remove('hidden');
    void DOM.stats.combo.offsetWidth;
    setTimeout(() => DOM.stats.combo.classList.add('hidden'), 1500);
}

// --- 7. SIKLUS GAME ---
function initGame() {
    clearInterval(state.timerInterval);
    state.score = 0;
    state.moves = 0;
    state.matches = 0;
    state.time = 0;
    state.combo = 0;
    resetBoardState();
    updateUI();

    DOM.stats.diffBadge.textContent = `Difficulty: ${state.settings.difficulty.charAt(0).toUpperCase() + state.settings.difficulty.slice(1)}`;

    DOM.board.innerHTML = '';
    const cardsData = getGameCards();

    cardsData.forEach(data => {
        const cardObj = document.createElement('button');
        cardObj.classList.add('card');
        cardObj.setAttribute('aria-label', `Math card ${data.expression}`);
        cardObj.dataset.result = data.result;

        cardObj.innerHTML = `
            <div class="card-face card-front">?</div>
            <div class="card-face card-back">${data.expression}</div>
        `;

        cardObj.addEventListener('click', handleCardClick);
        DOM.board.appendChild(cardObj);
    });

    state.timerInterval = setInterval(timerLoop, 1000);
    switchScreen('game');
}

function endGame() {
    clearInterval(state.timerInterval);
    Sounds.win();
    document.getElementById('final-score').textContent = state.score;
    document.getElementById('final-moves').textContent = state.moves;
    document.getElementById('final-time').textContent = formatTime(state.time);
    DOM.modals.win.classList.remove('hidden');
}

// --- 8. NAVIGASI & UTILS ---
function switchScreen(screenName) {
    DOM.screens.menu.classList.remove('active');
    DOM.screens.menu.classList.add('hidden');
    DOM.screens.game.classList.remove('active');
    DOM.screens.game.classList.add('hidden');

    if (screenName === 'menu') {
        DOM.screens.menu.classList.add('active');
        DOM.screens.menu.classList.remove('hidden');
    } else {
        DOM.screens.game.classList.add('active');
        DOM.screens.game.classList.remove('hidden');
    }
}

function toggleModal(modalDOM, show) {
    if (show) {
        modalDOM.classList.remove('hidden');
    } else {
        modalDOM.classList.add('hidden');
    }
}

// --- 9. WIRING EVENT LISTENER ---
document.getElementById('btn-start').addEventListener('click', () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    initGame();
});

document.getElementById('btn-how-to').addEventListener('click', () => toggleModal(DOM.modals.howTo, true));
document.getElementById('btn-settings').addEventListener('click', () => toggleModal(DOM.modals.settings, true));
document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
    });
});

document.getElementById('btn-quit').addEventListener('click', () => {
    clearInterval(state.timerInterval);
    switchScreen('menu');
});

document.getElementById('btn-play-again').addEventListener('click', () => {
    toggleModal(DOM.modals.win, false);
    initGame();
});

document.getElementById('btn-home').addEventListener('click', () => {
    toggleModal(DOM.modals.win, false);
    switchScreen('menu');
});

document.getElementById('diff-select').addEventListener('change', (e) => {
    state.settings.difficulty = e.target.value;
});

document.getElementById('toggle-sound').addEventListener('click', (e) => {
    state.settings.sound = !state.settings.sound;
    e.target.textContent = state.settings.sound ? 'ON' : 'OFF';
    e.target.classList.toggle('active');
});

document.getElementById('toggle-anim').addEventListener('click', (e) => {
    state.settings.animation = !state.settings.animation;
    e.target.textContent = state.settings.animation ? 'ON' : 'OFF';
    e.target.classList.toggle('active');
    
    if (state.settings.animation) {
        document.body.classList.remove('no-anim');
    } else {
        document.body.classList.add('no-anim');
    }
});