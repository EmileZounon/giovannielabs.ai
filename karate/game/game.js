// Alphabet Tube — a 30-second relaxed game.
// Pull 7 random black belts from the lineage, drop them in the tube in a
// shuffled order, and let the player tap-to-swap their way to alphabetical
// before the timer hits zero.

(function () {
  'use strict';

  const ROUND_SECONDS = 30;
  const NAMES_PER_ROUND = 7;

  const tubeTrack = document.getElementById('tube-track');
  const tubeEl    = document.getElementById('tube');
  const timerEl   = document.getElementById('timer');
  const streakEl  = document.getElementById('streak');
  const restartBtn = document.getElementById('restart');
  const overlay   = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayBody  = document.getElementById('overlay-body');
  const overlayBtn   = document.getElementById('overlay-btn');
  const hintEl    = document.getElementById('hint');

  let belts        = [];   // current round's array of person objects, in display order
  let selectedIdx  = null; // index of the box waiting for a swap partner
  let timerHandle  = null;
  let secondsLeft  = ROUND_SECONDS;
  let streak       = parseInt(localStorage.getItem('mhkh_alphabet_streak') || '0', 10);
  let roundLive    = false;

  streakEl.textContent = streak;

  // Some people in the roster have multi-word first names (e.g. "Qiu Yu Hong
  // Lu") — sort the way a human would by lowercase full-name ascending.
  const sortKey = (p) => p.name.trim().toLowerCase();

  function sample(array, n) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  }

  function isAlphabetical(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (sortKey(arr[i]) > sortKey(arr[i + 1])) return false;
    }
    return true;
  }

  function correctIndices(arr) {
    // For "in the right slot now" indicators on each box: a box is correct if
    // its name matches the alphabetically-sorted order.
    const sorted = arr.slice().sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
    return arr.map((p, i) => sorted[i].name === p.name);
  }

  function personInitials(person) {
    const parts = person.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function render() {
    const correct = correctIndices(belts);
    tubeTrack.innerHTML = belts.map((p, i) => {
      const faceStyle = p.photo
        ? `style="background-image:url('../${p.photo}'); background-position:${p.photoFocus || 'center'};"`
        : '';
      const faceContent = p.photo ? '' : personInitials(p);
      return `
        <li class="box ${correct[i] ? 'correct' : ''} ${selectedIdx === i ? 'selected' : ''}" data-idx="${i}" tabindex="0">
          <div class="box-face" ${faceStyle}>${faceContent}</div>
          <span class="box-name">${p.name}</span>
          <span class="box-checkmark" aria-hidden="true">✓</span>
        </li>`;
    }).join('');

    // Wire up taps after each render (innerHTML wipes listeners)
    tubeTrack.querySelectorAll('.box').forEach((el) => {
      el.addEventListener('click', onBoxTap);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onBoxTap.call(el);
        }
      });
    });
  }

  function onBoxTap() {
    if (!roundLive) return;
    const idx = parseInt(this.dataset.idx, 10);
    if (selectedIdx === null) {
      selectedIdx = idx;
      render();
      return;
    }
    if (selectedIdx === idx) {
      // Tapped the same box twice — deselect, no swap.
      selectedIdx = null;
      render();
      return;
    }
    // Swap belts[selectedIdx] and belts[idx]
    const a = selectedIdx;
    const b = idx;
    [belts[a], belts[b]] = [belts[b], belts[a]];
    selectedIdx = null;
    render();
    // Brief flash on the two swapped boxes
    [a, b].forEach((i) => {
      const node = tubeTrack.querySelector(`.box[data-idx="${i}"]`);
      if (node) {
        node.classList.add('swap-flash');
        setTimeout(() => node.classList.remove('swap-flash'), 280);
      }
    });

    if (isAlphabetical(belts)) endRound(true);
  }

  function startRound() {
    overlay.hidden = true;
    tubeEl.classList.remove('win', 'lose');
    selectedIdx = null;
    secondsLeft = ROUND_SECONDS;
    timerEl.textContent = secondsLeft;
    timerEl.classList.remove('warn', 'danger');

    // Pick 7 random people, then make sure the starting order is NOT already
    // alphabetical — if it is by chance, reshuffle once.
    let pool = sample(BLACK_BELTS, NAMES_PER_ROUND);
    if (isAlphabetical(pool)) pool = pool.reverse();
    belts = pool;
    render();

    roundLive = true;
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      secondsLeft -= 1;
      timerEl.textContent = secondsLeft;
      if (secondsLeft <= 10) timerEl.classList.add('warn');
      if (secondsLeft <= 5)  { timerEl.classList.remove('warn'); timerEl.classList.add('danger'); }
      if (secondsLeft <= 0)  endRound(false);
    }, 1000);
  }

  function endRound(won) {
    if (!roundLive) return;
    roundLive = false;
    clearInterval(timerHandle);
    timerHandle = null;

    if (won) {
      streak += 1;
      tubeEl.classList.add('win');
      overlayTitle.textContent = 'Domo arigato.';
      overlayBody.textContent = `You ordered the dojo in ${ROUND_SECONDS - secondsLeft}s. Streak: ${streak}.`;
    } else {
      streak = 0;
      tubeEl.classList.add('lose');
      overlayTitle.textContent = 'Time.';
      overlayBody.textContent = 'The discipline is in the practice. Try again.';
    }
    streakEl.textContent = streak;
    localStorage.setItem('mhkh_alphabet_streak', String(streak));

    setTimeout(() => { overlay.hidden = false; }, 600);
  }

  restartBtn.addEventListener('click', () => {
    if (roundLive) clearInterval(timerHandle);
    startRound();
  });
  overlayBtn.addEventListener('click', startRound);

  // Defensive: if someone lands here without data.js loaded.
  if (typeof BLACK_BELTS === 'undefined' || !BLACK_BELTS.length) {
    hintEl.textContent = 'Roster failed to load. Check the connection and refresh.';
    return;
  }

  startRound();
})();
