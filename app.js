/* ============================================================
   Texans HQ — Personal PWA  v2.0
   Privacy-first • Offline-friendly • Self-contained
   Password-protected (remembers device)
   ============================================================ */

const APP_PASSWORD = 'texans2026';
const UNLOCK_KEY = 'texans-hq-unlocked-v2';

const TEXANS = {
  id: 34,
  abbr: 'HOU',
  name: 'Houston Texans',
  color: '#03202F',
  red: '#A71930'
};

/* ---------- Password Lock ---------- */
function isUnlocked() {
  return localStorage.getItem(UNLOCK_KEY) === 'true';
}

function unlockApp() {
  localStorage.setItem(UNLOCK_KEY, 'true');
  document.getElementById('lockScreen').classList.add('hidden');
  document.getElementById('appShell').classList.remove('locked');
  init(); // start the real app only after unlock
}

function setupLock() {
  const lockScreen = document.getElementById('lockScreen');
  const appShell = document.getElementById('appShell');
  const input = document.getElementById('lockPassword');
  const btn = document.getElementById('lockUnlockBtn');
  const err = document.getElementById('lockError');

  if (isUnlocked()) {
    lockScreen.classList.add('hidden');
    appShell.classList.remove('locked');
    return true; // already unlocked
  }

  // Show lock, hide app
  lockScreen.classList.remove('hidden');
  appShell.classList.add('locked');

  function tryUnlock() {
    if (input.value === APP_PASSWORD) {
      unlockApp();
    } else {
      err.style.display = 'block';
      input.value = '';
      input.focus();
      setTimeout(() => { err.style.display = 'none'; }, 1800);
    }
  }

  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlock();
  });

  // Focus the input
  setTimeout(() => input.focus(), 300);
  return false;
}

/* ---------- 2026 Schedule (hardcoded from public sources) ---------- */
const SCHEDULE_2026 = [
  // Preseason
  { week: 'PS1', date: '2026-08-13', time: '19:00', opp: 'Los Angeles Chargers', oppAbbr: 'LAC', home: true, result: null, type: 'pre' },
  { week: 'PS2', date: '2026-08-20', time: '19:00', opp: 'Las Vegas Raiders', oppAbbr: 'LV', home: true, result: null, type: 'pre' },
  { week: 'PS3', date: '2026-08-28', time: '18:00', opp: 'Carolina Panthers', oppAbbr: 'CAR', home: false, result: null, type: 'pre' },
  // Regular
  { week: 1, date: '2026-09-13', time: '12:00', opp: 'Buffalo Bills', oppAbbr: 'BUF', home: true, result: null, type: 'reg' },
  { week: 2, date: '2026-09-20', time: '12:00', opp: 'Cincinnati Bengals', oppAbbr: 'CIN', home: true, result: null, type: 'reg' },
  { week: 3, date: '2026-09-27', time: '12:00', opp: 'Indianapolis Colts', oppAbbr: 'IND', home: false, result: null, type: 'reg' },
  { week: 4, date: '2026-10-04', time: '12:00', opp: 'Dallas Cowboys', oppAbbr: 'DAL', home: true, result: null, type: 'reg' },
  { week: 5, date: '2026-10-11', time: '12:00', opp: 'Tennessee Titans', oppAbbr: 'TEN', home: false, result: null, type: 'reg' },
  { week: 6, date: '2026-10-18', time: '08:30', opp: 'Jacksonville Jaguars', oppAbbr: 'JAX', home: false, result: null, type: 'reg', note: 'London (Wembley)' },
  { week: 7, date: '2026-10-25', time: '12:00', opp: 'New York Giants', oppAbbr: 'NYG', home: true, result: null, type: 'reg' },
  { week: 8, date: null, time: null, opp: 'BYE', oppAbbr: '—', home: true, result: null, type: 'bye' },
  { week: 9, date: '2026-11-08', time: '15:05', opp: 'Los Angeles Chargers', oppAbbr: 'LAC', home: false, result: null, type: 'reg' },
  { week: 10, date: '2026-11-15', time: '12:00', opp: 'Cleveland Browns', oppAbbr: 'CLE', home: false, result: null, type: 'reg' },
  { week: 11, date: '2026-11-19', time: '19:15', opp: 'Indianapolis Colts', oppAbbr: 'IND', home: true, result: null, type: 'reg', note: 'TNF' },
  { week: 12, date: '2026-11-29', time: '12:00', opp: 'Baltimore Ravens', oppAbbr: 'BAL', home: true, result: null, type: 'reg' },
  { week: 13, date: '2026-12-06', time: '19:20', opp: 'Pittsburgh Steelers', oppAbbr: 'PIT', home: false, result: null, type: 'reg', note: 'SNF' },
  { week: 14, date: '2026-12-13', time: '12:00', opp: 'Washington Commanders', oppAbbr: 'WAS', home: false, result: null, type: 'reg' },
  { week: 15, date: '2026-12-20', time: '12:00', opp: 'Jacksonville Jaguars', oppAbbr: 'JAX', home: true, result: null, type: 'reg' },
  { week: 16, date: '2026-12-24', time: '19:15', opp: 'Philadelphia Eagles', oppAbbr: 'PHI', home: false, result: null, type: 'reg', note: 'TNF Christmas Eve' },
  { week: 17, date: '2027-01-04', time: '19:15', opp: 'Green Bay Packers', oppAbbr: 'GB', home: false, result: null, type: 'reg', note: 'MNF' },
  { week: 18, date: '2027-01-10', time: '12:00', opp: 'Tennessee Titans', oppAbbr: 'TEN', home: true, result: null, type: 'reg', note: 'TBD flex' }
];

/* ---------- Sample Play-by-Play (for offline / demo of a scoring drive) ---------- */
const SAMPLE_PBP = [
  { qtr: 2, clock: '4:12', team: 'HOU', desc: 'C.J. Stroud pass complete to Nico Collins for 18 yards to the LAC 32.', big: false },
  { qtr: 2, clock: '3:41', team: 'HOU', desc: 'Joe Mixon rush left tackle for 7 yards to the LAC 25.', big: false },
  { qtr: 2, clock: '3:05', team: 'HOU', desc: 'C.J. Stroud pass incomplete intended for Dalton Schultz.', big: false },
  { qtr: 2, clock: '2:59', team: 'HOU', desc: 'C.J. Stroud pass complete to Jayden Higgins for 14 yards to the LAC 11. FIRST DOWN.', big: true },
  { qtr: 2, clock: '2:18', team: 'HOU', desc: 'Joe Mixon rush up the middle for 3 yards to the LAC 8.', big: false },
  { qtr: 2, clock: '1:42', team: 'HOU', desc: 'C.J. Stroud pass complete to Nico Collins for 8 yards. TOUCHDOWN. Ka\'imi Fairbairn extra point is GOOD.', big: true, score: true, td: true }
];

/* ---------- Training Camp notes (real intel as of Aug 4 2026) ---------- */
const CAMP_NOTES = [
  {
    date: 'Tue Aug 4',
    text: 'Jayden Higgins (Year 2) continues to blossom. Multiple catches vs All-Pro Derek Stingley Jr., including a 20-yard third-down gain. Nico Collins: “He’s hooping right now.” Stroud expects a dominant Year 2.'
  },
  {
    date: 'Tue Aug 4',
    text: 'C.J. Stroud sharp in second padded practice — only two incompletions, zero turnovers. Strong chemistry with Dalton Schultz and Jayden Higgins. Nico Collins given a rest day.'
  },
  {
    date: 'Tue Aug 4',
    text: 'Linebacker Azeez Al-Shaair slow to get up after collision with TE Dalton Schultz but was fine shortly after. No injury reported.'
  },
  {
    date: 'Mon Aug 3',
    text: 'First day of pads. Physical practice, tempers flared at times. Jadeveon Clowney (re-signed) back on the grass. Offense and defense both showed flashes.'
  },
  {
    date: 'Camp Overview',
    text: '25th season. DeMeco Ryans entering Year 4. Open practices continue through Aug 18 (joint with Raiders). Joint practice with Carolina also scheduled later in camp.'
  }
];

const CAMP_OPEN_DATES = [
  'Wed Aug 5 · 9 a.m.',
  'Fri Aug 7 · 9 a.m.',
  'Sat Aug 8 · 6 p.m.',
  'Mon Aug 10 · 9 a.m.',
  'Tue Aug 18 · 9 a.m. (Joint Practice vs Las Vegas Raiders)'
];

/* ---------- 2025 season snapshot (public) ---------- */
const TEAM_STATS_2025 = [
  { label: 'Record', value: '12-5' },
  { label: 'Points For', value: '23.8' },
  { label: 'Points Against', value: '17.4' },
  { label: 'Pass Yds/G', value: '218.1' },
  { label: 'Rush Yds/G', value: '108.9' },
  { label: 'AFC South', value: '2nd' }
];

const KEY_PLAYERS = [
  { name: 'C.J. Stroud', pos: 'QB', note: 'Franchise QB, Year 4' },
  { name: 'Nico Collins', pos: 'WR', note: 'Pro Bowl target' },
  { name: 'Jayden Higgins', pos: 'WR', note: 'Rising Year-2 breakout candidate' },
  { name: 'Will Anderson Jr.', pos: 'DE', note: 'Edge force' },
  { name: 'Derek Stingley Jr.', pos: 'CB', note: 'All-Pro shutdown corner' },
  { name: 'Azeez Al-Shaair', pos: 'LB', note: 'Defensive leader' },
  { name: 'Jadeveon Clowney', pos: 'DE', note: 'Hometown reunion 2026' }
];

/* ---------- State ---------- */
let currentSection = 'game';
let selectedGame = null;

/* ---------- DOM helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ---------- Navigation ---------- */
function showSection(id) {
  currentSection = id;
  $$('.section').forEach((s) => s.classList.remove('active'));
  $(`#sec-${id}`).classList.add('active');
  $$('.nav-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.sec === id);
  });
  if (id === 'pbp') renderPBP();
  if (id === 'news') loadNews();
}

$$('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => showSection(btn.dataset.sec));
});

/* ---------- Schedule ---------- */
function renderSchedule() {
  const list = $('#scheduleList');
  list.innerHTML = '';
  const now = new Date();

  SCHEDULE_2026.forEach((g, idx) => {
    if (g.type === 'bye') {
      const row = document.createElement('div');
      row.className = 'game-row';
      row.innerHTML = `<div class="game-date"><span class="day">BYE</span></div>
        <div class="game-info"><div class="game-opp">Week 8 — Bye Week</div></div>`;
      list.appendChild(row);
      return;
    }

    const d = new Date(g.date + 'T' + (g.time || '12:00') + ':00');
    const isNext = !selectedGame && d > now && !g.result;
    const isPast = d < now && g.result;

    const row = document.createElement('div');
    row.className = 'game-row';
    row.dataset.idx = idx;

    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });

    let resultHtml = '';
    if (g.result) {
      const cls = g.result.startsWith('W') ? 'w' : g.result.startsWith('L') ? 'l' : 't';
      resultHtml = `<div class="game-result ${cls}">${g.result}</div>`;
    } else if (isNext) {
      resultHtml = `<div class="game-result"><span class="next-badge">NEXT</span></div>`;
    }

    row.innerHTML = `
      <div class="game-date">
        <span class="day">${weekday}</span>
        ${monthDay}
      </div>
      <div class="game-info">
        <div class="game-opp">${g.home ? 'vs' : '@'} ${g.opp}${isNext ? ' <span class="next-badge">NEXT</span>' : ''}</div>
        <div class="game-meta">${g.type === 'pre' ? 'Preseason' : 'Week ' + g.week}${g.note ? ' · ' + g.note : ''} · ${g.time ? formatTime(g.time) : ''}</div>
      </div>
      ${resultHtml}
    `;

    row.addEventListener('click', () => {
      selectedGame = g;
      showSection('pbp');
      renderPBP();
    });

    list.appendChild(row);
  });
}

function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 || 12;
  return `${hr}:${m.toString().padStart(2, '0')} ${ampm} CT`;
}

/* ---------- Game Center + Countdown ---------- */
function getNextGame() {
  const now = new Date();
  return SCHEDULE_2026.find((g) => g.date && new Date(g.date + 'T' + (g.time || '12:00') + ':00') > now);
}

function renderGameCenter() {
  const next = getNextGame();
  const content = $('#gameCenterContent');

  if (!next) {
    content.innerHTML = `<div class="empty">Season complete or schedule ended.</div>`;
    return;
  }

  const kick = new Date(next.date + 'T' + (next.time || '12:00') + ':00');
  const isLive = false; // No live game right now (Aug 4 2026 — still camp)

  content.innerHTML = `
    <div class="team-block">
      <div class="team-abbr">${next.home ? 'HOU' : next.oppAbbr}</div>
      <div class="team-score ${next.home ? 'home' : ''}">—</div>
    </div>
    <div class="vs-clock">
      <div style="font-size:1.1rem;font-weight:700;color:var(--red-bright)">${isLive ? 'LIVE' : 'UPCOMING'}</div>
      <div>${next.type === 'pre' ? 'Preseason' : 'Week ' + next.week}</div>
    </div>
    <div class="team-block">
      <div class="team-abbr">${next.home ? next.oppAbbr : 'HOU'}</div>
      <div class="team-score ${!next.home ? 'home' : ''}">—</div>
    </div>
  `;

  // Rebuild score-row properly
  content.innerHTML = `
    <div class="score-row">
      <div class="team-block">
        <div class="team-abbr">${next.home ? 'HOU' : next.oppAbbr}</div>
        <div class="team-score ${next.home ? 'home' : ''}">—</div>
      </div>
      <div class="vs-clock">
        <div style="font-size:1rem;font-weight:700;color:var(--red-bright)">${isLive ? 'LIVE' : 'UPCOMING'}</div>
        <div style="margin-top:4px">${next.type === 'pre' ? 'Preseason' : 'Wk ' + next.week}</div>
      </div>
      <div class="team-block">
        <div class="team-abbr">${next.home ? next.oppAbbr : 'HOU'}</div>
        <div class="team-score">${!next.home ? '—' : '—'}</div>
      </div>
    </div>
    <div class="situation">
      <span>${next.home ? 'vs' : '@'} <strong>${next.opp}</strong></span>
      <span>${kick.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · ${formatTime(next.time)}</span>
      ${next.note ? `<span>${next.note}</span>` : ''}
    </div>
  `;

  // Next preview + countdown
  $('#nextGamePreview').textContent = `${next.home ? 'vs' : '@'} ${next.opp} · ${kick.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
  startCountdown(kick);
}

function startCountdown(target) {
  const el = $('#countdown');
  function tick() {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000);
    diff %= 86400000;
    const hrs = Math.floor(diff / 3600000);
    diff %= 3600000;
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    el.innerHTML = `
      <div class="cd-block"><div class="cd-num">${days}</div><div class="cd-label">Days</div></div>
      <div class="cd-block"><div class="cd-num">${hrs.toString().padStart(2,'0')}</div><div class="cd-label">Hrs</div></div>
      <div class="cd-block"><div class="cd-num">${mins.toString().padStart(2,'0')}</div><div class="cd-label">Min</div></div>
      <div class="cd-block"><div class="cd-num">${secs.toString().padStart(2,'0')}</div><div class="cd-label">Sec</div></div>
    `;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- Play-by-Play ---------- */
function renderPBP() {
  const list = $('#pbpList');
  const label = $('#pbpGameLabel');

  if (selectedGame) {
    label.textContent = `· ${selectedGame.home ? 'vs' : '@'} ${selectedGame.oppAbbr}`;
  } else {
    label.textContent = '· Sample scoring drive';
  }

  // For v1 we show rich sample PBP (real live requires game in progress + CORS-friendly endpoint)
  // Structure is ready for future live injection
  list.innerHTML = '';
  const driveHeader = document.createElement('div');
  driveHeader.className = 'drive-header';
  driveHeader.textContent = selectedGame
    ? `Sample drive illustration — real play-by-play appears when a game is live / recently finished (public ESPN data).`
    : `Sample scoring drive (Texans style) — real data loads when available.`;
  list.appendChild(driveHeader);

  SAMPLE_PBP.slice().reverse().forEach((p) => {
    const div = document.createElement('div');
    div.className = 'play' + (p.big ? ' big' : '') + (p.score ? ' score' : '') + (p.td ? ' td' : '');
    div.innerHTML = `
      <div class="play-time">Q${p.qtr}<br>${p.clock}</div>
      <div class="play-body">
        <div class="play-desc">${p.desc}</div>
      </div>
    `;
    list.appendChild(div);
  });
}

/* ---------- Training Camp ---------- */
function renderCamp() {
  const box = $('#campUpdates');
  box.innerHTML = '';
  CAMP_NOTES.forEach((n) => {
    const div = document.createElement('div');
    div.className = 'camp-note';
    div.innerHTML = `<div class="camp-date">${n.date}</div><div class="camp-text">${n.text}</div>`;
    box.appendChild(div);
  });

  $('#campDates').innerHTML = CAMP_OPEN_DATES.map((d) => `<div style="padding:4px 0">${d}</div>`).join('');
}

/* ---------- Stats ---------- */
function renderStats() {
  const grid = $('#teamStats');
  grid.innerHTML = TEAM_STATS_2025.map((s) => `
    <div class="stat-item">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  $('#playerWatch').innerHTML = KEY_PLAYERS.map((p) =>
    `<div style="padding:6px 0"><strong>${p.name}</strong> <span style="color:var(--muted)">(${p.pos})</span> — ${p.note}</div>`
  ).join('');
}

/* ---------- News (public ESPN endpoint — best effort) ---------- */
async function loadNews() {
  const list = $('#newsList');
  try {
    const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=8', {
      mode: 'cors'
    });
    if (!res.ok) throw new Error('Network');
    const data = await res.json();
    const articles = (data.articles || []).slice(0, 8);
    if (!articles.length) throw new Error('Empty');

    list.innerHTML = articles.map((a) => `
      <div class="news-item">
        <a href="${a.links?.web?.href || '#'}" target="_blank" rel="noopener">${a.headline}</a>
        <div class="news-meta">${a.published ? new Date(a.published).toLocaleDateString() : ''} · ${a.description || ''}</div>
      </div>
    `).join('');
  } catch (e) {
    list.innerHTML = `
      <div class="empty">
        Could not reach public news feed (offline or blocked).<br>
        Camp notes and schedule remain fully available offline.
      </div>
      <div class="news-item">
        <a href="https://www.houstontexans.com/news" target="_blank" rel="noopener">Official Texans News</a>
        <div class="news-meta">houstontexans.com</div>
      </div>
      <div class="news-item">
        <a href="https://www.espn.com/nfl/team/_/name/hou/houston-texans" target="_blank" rel="noopener">ESPN Texans Hub</a>
        <div class="news-meta">Public source</div>
      </div>
    `;
  }
}

/* ---------- Local Notes ---------- */
function loadNotes() {
  const saved = localStorage.getItem('texans-hq-notes-v1');
  if (saved) $('#notesArea').value = saved;
}

function saveNotes() {
  localStorage.setItem('texans-hq-notes-v1', $('#notesArea').value);
  const btn = $('#saveNotesBtn');
  btn.textContent = 'Saved ✓';
  setTimeout(() => { btn.textContent = 'Save Notes'; }, 1500);
}

$('#saveNotesBtn').addEventListener('click', saveNotes);
$('#clearNotesBtn').addEventListener('click', () => {
  if (confirm('Clear all local notes?')) {
    $('#notesArea').value = '';
    localStorage.removeItem('texans-hq-notes-v1');
  }
});

/* ---------- Service Worker ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => {
        const pill = $('#statusPill');
        if (pill) {
          pill.textContent = 'v2 · Offline-ready';
          pill.classList.remove('live');
        }
      })
      .catch(() => {
        const pill = $('#statusPill');
        if (pill) pill.textContent = 'v2 · SW optional';
      });
  });
}

/* ---------- Init ---------- */
function init() {
  renderSchedule();
  renderGameCenter();
  renderCamp();
  renderStats();
  loadNotes();
  // Pre-warm news in background
  setTimeout(loadNews, 800);
}

/* Start: check password first */
if (setupLock()) {
  // Already unlocked on this device
  init();
}
