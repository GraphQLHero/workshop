const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  avatar_url: 'https://graphqlhero.com/luke.jpg',
  height: 172,
  mass: 77.1,
  is_jedi: true,
  gender: 'MALE',
  likes_count: 0,
};
const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
  birth_year: '19BBY',
  avatar_url: 'https://graphqlhero.com/LeiaOrgana.png',
  height: 150,
  mass: 49.3,
  is_jedi: false,
  gender: 'FEMALE',
  likes_count: 0,
};

const hanSolo = {
  id: 3,
  name: 'Han Solo',
  birth_year: '29BBY',
  avatar_url: 'https://graphqlhero.com/HanSolo.png',
  height: 180,
  mass: 80.0,
  is_jedi: false,
  gender: 'MALE',
  likes_count: 0,
};

const r2d2 = {
  id: 1,
  name: 'R2-D2',
  height: 96,
  mass: 32.0,
  model: 'Série R2',
  likes_count: 0,
};
const c3po = {
  id: 2,
  name: 'C-3PO',
  height: 167,
  mass: 75.0,
  model: '',
  likes_count: 0,
};

const chewbacca = {
  id: 1,
  name: 'Chewbacca',
  hair_color: 'Brown',
  height: 228,
  mass: 112,
  likes_count: 0,
};
const newHope = {
  id: 1,
  title: 'A New Hope',
  episode_number: 4,
  poster_url: 'https://graphqlhero.com/Episode_IV.jpg',
  release_date: '1977-05-25',
  saga: 'ORIGINAL_TRILOGY',
  likes_count: 0,
};
const empireStikesBack = {
  id: 2,
  title: 'The Empire Strikes Back',
  episode_number: 5,
  poster_url: 'https://graphqlhero.com/Episode_V.jpg',
  release_date: '1980-05-17',
  saga: 'ORIGINAL_TRILOGY',
  likes_count: 0,
};
const returnOfTheJedi = {
  id: 3,
  title: 'Return of the Jedi',
  episode_number: 6,
  poster_url: 'https://graphqlhero.com/Episode_VI.jpg',
  release_date: '1983-05-25',
  saga: 'ORIGINAL_TRILOGY',
  likes_count: 0,
};
const revengeOfTheSith = {
  id: 4,
  title: 'Revenge of the Sith',
  episode_number: 3,
  poster_url: 'https://graphqlhero.com/Episode_III.png',
  release_date: '2005-05-19',
  saga: 'PREQUEL_TRILOGY',
  likes_count: 0,
};
const theForceAwakens = {
  id: 5,
  title: 'The Force Awakens',
  poster_url: 'https://graphqlhero.com/Episode_VII.jpg',
  episode_number: 7,
  release_date: '2015-12-11',
  saga: 'SEQUEL_TRILOGY',
  likes_count: 0,
};
const thePhantomMenace = {
  id: 6,
  title: 'The Phantom Menace',
  episode_number: 1,
  poster_url: 'https://graphqlhero.com/Episode_I.png',
  release_date: '1999-05-19',
  saga: 'PREQUEL_TRILOGY',
  likes_count: 0,
};
const attackOfTheClones = {
  id: 7,
  title: 'Attack of the Clones',
  episode_number: 2,
  poster_url: 'https://graphqlhero.com/Episode_II.jpg',
  release_date: '2002-05-16',
  saga: 'PREQUEL_TRILOGY',
  likes_count: 0,
};
const tatooine = {
  id: 1,
  name: 'Tatooine',
  diameter: 10465,
  climate: 'ARID',
  likes_count: 0,
};
const yavin = {
  id: 2,
  name: 'Yavin IV',
  diameter: 10200,
  climate: 'TEMPERATE',
  likes_count: 0,
};
const corellia = {
  id: 3,
  name: 'Corellia',
  diameter: 11000,
  climate: 'TEMPERATE',
  likes_count: 0,
};
const alderaan = {
  id: 4,
  name: 'Alderaan',
  diameter: 12500,
  climate: 'TEMPERATE',
  likes_count: 0,
};
const hoth = {
  id: 5,
  name: 'Hoth',
  diameter: 7200,
  climate: 'FROZEN',
  likes_count: 0,
};
const naboo = {
  id: 6,
  name: 'Naboo',
  diameter: 12120,
  climate: 'TEMPERATE',
  likes_count: 0,
};
const dagobah = {
  id: 7,
  name: 'Dagobah',
  diameter: 8900,
  climate: 'MURKY',
  likes_count: 0,
};

const millenniumFalcon = {
  id: 1,
  name: 'Millennium Falcon',
  model: 'YT-1300 light freighter',
  manufacturer: 'Corellian Engineering Corporation',
  likes_count: 0,
};

const yWing = {
  id: 2,
  name: 'Y-wing',
  model: 'BTL Y-wing',
  manufacturer: 'Koensayr Manufacturing',
  likes_count: 0,
};

export default async (supabase) => {
  await supabase.from('human').upsert([lukeSkywalker, leiaOrgana, hanSolo]);

  await supabase.from('droid').upsert([r2d2, c3po]);

  await supabase.from('wookie').upsert([chewbacca]);

  await supabase
    .from('film')
    .upsert([
      newHope,
      empireStikesBack,
      returnOfTheJedi,
      revengeOfTheSith,
      theForceAwakens,
      thePhantomMenace,
      attackOfTheClones,
    ]);

  await supabase
    .from('planet')
    .upsert([tatooine, yavin, corellia, alderaan, hoth, naboo, dagobah]);

  await supabase.from('starship').upsert([millenniumFalcon, yWing]);

  await supabase.from('planet_featured_in_film').upsert([
    { planet_id: 1, film_id: 1 },
    { planet_id: 1, film_id: 2 },
    { planet_id: 1, film_id: 3 },
    { planet_id: 1, film_id: 4 },
    { planet_id: 2, film_id: 1 },
    { planet_id: 3, film_id: 1 },
    { planet_id: 4, film_id: 1 },
  ]);

  await supabase.from('starship_pilots').upsert([
    { starship_id: 1, pilot_id: 1 },
    { starship_id: 1, pilot_id: 2 },
    { starship_id: 1, pilot_id: 3 },
    { starship_id: 2, pilot_id: 1 },
  ]);

  await supabase.from('character').upsert([
    { id: 1, human_id: 1, droid_id: null, wookie_id: null },
    { id: 2, human_id: 2, droid_id: null, wookie_id: null },
    { id: 3, human_id: 3, droid_id: null, wookie_id: null },
    { id: 4, human_id: null, droid_id: 1, wookie_id: null },
    { id: 5, human_id: null, droid_id: 2, wookie_id: null },
    { id: 6, human_id: null, droid_id: null, wookie_id: 1 },
  ]);

await supabase.from('character_friends').upsert([
    { character_id: 1, friend_id: 2 },
    { character_id: 1, friend_id: 4 },
    { character_id: 4, friend_id: 5 },
    { character_id: 1, friend_id: 6 },
  ]);

  console.log('Database populated !\n');
};
