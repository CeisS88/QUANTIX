const CARD_GLYPHS = ['∑', 'π', 'Δ', '√', '∞', '÷', '×', 'Ω'];

const state = {
    score: 0,
    moves: 0,
    matches: 0,
    time: 0,
    combo: 0,
    timerInterval: null,
    isPaused: false,
    lockBoard: false,
    flippedCards: [],
    settings: {
        difficulty: 'mixed',
        sound: true,
        animation: true
    }
};

const DOM = {
    screens: {
        menu: document.getElementById('main-menu'),
        game: document.getElementById('game-screen')
    },
    modals: {
        howTo: document.getElementById('modal-how-to'),
        settings: document.getElementById('modal-settings'),
        abort: document.getElementById('modal-abort'),
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
    board: document.getElementById('game-board'),
    diffPills: document.querySelectorAll('.pill-btn'),
    diffSelect: document.getElementById('diff-select')
};

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFactorPairs(n, minFactor) {
    const pairs = [];
    for (let i = minFactor; i * i <= n; i++) {
        if (n % i === 0) {
            const j = n / i;
            if (j >= minFactor) {
                pairs.push([i, j]);
            }
        }
    }
    return pairs;
}

function buildCandidatesForResult(tier, res) {
    const list = [];

    if (tier === 'easy') {
        const addA = randInt(2, res - 2);
        const addB = res - addA;
        if (addA !== addB) {
            list.push(`${addA} + ${addB}`);
        }

        const subB = randInt(3, 19);
        list.push(`${res + subB} − ${subB}`);

        const divD = randInt(2, 6);
        if (res * divD <= 96) {
            list.push(`${res * divD} ÷ ${divD}`);
        }

        const factors = getFactorPairs(res, 2);
        if (factors.length > 0) {
            const [f1, f2] = factors[randInt(0, factors.length - 1)];
            list.push(Math.random() > 0.5 ? `${f1} × ${f2}` : `${f2} × ${f1}`);
        }
    }

    if (tier === 'medium') {
        for (let attempt = 0; attempt < 6; attempt++) {
            const a = randInt(3, 9);
            const b = randInt(3, 8);
            const prod = a * b;
            if (prod < res - 2 && res - prod <= 20) {
                list.push(`${a} × ${b} + ${res - prod}`);
                break;
            }
        }

        for (let attempt = 0; attempt < 6; attempt++) {
            const a = randInt(4, 9);
            const b = randInt(4, 9);
            const prod = a * b;
            if (prod > res + 2 && prod - res <= 24) {
                list.push(`${a} × ${b} − ${prod - res}`);
                break;
            }
        }

        const d1 = randInt(3, 7);
        const q1 = randInt(4, Math.min(12, res - 3));
        if (q1 >= 4) {
            list.push(`${q1 * d1} ÷ ${d1} + ${res - q1}`);
        }

        const d2 = randInt(2, 6);
        const c2 = randInt(3, 14);
        const q2 = res + c2;
        if (q2 * d2 <= 140) {
            list.push(`${q2 * d2} ÷ ${d2} − ${c2}`);
        }
    }

    if (tier === 'hard') {
        for (let attempt = 0; attempt < 10; attempt++) {
            const a = randInt(12, 25);
            const b = randInt(3, 6);
            const prod = a * b;
            if (prod > res + 6 && prod - res <= 36) {
                list.push(`${a} × ${b} − ${prod - res}`);
                break;
            }
        }

        for (let attempt = 0; attempt < 10; attempt++) {
            const a = randInt(11, 19);
            const b = randInt(3, 5);
            const prod = a * b;
            if (prod < res - 6 && res - prod <= 32) {
                list.push(`${a} × ${b} + ${res - prod}`);
                break;
            }
        }

        const d1 = randInt(3, 8);
        const c1 = randInt(8, 22);
        const q1 = res - c1;
        if (q1 >= 12 && q1 * d1 <= 216) {
            list.push(`${q1 * d1} ÷ ${d1} + ${c1}`);
        }

        const d2 = randInt(3, 7);
        const c2 = randInt(7, 21);
        const q2 = res + c2;
        if (q2 * d2 <= 220) {
            list.push(`${q2 * d2} ÷ ${d2} − ${c2}`);
        }
    }

    if (tier === 'expert') {
        for (let attempt = 0; attempt < 12; attempt++) {
            const q = randInt(8, 24);
            const d = randInt(3, 7);
            const prod = res + q;
            const factors = getFactorPairs(prod, 4).filter(([f1, f2]) => f1 >= 11 || f2 >= 11);
            if (factors.length > 0 && q * d <= 168) {
                const [f1, f2] = factors[randInt(0, factors.length - 1)];
                const big = Math.max(f1, f2);
                const small = Math.min(f1, f2);
                list.push(`(${big} × ${small}) − (${q * d} ÷ ${d})`);
                break;
            }
        }

        for (let attempt = 0; attempt < 12; attempt++) {
            const q = randInt(7, 22);
            const d = randInt(3, 7);
            const prod = res - q;
            const factors = getFactorPairs(prod, 4).filter(([f1, f2]) => f1 >= 11 || f2 >= 11);
            if (factors.length > 0 && q * d <= 154) {
                const [f1, f2] = factors[randInt(0, factors.length - 1)];
                const big = Math.max(f1, f2);
                const small = Math.min(f1, f2);
                list.push(`(${big} × ${small}) + (${q * d} ÷ ${d})`);
                break;
            }
        }

        for (let n = 5; n <= 9; n++) {
            const sq = n * n;
            const q = res - sq;
            if (q >= 4 && q <= 24) {
                const d = randInt(4, 9);
                list.push(`${n}² + (${q * d} ÷ ${d})`);
                break;
            }
        }

        for (let n = 8; n <= 11; n++) {
            const sq = n * n;
            const q = sq - res;
            if (q >= 4 && q <= 24) {
                const d = randInt(4, 9);
                list.push(`${n}² − (${q * d} ÷ ${d})`);
                break;
            }
        }

        const multFactors = getFactorPairs(res, 4).filter(([f1, f2]) => {
            const k = Math.max(f1, f2);
            const diff = Math.min(f1, f2);
            return k >= 7 && k <= 16 && diff >= 4 && diff <= 12;
        });
        if (multFactors.length > 0) {
            const [f1, f2] = multFactors[randInt(0, multFactors.length - 1)];
            const k = Math.max(f1, f2);
            const diff = Math.min(f1, f2);
            const subY = randInt(14, 34);
            list.push(`${k} × (${subY + diff} − ${subY})`);
        }
    }

    return [...new Set(list)];
}

function generateDynamicPair(tier, usedResults, usedExpressions) {
    const ranges = {
        easy: [6, 28],
        medium: [15, 46],
        hard: [32, 76],
        expert: [45, 108]
    };

    const [minRes, maxRes] = ranges[tier];

    for (let tries = 0; tries < 300; tries++) {
        const candidateRes = randInt(minRes, maxRes);
        if (usedResults.has(candidateRes)) continue;

        const candidates = buildCandidatesForResult(tier, candidateRes).filter(
            exp => !usedExpressions.has(exp)
        );

        if (candidates.length >= 2) {
            shuffle(candidates);
            const exp1 = candidates[0];
            const exp2 = candidates[1];
            usedResults.add(candidateRes);
            usedExpressions.add(exp1);
            usedExpressions.add(exp2);
            return { exp1, exp2, result: candidateRes };
        }
    }

    return null;
}

const AmbientEngine = (() => {
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let phase = 0;
    let pointer = { x: -999, y: -999 };
    const nodes = [];
    const bursts = [];
    const symbols = ['∑', 'π', 'Δ', '∞', '√', 'φ', '∫', '≡'];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function initNodes() {
        nodes.length = 0;
        const count = Math.min(34, Math.max(16, Math.floor((width * height) / 36000)));
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.42,
                vy: (Math.random() - 0.5) * 0.42,
                symbol: i % 3 === 0 ? symbols[i % symbols.length] : null,
                radius: 1.5 + Math.random() * 1.4
            });
        }
    }

    function spawnBurst(x, y, color = '#D6B36A', count = 18) {
        if (!state.settings.animation) return;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const speed = 1.8 + Math.random() * 3.6;
            bursts.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.022 + Math.random() * 0.015,
                size: 2 + Math.random() * 2.5,
                color
            });
        }
    }

    function drawHarmonicWaves() {
        const waveConfigs = [
            { amp: 34, freq: 0.0028, speed: 0.009, yRatio: 0.28, alpha: 0.12 },
            { amp: 46, freq: 0.0021, speed: -0.007, yRatio: 0.52, alpha: 0.09 },
            { amp: 28, freq: 0.0035, speed: 0.011, yRatio: 0.76, alpha: 0.11 }
        ];

        for (let w = 0; w < waveConfigs.length; w++) {
            const cfg = waveConfigs[w];
            ctx.beginPath();
            ctx.strokeStyle = `rgba(214, 179, 106, ${cfg.alpha})`;
            ctx.lineWidth = 1;

            for (let x = 0; x <= width; x += 14) {
                const y = height * cfg.yRatio + Math.sin(x * cfg.freq + phase * (cfg.speed * 100)) * cfg.amp;
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        if (state.settings.animation) {
            phase += 0.014;
            drawHarmonicWaves();

            const linkDist = 145;
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                a.x += a.vx;
                a.y += a.vy;

                if (a.x < 0 || a.x > width) a.vx *= -1;
                if (a.y < 0 || a.y > height) a.vy *= -1;

                const pdx = a.x - pointer.x;
                const pdy = a.y - pointer.y;
                const pdist = Math.hypot(pdx, pdy);
                if (pdist < 160 && pdist > 0) {
                    const push = (1 - pdist / 160) * 0.6;
                    a.x += (pdx / pdist) * push;
                    a.y += (pdy / pdist) * push;
                }

                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < linkDist) {
                        const opacity = (1 - dist / linkDist) * 0.16;
                        ctx.strokeStyle = `rgba(214, 179, 106, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.font = '500 13px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                if (n.symbol) {
                    ctx.fillStyle = 'rgba(244, 226, 184, 0.24)';
                    ctx.fillText(n.symbol, n.x, n.y);
                } else {
                    ctx.fillStyle = 'rgba(214, 179, 106, 0.32)';
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        for (let i = bursts.length - 1; i >= 0; i--) {
            const b = bursts[i];
            b.x += b.vx;
            b.y += b.vy;
            b.vx *= 0.95;
            b.vy *= 0.95;
            b.life -= b.decay;

            if (b.life <= 0) {
                bursts.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = Math.max(0, b.life);
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size * b.life, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        requestAnimationFrame(render);
    }

    window.addEventListener('resize', () => {
        resize();
        initNodes();
    });

    window.addEventListener('pointermove', (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
    }, { passive: true });

    resize();
    initNodes();
    render();

    return { spawnBurst };
})();

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration, gainVal = 0.08) {
    if (!state.settings.sound) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0008, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

const Sounds = {
    flip: () => playTone(380, 'sine', 0.08, 0.06),
    match: () => {
        playTone(523.25, 'triangle', 0.14, 0.08);
        setTimeout(() => playTone(659.25, 'triangle', 0.18, 0.08), 85);
    },
    wrong: () => playTone(165, 'sine', 0.18, 0.07),
    win: () => {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            setTimeout(() => playTone(freq, 'triangle', 0.22, 0.09), i * 110);
        });
    }
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getGameCards() {
    const selectedPairs = [];
    const usedResults = new Set();
    const usedExpressions = new Set();

    if (state.settings.difficulty === 'mixed') {
        const tiers = ['easy', 'medium', 'hard', 'expert'];
        tiers.forEach(tier => {
            for (let i = 0; i < 3; i++) {
                const pair = generateDynamicPair(tier, usedResults, usedExpressions);
                if (pair) selectedPairs.push(pair);
            }
        });
    } else {
        for (let i = 0; i < 12; i++) {
            const pair = generateDynamicPair(state.settings.difficulty, usedResults, usedExpressions);
            if (pair) selectedPairs.push(pair);
        }
    }

    const cards = [];
    selectedPairs.forEach((pair, index) => {
        const glyph = CARD_GLYPHS[index % CARD_GLYPHS.length];
        cards.push({ expression: pair.exp1, result: pair.result, glyph });
        cards.push({ expression: pair.exp2, result: pair.result, glyph });
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
    if (state.isPaused) return;
    state.time++;
    DOM.stats.time.textContent = formatTime(state.time);
}

function spawnFloatingScore(cardEl, text) {
    if (!state.settings.animation) return;
    const rect = cardEl.getBoundingClientRect();
    const badge = document.createElement('div');
    badge.className = 'floating-score';
    badge.textContent = text;
    badge.style.left = `${rect.left + rect.width / 2}px`;
    badge.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(badge);
    setTimeout(() => badge.remove(), 1000);
}

function syncDifficultyControls(diff) {
    state.settings.difficulty = diff;
    DOM.diffSelect.value = diff;
    DOM.diffPills.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.diff === diff);
    });
}

function attachCardTilt(cardEl) {
    const inner = cardEl.querySelector('.card-inner');
    const front = cardEl.querySelector('.card-front');

    cardEl.addEventListener('pointermove', (e) => {
        if (!state.settings.animation || cardEl.classList.contains('flipped')) return;
        const rect = cardEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 16;
        const rotateX = (0.5 - y) * 16;

        inner.style.setProperty('--rx', `${rotateX.toFixed(1)}deg`);
        inner.style.setProperty('--ry', `${rotateY.toFixed(1)}deg`);
        front.style.setProperty('--mx', `${(x * 100).toFixed(0)}%`);
        front.style.setProperty('--my', `${(y * 100).toFixed(0)}%`);
    });

    cardEl.addEventListener('pointerleave', () => {
        inner.style.setProperty('--rx', '0deg');
        inner.style.setProperty('--ry', '0deg');
    });
}

function handleCardClick(e) {
    if (state.lockBoard || state.isPaused) return;
    const clickedCard = e.currentTarget;

    if (clickedCard.classList.contains('flipped') || state.flippedCards.includes(clickedCard)) {
        return;
    }

    const inner = clickedCard.querySelector('.card-inner');
    inner.style.setProperty('--rx', '0deg');
    inner.style.setProperty('--ry', '0deg');

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
        points += (state.combo - 1) * 50;
        showComboBadge();
    }
    state.score += points;

    const rect2 = card2.getBoundingClientRect();
    AmbientEngine.spawnBurst(rect2.left + rect2.width / 2, rect2.top + rect2.height / 2, '#3ECF8E', 20);
    spawnFloatingScore(card2, state.combo > 1 ? `+${points} (×${state.combo})` : `+${points}`);

    resetBoardState();

    if (state.matches === 12) {
        setTimeout(endGame, 550);
    }
}

function handleMismatch(card1, card2) {
    state.combo = 0;
    state.score = Math.max(0, state.score - 10);

    setTimeout(() => {
        Sounds.wrong();
        card1.classList.add('shake');
        card2.classList.add('shake');
    }, 380);

    setTimeout(() => {
        card1.classList.remove('flipped', 'shake');
        card2.classList.remove('flipped', 'shake');
        resetBoardState();
    }, 1150);
}

function resetBoardState() {
    state.flippedCards = [];
    state.lockBoard = false;
}

function showComboBadge() {
    DOM.stats.combo.textContent = `COMBO ×${state.combo}`;
    DOM.stats.combo.classList.remove('hidden');
    void DOM.stats.combo.offsetWidth;
    setTimeout(() => DOM.stats.combo.classList.add('hidden'), 1500);
}

function initGame() {
    clearInterval(state.timerInterval);
    state.score = 0;
    state.moves = 0;
    state.matches = 0;
    state.time = 0;
    state.combo = 0;
    state.isPaused = false;
    resetBoardState();
    updateUI();

    DOM.stats.diffBadge.textContent = state.settings.difficulty.toUpperCase();
    DOM.board.innerHTML = '';

    const cardsData = getGameCards();
    cardsData.forEach((data, idx) => {
        const cardBtn = document.createElement('button');
        cardBtn.type = 'button';
        cardBtn.className = 'card';
        cardBtn.style.setProperty('--i', idx);
        cardBtn.setAttribute('aria-label', 'Hidden arithmetic tile');
        cardBtn.dataset.result = data.result;

        const inner = document.createElement('div');
        inner.className = 'card-inner';

        const front = document.createElement('div');
        front.className = 'card-face card-front';
        const glyphSpan = document.createElement('span');
        glyphSpan.className = 'card-glyph';
        glyphSpan.textContent = data.glyph;
        front.appendChild(glyphSpan);

        const back = document.createElement('div');
        back.className = 'card-face card-back';
        const expSpan = document.createElement('span');
        expSpan.className = 'math-exp';
        expSpan.textContent = data.expression;
        back.appendChild(expSpan);

        inner.appendChild(front);
        inner.appendChild(back);
        cardBtn.appendChild(inner);

        attachCardTilt(cardBtn);
        cardBtn.addEventListener('click', handleCardClick);
        DOM.board.appendChild(cardBtn);
    });

    state.timerInterval = setInterval(timerLoop, 1000);
    switchScreen('game');
}

function endGame() {
    clearInterval(state.timerInterval);
    Sounds.win();

    AmbientEngine.spawnBurst(window.innerWidth * 0.5, window.innerHeight * 0.4, '#D6B36A', 48);

    const accuracy = state.moves > 0 ? Math.min(100, Math.round((12 / state.moves) * 100)) : 100;
    document.getElementById('final-score').textContent = state.score;
    document.getElementById('final-moves').textContent = state.moves;
    document.getElementById('final-time').textContent = formatTime(state.time);
    document.getElementById('final-accuracy').textContent = `${accuracy}%`;

    DOM.modals.win.classList.remove('hidden');
}

function switchScreen(target) {
    Object.values(DOM.screens).forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
    });
    DOM.screens[target].classList.remove('hidden');
    DOM.screens[target].classList.add('active');
    document.body.classList.toggle('in-session', target === 'game');
}

function toggleModal(modalEl, show) {
    modalEl.classList.toggle('hidden', !show);
}

DOM.diffPills.forEach(pill => {
    pill.addEventListener('click', () => {
        syncDifficultyControls(pill.dataset.diff);
        playTone(460, 'sine', 0.05, 0.04);
    });
});

DOM.diffSelect.addEventListener('change', (e) => {
    syncDifficultyControls(e.target.value);
});

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
    state.isPaused = true;
    toggleModal(DOM.modals.abort, true);
});

document.getElementById('btn-cancel-abort').addEventListener('click', () => {
    state.isPaused = false;
    toggleModal(DOM.modals.abort, false);
});

document.getElementById('btn-confirm-abort').addEventListener('click', () => {
    clearInterval(state.timerInterval);
    state.isPaused = false;
    toggleModal(DOM.modals.abort, false);
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

document.getElementById('toggle-sound').addEventListener('click', (e) => {
    state.settings.sound = !state.settings.sound;
    e.target.textContent = state.settings.sound ? 'ON' : 'OFF';
    e.target.classList.toggle('active', state.settings.sound);
});

document.getElementById('toggle-anim').addEventListener('click', (e) => {
    state.settings.animation = !state.settings.animation;
    e.target.textContent = state.settings.animation ? 'ON' : 'OFF';
    e.target.classList.toggle('active', state.settings.animation);
    document.body.classList.toggle('no-anim', !state.settings.animation);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!DOM.modals.abort.classList.contains('hidden')) {
            state.isPaused = false;
            toggleModal(DOM.modals.abort, false);
        }
        if (!DOM.modals.howTo.classList.contains('hidden')) {
            toggleModal(DOM.modals.howTo, false);
        }
        if (!DOM.modals.settings.classList.contains('hidden')) {
            toggleModal(DOM.modals.settings, false);
        }
    }
});