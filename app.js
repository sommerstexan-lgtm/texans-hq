/* ============================================================
   Texans HQ — Personal PWA  v13.0
   Privacy-first • Offline-friendly • Self-contained
   Password-protected (remembers device)
   High-contrast light theme
   ============================================================ */

const APP_PASSWORD = 'texans2026';
/* Stable key — never changes across versions so the device stays unlocked */
const UNLOCK_KEY = 'texans-hq-device-unlocked';
/* Old keys from previous versions (for one-time migration) */
const LEGACY_UNLOCK_KEYS = [
  'texans-hq-unlocked-v2',
  'texans-hq-unlocked-v3',
  'texans-hq-unlocked-v4',
  'texans-hq-unlocked-v5',
  'texans-hq-unlocked-v6'
];

const TEXANS = {
  id: 34,
  abbr: 'HOU',
  name: 'Houston Texans',
  color: '#03202F',
  red: '#A71930'
};

/* ---------- Password Lock ---------- */
function isUnlocked() {
  if (localStorage.getItem(UNLOCK_KEY) === 'true') return true;
  // One-time migration from older version keys
  for (const k of LEGACY_UNLOCK_KEYS) {
    if (localStorage.getItem(k) === 'true') {
      localStorage.setItem(UNLOCK_KEY, 'true');
      return true;
    }
  }
  return false;
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
  { week: 'PS1', date: '2026-08-13', time: '19:00', opp: 'Los Angeles Chargers', oppAbbr: 'LAC', home: true, result: null, type: 'pre', tv: 'Local (KTRK)' },
  { week: 'PS2', date: '2026-08-20', time: '19:00', opp: 'Las Vegas Raiders', oppAbbr: 'LV', home: true, result: null, type: 'pre', tv: 'ESPN' },
  { week: 'PS3', date: '2026-08-28', time: '18:00', opp: 'Carolina Panthers', oppAbbr: 'CAR', home: false, result: null, type: 'pre', tv: 'Local (KTRK)' },
  // Regular
  { week: 1, date: '2026-09-13', time: '12:00', opp: 'Buffalo Bills', oppAbbr: 'BUF', home: true, result: null, type: 'reg', tv: 'CBS' },
  { week: 2, date: '2026-09-20', time: '12:00', opp: 'Cincinnati Bengals', oppAbbr: 'CIN', home: true, result: null, type: 'reg', tv: 'CBS' },
  { week: 3, date: '2026-09-27', time: '12:00', opp: 'Indianapolis Colts', oppAbbr: 'IND', home: false, result: null, type: 'reg', tv: 'CBS' },
  { week: 4, date: '2026-10-04', time: '12:00', opp: 'Dallas Cowboys', oppAbbr: 'DAL', home: true, result: null, type: 'reg', tv: 'FOX' },
  { week: 5, date: '2026-10-11', time: '12:00', opp: 'Tennessee Titans', oppAbbr: 'TEN', home: false, result: null, type: 'reg', tv: 'CBS' },
  { week: 6, date: '2026-10-18', time: '08:30', opp: 'Jacksonville Jaguars', oppAbbr: 'JAX', home: false, result: null, type: 'reg', note: 'London (Wembley)', tv: 'NFL Network' },
  { week: 7, date: '2026-10-25', time: '12:00', opp: 'New York Giants', oppAbbr: 'NYG', home: true, result: null, type: 'reg', tv: 'FOX' },
  { week: 8, date: null, time: null, opp: 'BYE', oppAbbr: '—', home: true, result: null, type: 'bye', tv: null },
  { week: 9, date: '2026-11-08', time: '15:05', opp: 'Los Angeles Chargers', oppAbbr: 'LAC', home: false, result: null, type: 'reg', tv: 'CBS' },
  { week: 10, date: '2026-11-15', time: '12:00', opp: 'Cleveland Browns', oppAbbr: 'CLE', home: false, result: null, type: 'reg', tv: 'FOX' },
  { week: 11, date: '2026-11-19', time: '19:15', opp: 'Indianapolis Colts', oppAbbr: 'IND', home: true, result: null, type: 'reg', note: 'TNF', tv: 'Prime Video' },
  { week: 12, date: '2026-11-29', time: '12:00', opp: 'Baltimore Ravens', oppAbbr: 'BAL', home: true, result: null, type: 'reg', tv: 'CBS' },
  { week: 13, date: '2026-12-06', time: '19:20', opp: 'Pittsburgh Steelers', oppAbbr: 'PIT', home: false, result: null, type: 'reg', note: 'SNF', tv: 'NBC' },
  { week: 14, date: '2026-12-13', time: '12:00', opp: 'Washington Commanders', oppAbbr: 'WAS', home: false, result: null, type: 'reg', tv: 'CBS' },
  { week: 15, date: '2026-12-20', time: '12:00', opp: 'Jacksonville Jaguars', oppAbbr: 'JAX', home: true, result: null, type: 'reg', tv: 'CBS' },
  { week: 16, date: '2026-12-24', time: '19:15', opp: 'Philadelphia Eagles', oppAbbr: 'PHI', home: false, result: null, type: 'reg', note: 'TNF Christmas Eve', tv: 'Prime Video' },
  { week: 17, date: '2027-01-04', time: '19:15', opp: 'Green Bay Packers', oppAbbr: 'GB', home: false, result: null, type: 'reg', note: 'MNF', tv: 'ESPN' },
  { week: 18, date: '2027-01-10', time: '12:00', opp: 'Tennessee Titans', oppAbbr: 'TEN', home: true, result: null, type: 'reg', note: 'TBD flex', tv: 'TBD' }
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
  { name: 'C.J. Stroud', pos: 'QB', num: '7', note: 'Franchise QB, Year 4', stats: '2025: 3,700+ pass yds · 20+ TD' },
  { name: 'Nico Collins', pos: 'WR', num: '12', note: 'Pro Bowl target', stats: 'Big-play X receiver' },
  { name: 'Jayden Higgins', pos: 'WR', num: '—', note: 'Year-2 breakout candidate', stats: 'Camp standout vs Stingley' },
  { name: 'Joe Mixon', pos: 'RB', num: '28', note: 'Lead back', stats: 'Between-the-tackles + pass game' },
  { name: 'Dalton Schultz', pos: 'TE', num: '86', note: 'Safety valve / red zone', stats: 'Reliable 3rd-down target' },
  { name: 'Will Anderson Jr.', pos: 'DE', num: '51', note: 'Edge force', stats: 'Primary pass-rush threat' },
  { name: 'Derek Stingley Jr.', pos: 'CB', num: '24', note: 'All-Pro shutdown corner', stats: 'Shadows top WR' },
  { name: 'Azeez Al-Shaair', pos: 'LB', num: '0', note: 'Defensive leader', stats: 'Run fit + communication' },
  { name: 'Jadeveon Clowney', pos: 'DE', num: '—', note: 'Hometown reunion 2026', stats: 'Veteran edge rotation' }
];

/* Demo live state — for testing UI before real 2026 games start */
const LIVE_DEMO = {
  active: true,
  home: true,
  opp: 'Buffalo Bills',
  oppAbbr: 'BUF',
  houScore: 17,
  oppScore: 14,
  qtr: 3,
  clockSeconds: 6 * 60 + 12, // ticking demo clock starts at 6:12
  possession: 'HOU', // HOU or OPP
  down: 2,
  distance: 7,
  yardline: 'Opp 38',
  tendency: { pass: 61, run: 39, note: 'Season early-down + small game tilt' },
  efficiency: {
    thirdDown: '4/9',
    thirdPct: '44%',
    redZone: '1/2',
    redPct: '50% TD',
    timeoutsHou: 2,
    timeoutsOpp: 3
  },
  drive: {
    plays: 5,
    yards: 42,
    time: '2:18',
    summary: 'HOU ball at Opp 38 · 2nd & 7'
  },
  recentPlays: [
    { qtr: 3, clock: '6:12', team: 'HOU', desc: 'C.J. Stroud pass complete to Nico Collins for 12 yards to the BUF 38. FIRST DOWN.', big: true },
    { qtr: 3, clock: '6:41', team: 'HOU', desc: 'Joe Mixon rush left tackle for 5 yards to the BUF 50.', big: false },
    { qtr: 3, clock: '7:15', team: 'HOU', desc: 'C.J. Stroud pass complete to Dalton Schultz for 8 yards to the HOU 45.', big: false },
    { qtr: 3, clock: '7:48', team: 'HOU', desc: 'Joe Mixon rush up the middle for 4 yards to the HOU 37.', big: false }
  ],
  /* Yard line as opponent 38 → FG range: field goal range */
  yardNum: 38,
  yardSide: 'opp', // 'own' or 'opp'
  weather: { temp: 78, wind: '6 mph', note: 'Dome / indoor — weather not a factor' },
  lastUpdated: Date.now()
};

/* Injury / availability (demo — public-style report for testing) */
const INJURY_REPORT = [
  { name: 'Tank Dell', pos: 'WR', status: 'Out', note: 'Season-ending injury recovery path (monitor reports)' },
  { name: 'Azeez Al-Shaair', pos: 'LB', status: 'Questionable', note: 'Bumped in camp; practiced in limited capacity' },
  { name: 'Nico Collins', pos: 'WR', status: 'Probable', note: 'Rest day earlier in camp; expected available' }
];

/* Opponent one-pager (low-bias, public facts style) keyed by abbr */
const OPPONENT_PREVIEWS = {
  BUF: {
    title: 'Buffalo Bills',
    record: '2025 context: perennial AFC contender',
    bullets: [
      'Elite QB play — game script often runs through the pass game.',
      'Strong skill group; expect condensed splits and motion.',
      'Defense can generate pressure; protect edges and help center.',
      'Red-zone efficiency is typically a strength — finish drives.',
      'Last meetings: competitive AFC-style games; points at a premium.'
    ],
    sources: 'Public season trends · neutral matchup notes · not a prediction'
  },
  LAC: {
    title: 'Los Angeles Chargers',
    record: 'Preseason opponent',
    bullets: [
      'Preseason focus: evaluate depth and starter snaps carefully.',
      'Watch young receivers and secondary depth under live speed.',
      'Special teams and tackle consistency often tell the real story early.'
    ],
    sources: 'Preseason context · public roster notes'
  },
  DEFAULT: {
    title: 'Opponent',
    record: 'Preview available closer to kickoff',
    bullets: [
      'Record, main weapons, and schematic notes will appear here.',
      'Injury line and TV channel stay on the schedule card.'
    ],
    sources: 'Updated from public sources before game week'
  }
};


/* Win probability series for demo graph (simplified model points, not ESPN) */
const WP_SERIES_DEMO = [
  { t: 0, hou: 52 }, { t: 1, hou: 48 }, { t: 2, hou: 55 }, { t: 3, hou: 61 },
  { t: 4, hou: 58 }, { t: 5, hou: 64 }, { t: 6, hou: 62 }, { t: 7, hou: 67 }
];

/* Depth chart simplified */
const DEPTH_CHART = {
  offense: [
    { unit: 'QB', players: ['C.J. Stroud', 'Backup QB'] },
    { unit: 'RB', players: ['Joe Mixon', 'Dameon Pierce', 'Dare Ogunbowale'] },
    { unit: 'WR', players: ['Nico Collins', 'Jayden Higgins', 'Xavier Hutchinson'] },
    { unit: 'TE', players: ['Dalton Schultz', 'Brevin Jordan'] },
    { unit: 'OL (core)', players: ['LT', 'LG', 'C', 'RG', 'RT'] }
  ],
  defense: [
    { unit: 'EDGE', players: ['Will Anderson Jr.', 'Jadeveon Clowney'] },
    { unit: 'DL', players: ['Interior rotation'] },
    { unit: 'LB', players: ['Azeez Al-Shaair', 'Linebacker group'] },
    { unit: 'CB', players: ['Derek Stingley Jr.', 'Kamari Lassiter'] },
    { unit: 'S', players: ['Safety duo'] }
  ]
};

/* What to watch this week */
const WATCH_THIS_WEEK = [
  { title: 'Stroud → Higgins chemistry', detail: 'Year-2 WR continuing camp momentum into live reps.' },
  { title: 'Edge pressure package', detail: 'Anderson + Clowney rotation and how often they align together.' },
  { title: 'Run-game efficiency', detail: 'Early-down success rate sets up play-action later.' },
  { title: 'TV / availability', detail: 'Check schedule card for network — Prime games need your existing subscription.' }
];

/* Recent history vs opponents (public-style sample) */
const OPPONENT_HISTORY = {
  BUF: [
    { year: '2024', result: 'L', score: '20-24', note: 'Home' },
    { year: '2023', result: 'L', score: '22-31', note: 'Away' }
  ],
  LAC: [
    { year: '2025', result: 'W', score: '32-27', note: 'Sample prior' },
    { year: '2022', result: 'L', score: '24-27', note: 'Away' }
  ],
  DEFAULT: [
    { year: '—', result: '', score: 'No recent listed', note: 'Will fill as season progresses' }
  ]
};

let liveRefreshTimer = null;

/* Sample completed game recap (demo) */
const SAMPLE_RECAP = {
  opp: 'Los Angeles Chargers',
  oppAbbr: 'LAC',
  result: 'W 21-17',
  houScore: 21,
  oppScore: 17,
  teamStats: [
    { label: 'Total yards', hou: 352, opp: 318 },
    { label: 'Pass yards', hou: 241, opp: 198 },
    { label: 'Rush yards', hou: 111, opp: 120 },
    { label: 'Turnovers', hou: 1, opp: 2 }
  ],
  outstanding: [
    'Nico Collins  7-118-1',
    'Will Anderson  2 sacks'
  ],
  solid: [
    'C.J. Stroud  21/33, 241 yds, 2 TD, 1 INT'
  ],
  quiet: [
    'Joe Mixon  12 car, 38 yds'
  ]
};

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
  if (id === 'news') loadNews(false);
  if (id === 'camp') loadCamp(false);
}

$$('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => showSection(btn.dataset.sec));
});

/* ---------- Schedule ---------- */
function renderSchedule() {
  const list = $('#scheduleList');
  list.innerHTML = '';
  const now = new Date();

  // Find the single true next game (first future game with no result)
  let nextIdx = -1;
  SCHEDULE_2026.forEach((g, idx) => {
    if (nextIdx >= 0 || g.type === 'bye' || !g.date || g.result) return;
    const d = new Date(g.date + 'T' + (g.time || '12:00') + ':00');
    if (d > now) nextIdx = idx;
  });

  SCHEDULE_2026.forEach((g, idx) => {
    if (g.type === 'bye') {
      const row = document.createElement('div');
      row.className = 'game-row';
      row.innerHTML = `<div class="game-date"><span class="day">BYE</span></div>
        <div class="game-info"><div class="game-opp">Week 8 — Bye Week</div></div>
        <div class="game-week">Wk 8</div>`;
      list.appendChild(row);
      return;
    }

    const d = new Date(g.date + 'T' + (g.time || '12:00') + ':00');
    const isNext = idx === nextIdx;

    const row = document.createElement('div');
    row.className = 'game-row' + (isNext ? ' is-next' : '');
    row.dataset.idx = idx;

    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });

    // Right side: result if played, otherwise week number. NEXT badge only on true next (near opponent).
    let rightHtml = '';
    if (g.result) {
      const cls = g.result.startsWith('W') ? 'w' : g.result.startsWith('L') ? 'l' : 't';
      rightHtml = `<div class="game-result ${cls}">${g.result}</div>`;
    } else {
      const weekLabel = g.type === 'pre' ? g.week : ('Wk ' + g.week);
      rightHtml = `<div class="game-week">${weekLabel}</div>`;
    }

    row.innerHTML = `
      <div class="game-date">
        <span class="day">${weekday}</span>
        ${monthDay}
      </div>
      <div class="game-info">
        <div class="game-opp">${g.home ? 'vs' : '@'} ${g.opp}${isNext ? ' <span class="next-badge">NEXT</span>' : ''}</div>
        <div class="game-meta">${g.type === 'pre' ? 'Preseason' : 'Week ' + g.week}${g.note ? ' · ' + g.note : ''} · ${g.time ? formatTime(g.time) : ''}${g.tv ? ' · <span class="tv-badge' + (g.tv === 'Prime Video' ? ' prime' : '') + '">' + g.tv + '</span>' : ''}</div>
      </div>
      ${rightHtml}
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


function stopLiveRefresh() {
  if (liveRefreshTimer) {
    clearInterval(liveRefreshTimer);
    liveRefreshTimer = null;
  }
}

function startLiveRefresh() {
  stopLiveRefresh();
  if (!LIVE_DEMO.active) return;
  liveRefreshTimer = setInterval(() => {
    if (!LIVE_DEMO.active) { stopLiveRefresh(); return; }
    // Tick the demo game clock down 1 second
    if (typeof LIVE_DEMO.clockSeconds === 'number' && LIVE_DEMO.clockSeconds > 0) {
      LIVE_DEMO.clockSeconds -= 1;
      const clockEl = $('#liveGameClock');
      if (clockEl) clockEl.textContent = formatClock(LIVE_DEMO.clockSeconds);
    }
    LIVE_DEMO.lastUpdated = Date.now();
    const el = $('#liveUpdatedAt');
    if (el) el.textContent = 'Updated ' + timeAgo(LIVE_DEMO.lastUpdated);
    const el2 = $('#dataFreshness');
    if (el2) el2.textContent = 'Data fresh · ' + timeAgo(LIVE_DEMO.lastUpdated);
  }, 1000);
}

function formatClock(totalSec) {
  totalSec = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return m + ':' + s.toString().padStart(2, '0');
}

/* Special-teams range from yard line (simplified) */
function fgRangeLabel(yardSide, yardNum) {
  // Convert to yards from goal for the offense
  const toGoal = yardSide === 'opp' ? yardNum : (100 - yardNum);
  if (toGoal <= 33) return { text: 'FG range', cls: 'fg-in' };
  if (toGoal <= 40) return { text: 'Long FG', cls: 'fg-long' };
  if (toGoal <= 50) return { text: 'Just outside FG', cls: 'fg-out' };
  return { text: 'Not FG range', cls: 'fg-far' };
}

function timeAgo(ts) {
  const sec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (sec < 5) return 'just now';
  if (sec < 60) return sec + 's ago';
  const m = Math.floor(sec / 60);
  if (m < 60) return m + 'm ago';
  return Math.floor(m / 60) + 'h ago';
}



function renderWinProbCard() {
  const card = $('#winProbCard');
  const el = $('#winProbContent');
  if (!card || !el) return;
  if (!LIVE_DEMO.active) {
    card.style.display = 'none';
    return;
  }
  card.style.display = '';
  const series = WP_SERIES_DEMO;
  const last = series[series.length - 1].hou;
  const w = 280, h = 64, pad = 4;
  const maxT = series[series.length - 1].t || 1;
  const pts = series.map((p) => {
    const x = pad + (p.t / maxT) * (w - pad * 2);
    const y = pad + (1 - p.hou / 100) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  el.innerHTML = `
    <div class="wp-header">
      <span>HOU win %</span>
      <span class="wp-pct">${last}%</span>
    </div>
    <svg class="wp-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-label="Simplified win probability chart">
      <polyline fill="none" stroke="#03202F" stroke-width="2.5" points="${pts}" />
      <line x1="${pad}" y1="${h/2}" x2="${w-pad}" y2="${h/2}" stroke="#E2E6EA" stroke-width="1" />
    </svg>
    <div class="wp-note">Simplified model (score + time + field tilt) — not ESPN’s official number.</div>
    <div class="live-updated" id="liveUpdatedAt">Updated ${new Date().toLocaleTimeString()}</div>
  `;
}

function renderWatchWeekCard() {
  const el = $('#watchWeekContent');
  if (!el) return;
  el.innerHTML = WATCH_THIS_WEEK.map(w =>
    `<div class="watch-item"><strong>${w.title}</strong><br>${w.detail}</div>`
  ).join('');
}

function renderHistoryCard() {
  const el = $('#historyContent');
  if (!el) return;
  let abbr = 'BUF';
  if (LIVE_DEMO.active) abbr = LIVE_DEMO.oppAbbr;
  else {
    const next = getNextGame();
    if (next) abbr = next.oppAbbr;
  }
  const rows = OPPONENT_HISTORY[abbr] || OPPONENT_HISTORY.DEFAULT;
  el.innerHTML = rows.map(r => `
    <div class="hist-row">
      <span>${r.year} · ${r.note}</span>
      <span class="hist-result ${r.result.toLowerCase()}">${r.result} ${r.score}</span>
    </div>
  `).join('') + `<p class="tend-note">Sample public-style results for layout — verify official records.</p>`;
}

function renderDepthChart() {
  const el = $('#depthChart');
  if (!el) return;
  const block = (title, units) => `
    <div class="depth-unit">
      <h4>${title}</h4>
      ${units.map(u => `
        <div class="small" style="margin:4px 0 2px;font-weight:600">${u.unit}</div>
        <div class="depth-line">
          ${u.players.map((name, i) =>
            `<span class="depth-chip${i === 0 ? ' starter' : ''}">${name}</span>`
          ).join('')}
        </div>
      `).join('')}
    </div>`;
  el.innerHTML = block('Offense', DEPTH_CHART.offense) + block('Defense', DEPTH_CHART.defense) +
    `<p class="tend-note">Simplified starters-first view — not an official depth chart.</p>`;
}

function renderGameCenter() {
  const content = $('#gameCenterContent');
  const modePill = $('#gameModePill');
  const tendencyCard = $('#tendencyCard');
  const efficiencyCard = $('#efficiencyCard');
  const driveCard = $('#driveCard');
  const injuryCard = $('#injuryCard');
  const opponentCard = $('#opponentCard');
  const recapCard = $('#recapCard');
  const upcomingCard = $('#upcomingCard');

  renderInjuryCard();
  renderOpponentCard();
  renderWatchWeekCard();
  renderHistoryCard();

  if (LIVE_DEMO.active) {
    if (modePill) {
      modePill.textContent = 'Demo live';
      modePill.classList.add('live');
    }
    const possHou = LIVE_DEMO.possession === 'HOU';
    const fg = fgRangeLabel(LIVE_DEMO.yardSide || 'opp', LIVE_DEMO.yardNum || 38);
    content.innerHTML = `
      <div class="score-row">
        <div class="team-block">
          <div class="team-abbr">HOU</div>
          <div class="team-score home">${LIVE_DEMO.houScore}</div>
        </div>
        <div class="vs-clock">
          <div style="font-size:1rem;font-weight:700;color:var(--danger)">LIVE</div>
          <div style="margin-top:4px">Q${LIVE_DEMO.qtr} · <span id="liveGameClock">${formatClock(LIVE_DEMO.clockSeconds)}</span></div>
        </div>
        <div class="team-block">
          <div class="team-abbr">${LIVE_DEMO.oppAbbr}</div>
          <div class="team-score">${LIVE_DEMO.oppScore}</div>
        </div>
      </div>
      <div class="possession-row">
        <div class="possession-pill ${possHou ? '' : 'away'}">${possHou ? 'HOU BALL' : LIVE_DEMO.oppAbbr + ' BALL'}</div>
      </div>
      <div class="situation-bar">
        <span><strong>${ordSuffix(LIVE_DEMO.down)} & ${LIVE_DEMO.distance}</strong></span>
        <span>${LIVE_DEMO.yardline}</span>
        <span class="fg-pill ${fg.cls}">${fg.text}</span>
      </div>
      <div class="timeout-row">
        <span class="to-chip">HOU timeouts: <strong>${LIVE_DEMO.efficiency.timeoutsHou}</strong></span>
        <span class="to-chip">${LIVE_DEMO.oppAbbr} timeouts: <strong>${LIVE_DEMO.efficiency.timeoutsOpp}</strong></span>
      </div>
      <div class="weather-row small">${LIVE_DEMO.weather ? LIVE_DEMO.weather.note : ''}</div>
      <div class="live-updated" id="dataFreshness">Data fresh · just now</div>
      <div class="demo-toggle">
        <button type="button" class="active" id="btnDemoLive">Demo live</button>
        <button type="button" id="btnDemoRecap">Sample recap</button>
        <button type="button" id="btnDemoUpcoming">Upcoming only</button>
      </div>
    `;

    if (tendencyCard && possHou) {
      tendencyCard.style.display = '';
      const t = LIVE_DEMO.tendency;
      $('#tendencyContent').innerHTML = `
        <div class="tendency-bars">
          <div class="tend-row">
            <span class="tend-label">Pass</span>
            <div class="tend-track"><div class="tend-fill pass" style="width:${t.pass}%"></div></div>
            <span class="tend-pct">${t.pass}%</span>
          </div>
          <div class="tend-row">
            <span class="tend-label">Run</span>
            <div class="tend-track"><div class="tend-fill" style="width:${t.run}%"></div></div>
            <span class="tend-pct">${t.run}%</span>
          </div>
        </div>
        <div class="tend-note">${t.note} · not a guarantee</div>
      `;
    } else if (tendencyCard) {
      tendencyCard.style.display = 'none';
    }

    if (efficiencyCard) {
      efficiencyCard.style.display = '';
      const e = LIVE_DEMO.efficiency;
      $('#efficiencyContent').innerHTML = `
        <div class="eff-grid">
          <div class="eff-item">
            <div class="eff-value">${e.thirdDown}</div>
            <div class="eff-label">3rd down · ${e.thirdPct}</div>
          </div>
          <div class="eff-item">
            <div class="eff-value">${e.redZone}</div>
            <div class="eff-label">Red zone · ${e.redPct}</div>
          </div>
        </div>
        <div class="tend-note mt-8">This-game snapshot · updates with live data when available</div>
      `;
    }

    if (driveCard) {
      driveCard.style.display = '';
      const d = LIVE_DEMO.drive;
      const mini = LIVE_DEMO.recentPlays.slice(0, 3).map(pl =>
        `<div>Q${pl.qtr} ${pl.clock} — ${pl.desc}</div>`
      ).join('');
      $('#driveSummary').innerHTML = `
        <div class="drive-meta">
          <strong>${d.plays} plays</strong> · ${d.yards} yards · ${d.time}<br>${d.summary}
        </div>
        <div class="drive-plays-mini">${mini}</div>
      `;
    }

    if (injuryCard) injuryCard.style.display = '';
    if (opponentCard) opponentCard.style.display = '';
    const watchWeekCard = $('#watchWeekCard');
    const historyCard = $('#historyCard');
    if (watchWeekCard) watchWeekCard.style.display = '';
    if (historyCard) historyCard.style.display = '';
    if (recapCard) recapCard.style.display = 'none';
    if (upcomingCard) upcomingCard.style.display = 'none';
    renderWinProbCard();
    startLiveRefresh();
    wireDemoToggles();
    return;
  }

  // Upcoming mode
  if (modePill) {
    modePill.textContent = 'Upcoming';
    modePill.classList.remove('live');
  }
  stopLiveRefresh();
  if (tendencyCard) tendencyCard.style.display = 'none';
  if (efficiencyCard) efficiencyCard.style.display = 'none';
  if (driveCard) driveCard.style.display = 'none';
  if (recapCard) recapCard.style.display = 'none';
  const winProbCard = $('#winProbCard');
  if (winProbCard) winProbCard.style.display = 'none';
  if (injuryCard) injuryCard.style.display = '';
  if (opponentCard) opponentCard.style.display = '';
  const watchWeekCard = $('#watchWeekCard');
  const historyCard = $('#historyCard');
  if (watchWeekCard) watchWeekCard.style.display = '';
  if (historyCard) historyCard.style.display = '';
  if (upcomingCard) upcomingCard.style.display = '';

  const next = getNextGame();
  if (!next) {
    content.innerHTML = `<div class="empty">Season complete or schedule ended.</div>`;
    return;
  }
  const kick = new Date(next.date + 'T' + (next.time || '12:00') + ':00');
  content.innerHTML = `
    <div class="score-row">
      <div class="team-block">
        <div class="team-abbr">${next.home ? 'HOU' : next.oppAbbr}</div>
        <div class="team-score ${next.home ? 'home' : ''}">—</div>
      </div>
      <div class="vs-clock">
        <div style="font-size:1rem;font-weight:700;color:var(--navy)">UPCOMING</div>
        <div style="margin-top:4px">${next.type === 'pre' ? 'Preseason' : 'Wk ' + next.week}</div>
      </div>
      <div class="team-block">
        <div class="team-abbr">${next.home ? next.oppAbbr : 'HOU'}</div>
        <div class="team-score">—</div>
      </div>
    </div>
    <div class="situation-bar">
      <span>${next.home ? 'vs' : '@'} <strong>${next.opp}</strong></span>
      <span>${kick.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · ${formatTime(next.time)}</span>
      ${next.tv ? `<span class="tv-badge${next.tv === 'Prime Video' ? ' prime' : ''}">${next.tv}</span>` : ''}
    </div>
    <div class="demo-toggle">
      <button type="button" id="btnDemoLive">Demo live</button>
      <button type="button" id="btnDemoRecap">Sample recap</button>
      <button type="button" class="active" id="btnDemoUpcoming">Upcoming only</button>
    </div>
  `;
  $('#nextGamePreview').textContent = `${next.home ? 'vs' : '@'} ${next.opp} · ${kick.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
  startCountdown(kick);
  wireDemoToggles();
}

function ordSuffix(n) {
  if (n === 1) return '1st';
  if (n === 2) return '2nd';
  if (n === 3) return '3rd';
  return n + 'th';
}

function renderInjuryCard() {
  const el = $('#injuryContent');
  if (!el) return;
  el.innerHTML = INJURY_REPORT.map((r) => {
    const cls = r.status.toLowerCase();
    return `<div class="injury-row">
      <span class="injury-status ${cls}">${r.status}</span>
      <div><strong>${r.name}</strong> <span class="small">(${r.pos})</span><br><span class="small">${r.note}</span></div>
    </div>`;
  }).join('') + `<p class="tend-note">Demo/public-style list — replace with official report closer to games. Always verify on team/NFL sources.</p>`;
}

function renderOpponentCard() {
  const el = $('#opponentContent');
  if (!el) return;
  let abbr = 'BUF';
  if (LIVE_DEMO.active) abbr = LIVE_DEMO.oppAbbr;
  else {
    const next = getNextGame();
    if (next) abbr = next.oppAbbr;
  }
  const prev = OPPONENT_PREVIEWS[abbr] || OPPONENT_PREVIEWS.DEFAULT;
  el.innerHTML = `
    <div style="font-weight:700;margin-bottom:4px">${prev.title}</div>
    <div class="small" style="margin-bottom:8px">${prev.record}</div>
    <ul class="opp-bullets">${prev.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    <div class="opp-meta">${prev.sources}</div>
  `;
}

function renderRecapDemo() {
  const content = $('#gameCenterContent');
  const modePill = $('#gameModePill');
  const tendencyCard = $('#tendencyCard');
  const efficiencyCard = $('#efficiencyCard');
  const driveCard = $('#driveCard');
  const injuryCard = $('#injuryCard');
  const opponentCard = $('#opponentCard');
  const recapCard = $('#recapCard');
  const upcomingCard = $('#upcomingCard');
  LIVE_DEMO.active = false;
  if (modePill) {
    modePill.textContent = 'Sample recap';
    modePill.classList.remove('live');
  }
  stopLiveRefresh();
  if (tendencyCard) tendencyCard.style.display = 'none';
  if (efficiencyCard) efficiencyCard.style.display = 'none';
  if (driveCard) driveCard.style.display = 'none';
  if (injuryCard) injuryCard.style.display = 'none';
  if (opponentCard) opponentCard.style.display = 'none';
  const winProbCard = $('#winProbCard');
  const watchWeekCard = $('#watchWeekCard');
  const historyCard = $('#historyCard');
  if (winProbCard) winProbCard.style.display = 'none';
  if (watchWeekCard) watchWeekCard.style.display = 'none';
  if (historyCard) historyCard.style.display = 'none';
  if (upcomingCard) upcomingCard.style.display = 'none';
  if (recapCard) recapCard.style.display = '';

  const r = SAMPLE_RECAP;
  content.innerHTML = `
    <div class="recap-score">HOU ${r.houScore} – ${r.oppScore} ${r.oppAbbr}</div>
    <div class="text-center small">${r.result} · Preseason sample</div>
    <div class="demo-toggle">
      <button type="button" id="btnDemoLive">Demo live</button>
      <button type="button" class="active" id="btnDemoRecap">Sample recap</button>
      <button type="button" id="btnDemoUpcoming">Upcoming only</button>
    </div>
  `;
  $('#recapContent').innerHTML = `
    <div class="recap-stats">
      ${r.teamStats.map(s => `<div><strong>${s.label}</strong><br>HOU ${s.hou} · ${s.opp}</div>`).join('')}
    </div>
    <div class="spotlight-block outstanding">
      <h4>Outstanding</h4>
      ${r.outstanding.map(x => `<div>${x}</div>`).join('')}
    </div>
    <div class="spotlight-block">
      <h4>Solid</h4>
      ${r.solid.map(x => `<div>${x}</div>`).join('')}
    </div>
    <div class="spotlight-block quiet">
      <h4>Quiet</h4>
      ${r.quiet.map(x => `<div>${x}</div>`).join('')}
    </div>
    <p class="tend-note">Rule-based labels from public-style box score thresholds — not official grades.</p>
  `;
  wireDemoToggles();
}

function wireDemoToggles() {
  const live = $('#btnDemoLive');
  const recap = $('#btnDemoRecap');
  const up = $('#btnDemoUpcoming');
  if (live) live.onclick = () => { LIVE_DEMO.active = true; renderGameCenter(); renderPBP(); };
  if (recap) recap.onclick = () => { renderRecapDemo(); };
  if (up) up.onclick = () => { LIVE_DEMO.active = false; renderGameCenter(); renderPBP(); };
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
  list.innerHTML = '';

  if (LIVE_DEMO.active) {
    label.textContent = '· Demo live vs BUF';
    const driveHeader = document.createElement('div');
    driveHeader.className = 'drive-header';
    driveHeader.textContent = `Q${LIVE_DEMO.qtr} ${formatClock(LIVE_DEMO.clockSeconds)} · ${LIVE_DEMO.possession === 'HOU' ? 'HOU ball' : LIVE_DEMO.oppAbbr + ' ball'} · ${LIVE_DEMO.down} & ${LIVE_DEMO.distance} · ${LIVE_DEMO.yardline}`;
    list.appendChild(driveHeader);
    LIVE_DEMO.recentPlays.forEach((play) => {
      const div = document.createElement('div');
      div.className = 'play' + (play.big ? ' big' : '');
      div.innerHTML = `
        <div class="play-time">Q${play.qtr}<br>${play.clock}</div>
        <div class="play-body"><div class="play-desc">${play.desc}</div></div>
      `;
      list.appendChild(div);
    });
    return;
  }

  if (selectedGame) {
    label.textContent = `· ${selectedGame.home ? 'vs' : '@'} ${selectedGame.oppAbbr}`;
  } else {
    label.textContent = '· Sample scoring drive';
  }

  const driveHeader = document.createElement('div');
  driveHeader.className = 'drive-header';
  driveHeader.textContent = selectedGame
    ? `Sample drive illustration — real play-by-play appears when a game is live / recently finished (public data).`
    : `Sample scoring drive (Texans style) — switch Game Center to Demo live for full live UI.`;
  list.appendChild(driveHeader);

  SAMPLE_PBP.slice().reverse().forEach((play) => {
    const div = document.createElement('div');
    div.className = 'play' + (play.big ? ' big' : '') + (play.score ? ' score' : '') + (play.td ? ' td' : '');
    div.innerHTML = `
      <div class="play-time">Q${play.qtr}<br>${play.clock}</div>
      <div class="play-body"><div class="play-desc">${play.desc}</div></div>
    `;
    list.appendChild(div);
  });
}

/* ---------- Training Camp (live ESPN + offline fallback) ---------- */
const CAMP_CACHE_KEY = 'texans-hq-camp-cache-v1';
const NEWS_CACHE_KEY = 'texans-hq-news-cache-v1';

function renderCampStaticFallback(reason) {
  const box = $('#campUpdates');
  if (!box) return;
  const cached = readJsonCache(CAMP_CACHE_KEY);
  if (cached && cached.items && cached.items.length) {
    box.innerHTML = freshnessLine(cached.savedAt, true, reason) +
      cached.items.map(campItemHtml).join('');
    return;
  }
  box.innerHTML = (reason ? `<div class="tend-note" style="margin-bottom:8px">${reason}</div>` : '') +
    CAMP_NOTES.map((n) =>
      `<div class="camp-note"><div class="camp-date">${n.date}</div><div class="camp-text">${n.text}</div></div>`
    ).join('') +
    `<p class="tend-note">Static camp notes (baked into app). Live headlines appear when online.</p>`;
}

function campItemHtml(item) {
  return `<div class="camp-note">
    <div class="camp-date">${item.date || ''}${item.source ? ' · ' + item.source : ''}</div>
    <div class="camp-text">${item.href
      ? `<a href="${item.href}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;font-weight:600">${item.title}</a>`
      : item.title || ''}
    ${item.desc ? `<div class="small" style="margin-top:4px">${item.desc}</div>` : ''}</div>
  </div>`;
}

function freshnessLine(ts, isCached, extra) {
  const when = ts ? timeAgo(ts) : 'unknown';
  const label = isCached ? `Cached · ${when}` : `Updated ${when}`;
  return `<div class="live-updated" style="margin:0 0 10px;text-align:left">${label}${extra ? ' · ' + extra : ''}</div>`;
}

function readJsonCache(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
}

function writeJsonCache(key, payload) {
  try { localStorage.setItem(key, JSON.stringify(payload)); } catch (e) {}
}

function articleToItem(a) {
  const href = (a.links && a.links.web && a.links.web.href) || a.link || '#';
  const title = a.headline || a.title || 'Headline';
  const published = a.published || a.lastModified || '';
  let date = '';
  if (published) {
    try {
      date = new Date(published).toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
      });
    } catch (e) { date = published; }
  }
  return {
    title,
    desc: a.description || '',
    href,
    date,
    published,
    source: 'ESPN'
  };
}

function isCampRelated(item) {
  const t = ((item.title || '') + ' ' + (item.desc || '')).toLowerCase();
  return /camp|practice|pads|joint practice|training|roster cut|preseason|injury|walk-through|walkthrough/.test(t);
}

async function fetchEspnArticles() {
  const urls = [
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=15&team=hou',
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=12'
  ];
  let articles = [];
  let lastErr = null;
  for (const url of urls) {
    try {
      const res = await fetch(url, { mode: 'cors', cache: 'no-store' });
      if (!res.ok) { lastErr = 'HTTP ' + res.status; continue; }
      const data = await res.json();
      const list = data.articles || data.headlines || [];
      if (Array.isArray(list) && list.length) {
        articles = list;
        break;
      }
    } catch (e) {
      lastErr = (e && e.message) ? e.message : 'network';
    }
  }
  if (!articles.length) throw new Error(lastErr || 'No articles');
  return articles.map(articleToItem);
}

async function loadCamp(fromButton) {
  const box = $('#campUpdates');
  const btn = $('#campRefreshBtn');
  if (!box) return;
  if (fromButton && btn) {
    btn.disabled = true;
    btn.textContent = 'Refreshing…';
  }
  // Always paint open-practice dates (static schedule of open sessions)
  const datesEl = $('#campDates');
  if (datesEl) {
    const today = new Date();
    const todayLabel = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    datesEl.innerHTML = CAMP_OPEN_DATES.map((d) => {
      const isToday = d.toLowerCase().indexOf(todayLabel.toLowerCase().replace(',', '')) !== -1
        || d.toLowerCase().indexOf(today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase()) !== -1;
      return `<div style="padding:4px 0">${isToday ? '<strong style="color:var(--navy)">TODAY · </strong>' : ''}${d}</div>`;
    }).join('');
  }

  box.innerHTML = '<div class="loading">Fetching camp updates…</div>';
  try {
    const items = await fetchEspnArticles();
    // Prefer camp/practice stories; if few, keep top Texans headlines as pulse
    let campItems = items.filter(isCampRelated);
    if (campItems.length < 3) {
      const rest = items.filter((it) => !campItems.includes(it));
      campItems = campItems.concat(rest).slice(0, 8);
    } else {
      campItems = campItems.slice(0, 8);
    }
    writeJsonCache(CAMP_CACHE_KEY, { savedAt: Date.now(), items: campItems });
    box.innerHTML = freshnessLine(Date.now(), false) + campItems.map(campItemHtml).join('');
  } catch (e) {
    renderCampStaticFallback('Live camp feed unavailable (' + (e.message || 'offline') + ')');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Refresh';
    }
  }
}

function renderCamp() {
  // Initial paint: show cache/static immediately, then refresh in background
  renderCampStaticFallback('');
  loadCamp(false);
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

  $('#playerWatch').innerHTML = KEY_PLAYERS.map((p) => `
    <div class="player-card">
      <div class="player-card-top">
        <span class="player-name">${p.num && p.num !== '—' ? '#' + p.num + ' ' : ''}${p.name}</span>
        <span class="player-pos">${p.pos}</span>
      </div>
      <div class="player-note">${p.note}</div>
      <div class="player-stats">${p.stats || ''}</div>
    </div>
  `).join('');
  renderDepthChart();
}

/* ---------- News (public ESPN endpoint — best effort) ---------- */
async function loadNews(fromButton) {
  const list = $('#newsList');
  const btn = $('#newsRefreshBtn');
  if (!list) return;
  if (fromButton && btn) {
    btn.disabled = true;
    btn.textContent = 'Refreshing…';
  }

  const cached = readJsonCache(NEWS_CACHE_KEY);
  if (cached && cached.items && cached.items.length) {
    list.innerHTML = freshnessLine(cached.savedAt, true, 'showing last good fetch') +
      cached.items.map(newsItemHtml).join('');
  } else {
    list.innerHTML = '<div class="loading">Fetching public headlines…</div>';
  }

  try {
    const items = await fetchEspnArticles();
    const trimmed = items.slice(0, 10);
    writeJsonCache(NEWS_CACHE_KEY, { savedAt: Date.now(), items: trimmed });
    list.innerHTML = freshnessLine(Date.now(), false) + trimmed.map(newsItemHtml).join('');
  } catch (e) {
    if (cached && cached.items && cached.items.length) {
      list.innerHTML = freshnessLine(cached.savedAt, true, 'live fetch failed — ' + (e.message || 'offline')) +
        cached.items.map(newsItemHtml).join('') +
        `<div class="news-item"><a href="https://www.houstontexans.com/news" target="_blank" rel="noopener">Official Texans News</a><div class="news-meta">houstontexans.com</div></div>`;
    } else {
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
      </div>`;
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Refresh';
    }
  }
}

function newsItemHtml(a) {
  return `<div class="news-item">
    <a href="${a.href || '#'}" target="_blank" rel="noopener">${a.title || 'Headline'}</a>
    <div class="news-meta">${a.date || ''}${a.desc ? ' · ' + a.desc : ''}</div>
  </div>`;
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
          pill.textContent = 'v14 · Live camp/news';
          pill.classList.remove('live');
        }
      })
      .catch(() => {
        const pill = $('#statusPill');
        if (pill) pill.textContent = 'v14 · SW optional';
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
  const newsBtn = $('#newsRefreshBtn');
  if (newsBtn) {
    newsBtn.addEventListener('click', () => loadNews(true));
  }
  const campBtn = $('#campRefreshBtn');
  if (campBtn) {
    campBtn.addEventListener('click', () => loadCamp(true));
  }
  // Pre-warm news + camp in background (network, non-blocking)
  setTimeout(() => loadNews(false), 600);
  setTimeout(() => loadCamp(false), 900);
}

/* Start: check password first */
if (setupLock()) {
  // Already unlocked on this device
  init();
}
