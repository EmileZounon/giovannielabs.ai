// Black Belt Infographic — physics + interactions
// Depends on data.js (BLACK_BELTS, ORGANIZATIONS).

(() => {
  const stage = document.getElementById('stage');
  const legend = document.getElementById('legend');
  const statNumber = document.getElementById('stat-number');
  const statLabel = document.getElementById('stat-label');
  const orgFilters = document.getElementById('org-filters');
  const yearSel = document.getElementById('filter-year');
  const rankSel = document.getElementById('filter-rank');
  const countrySel = document.getElementById('filter-country');
  const uniSel = document.getElementById('filter-university');
  const nameSel = document.getElementById('filter-name');
  const resetBtn = document.getElementById('reset-filters');

  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalPhoto = document.getElementById('modal-photo');
  const modalName = document.getElementById('modal-name');
  const modalEpithet = document.getElementById('modal-epithet');
  const modalUniversity = document.getElementById('modal-university');
  const modalCountry = document.getElementById('modal-country');
  const modalRanks = document.getElementById('modal-ranks');
  const modalOtherStyles = document.getElementById('modal-other-styles');
  const modalOtherStylesSection = document.getElementById('modal-other-styles-section');

  const state = {
    activeOrg: 'all',
    year: '',
    rank: '',
    country: '',
    university: '',
    name: '',
    mouse: { x: -9999, y: -9999, active: false },
  };

  /* ---------- helpers ---------- */
  function hexToRgba(hex, alpha) {
    const n = hex.replace('#', '');
    const r = parseInt(n.slice(0, 2), 16);
    const g = parseInt(n.slice(2, 4), 16);
    const b = parseInt(n.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function uniqueSorted(arr) {
    return [...new Set(arr)].sort();
  }

  // The highest rank a person holds — this is what colors their ball.
  // Vazrik holds Shodan/Tabata, Yondan/JKA, Sandan/HDKI → highest is Yondan.
  function highestRank(person) {
    return [...person.ranks].sort(
      (a, b) => RANKS.findIndex(r => r.name === b.rank) - RANKS.findIndex(r => r.name === a.rank)
    )[0];
  }

  // The color that wraps a person's ball — driven by their highest rank,
  // not by organization. Visitors read achievement level at a glance.
  function rankColorFor(person) {
    const top = highestRank(person);
    const info = rankInfo(top.rank);
    return info ? info.color : '#F5C518';
  }

  // Detects image-based flag values (e.g. SVG path for East Turkistan) so we
  // can render an <img> instead of treating the path like an emoji glyph.
  function isImageFlag(flag) {
    return typeof flag === 'string' && /\.(svg|png|jpe?g|webp)$/i.test(flag);
  }

  // HTML for a flag — emoji unchanged, image flags rendered as a small <img>.
  function flagHTML(flag) {
    if (!flag) return '';
    if (isImageFlag(flag)) return `<img class="country-flag-img" src="${flag}" alt="">`;
    return flag;
  }

  // Initials for the placeholder ball when a person's photo isn't available
  // yet. "Anselmo Cassiano Alves" → "AA", "Yi Yang" → "YY".
  function personInitials(person) {
    const parts = person.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /* ---------- build filter chips + dropdowns ---------- */
  function buildOrgChips() {
    // One chip per organization. There is no "All" chip — clicking an
    // already-active chip clears the filter instead. Default state: no
    // chip active, so every org shows.
    const orgKeys = Object.keys(ORGANIZATIONS);

    orgKeys.forEach(k => {
      const orgDef = ORGANIZATIONS[k];
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.dataset.org = k;
      btn.style.setProperty('--chip-color', orgDef.color);
      btn.title = orgDef.name;

      if (orgDef.logo) {
        const img = document.createElement('img');
        img.src = orgDef.logo;
        img.alt = orgDef.name;
        img.className = 'chip-logo';
        btn.appendChild(img);
      } else {
        btn.classList.add('chip-text');
        btn.textContent = orgDef.name;
      }

      btn.addEventListener('click', () => {
        // Clicking the active chip clears the filter (toggle off).
        const wasActive = state.activeOrg === k;
        state.activeOrg = wasActive ? 'all' : k;
        document.querySelectorAll('#org-filters .chip').forEach(el => {
          const isActive = !wasActive && el.dataset.org === k;
          el.classList.toggle('active', isActive);
          el.style.background = isActive ? orgDef.color : '';
        });
        applyFilters();
      });

      orgFilters.appendChild(btn);
    });
  }

  function fillDropdown(sel, values, formatter = v => v) {
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = formatter(v);
      sel.appendChild(opt);
    });
  }

  function buildSecondaryFilters() {
    // Years run 2011 → 2026 from the master list, not just years where belts
    // exist — same scaffolding pattern as orgs, ranks, countries, universities.
    fillDropdown(yearSel, YEARS);
    // Ranks must appear in dan order (Shodan → Judan). Each option shows
    // the dan number for context: "1. Shodan", "2. Nidan"…
    RANKS.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.name;
      opt.textContent = `${r.dan}. ${r.name}`;
      rankSel.appendChild(opt);
    });
    // Countries come from the COUNTRIES master list so the dropdown shows
    // the dojo's full reach, not only countries with belts entered.
    COUNTRIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      // Dropdowns can't render HTML, so image-based flags fall back to text only.
      const flagText = isImageFlag(c.flag) ? '' : c.flag;
      opt.textContent = `${flagText} ${c.name}`.trim();
      countrySel.appendChild(opt);
    });
    // Universities come from the master list, not just universities with belts.
    fillDropdown(uniSel, UNIVERSITIES.map(u => u.name));

    // Names dropdown — sorted alphabetically. Picking a name jumps straight
    // to that person's modal (the most useful mobile shortcut), and also
    // applies the name as a filter so their ball stays lit when modal closes.
    const allNames = BLACK_BELTS.map(p => p.name).slice().sort();
    fillDropdown(nameSel, allNames);

    [yearSel, rankSel, countrySel, uniSel].forEach(sel => {
      sel.addEventListener('change', () => {
        state.year = yearSel.value;
        state.rank = rankSel.value;
        state.country = countrySel.value;
        state.university = uniSel.value;
        applyFilters();
      });
    });

    nameSel.addEventListener('change', () => {
      state.name = nameSel.value;
      applyFilters();
      if (state.name) {
        const person = BLACK_BELTS.find(p => p.name === state.name);
        if (person) openModal(person);
      }
    });

    resetBtn.addEventListener('click', () => {
      yearSel.value = '';
      rankSel.value = '';
      countrySel.value = '';
      uniSel.value = '';
      nameSel.value = '';
      state.year = state.rank = state.country = state.university = state.name = '';
      // Clear the org chip too — no chip active means "show every org".
      state.activeOrg = 'all';
      document.querySelectorAll('#org-filters .chip').forEach(el => {
        el.classList.remove('active');
        el.style.background = '';
      });
      applyFilters();
    });
  }

  /* ---------- balls ---------- */
  const balls = []; // { person, el, x, y, vx, vy, r }

  function createBalls() {
    const rect = stage.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    BLACK_BELTS.forEach((person, i) => {
      const el = document.createElement('div');
      el.className = 'ball';
      el.dataset.id = person.id;
      // Photo background, or initials placeholder when photo is missing.
      if (person.photo) {
        el.style.backgroundImage = `url("${person.photo}")`;
        el.style.backgroundPosition = person.photoFocus || 'center';
      } else {
        el.classList.add('ball-placeholder');
        el.textContent = personInitials(person);
      }
      // Solid color ring keyed to the person's highest rank. The glow uses
      // the same color so the entire orb reads as one rank "tier".
      const rc = rankColorFor(person);
      el.style.setProperty('--ring-gradient', `conic-gradient(${rc} 0deg 360deg)`);
      el.style.setProperty('--ring-glow', hexToRgba(rc, 0.55));
      el.setAttribute('role', 'button');
      const summary = person.ranks.map(r => `${r.rank} ${ORGANIZATIONS[r.org].name}`).join(', ');
      el.setAttribute('aria-label', `${person.name}, ${summary}`);
      el.setAttribute('tabindex', '0');

      const r = parseFloat(getComputedStyle(document.documentElement).fontSize) >= 16
        ? (window.innerWidth < 640 ? 38 : 48)
        : 48;

      // distribute initial positions across the stage
      const cols = Math.max(2, Math.ceil(Math.sqrt(BLACK_BELTS.length)));
      const colW = width / cols;
      const rowH = height / Math.ceil(BLACK_BELTS.length / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitterX = (Math.random() - 0.5) * (colW * 0.4);
      const jitterY = (Math.random() - 0.5) * (rowH * 0.4);

      const ball = {
        person,
        el,
        x: colW * (col + 0.5) + jitterX,
        y: rowH * (row + 0.5) + jitterY,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r,
      };

      // clamp to stage
      ball.x = Math.max(r, Math.min(width - r, ball.x));
      ball.y = Math.max(r, Math.min(height - r, ball.y));

      el.addEventListener('click', () => {
        if (el.classList.contains('dimmed')) return;
        openModal(person);
      });
      el.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !el.classList.contains('dimmed')) {
          e.preventDefault();
          openModal(person);
        }
      });

      stage.appendChild(el);
      balls.push(ball);
    });
  }

  /* ---------- physics loop ---------- */
  function tick() {
    const rect = stage.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    balls.forEach(b => {
      // mouse repulsion
      if (state.mouse.active) {
        const mx = state.mouse.x - rect.left;
        const my = state.mouse.y - rect.top;
        const dx = b.x - mx;
        const dy = b.y - my;
        const d2 = dx * dx + dy * dy;
        const REPEL_RADIUS = 140;
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = (REPEL_RADIUS - d) / REPEL_RADIUS * 0.5;
          b.vx += (dx / d) * force;
          b.vy += (dy / d) * force;
        }
      }

      // integrate
      b.x += b.vx;
      b.y += b.vy;

      // bounce
      if (b.x < b.r) { b.x = b.r; b.vx *= -1; }
      else if (b.x > W - b.r) { b.x = W - b.r; b.vx *= -1; }
      if (b.y < b.r) { b.y = b.r; b.vy *= -1; }
      else if (b.y > H - b.r) { b.y = H - b.r; b.vy *= -1; }

      // damp + cap so things stay calm
      b.vx *= 0.995;
      b.vy *= 0.995;
      const speed = Math.hypot(b.vx, b.vy);
      const MAX = 1.6;
      if (speed > MAX) { b.vx = (b.vx / speed) * MAX; b.vy = (b.vy / speed) * MAX; }

      // tiny random nudge so they never freeze
      if (speed < 0.15) {
        b.vx += (Math.random() - 0.5) * 0.08;
        b.vy += (Math.random() - 0.5) * 0.08;
      }

      b.el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
    });

    requestAnimationFrame(tick);
  }

  /* ---------- filtering ---------- */
  // A person matches a rank/org/year filter if ANY of their rank entries
  // satisfies it (e.g. Vazrik passes "JKA" because one of his three ranks is
  // a JKA Yondan). Country and university stay person-level.
  function matchesFilters(person) {
    if (state.activeOrg !== 'all' && !person.ranks.some(r => r.org === state.activeOrg)) return false;
    if (state.year && !person.ranks.some(r => String(r.year) === state.year)) return false;
    // Rank filter compares against the person's HIGHEST rank in the active org
    // (or overall if no org chip is active). This prevents double-counting:
    // someone who is Shodan AND Nidan in JKA only appears under "Nidan".
    if (state.rank) {
      const relevantRanks = state.activeOrg !== 'all'
        ? person.ranks.filter(r => r.org === state.activeOrg)
        : person.ranks;
      if (!relevantRanks.length) return false;
      const highestIdx = Math.max(...relevantRanks.map(r => RANKS.findIndex(x => x.name === r.rank)));
      const highestRank = RANKS[highestIdx]?.name;
      if (highestRank !== state.rank) return false;
    }
    if (state.country) {
      const personCountries = person.countries
        ? person.countries.map(c => c.name)
        : (person.country ? [person.country] : []);
      if (!personCountries.includes(state.country)) return false;
    }
    if (state.university && !(person.universities || []).includes(state.university)) return false;
    if (state.name && person.name !== state.name) return false;
    return true;
  }

  function applyFilters() {
    let visible = 0;
    balls.forEach(b => {
      const match = matchesFilters(b.person);
      b.el.classList.toggle('dimmed', !match);
      if (match) visible++;
    });
    updateLegend(visible);
  }

  // Live status. Updates two places at once:
  //   - The big stat above the stage (number + label)
  //   - The hint legend below the stage
  function updateLegend(visibleCount) {
    const total = BLACK_BELTS.length;
    const count = (typeof visibleCount === 'number') ? visibleCount : total;
    const noun = count === 1 ? 'Black Belt' : 'Black Belts';

    const filters = [];
    if (state.activeOrg && state.activeOrg !== 'all') filters.push(ORGANIZATIONS[state.activeOrg].name);
    if (state.rank)       filters.push(state.rank);
    if (state.year)       filters.push(state.year);
    if (state.country)    filters.push(state.country);
    if (state.university) filters.push(state.university);
    if (state.name)       filters.push(state.name);

    // Big stat: number on its own, label says what it represents.
    statNumber.textContent = count;
    statLabel.textContent = filters.length
      ? `${noun} · ${filters.join(' · ')}`
      : noun;

    // Below-stage hint stays interactive-focused.
    const hint = count > 0 ? 'Hover to nudge them.' : 'No belts match these filters.';
    legend.textContent = hint;
  }

  /* ---------- modal ---------- */
  function openModal(person) {
    if (person.photo) {
      modalPhoto.classList.remove('placeholder');
      modalPhoto.textContent = '';
      modalPhoto.style.backgroundImage = `url("${person.photo}")`;
      modalPhoto.style.backgroundPosition = person.photoFocus || 'center';
    } else {
      modalPhoto.classList.add('placeholder');
      modalPhoto.textContent = personInitials(person);
      modalPhoto.style.backgroundImage = '';
    }
    const rc = rankColorFor(person);
    modalPhoto.style.setProperty('--ring-gradient', `conic-gradient(${rc} 0deg 360deg)`);
    modalPhoto.style.setProperty('--ring-glow', hexToRgba(rc, 0.5));
    modalName.textContent = person.name;

    // Optional epithet — italic subtitle, e.g. "The son of Funakoshi".
    if (person.title) {
      modalEpithet.textContent = person.title;
      modalEpithet.hidden = false;
    } else {
      modalEpithet.hidden = true;
    }

    // Universities: render every school the person has attended, each with
    // its logo when available. Hide the row entirely if they have none.
    const uniDt = modalUniversity.previousElementSibling;
    const unis = person.universities || [];
    if (unis.length) {
      modalUniversity.innerHTML = unis.map(name => {
        const u = universityInfo(name);
        return u && u.logo
          ? `<span class="uni-item"><img class="uni-logo" src="${u.logo}" alt="${name}"><span>${name}</span></span>`
          : `<span class="uni-item"><span>${name}</span></span>`;
      }).join('');
      modalUniversity.style.display = '';
      if (uniDt) uniDt.style.display = '';
    } else {
      modalUniversity.style.display = 'none';
      if (uniDt) uniDt.style.display = 'none';
    }
    // Country: hide the row entirely when the person has no country yet.
    // Supports either single (country/flag) or multiple (countries array).
    const countryDt = modalCountry.previousElementSibling;
    const countryParts = person.countries
      ? person.countries.map(c => `${flagHTML(c.flag)} ${c.name}`.trim()).filter(Boolean)
      : (person.country ? [`${flagHTML(person.flag)} ${person.country}`.trim()] : []);
    if (countryParts.length) {
      modalCountry.innerHTML = countryParts.join(' · ');
      modalCountry.style.display = '';
      if (countryDt) countryDt.style.display = '';
    } else {
      modalCountry.style.display = 'none';
      if (countryDt) countryDt.style.display = 'none';
    }

    // Render the full rank ladder. Each row uses a two-line layout so the
    // rank name reads as the headline and the org/year sits quietly under it.
    // Sort: highest rank first, then within the same rank tier, oldest year
    // first (so a person's Shodan history reads chronologically).
    // Null years sort last within their tier.
    const rows = person.ranks
      .slice()
      .sort((a, b) => {
        const rankDiff = RANKS.findIndex(r => r.name === b.rank) - RANKS.findIndex(r => r.name === a.rank);
        if (rankDiff !== 0) return rankDiff;
        if (a.year == null && b.year == null) return 0;
        if (a.year == null) return 1;
        if (b.year == null) return -1;
        return a.year - b.year;
      })
      .map(r => {
        const o = ORGANIZATIONS[r.org];
        const ri = rankInfo(r.rank);
        const yearStr = r.year ? ` · ${r.year}` : '';
        const orgVisual = o.logo
          ? `<img class="rank-logo" src="${o.logo}" alt="${o.name}" title="${o.name}">`
          : `<span class="rank-crest" style="color:${o.color}" title="${o.name}">${o.short}</span>`;
        const danBadge = ri ? `<span class="rank-dan" style="color:${ri.color}">${ri.dan}・段</span>` : '';
        return `
          <li style="border-left-color:${ri ? ri.color : '#F5C518'}">
            ${orgVisual}
            <div class="rank-text">
              <span class="rank-headline">${r.rank}${danBadge}</span>
              <span class="rank-meta">${o.name}${yearStr}</span>
            </div>
          </li>`;
      })
      .join('');
    modalRanks.innerHTML = rows;

    // Other styles (e.g. Kyokushin) — shown separately so they don't influence
    // the ball ring color or the org filter (this page is Shotokan-first).
    if (person.otherStyles && person.otherStyles.length) {
      modalOtherStyles.innerHTML = person.otherStyles
        .map(s => {
          const ri = rankInfo(s.rank);
          const yearStr = s.year ? ` · ${s.year}` : '';
          const danBadge = ri ? `<span class="rank-dan" style="color:${ri.color}">${ri.dan}・段</span>` : '';
          return `
            <li style="border-left-color:${ri ? ri.color : '#888'}">
              <div class="rank-text" style="margin-left:0">
                <span class="rank-headline">${s.rank}${danBadge}</span>
                <span class="rank-meta">${s.style}${yearStr}</span>
              </div>
            </li>`;
        })
        .join('');
      modalOtherStylesSection.hidden = false;
    } else {
      modalOtherStyles.innerHTML = '';
      modalOtherStylesSection.hidden = true;
    }

    modalBackdrop.hidden = false;
  }
  function closeModal() { modalBackdrop.hidden = true; }
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- mouse tracking ---------- */
  stage.addEventListener('mousemove', (e) => {
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.mouse.active = true;
  });
  stage.addEventListener('mouseleave', () => { state.mouse.active = false; });

  /* ---------- handle resize ---------- */
  window.addEventListener('resize', () => {
    const rect = stage.getBoundingClientRect();
    balls.forEach(b => {
      b.x = Math.max(b.r, Math.min(rect.width - b.r, b.x));
      b.y = Math.max(b.r, Math.min(rect.height - b.r, b.y));
    });
  });

  /* ---------- init ---------- */
  buildOrgChips();
  buildSecondaryFilters();
  createBalls();
  updateLegend(); // initial count
  requestAnimationFrame(tick);
})();
