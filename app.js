/* ============================================================
   Texans HQ — Personal PWA  v14.8
   Privacy-first • Offline-friendly • Self-contained
   Password-protected (remembers device)
   High-contrast light theme
   Roster search + pre/post insights
   ============================================================ */

const APP_PASSWORD = 'texans2026';
const APP_VERSION = 'v14.8';
const APP_VERSION_LABEL = 'v14.8 · Roster';

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
  { name: 'C.J. Stroud', pos: 'QB', num: '7', note: 'Franchise QB · Year 4', stats: '2025: 3,700+ pass yds · 20+ TD',
    detail: 'Year-4 starter. Camp focus: timing with Higgins/Schultz, ball security, and early-down mix. Preseason snaps will show the real plan.' },
  { name: 'Nico Collins', pos: 'WR', num: '12', note: 'Pro Bowl X receiver', stats: 'Big-play + contested catches',
    detail: 'Primary vertical threat. Occasional rest days in camp are normal. Watch how defenses scheme him Week 1 vs BUF.' },
  { name: 'Jayden Higgins', pos: 'WR', num: '81', note: 'Year-2 breakout candidate', stats: 'Camp standout vs top CBs',
    detail: 'Strong camp buzz with wins vs Stingley/Lassiter. Preseason targets + third-down usage will tell the story.' },
  { name: 'David Montgomery', pos: 'RB', num: '32', note: 'New lead back', stats: 'Power + between-tackles',
    detail: 'Signed to be the early-down and short-yardage lead. Pass protection and check-downs matter as much as rush yards.' },
  { name: 'Dalton Schultz', pos: 'TE', num: '86', note: 'Safety valve / red zone', stats: 'Reliable intermediate + RZ',
    detail: 'Trusted option for Stroud. Red-zone and 3rd-down snaps are the live-game value markers. Watch workload after prior injury history.' },
  { name: 'Will Anderson Jr.', pos: 'DE', num: '51', note: 'All-Pro edge force', stats: 'Primary pass-rush threat',
    detail: 'Lead edge. How often he pairs with Clowney/Hunter on obvious passing downs is a weekly watch item.' },
  { name: 'Derek Stingley Jr.', pos: 'CB', num: '24', note: 'Shutdown corner', stats: 'Often shadows #1 WR',
    detail: 'Travels with the opponent’s top receiver. Camp 1-on-1s are useful signals, not final grades.' },
  { name: 'Azeez Al-Shaair', pos: 'LB', num: '0', note: 'Defensive leader', stats: 'Run fit + communication',
    detail: 'Communicator and run-fit LB. Extension locked him in. Availability can change fast with camp bumps.' },
  { name: 'Jadeveon Clowney', pos: 'DE', num: '90', note: 'Hometown reunion 2026', stats: 'Veteran edge rotation',
    detail: 'Back on a 1-year deal, #90 reclaimed. Rotational + situational pass-rush alongside Anderson & Hunter. Nostalgia + real edge depth.' },
  { name: 'Danielle Hunter', pos: 'DE', num: '55', note: 'Pro Bowl edge', stats: 'Veteran production',
    detail: 'Key piece of the returning top defense. Pairs with Anderson for one of the strongest edge groups in the AFC.' },
  { name: 'Tank Dell', pos: 'WR', num: '1', note: 'Returning from knee', stats: 'Slot / big-play threat',
    detail: 'Working back from 2024 knee injury that cost him all of 2025. Camp participation and preseason snaps are the real timeline markers.' }
];

const TEAM_STAT_DETAILS = {
  'Record': '2025 regular-season finish. Used here as context only — 2026 results will replace this when the season starts.',
  'Points For': '2025 points scored per game (approx). Offense tempo and red-zone TD rate drive this number.',
  'Points Against': '2025 points allowed per game (approx). Lower is better.',
  'Pass Yds/G': '2025 team passing yards per game.',
  'Rush Yds/G': '2025 team rushing yards per game.',
  'AFC South': '2025 division finish.'
};


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

/* Injury / availability (camp / early preseason — public-style) */
const INJURY_REPORT = [
  { name: 'British Brooks', pos: 'RB', status: 'Out (hand)', note: 'Broke hand in camp, surgery; ~3-week outlook. May miss all preseason.' },
  { name: 'Tank Dell', pos: 'WR', status: 'Returning', note: 'Working back from 2024 knee. Monitor live snaps in preseason.' },
  { name: 'D.J. Turner', pos: 'WR', status: 'IR', note: 'On injured reserve.' },
  { name: 'Azeez Al-Shaair', pos: 'LB', status: 'Monitor', note: 'Any camp bumps are watched closely given his leadership role.' }
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
    record: 'Preseason Week 1 · Aug 13 (home)',
    bullets: [
      'Preseason Week 1 is evaluation more than final score — starters often play limited series.',
      'Watch: Stroud/Mills snap counts, early chemistry with Higgins & the new OL mix (Teller/Rutledge).',
      'Edge rotation: Anderson + Clowney vs Chargers OT depth is useful live data.',
      'Special teams and tackle consistency usually tell the real story in the first preseason game.',
      'Practical tip: local TV (KTRK). Set a reminder; preseason windows can shift slightly.'
    ],
    sources: 'Preseason evaluation priorities · public roster notes'
  },
  DEFAULT: {
    title: 'Opponent',
    record: 'Preview available closer to kickoff',
    bullets: [
      'Record, main weapons, schematic notes, and keys to the game will appear here.',
      'Injury line, TV channel, and history stay on the other cards.',
      'Preseason focus: depth evaluation and starter rest plans. Regular/post: matchup specifics.'
    ],
    sources: 'Updated from public sources before game week'
  }
};


/* Win probability series for demo graph (simplified model points, not ESPN) */
const WP_SERIES_DEMO = [
  { t: 0, hou: 52 }, { t: 1, hou: 48 }, { t: 2, hou: 55 }, { t: 3, hou: 61 },
  { t: 4, hou: 58 }, { t: 5, hou: 64 }, { t: 6, hou: 62 }, { t: 7, hou: 67 }
];

/* Depth chart simplified — camp / early preseason view */
const DEPTH_CHART = {
  offense: [
    { unit: 'QB', players: ['C.J. Stroud', 'Davis Mills', 'Graham Mertz'] },
    { unit: 'RB', players: ['David Montgomery', 'Woody Marks', 'Jawhar Jordan', 'British Brooks'] },
    { unit: 'WR', players: ['Nico Collins', 'Jayden Higgins', 'Tank Dell', 'Xavier Hutchinson', 'Jaylin Noel'] },
    { unit: 'TE', players: ['Dalton Schultz', 'Foster Moreau', 'Brevin Jordan', 'Cade Stover', 'Marlin Klein'] },
    { unit: 'OL (core)', players: ['Aireontae Ersery', 'Wyatt Teller', 'Keylan Rutledge / Jake Andrews', 'Ed Ingram', 'Braden Smith'] }
  ],
  defense: [
    { unit: 'EDGE', players: ['Will Anderson Jr.', 'Danielle Hunter', 'Jadeveon Clowney'] },
    { unit: 'DL', players: ['Sheldon Rankins', 'Tommy Togiai', 'Logan Hall', 'Kayden McDonald'] },
    { unit: 'LB', players: ['Azeez Al-Shaair', 'Henry To\'oTo\'o', 'Marte Mapu', 'E.J. Speed'] },
    { unit: 'CB', players: ['Derek Stingley Jr.', 'Kamari Lassiter', 'Jaylin Smith', 'Tremon Smith'] },
    { unit: 'S', players: ['Calen Bullock', 'Jalen Pitre', 'Reed Blankenship'] }
  ]
};

/* ---------- Full searchable roster (training camp / preseason 2026) ----------
   Phase notes: Camp roster is larger (~90). Regular season cuts to 53 + practice squad.
   Postseason uses the active 53. Numbers & roles can shift after cuts.
   Insights focus on things typical apps skip: camp status, role clarity, father-son watch points, practical viewing notes.
*/
const FULL_ROSTER = [
  // QB
  { name: 'C.J. Stroud', num: '7', pos: 'QB', ht: '6-3', wt: '218', exp: 4, college: 'Ohio State', status: 'Starter', note: 'Franchise QB Year 4. Camp focus = timing + ball security. Preseason early-down mix is the real signal.' },
  { name: 'Davis Mills', num: '10', pos: 'QB', ht: '6-4', wt: '225', exp: 6, college: 'Stanford', status: 'Backup', note: 'Reliable #2. Preseason will get significant snaps while starters rest.' },
  { name: 'Graham Mertz', num: '18', pos: 'QB', ht: '6-2', wt: '216', exp: 2, college: 'Florida', status: 'Camp battle', note: 'Fighting for the #3 / practice-squad path. Preseason tape decides.' },
  // RB
  { name: 'David Montgomery', num: '32', pos: 'RB', ht: '5-11', wt: '230', exp: 8, college: 'Iowa State', status: 'Starter', note: 'New lead back. Power, short-yardage, early downs. Pass-pro still key.' },
  { name: 'Woody Marks', num: '4', pos: 'RB', ht: '5-10', wt: '208', exp: 2, college: 'USC', status: 'Change of pace', note: 'Year-2 all-around back. Expect complementary role + special teams value.' },
  { name: 'Jawhar Jordan', num: '25', pos: 'RB', ht: '5-10', wt: '185', exp: 1, college: 'Louisville', status: 'Speed / depth', note: 'Juice and vision. Camp riser candidate for the 53 or PS.' },
  { name: 'British Brooks', num: '44', pos: 'RB', ht: '5-11', wt: '225', exp: 3, college: 'North Carolina', status: 'ST / depth · Injured', note: 'Broke hand in camp (surgery, ~3-week outlook). Special-teams ace; timeline may affect final cuts.' },
  { name: 'Noah Whittington', num: '26', pos: 'RB', ht: '—', wt: '—', exp: 'R', college: 'Oregon', status: 'Rookie depth', note: 'UDFA. Preseason opportunity if Brooks misses time.' },
  // WR
  { name: 'Nico Collins', num: '12', pos: 'WR', ht: '6-4', wt: '222', exp: 6, college: 'Michigan', status: 'WR1', note: 'Pro Bowl vertical + contested. Rest days normal. Defenses will scheme him heavily vs BUF.' },
  { name: 'Jayden Higgins', num: '81', pos: 'WR', ht: '6-4', wt: '215', exp: 2, college: 'Iowa State', status: 'WR2 / rising', note: 'Camp standout vs top corners. Year-2 leap candidate — watch preseason targets.' },
  { name: 'Tank Dell', num: '1', pos: 'WR', ht: '5-10', wt: '165', exp: 4, college: 'Houston', status: 'Returning', note: 'Back from 2024 knee (missed 2025). Camp participation + preseason snaps = real timeline.' },
  { name: 'Xavier Hutchinson', num: '19', pos: 'WR', ht: '6-3', wt: '210', exp: 4, college: 'Iowa State', status: 'Depth / ST', note: 'Reliable depth and special teams. Solid camp contributor.' },
  { name: 'Jaylin Noel', num: '13', pos: 'WR', ht: '—', wt: '—', exp: 1, college: '—', status: 'Young depth', note: 'Watch preseason for separation and return ability.' },
  { name: 'Justin Watson', num: '84', pos: 'WR', ht: '—', wt: '—', exp: 'Vet', college: '—', status: 'Veteran depth', note: 'Known for special teams and reliable hands.' },
  // TE
  { name: 'Dalton Schultz', num: '86', pos: 'TE', ht: '6-5', wt: '242', exp: 8, college: 'Stanford', status: 'Starter', note: 'Safety valve + red-zone. Intermediate reliability for Stroud remains high value.' },
  { name: 'Foster Moreau', num: '87', pos: 'TE', ht: '6-4', wt: '250', exp: 8, college: 'LSU', status: 'Blocking / depth', note: 'Veteran blocker and red-zone presence. Strong addition to TE room.' },
  { name: 'Brevin Jordan', num: '9', pos: 'TE', ht: '6-3', wt: '245', exp: 6, college: 'Miami', status: 'Receiving TE', note: 'Athletic option. Returning from prior injury — monitor snaps.' },
  { name: 'Cade Stover', num: '8', pos: 'TE', ht: '—', wt: '—', exp: 2, college: 'Ohio State', status: 'Depth / blocker', note: 'Y-TE / inline. Camp competition for the 3rd/4th TE spots.' },
  { name: 'Marlin Klein', num: '83', pos: 'TE', ht: '6-6', wt: '250', exp: 'R', college: 'Michigan', status: 'Rookie', note: '3rd-round pick. Blocking + size. Early camp notes on physicality.' },
  // OL
  { name: 'Aireontae Ersery', num: '79', pos: 'T', ht: '6-6', wt: '330', exp: 2, college: 'Minnesota', status: 'LT starter', note: 'Year-2 LT. Camp focus on consistency and pass-pro sets.' },
  { name: 'Wyatt Teller', num: '75', pos: 'G', ht: '6-3', wt: '323', exp: 8, college: 'Virginia Tech', status: 'LG starter', note: 'Veteran free-agent addition. Anchors the left side with power.' },
  { name: 'Keylan Rutledge', num: '66', pos: 'G/C', ht: '—', wt: '—', exp: 'R', college: 'Georgia Tech', status: '1st-round pick', note: 'High-upside interior. Camp battles at C/G. Pancake highlights already noted.' },
  { name: 'Ed Ingram', num: '69', pos: 'G', ht: '6-3', wt: '307', exp: 5, college: 'LSU', status: 'RG', note: 'Steady interior. Pairing with Teller improves the middle.' },
  { name: 'Braden Smith', num: '71', pos: 'T', ht: '6-5', wt: '322', exp: 8, college: 'Auburn', status: 'RT starter', note: 'Veteran RT addition. Experience and length for the right side.' },
  { name: 'Jake Andrews', num: '60', pos: 'C', ht: '6-3', wt: '308', exp: 4, college: 'Troy', status: 'Center battle', note: 'Competing with Rutledge / others for the starting C role.' },
  { name: 'Trent Brown', num: '77', pos: 'T', ht: '6-8', wt: '380', exp: 12, college: 'Florida', status: 'Swing tackle', note: 'Massive veteran depth. Valuable insurance at either tackle.' },
  // EDGE / DL
  { name: 'Will Anderson Jr.', num: '51', pos: 'DE', ht: '6-4', wt: '243', exp: 4, college: 'Alabama', status: 'All-Pro edge', note: 'Primary pass-rush force. Alignment with Clowney/Hunter is a weekly storyline.' },
  { name: 'Danielle Hunter', num: '55', pos: 'DE', ht: '6-5', wt: '263', exp: 12, college: 'LSU', status: 'Pro Bowl edge', note: 'Veteran production. Core of the returning #1 defense.' },
  { name: 'Jadeveon Clowney', num: '90', pos: 'DE', ht: '6-5', wt: '266', exp: 13, college: 'South Carolina', status: 'Hometown return', note: '1-year deal, #90 back. Rotational early-down + situational rush. Nostalgia that still produces.' },
  { name: 'Logan Hall', num: '96', pos: 'DE', ht: '6-6', wt: '283', exp: 5, college: 'Houston', status: 'Interior / edge flex', note: 'Voluntarily switched from 90 for Clowney. Solid rotation piece.' },
  { name: 'Sheldon Rankins', num: '98', pos: 'DT', ht: '6-2', wt: '305', exp: 11, college: 'Louisville', status: 'DT starter', note: 'Veteran interior presence. Run defense + push.' },
  { name: 'Tommy Togiai', num: '72', pos: 'DT', ht: '6-2', wt: '296', exp: 4, college: 'Ohio State', status: 'DT rotation', note: 'Strong camp notes on interior disruption.' },
  { name: 'Kayden McDonald', num: '93', pos: 'DT', ht: '6-3', wt: '326', exp: 'R', college: 'Ohio State', status: 'Rookie DT', note: 'Draft pick. Size and power for the rotation.' },
  // LB
  { name: 'Azeez Al-Shaair', num: '0', pos: 'LB', ht: '6-2', wt: '228', exp: 8, college: 'Florida Atlantic', status: 'MLB / leader', note: 'Communicator + run-fit. Extension locked him in. Watch availability if any camp bumps.' },
  { name: 'Henry To\'oTo\'o', num: '39', pos: 'LB', ht: '6-2', wt: '228', exp: 3, college: 'Alabama', status: 'Starter', note: 'Physical LB. Key to the front-seven continuity.' },
  { name: 'Marte Mapu', num: '14', pos: 'LB', ht: '6-3', wt: '230', exp: 4, college: 'Sacramento State', status: 'Depth / hybrid', note: 'Versatile. Can play multiple LB spots and contribute in sub packages.' },
  { name: 'E.J. Speed', num: '45', pos: 'LB', ht: '6-4', wt: '227', exp: 7, college: 'Tarleton State', status: 'Veteran depth', note: 'Experience and special teams. Depth chart competition remains open.' },
  // DB
  { name: 'Derek Stingley Jr.', num: '24', pos: 'CB', ht: '6-1', wt: '195', exp: 4, college: 'LSU', status: 'CB1', note: 'Shutdown corner. Often shadows the #1 WR. Camp 1-on-1s are data, not final grades.' },
  { name: 'Kamari Lassiter', num: '3', pos: 'CB', ht: '6-0', wt: '180', exp: 3, college: 'Georgia', status: 'CB2', note: 'Rising starter. Physical and competitive. Pair with Stingley is elite.' },
  { name: 'Jalen Pitre', num: '5', pos: 'S', ht: '6-0', wt: '200', exp: 5, college: 'Baylor', status: 'SS / nickel', note: 'Versatile safety who can play the slot. Key to the secondary flexibility.' },
  { name: 'Calen Bullock', num: '2', pos: 'S', ht: '6-3', wt: '190', exp: 3, college: 'USC', status: 'FS', note: 'Range and ball skills. Starting free safety.' },
  { name: 'Reed Blankenship', num: '6', pos: 'S', ht: '6-1', wt: '203', exp: 5, college: 'Middle Tennessee', status: 'Depth / starter candidate', note: 'Veteran safety depth with starting experience.' },
  { name: 'Tremon Smith', num: '11', pos: 'CB', ht: '5-11', wt: '190', exp: 8, college: 'Central Arkansas', status: 'ST / depth', note: 'Special teams ace and CB depth.' },
  // ST
  { name: 'Ka\'imi Fairbairn', num: '15', pos: 'K', ht: '6-0', wt: '183', exp: 11, college: 'UCLA', status: 'Kicker', note: 'Reliable veteran. Leg strength and accuracy remain high.' },
  { name: 'Kai Kroeger', num: '38', pos: 'P', ht: '6-3', wt: '213', exp: 2, college: 'South Carolina', status: 'Punter', note: 'Primary punter. Hang time and directional control.' },
  { name: 'Austin Brinkman', num: '40', pos: 'LS', ht: '6-4', wt: '241', exp: 2, college: 'West Virginia', status: 'Long snapper', note: 'Steady long snapper.' }
];

/* What to watch this week */
const WATCH_THIS_WEEK = [
  { title: 'Stroud → Higgins chemistry', detail: 'Year-2 WR continuing camp momentum into live reps.' },
  { title: 'Edge pressure package', detail: 'Anderson + Clowney + Hunter rotation and how often they align together.' },
  { title: 'Run-game efficiency', detail: 'Montgomery early-down success sets up play-action later.' },
  { title: 'TV / availability', detail: 'Check schedule card for network — Prime games need your existing subscription.' },
  { title: 'Dell timeline', detail: 'Any live preseason snaps from Tank Dell are a major positive signal.' }
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
  if (id === 'stats') renderStats();
  if (id === 'roster') renderRoster();
  if (id === 'videos') loadVideos(false);
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
            `<button type="button" class="depth-chip${i === 0 ? ' starter' : ''}" data-depth-name="${String(name).replace(/"/g, '&quot;')}">${name}</button>`
          ).join('')}
        </div>
      `).join('')}
    </div>`;
  el.innerHTML = block('Offense', DEPTH_CHART.offense) + block('Defense', DEPTH_CHART.defense) +
    `<div id="depthDetail" class="player-detail hidden"></div>` +
    `<p class="tend-note">Tap a name for a short note when available. Simplified starters-first view — not an official depth chart.</p>`;

  el.querySelectorAll('[data-depth-name]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-depth-name') || '';
      const detail = document.getElementById('depthDetail');
      if (!detail) return;
      const exact = KEY_PLAYERS.find((x) => x.name === name);
      const hit = exact || KEY_PLAYERS.find((x) => name.includes(x.name) || x.name.includes(name));
      detail.classList.remove('hidden');
      if (hit) {
        detail.innerHTML = `<strong>${hit.name}</strong> · ${hit.pos}${hit.num && hit.num !== '—' ? ' #' + hit.num : ''}<br><span class="small">${hit.note}</span><br>${hit.detail || hit.stats || ''}`;
      } else {
        detail.innerHTML = `<strong>${name}</strong><br><span class="small">No extended card for this roster line yet — placeholder depth only.</span>`;
      }
    });
  });
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

/* ---------- Training Camp + News (Texans.com RSS + ESPN) ---------- */
/* Why 8/4 lingered on 8/5 morning:
   ESPN team feed often lags same-day team posts. Official houstontexans.com/rss/news
   already had "Transactions (8-5-2026)" at ~7:47am CT while ESPN's newest HOU item
   was still prior-evening. v14.7 merges both sources and sorts by published time. */
const CAMP_CACHE_KEY = 'texans-hq-camp-cache-v2';
const NEWS_CACHE_KEY = 'texans-hq-news-cache-v2';

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
      ? `<a href="${item.href}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;font-weight:600">${escapeHtml(item.title)}</a>`
      : escapeHtml(item.title || '')}
    ${item.desc ? `<div class="small" style="margin-top:4px">${escapeHtml(item.desc)}</div>` : ''}</div>
  </div>`;
}

function newsItemHtml(a) {
  return `<div class="news-item">
    <a href="${a.href || '#'}" target="_blank" rel="noopener">${escapeHtml(a.title || 'Headline')}</a>
    <div class="news-meta">${a.date || ''}${a.source ? ' · ' + a.source : ''}${a.desc ? ' · ' + escapeHtml(a.desc) : ''}</div>
  </div>`;
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

function formatPubDate(published) {
  if (!published) return '';
  try {
    const d = new Date(published);
    if (isNaN(d.getTime())) return String(published);
    return d.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'short', month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    }) + ' CT';
  } catch (e) {
    return String(published);
  }
}

function articleToItem(a, source) {
  const href = (a.links && a.links.web && a.links.web.href) || a.link || a.href || '#';
  const title = a.headline || a.title || 'Headline';
  const published = a.published || a.lastModified || a.pubDate || '';
  return {
    title: String(title).trim(),
    desc: String(a.description || a.desc || '').trim(),
    href,
    date: formatPubDate(published),
    published: published ? new Date(published).getTime() : 0,
    source: source || 'ESPN'
  };
}

function isCampRelated(item) {
  const t = ((item.title || '') + ' ' + (item.desc || '')).toLowerCase();
  return /camp|practice|pads|joint practice|training|roster|transaction|cut|signed|waived|injured|walk-through|walkthrough|one-on-one|ol\/dl|depth chart|preseason/.test(t);
}

function dedupeItems(items) {
  const out = [];
  const seen = new Set();
  items.forEach((it) => {
    const key = (it.title || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 80);
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(it);
  });
  return out;
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
        articles = list.map((a) => articleToItem(a, 'ESPN'));
        break;
      }
    } catch (e) {
      lastErr = (e && e.message) ? e.message : 'network';
    }
  }
  if (!articles.length) throw new Error(lastErr || 'ESPN empty');
  return articles;
}

/** Official team RSS — usually ahead of ESPN for same-day transactions & camp posts */
async function fetchTexansRss() {
  const url = 'https://www.houstontexans.com/rss/news';
  const res = await fetch(url, { mode: 'cors', cache: 'no-store' });
  if (!res.ok) throw new Error('Texans RSS HTTP ' + res.status);
  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Texans RSS parse error');
  const items = [];
  doc.querySelectorAll('item').forEach((node) => {
    const title = (node.querySelector('title') && node.querySelector('title').textContent || '').trim();
    const link = (node.querySelector('link') && node.querySelector('link').textContent || '').trim();
    const pubDate = (node.querySelector('pubDate') && node.querySelector('pubDate').textContent || '').trim();
    const desc = (node.querySelector('description') && node.querySelector('description').textContent || '').trim();
    if (!title) return;
    items.push(articleToItem({
      title,
      link,
      pubDate,
      description: desc.replace(/<[^>]+>/g, '').slice(0, 180)
    }, 'Texans.com'));
  });
  if (!items.length) throw new Error('Texans RSS empty');
  return items;
}

/** Merge official team feed + ESPN; newest first */
async function fetchAllNewsItems() {
  const batches = await Promise.allSettled([fetchTexansRss(), fetchEspnArticles()]);
  let items = [];
  const sources = [];
  batches.forEach((r, i) => {
    const name = i === 0 ? 'Texans.com' : 'ESPN';
    if (r.status === 'fulfilled' && r.value && r.value.length) {
      items = items.concat(r.value);
      sources.push(name);
    }
  });
  if (!items.length) {
    const errs = batches.map((r) => r.status === 'rejected' ? (r.reason && r.reason.message) : null).filter(Boolean);
    throw new Error(errs.join('; ') || 'All feeds failed');
  }
  items.sort((a, b) => (b.published || 0) - (a.published || 0));
  items = dedupeItems(items);
  return { items, sources };
}

async function loadCamp(fromButton) {
  const box = $('#campUpdates');
  const btn = $('#campRefreshBtn');
  if (!box) return;
  if (fromButton && btn) {
    btn.disabled = true;
    btn.textContent = 'Refreshing…';
  }
  const datesEl = $('#campDates');
  if (datesEl) {
    const today = new Date();
    const md = today.toLocaleDateString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric' });
    datesEl.innerHTML = CAMP_OPEN_DATES.map((d) => {
      const isToday = d.toLowerCase().indexOf(md.toLowerCase()) !== -1;
      return `<div style="padding:4px 0">${isToday ? '<strong style="color:var(--navy)">TODAY · </strong>' : ''}${d}</div>`;
    }).join('');
  }

  box.innerHTML = '<div class="loading">Fetching camp updates…</div>';
  try {
    const { items, sources } = await fetchAllNewsItems();
    let campItems = items.filter(isCampRelated);
    if (campItems.length < 4) {
      campItems = dedupeItems(campItems.concat(items)).slice(0, 10);
    } else {
      campItems = campItems.slice(0, 10);
    }
    writeJsonCache(CAMP_CACHE_KEY, { savedAt: Date.now(), items: campItems });
    box.innerHTML = freshnessLine(Date.now(), false, sources.join(' + ')) +
      campItems.map(campItemHtml).join('');
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
  renderCampStaticFallback('');
  loadCamp(false);
}

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
    const { items, sources } = await fetchAllNewsItems();
    const trimmed = items.slice(0, 12);
    writeJsonCache(NEWS_CACHE_KEY, { savedAt: Date.now(), items: trimmed });
    list.innerHTML = freshnessLine(Date.now(), false, sources.join(' + ')) +
      trimmed.map(newsItemHtml).join('');
  } catch (e) {
    if (cached && cached.items && cached.items.length) {
      list.innerHTML = freshnessLine(cached.savedAt, true, 'live fetch failed — ' + (e.message || 'offline')) +
        cached.items.map(newsItemHtml).join('') +
        `<div class="news-item"><a href="https://www.houstontexans.com/news" target="_blank" rel="noopener">Official Texans News</a><div class="news-meta">houstontexans.com</div></div>`;
    } else {
      list.innerHTML = `
      <div class="empty">
        Could not reach public news feeds (offline or blocked).<br>
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


/* ---------- Videos — ranked Texans picks (no manual YouTube hunting) ----------
   Lightweight "search engine":
   1) Pull recent uploads from trusted Texans-focused YouTube channels
   2) Score each video (recency + views + title relevance + channel weight)
   3) Show the top 8, best → worst
   This is not the full YouTube algorithm (needs Google API keys). It is a
   reliable, offline-cacheable ranker tuned for "what should I watch now?"
*/
const VIDEO_CACHE_KEY = 'texans-hq-videos-cache-v2';
const VIDEO_TOP_N = 8;           // best 5–10 band; 8 is the sweet spot
const VIDEO_FETCH_PER_CHANNEL = 10;

const VIDEO_CHANNELS = [
  {
    id: 'UCXWwSKD3KIj78GrIlDhtFYw',
    name: 'Seth Payne',
    short: 'Seth Payne',
    url: 'https://www.youtube.com/@SethPayneShow',
    weight: 1.25   // strong analysis signal
  },
  {
    id: 'UCiFQGjNHUQPVrg-aQL5FtgA',
    name: 'Locked On Texans',
    short: 'Locked On',
    url: 'https://www.youtube.com/@LockedOnTexans',
    weight: 1.15
  },
  {
    id: 'UCa_FcpOBe8G6VAR18RYS-aA',
    name: 'Houston Texans',
    short: 'Official',
    url: 'https://www.youtube.com/@HoustonTexans',
    weight: 1.0
  }
];

/* Title tokens that mark a video as on-topic for this HQ */
const TEXANS_TITLE_RE = /texan|houston|stroud|higgins|stingley|demeco|ryans|clowney|mixon|collins|anderson|camp|preseason|nrg|afc south|caserio|schultz|al-shaair|to\'oto\'o|tootoo/i;

function renderVideoChannels() {
  const el = $('#videoChannels');
  if (!el) return;
  el.innerHTML = VIDEO_CHANNELS.map((c) =>
    `<a class="video-channel-chip" href="${c.url}" target="_blank" rel="noopener">${c.short}</a>`
  ).join('') +
    `<a class="video-channel-chip" href="https://www.youtube.com/results?search_query=Houston+Texans+training+camp+2026" target="_blank" rel="noopener">YouTube search</a>`;
}

function videoItemHtml(v, rank) {
  const thumb = v.thumbnail
    ? `<img class="video-thumb" src="${v.thumbnail}" alt="" loading="lazy" width="120" height="68" />`
    : `<div class="video-thumb video-thumb-ph">▶</div>`;
  const views = v.views ? formatViews(v.views) + ' views · ' : '';
  const rankBadge = typeof rank === 'number'
    ? `<span class="video-rank">#${rank}</span>`
    : '';
  return `<a class="video-item" href="${v.href}" target="_blank" rel="noopener">
    <div class="video-rank-col">${rankBadge}</div>
    ${thumb}
    <div class="video-body">
      <div class="video-title">${escapeHtml(v.title)}</div>
      <div class="video-meta">${escapeHtml(v.channel)} · ${views}${v.date || ''}</div>
    </div>
  </a>`;
}

function formatViews(n) {
  n = parseInt(n, 10);
  if (!n || n < 0) return '';
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

/**
 * Rank score — higher = better pick for "watch next"
 * - Recency dominates (today's camp tape > last month's viral clip)
 * - log(views) rewards traction without letting old megahits win forever
 * - Title relevance filters random non-Texans uploads on shared feeds
 * - Channel weight slightly prefers analysis channels
 */
function scoreVideo(v, now) {
  now = now || Date.now();
  const ageMs = Math.max(0, now - (v.published || now));
  const ageHours = ageMs / 3600000;
  // ~24h half-life style: 1.0 when fresh, ~0.5 at 1 day, ~0.2 at 4 days
  const recency = 1 / (1 + ageHours / 24);

  const viewScore = Math.log10((v.views || 0) + 1); // 0–6 typical

  const title = v.title || '';
  let relevance = TEXANS_TITLE_RE.test(title) ? 1 : 0.35;
  // Extra boost for analysis / interview-style titles
  if (/breakdown|reaction|camp|analysis|film|preview|press conference|availability|full q&a|interview|address the media|on c\.j|on the/i.test(title)) {
    relevance += 0.45;
  }
  // Penalize ultra-short official flashes (emoji-only / three-character hype clips)
  const isOfficial = v.channelId === 'UCa_FcpOBe8G6VAR18RYS-aA';
  const wordCount = (title.match(/[A-Za-z0-9']+/g) || []).length;
  if (isOfficial && (title.length < 22 || wordCount <= 3)) {
    relevance *= 0.35; // keep them discoverable via channel chip, not top of ranked list
  }

  const channelWeight = v.channelWeight || 1;

  // Fresh analysis should beat same-day 5-second official hype clips
  const score =
    recency * 10 +
    viewScore * 1.6 +
    relevance * 4 +
    channelWeight * 1.5;

  return score;
}

async function fetchChannelVideos(channel) {
  const rss = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + encodeURIComponent(channel.id);
  const api = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rss) +
    '&count=' + VIDEO_FETCH_PER_CHANNEL;
  const res = await fetch(api, { cache: 'no-store' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('Bad feed');
  return data.items.map((it) => {
    const idMatch = (it.link || '').match(/[?&]v=([\w-]{6,})/) ||
      (it.guid || '').match(/yt:video:([\w-]{6,})/);
    const vid = idMatch ? idMatch[1] : '';
    const href = vid ? ('https://www.youtube.com/watch?v=' + vid) : (it.link || channel.url);
    let views = 0;
    if (it.viewCount) views = parseInt(it.viewCount, 10) || 0;
    // rss2json sometimes embeds stats only in raw; leave 0 if unknown
    const pub = it.pubDate || it.published || '';
    let ts = 0;
    try { ts = pub ? new Date(pub).getTime() : 0; } catch (e) {}
    return {
      title: it.title || 'Video',
      href,
      channel: channel.name,
      channelId: channel.id,
      channelWeight: channel.weight || 1,
      thumbnail: (it.thumbnail && it.thumbnail.startsWith('http') ? it.thumbnail : null) ||
        (vid ? ('https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg') : ''),
      views,
      published: ts,
      date: formatPubDate(pub)
    };
  });
}

/** Score → sort best to worst → top N. Dedupe by video URL. */
function rankVideos(all) {
  const now = Date.now();
  const seen = new Set();
  const scored = [];
  all.forEach((v) => {
    const key = v.href || v.title;
    if (!key || seen.has(key)) return;
    seen.add(key);
    // Drop clearly off-topic unless from official/analysis channels with low title signal
    const s = scoreVideo(v, now);
    if (s < 3.5 && !TEXANS_TITLE_RE.test(v.title || '')) return;
    scored.push(Object.assign({}, v, { _score: s }));
  });
  scored.sort((a, b) => b._score - a._score);
  return scored.slice(0, VIDEO_TOP_N);
}

async function loadVideos(fromButton) {
  const list = $('#videoList');
  const btn = $('#videosRefreshBtn');
  if (!list) return;
  renderVideoChannels();
  if (fromButton && btn) {
    btn.disabled = true;
    btn.textContent = 'Ranking…';
  }

  const cached = readJsonCache(VIDEO_CACHE_KEY);
  if (cached && cached.items && cached.items.length) {
    list.innerHTML = freshnessLine(cached.savedAt, true, 'last ranked list') +
      cached.items.map((v, i) => videoItemHtml(v, i + 1)).join('');
  } else {
    list.innerHTML = '<div class="loading">Finding the best Texans videos…</div>';
  }

  try {
    const results = await Promise.allSettled(VIDEO_CHANNELS.map(fetchChannelVideos));
    let all = [];
    const okNames = [];
    results.forEach((r, i) => {
      if (r.status === 'fulfilled' && r.value && r.value.length) {
        all = all.concat(r.value);
        okNames.push(VIDEO_CHANNELS[i].short);
      }
    });
    if (!all.length) throw new Error('No video feeds available');

    const ranked = rankVideos(all);
    writeJsonCache(VIDEO_CACHE_KEY, { savedAt: Date.now(), items: ranked });
    list.innerHTML =
      freshnessLine(Date.now(), false, 'ranked · ' + okNames.join(' + ')) +
      `<p class="video-rank-explainer">Top ${ranked.length} right now — scored by freshness, traction, and Texans relevance (not a raw YouTube popularity sort).</p>` +
      ranked.map((v, i) => videoItemHtml(v, i + 1)).join('') +
      `<p class="tend-note">Tap any row to watch in YouTube. Refresh re-runs the ranker. Channel chips open full feeds if you want to browse more.</p>`;
  } catch (e) {
    if (cached && cached.items && cached.items.length) {
      list.innerHTML = freshnessLine(cached.savedAt, true, 'live rank failed — showing last list') +
        cached.items.map((v, i) => videoItemHtml(v, i + 1)).join('');
    } else {
      list.innerHTML = `
        <div class="empty">Could not rank videos right now (offline or feed blocked).</div>
        <a class="video-item" href="https://www.youtube.com/@SethPayneShow" target="_blank" rel="noopener">
          <div class="video-thumb video-thumb-ph">▶</div>
          <div class="video-body"><div class="video-title">Seth Payne on YouTube</div><div class="video-meta">Open channel</div></div>
        </a>
        <a class="video-item" href="https://www.youtube.com/@LockedOnTexans" target="_blank" rel="noopener">
          <div class="video-thumb video-thumb-ph">▶</div>
          <div class="video-body"><div class="video-title">Locked On Texans</div><div class="video-meta">Open channel</div></div>
        </a>
        <a class="video-item" href="https://www.youtube.com/results?search_query=Houston+Texans+training+camp" target="_blank" rel="noopener">
          <div class="video-thumb video-thumb-ph">▶</div>
          <div class="video-body"><div class="video-title">YouTube: Texans training camp</div><div class="video-meta">Open search</div></div>
        </a>`;
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Refresh';
    }
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
/* ---------- Service Worker (reliable updates) ----------
   Why you had to hard-close twice:
   1) Old SW kept controlling the open page after a deploy.
   2) New SW installed + activated in the background, but the page never reloaded,
      so the header still showed the old version string from in-memory HTML/JS.
   3) First reopen sometimes still lost a race (HTTP cache / activate not finished).
   Fix: force update check, skip waiting, reload once on controllerchange,
   and set the version pill from APP_VERSION as soon as JS runs.
*/
function setVersionPill(extra) {
  const pill = $('#statusPill');
  if (!pill) return;
  pill.textContent = extra || APP_VERSION_LABEL;
  pill.classList.remove('live');
}

if ('serviceWorker' in navigator) {
  // If a new SW takes control of this tab/window, reload once so UI matches the new files.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    // One reload is enough — do not loop
    window.location.reload();
  });

  window.addEventListener('load', () => {
    setVersionPill();

    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
      .then((reg) => {
        setVersionPill();

        // Force a fresh sw.js byte check (important on iOS PWAs)
        try { reg.update(); } catch (e) {}

        // If a worker is already waiting (updated while we were open), activate it now
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        // When an updated worker is found and installs, tell it to activate immediately
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              // New version ready — activate; controllerchange handler will reload
              nw.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });

        // Periodic update check while app stays open (iOS often delays SW checks)
        setInterval(() => {
          try { reg.update(); } catch (e) {}
        }, 60 * 60 * 1000);
      })
      .catch(() => {
        setVersionPill(APP_VERSION + ' · SW optional');
      });
  });
} else {
  window.addEventListener('load', () => setVersionPill(APP_VERSION + ' · no SW'));
}


/* ---------- Roster search (v14.8) ---------- */
let rosterFilterPos = 'ALL';
function renderRoster() {
  const list = $('#rosterList');
  const countEl = $('#rosterCount');
  const searchEl = $('#rosterSearch');
  const filtersEl = $('#rosterFilters');
  if (!list) return;

  // Position filter chips
  if (filtersEl && !filtersEl.dataset.ready) {
    const positions = ['ALL', 'QB', 'RB', 'WR', 'TE', 'OL', 'DE', 'DT', 'LB', 'CB', 'S', 'ST'];
    filtersEl.innerHTML = positions.map(p =>
      `<button type="button" class="btn secondary roster-pos-btn${p === 'ALL' ? ' active' : ''}" data-pos="${p}" style="padding:4px 10px; font-size:0.85rem;">${p}</button>`
    ).join('');
    filtersEl.dataset.ready = '1';
    filtersEl.querySelectorAll('.roster-pos-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        rosterFilterPos = btn.dataset.pos;
        filtersEl.querySelectorAll('.roster-pos-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyRosterFilter();
      });
    });
  }

  if (searchEl && !searchEl.dataset.bound) {
    searchEl.dataset.bound = '1';
    searchEl.addEventListener('input', applyRosterFilter);
  }

  applyRosterFilter();

  function applyRosterFilter() {
    const q = (searchEl ? searchEl.value : '').trim().toLowerCase();
    const filtered = FULL_ROSTER.filter(p => {
      const posOk = rosterFilterPos === 'ALL' ||
        p.pos === rosterFilterPos ||
        (rosterFilterPos === 'OL' && ['T', 'G', 'C', 'OL'].includes(p.pos)) ||
        (rosterFilterPos === 'DE' && p.pos === 'DE') ||
        (rosterFilterPos === 'DT' && p.pos === 'DT') ||
        (rosterFilterPos === 'ST' && ['K', 'P', 'LS'].includes(p.pos));
      if (!posOk) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.num && p.num.toString().includes(q)) ||
        p.pos.toLowerCase().includes(q) ||
        (p.status && p.status.toLowerCase().includes(q)) ||
        (p.college && p.college.toLowerCase().includes(q))
      );
    });

    list.innerHTML = filtered.map((p, idx) => `
      <button type="button" class="player-card player-card-btn roster-card" data-roster-idx="${FULL_ROSTER.indexOf(p)}" aria-expanded="false">
        <div class="player-card-top">
          <span class="player-name">${p.num ? '#' + p.num + ' ' : ''}${p.name}</span>
          <span class="player-pos">${p.pos}</span>
        </div>
        <div class="player-note">${p.status || ''} ${p.ht && p.wt ? '· ' + p.ht + ' / ' + p.wt : ''} ${p.exp ? '· Exp ' + p.exp : ''}</div>
        <div class="player-expand-hint">Tap for insights ▾</div>
        <div class="player-detail-body hidden"></div>
      </button>
    `).join('') || '<div class="empty">No players match. Try a different name, number, or position.</div>';

    if (countEl) countEl.textContent = `${filtered.length} player${filtered.length !== 1 ? 's' : ''} shown · Camp / preseason roster (cuts to 53 for regular + postseason)`;

    list.querySelectorAll('[data-roster-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-roster-idx'), 10);
        const p = FULL_ROSTER[idx];
        if (!p) return;
        const body = btn.querySelector('.player-detail-body');
        const hint = btn.querySelector('.player-expand-hint');
        const wasOpen = body && !body.classList.contains('hidden');
        list.querySelectorAll('.player-detail-body').forEach(el => el.classList.add('hidden'));
        list.querySelectorAll('.roster-card').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          const h = b.querySelector('.player-expand-hint');
          if (h) h.textContent = 'Tap for insights ▾';
        });
        if (wasOpen || !body) return;
        body.classList.remove('hidden');
        body.innerHTML = `
          <strong>${p.name}</strong> · #${p.num || '—'} · ${p.pos}<br>
          ${p.ht || ''} ${p.wt || ''} · Exp: ${p.exp || '—'} · ${p.college || ''}<br>
          <span class="small" style="display:block;margin-top:6px">${p.note || 'No extended note yet.'}</span>
          <span class="small" style="display:block;margin-top:4px;opacity:0.85">Phase note: Preseason roster is larger. Regular-season and postseason use the final 53-man + practice squad.</span>
        `;
        btn.setAttribute('aria-expanded', 'true');
        if (hint) hint.textContent = 'Tap to close ▴';
      });
    });
  }
}

/* ---------- Stats (restored in v14.7 — was dropped in v14.7 feed rewrite) ---------- */
function renderStats() {
  const grid = $('#teamStats');
  if (!grid) return;

  grid.innerHTML = TEAM_STATS_2025.map((s) => `
    <button type="button" class="stat-item stat-item-btn" data-stat-label="${s.label}">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </button>
  `).join('') + `<div id="statDetail" class="player-detail hidden" style="grid-column:1/-1"></div>`;

  grid.querySelectorAll('[data-stat-label]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const label = btn.getAttribute('data-stat-label');
      const row = TEAM_STATS_2025.find((s) => s.label === label);
      const detail = document.getElementById('statDetail');
      if (!detail || !row) return;
      const blurb = (typeof TEAM_STAT_DETAILS !== 'undefined' && TEAM_STAT_DETAILS[label])
        ? TEAM_STAT_DETAILS[label]
        : '2025 season context for personal reference.';
      detail.classList.remove('hidden');
      detail.innerHTML = `<strong>${row.label}: ${row.value}</strong><br>${blurb}`;
    });
  });

  const watch = $('#playerWatch');
  if (watch) {
    watch.innerHTML = KEY_PLAYERS.map((p, idx) => `
      <button type="button" class="player-card player-card-btn" data-player-idx="${idx}" aria-expanded="false">
        <div class="player-card-top">
          <span class="player-name">${p.num && p.num !== '—' ? '#' + p.num + ' ' : ''}${p.name}</span>
          <span class="player-pos">${p.pos}</span>
        </div>
        <div class="player-note">${p.note}</div>
        <div class="player-stats">${p.stats || ''}</div>
        <div class="player-expand-hint">Tap for details ▾</div>
        <div class="player-detail-body hidden"></div>
      </button>
    `).join('');

    watch.querySelectorAll('[data-player-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-player-idx'), 10);
        const p = KEY_PLAYERS[idx];
        if (!p) return;
        const body = btn.querySelector('.player-detail-body');
        const hint = btn.querySelector('.player-expand-hint');
        const wasOpen = body && !body.classList.contains('hidden');
        watch.querySelectorAll('.player-detail-body').forEach((el) => el.classList.add('hidden'));
        watch.querySelectorAll('.player-card-btn').forEach((b) => {
          b.setAttribute('aria-expanded', 'false');
          const h = b.querySelector('.player-expand-hint');
          if (h) h.textContent = 'Tap for details ▾';
        });
        if (wasOpen || !body) return;
        body.classList.remove('hidden');
        body.textContent = p.detail || p.stats || p.note;
        btn.setAttribute('aria-expanded', 'true');
        if (hint) hint.textContent = 'Tap to close ▴';
      });
    });
  }

  renderDepthChart();
}

/* ---------- Init ---------- */
function init() {
  setVersionPill();
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
  const videosBtn = $('#videosRefreshBtn');
  if (videosBtn) {
    videosBtn.addEventListener('click', () => loadVideos(true));
  }
  // Pre-warm feeds in background (network, non-blocking)
  setTimeout(() => loadNews(false), 600);
  setTimeout(() => loadCamp(false), 900);
  setTimeout(() => loadVideos(false), 1200);
}

/* Start: check password first */
if (setupLock()) {
  // Already unlocked on this device
  init();
}
