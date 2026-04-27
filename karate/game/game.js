// Bubble Tube — drift seven black-belt bubbles in a pool, drag them down
// into the tube, drop them in alphabetical order before 30 seconds runs
// out. Wrong drops bounce back into the pool with a shake. Right drops
// lock into place with a green halo. Streak persists in localStorage.

(function () {
  'use strict';

  const ROUND_SECONDS = 30;
  const SLOTS = 7;

  const pool       = document.getElementById('pool');
  const tube       = document.getElementById('tube');
  const tubeTrack  = document.getElementById('tube-track');
  const timerEl    = document.getElementById('timer');
  const filledEl   = document.getElementById('filled');
  const streakEl   = document.getElementById('streak');
  const restartBtn = document.getElementById('restart');
  const overlay    = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayBody  = document.getElementById('overlay-body');
  const overlayBtn   = document.getElementById('overlay-btn');
  const hintEl     = document.getElementById('hint');

  if (typeof BLACK_BELTS === 'undefined' || !BLACK_BELTS.length) {
    hintEl.textContent = 'Roster failed to load. Refresh and try again.';
    return;
  }

  let bubbles = [];        // { person, el, x, y, vx, vy, r, dragging, placedSlot }
  let slots = [];          // { el, accepted: bubble|null }
  let secondsLeft = ROUND_SECONDS;
  let timerHandle = null;
  let roundLive = false;
  let nextTargetIdx = 0;   // which slot is next expected to fill (left → right)
  let placedCount = 0;
  let streak = parseInt(localStorage.getItem('mhkh_bubble_tube_streak') || '0', 10);
  let rafHandle = null;

  streakEl.textContent = streak;

  const sortKey = (p) => p.name.trim().toLowerCase();

  function sample(arr, n) {
    const c = arr.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c.slice(0, n);
  }

  function personInitials(person) {
    const parts = person.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function firstName(person) {
    return person.name.trim().split(/\s+/)[0];
  }

  function buildSlots() {
    tubeTrack.innerHTML = '';
    slots = [];
    for (let i = 0; i < SLOTS; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'tube-slot';
      slotEl.dataset.idx = i;
      tubeTrack.appendChild(slotEl);
      slots.push({ el: slotEl, accepted: null });
    }
  }

  function highlightTarget() {
    slots.forEach((s, i) => {
      s.el.classList.toggle('target', i === nextTargetIdx && roundLive);
    });
  }

  function buildBubbles(roster) {
    pool.innerHTML = '';
    bubbles = [];
    const rect = pool.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    roster.forEach((person) => {
      const el = document.createElement('div');
      el.className = 'bubble in-pool';
      el.tabIndex = 0;
      if (person.photo) {
        el.style.backgroundImage = `url("../${person.photo}")`;
        el.style.backgroundPosition = person.photoFocus || 'center';
      } else {
        el.textContent = personInitials(person);
      }
      const nameTag = document.createElement('span');
      nameTag.className = 'bubble-name';
      nameTag.textContent = firstName(person);
      el.appendChild(nameTag);

      // Use the actual rendered bubble size so the physics boundary matches
      // what the user sees (mobile bubbles are smaller than desktop ones).
      pool.appendChild(el);
      const measured = el.getBoundingClientRect();
      pool.removeChild(el);
      const r = Math.max(20, Math.round(measured.width / 2));
      const b = {
        person, el,
        x: r + Math.random() * Math.max(1, W - 2 * r),
        y: r + Math.random() * Math.max(1, H - 2 * r),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r,
        dragging: false,
        placedSlot: null,
      };
      el.style.transform = `translate(${b.x - r}px, ${b.y - r}px)`;
      pool.appendChild(el);
      bubbles.push(b);
      attachDrag(b);
    });
  }

  function attachDrag(bubble) {
    let pointerStart = null;
    bubble.el.addEventListener('pointerdown', (e) => {
      if (!roundLive || bubble.placedSlot !== null) return;
      e.preventDefault();
      bubble.dragging = true;
      bubble.el.classList.add('dragging');
      const r = bubble.el.getBoundingClientRect();
      pointerStart = {
        id: e.pointerId,
        offsetX: e.clientX - r.left,
        offsetY: e.clientY - r.top,
      };
      try { bubble.el.setPointerCapture(e.pointerId); } catch (_) {}
    });

    bubble.el.addEventListener('pointermove', (e) => {
      if (!bubble.dragging || !pointerStart || e.pointerId !== pointerStart.id) return;
      // Move the bubble by absolute viewport coordinates so we can drag from
      // the pool down into the tube and back. The bubble's parent stays the
      // pool (so on release we can drop it back if the swap fails).
      const poolRect = pool.getBoundingClientRect();
      const localX = e.clientX - poolRect.left - pointerStart.offsetX + bubble.r;
      const localY = e.clientY - poolRect.top  - pointerStart.offsetY + bubble.r;
      bubble.x = localX;
      bubble.y = localY;
      bubble.vx = 0; bubble.vy = 0;
      bubble.el.style.transform = `translate(${bubble.x - bubble.r}px, ${bubble.y - bubble.r}px)`;

      // Visual feedback: highlight the tube while finger is over it
      const overTube = pointInRect(e.clientX, e.clientY, tube.getBoundingClientRect());
      tube.classList.toggle('drop-active', overTube);
    });

    function endDrag(e) {
      if (!bubble.dragging || !pointerStart || e.pointerId !== pointerStart.id) return;
      bubble.dragging = false;
      bubble.el.classList.remove('dragging');
      try { bubble.el.releasePointerCapture(pointerStart.id); } catch (_) {}
      pointerStart = null;
      tube.classList.remove('drop-active');

      const overTube = pointInRect(e.clientX, e.clientY, tube.getBoundingClientRect());
      if (overTube) tryPlaceInTube(bubble);
      else clampToPool(bubble);
    }
    bubble.el.addEventListener('pointerup', endDrag);
    bubble.el.addEventListener('pointercancel', endDrag);
  }

  function pointInRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function clampToPool(bubble) {
    const rect = pool.getBoundingClientRect();
    bubble.x = Math.max(bubble.r, Math.min(rect.width  - bubble.r, bubble.x));
    bubble.y = Math.max(bubble.r, Math.min(rect.height - bubble.r, bubble.y));
    bubble.vx = (Math.random() - 0.5) * 1.0;
    bubble.vy = (Math.random() - 0.5) * 1.0;
    bubble.el.style.transform = `translate(${bubble.x - bubble.r}px, ${bubble.y - bubble.r}px)`;
  }

  function tryPlaceInTube(bubble) {
    // Determine the alphabetically-correct bubble for the current next slot.
    const sorted = bubbles.slice().sort((a, b) => sortKey(a.person).localeCompare(sortKey(b.person)));
    const expected = sorted[nextTargetIdx];

    if (bubble === expected) {
      // Lock into the slot
      acceptIntoSlot(bubble, nextTargetIdx, true);
      nextTargetIdx += 1;
      placedCount += 1;
      filledEl.textContent = `${placedCount}/${SLOTS}`;
      highlightTarget();
      if (nextTargetIdx >= SLOTS) endRound(true);
    } else {
      // Wrong drop — flash red briefly, bounce back into the pool.
      bubble.el.classList.add('placed-wrong');
      setTimeout(() => bubble.el.classList.remove('placed-wrong'), 360);
      clampToPool(bubble);
    }
  }

  function acceptIntoSlot(bubble, slotIdx, correct) {
    const slot = slots[slotIdx];
    slot.accepted = bubble;
    bubble.placedSlot = slotIdx;
    bubble.el.classList.remove('in-pool');
    bubble.el.classList.add('in-tube');
    bubble.el.classList.add(correct ? 'placed-correct' : 'placed-wrong');
    // Move the DOM node from pool → slot, clear inline transform so the slot's
    // flex centering does its job.
    slot.el.classList.add(correct ? 'correct' : 'wrong');
    bubble.el.style.transform = '';
    slot.el.appendChild(bubble.el);
  }

  function startRound() {
    overlay.hidden = true;
    tube.classList.remove('win', 'lose');
    nextTargetIdx = 0;
    placedCount = 0;
    secondsLeft = ROUND_SECONDS;
    timerEl.textContent = secondsLeft;
    timerEl.classList.remove('warn', 'danger');
    filledEl.textContent = `0/${SLOTS}`;
    roundLive = true;

    buildSlots();
    buildBubbles(sample(BLACK_BELTS, SLOTS));
    highlightTarget();

    if (timerHandle) clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      if (!roundLive) return;
      secondsLeft -= 1;
      timerEl.textContent = secondsLeft;
      if (secondsLeft <= 10) timerEl.classList.add('warn');
      if (secondsLeft <= 5)  { timerEl.classList.remove('warn'); timerEl.classList.add('danger'); }
      if (secondsLeft <= 0)  endRound(false);
    }, 1000);

    if (rafHandle) cancelAnimationFrame(rafHandle);
    rafHandle = requestAnimationFrame(physicsTick);
  }

  function endRound(won) {
    if (!roundLive) return;
    roundLive = false;
    clearInterval(timerHandle); timerHandle = null;
    highlightTarget();

    if (won) {
      streak += 1;
      tube.classList.add('win');
      overlayTitle.textContent = 'Domo arigato.';
      overlayBody.textContent  = `All seven in order with ${secondsLeft}s left. Streak: ${streak}.`;
    } else {
      streak = 0;
      tube.classList.add('lose');
      overlayTitle.textContent = 'Time.';
      overlayBody.textContent  = `${placedCount} of ${SLOTS} in place. Discipline is in the practice.`;
    }
    streakEl.textContent = streak;
    localStorage.setItem('mhkh_bubble_tube_streak', String(streak));
    setTimeout(() => { overlay.hidden = false; }, 700);
  }

  // Soft drift physics for bubbles still in the pool. Locked bubbles inside
  // the tube don't get touched.
  function physicsTick() {
    const rect = pool.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    bubbles.forEach((b) => {
      if (b.placedSlot !== null) return;
      if (b.dragging) return;
      b.x += b.vx; b.y += b.vy;
      if (b.x < b.r) { b.x = b.r; b.vx *= -1; }
      else if (b.x > W - b.r) { b.x = W - b.r; b.vx *= -1; }
      if (b.y < b.r) { b.y = b.r; b.vy *= -1; }
      else if (b.y > H - b.r) { b.y = H - b.r; b.vy *= -1; }
      b.vx *= 0.997; b.vy *= 0.997;
      const speed = Math.hypot(b.vx, b.vy);
      const MAX = 1.5;
      if (speed > MAX) { b.vx = (b.vx / speed) * MAX; b.vy = (b.vy / speed) * MAX; }
      if (speed < 0.1) {
        b.vx += (Math.random() - 0.5) * 0.1;
        b.vy += (Math.random() - 0.5) * 0.1;
      }
      b.el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
    });
    rafHandle = requestAnimationFrame(physicsTick);
  }

  restartBtn.addEventListener('click', startRound);
  overlayBtn.addEventListener('click', startRound);
  window.addEventListener('resize', () => {
    // Keep bubbles inside the (resized) pool
    const rect = pool.getBoundingClientRect();
    bubbles.forEach((b) => {
      if (b.placedSlot !== null || b.dragging) return;
      b.x = Math.max(b.r, Math.min(rect.width - b.r, b.x));
      b.y = Math.max(b.r, Math.min(rect.height - b.r, b.y));
      b.el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
    });
  });

  startRound();
})();
