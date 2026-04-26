// Black Belt Infographic — single source of truth
// Append to BLACK_BELTS to add new black belts. No backend, no admin UI.

// `logo` is the path to that org's flag/logo image. Every org has a logo
// now, including Tabata Sensei.
const ORGANIZATIONS = {
  tabata: { name: 'Tabata Sensei', short: 'Tabata', color: '#F5C518', logo: 'logos/tabata.jpeg' },
  jka:    { name: 'JKA',           short: 'JKA',    color: '#2A6FDB', logo: 'logos/jka.jpeg' },
  jukf:   { name: 'JUKF',          short: 'JUKF',   color: '#E63946', logo: 'logos/jukf.jpeg' },
  hdki:   { name: 'HDKI',          short: 'HDKI',   color: '#8B5CF6', logo: 'logos/hdki.jpeg' },
};

// Universities represented in the dojo. Pre-populated so the dropdown
// shows the full academic reach from day one. Each university's `name`
// must match the `university` field on a person to filter correctly.
// `logo` is optional — when present, the modal displays it next to the
// university name. More logos to be added as Emile provides them.
const UNIVERSITIES = [
  { name: 'Boston University',    logo: 'logos/boston-university.jpg' },
  { name: 'Columbia University',  logo: null },
  { name: 'Georgetown University', logo: null },
  { name: 'Harvard University',   logo: 'logos/harvard.jpg' },
  { name: 'Lesley University',    logo: null },
  { name: 'MIT',                  logo: 'logos/mit.jpg' },
  { name: 'NYU',                  logo: null },
  { name: 'UMass',                logo: null },
  { name: 'Wellesley College',    logo: null },
];

// Lookup helper: find university metadata by display name.
function universityInfo(name) {
  return UNIVERSITIES.find(u => u.name === name);
}

// Year range covered by the Year filter — pre-populated from 2011 (the dojo's
// first black belt) through the current year so visitors can scan timeline gaps.
const YEARS = (() => {
  const out = [];
  for (let y = 2011; y <= 2030; y++) out.push(y);
  return out;
})();

// Countries represented in the dojo. Pre-populated so the country filter
// shows the full reach of the lineage from day one, even before every
// person is in the roster. Add a country here once and it appears in the
// dropdown — link it to belts via the `country` field on each person.
const COUNTRIES = [
  { name: 'Algeria',     flag: '🇩🇿' },
  { name: 'Armenia',     flag: '🇦🇲' },
  { name: 'Australia',   flag: '🇦🇺' },
  { name: 'Bangladesh',  flag: '🇧🇩' },
  { name: 'Benin',       flag: '🇧🇯' },
  { name: 'Brazil',      flag: '🇧🇷' },
  { name: 'Canada',      flag: '🇨🇦' },
  { name: 'China',       flag: '🇨🇳' },
  { name: 'France',      flag: '🇫🇷' },
  { name: 'Hong Kong',   flag: '🇭🇰' },
  { name: 'India',       flag: '🇮🇳' },
  { name: 'Indonesia',   flag: '🇮🇩' },
  { name: 'Mexico',                flag: '🇲🇽' },
  { name: 'Poland',                flag: '🇵🇱' },
  { name: 'Russia',                flag: '🇷🇺' },
  { name: 'Serbia',                flag: '🇷🇸' },
  { name: 'Spain',                 flag: '🇪🇸' },
  { name: 'Taiwan',                flag: '🇹🇼' },
  { name: 'Trinidad and Tobago',   flag: '🇹🇹' },
  { name: 'Ukraine',               flag: '🇺🇦' },
  { name: 'USA',                   flag: '🇺🇸' },
  { name: 'Uzbekistan',            flag: '🇺🇿' },
];

// Dan ranks in canonical order (Shodan = 1st dan, Judan = 10th dan).
// Each rank carries its own color — this is the color used on the ball ring,
// telegraphing achievement level at a glance. Tradition has dan ranks all
// wearing a black belt; the color here is purely an editorial signal for
// the infographic, not a real-world belt color.
// Order matters — do not sort alphabetically.
const RANKS = [
  { name: 'Shodan',    dan: 1,  color: '#FF8C42' }, // orange — first black belt
  { name: 'Nidan',     dan: 2,  color: '#3B82F6' }, // blue
  { name: 'Sandan',    dan: 3,  color: '#10B981' }, // green
  { name: 'Yondan',    dan: 4,  color: '#8B5CF6' }, // purple
  { name: 'Godan',     dan: 5,  color: '#EF4444' }, // red
  { name: 'Rokudan',   dan: 6,  color: '#14B8A6' }, // teal
  { name: 'Shichidan', dan: 7,  color: '#EC4899' }, // pink
  { name: 'Hachidan',  dan: 8,  color: '#6366F1' }, // indigo
  { name: 'Kudan',     dan: 9,  color: '#D97706' }, // bronze
  { name: 'Judan',     dan: 10, color: '#F5C518' }, // gold — grandmaster
];

// Lookup helper — returns the rank metadata for a rank name string.
function rankInfo(name) {
  return RANKS.find(r => r.name === name);
}

// A black belt can hold ranks at MULTIPLE organizations over their lifetime.
// Each person therefore carries a `ranks` array. Each entry: { rank, year, org }.
// The ball's ring is a conic gradient built from the unique orgs across all ranks.
const BLACK_BELTS = [
  {
    id: 'vazrik',
    name: 'Vazrik Chiloyan',
    university: 'MIT',
    country: 'Armenia',
    flag: '🇦🇲',
    photo: 'photos/vazrik.jpeg',
    // Focus the circular crop on the upper portion so the head isn't cut off.
    photoFocus: 'center 22%',
    ranks: [
      { rank: 'Shodan', year: 2016, org: 'tabata' },
      { rank: 'Yondan', year: null, org: 'jka'    }, // year TBD
      { rank: 'Sandan', year: null, org: 'hdki'   }, // year TBD
    ],
  },
  {
    id: 'lorraine',
    name: 'Lorraine Sin',
    university: 'Boston University',
    country: 'Hong Kong',
    flag: '🇭🇰',
    photo: 'photos/lorraine.jpeg',
    ranks: [
      { rank: 'Shodan', year: 2017, org: 'tabata' },
    ],
  },
  {
    id: 'cassiano',
    name: 'Anselmo Cassiano',
    university: 'Harvard University',
    country: 'Brazil',
    flag: '🇧🇷',
    photo: 'photos/cassiano.jpeg',
    photoFocus: 'center 38%',
    ranks: [
      { rank: 'Shodan', year: 2018, org: 'tabata' },
    ],
  },

  // 2026 HDKI test class — universities to be filled in later by Emile.
  {
    id: 'amandine',
    name: 'Amandine Fromont',
    university: null,
    country: 'France',
    flag: '🇫🇷',
    photo: 'photos/amandine.jpg',
    ranks: [
      { rank: 'Nidan', year: 2026, org: 'hdki' },
    ],
  },
  {
    id: 'iyit',
    name: 'Iyit Benusia',
    university: null,
    country: 'Indonesia',
    flag: '🇮🇩',
    photo: 'photos/iyit.jpg',
    photoFocus: 'center 28%',
    ranks: [
      { rank: 'Shodan', year: 2026, org: 'hdki' },
    ],
  },
  {
    id: 'peiqi',
    name: 'Peiqi Chen',
    university: null,
    country: 'China',
    flag: '🇨🇳',
    photo: 'photos/peiqi.jpg',
    ranks: [
      { rank: 'Shodan', year: 2026, org: 'hdki' },
    ],
  },
  {
    id: 'angel',
    name: 'Angel Chan',
    university: null,
    country: 'Hong Kong',
    flag: '🇭🇰',
    photo: 'photos/angel.jpg',
    ranks: [
      { rank: 'Shodan', year: 2026, org: 'hdki' },
    ],
  },
  {
    id: 'varak',
    name: 'Varak Mouradian',
    university: null,
    country: 'Armenia',
    flag: '🇦🇲',
    photo: 'photos/varak.jpg',
    ranks: [
      { rank: 'Shodan', year: 2026, org: 'hdki' },
    ],
  },
  {
    id: 'ewa',
    name: 'Ewa Sitarska',
    university: null,
    country: 'Poland',
    flag: '🇵🇱',
    photo: 'photos/ewa.jpg',
    photoFocus: 'center 17%',
    ranks: [
      { rank: 'Shodan', year: 2026, org: 'hdki' },
    ],
  },
  {
    id: 'bruce',
    name: 'Bruce Chang-Hung Hou',
    university: null,
    country: 'Taiwan',
    flag: '🇹🇼',
    photo: 'photos/bruce.jpg',
    photoFocus: 'center 22%',
    ranks: [
      { rank: 'Shodan', year: 2026, org: 'hdki' },
    ],
  },
];
