import database from '../database';

const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  avatar_url: 'https://graphqlhero.com/img/luke.jpg',
  height: 172,
  mass: 77.1,
  is_jedi: true,
  gender: 'MALE'
};
const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
  birth_year: '19BBY',
  avatar_url: 'https://graphqlhero.com/img/LeiaOrgana.png',
  height: 150,
  mass: 49.3,
  is_jedi: false,
  gender: 'FEMALE'
};

const hanSolo = {
  id: 3,
  name: 'Han Solo',
  birth_year: '29BBY',
  avatar_url: 'https://graphqlhero.com/img/HanSolo.png',
  height: 180,
  mass: 80.0,
  is_jedi: false,
  gender: 'MALE'
};

const r2d2 = {
  id: 1,
  name: 'R2-D2',
  height: 96,
  mass: 32.0,
  model: 'Série R2'
};
const c3po = {
  id: 2,
  name: 'C-3PO',
  height: 167,
  mass: 75.0,
  model: ''
};

const chewbacca = {
  id: 1,
  name: 'Chewbacca',
  hair_color: 'Brown',
  height: 228,
  mass: 112
};
const newHope = {
  id: 1,
  title: 'A New Hope',
  episode_number: 4,
  poster_url: 'https://graphqlhero.com/img/Episode_IV.jpg',
  release_date: '1977-05-25',
  saga: 'ORIGINAL_TRILOGY'
};
const empireStrikesBack = {
  id: 2,
  title: 'The Empire Strikes Back',
  episode_number: 5,
  poster_url: 'https://graphqlhero.com/img/Episode_V.jpg',
  release_date: '1980-05-17',
  saga: 'ORIGINAL_TRILOGY'
};
const returnOfTheJedi = {
  id: 3,
  title: 'Return of the Jedi',
  episode_number: 6,
  poster_url: 'https://graphqlhero.com/img/Episode_VI.jpg',
  release_date: '1983-05-25',
  saga: 'ORIGINAL_TRILOGY'
};
const revengeOfTheSith = {
  id: 4,
  title: 'Revenge of the Sith',
  episode_number: 3,
  poster_url: 'https://graphqlhero.com/img/Episode_III.png',
  release_date: '2005-05-19',
  saga: 'PREQUEL_TRILOGY'
};
const theForceAwakens = {
  id: 5,
  title: 'The Force Awakens',
  poster_url: 'https://graphqlhero.com/img/Episode_VII.jpg',
  episode_number: 7,
  release_date: '2015-12-11',
  saga: 'SEQUEL_TRILOGY'
};
const thePhantomMenace = {
  id: 6,
  title: 'The Phantom Menace',
  episode_number: 1,
  poster_url: 'https://graphqlhero.com/img/Episode_I.png',
  release_date: '1999-05-19',
  saga: 'PREQUEL_TRILOGY'
};
const attackOfTheClones = {
  id: 7,
  title: 'Attack of the Clones',
  episode_number: 2,
  poster_url: 'https://graphqlhero.com/img/Episode_II.jpg',
  release_date: '2002-05-16',
  saga: 'PREQUEL_TRILOGY'
};
const tatooine = {
  id: 1,
  name: 'Tatooine',
  diameter: 10465,
  climate: 'ARID'
};
const yavin = {
  id: 2,
  name: 'Yavin IV',
  diameter: 10200,
  climate: 'TEMPERATE'
};
const corellia = {
  id: 3,
  name: 'Corellia',
  diameter: 11000,
  climate: 'TEMPERATE'
};
const alderaan = {
  id: 4,
  name: 'Alderaan',
  diameter: 12500,
  climate: 'TEMPERATE'
};
const hoth = {
  id: 5,
  name: 'Hoth',
  diameter: 7200,
  climate: 'FROZEN'
};
const naboo = {
  id: 6,
  name: 'Naboo',
  diameter: 12120,
  climate: 'TEMPERATE'
};
const dagobah = {
  id: 7,
  name: 'Dagobah',
  diameter: 8900,
  climate: 'MURKY'
};

const millenniumFalcon = {
  id: 1,
  name: 'Millennium Falcon',
  model: 'YT-1300 light freighter',
  manufacturer: 'Corellian Engineering Corporation'
};

const yWing = {
  id: 2,
  name: 'Y-wing',
  model: 'BTL Y-wing',
  manufacturer: 'Koensayr Manufacturing'
};

(async () => {
  await database.from('human').upsert([lukeSkywalker, leiaOrgana, hanSolo]);

  await database.from('droid').upsert([r2d2, c3po]);

  await database.from('wookie').upsert([chewbacca]);

  await database
    .from('film')
    .upsert([
      newHope,
      empireStrikesBack,
      returnOfTheJedi,
      revengeOfTheSith,
      theForceAwakens,
      thePhantomMenace,
      attackOfTheClones
    ]);

  await database
    .from('planet')
    .upsert([tatooine, yavin, corellia, alderaan, hoth, naboo, dagobah]);

  await database.from('starship').upsert([millenniumFalcon, yWing]);

  await database.from('planet_featured_in_film').upsert([
    { planet_id: 1, film_id: 1 },
    { planet_id: 1, film_id: 2 },
    { planet_id: 1, film_id: 3 },
    { planet_id: 1, film_id: 4 },
    { planet_id: 2, film_id: 1 },
    { planet_id: 3, film_id: 1 },
    { planet_id: 4, film_id: 1 }
  ]);

  await database.from('starship_pilots').upsert([
    { starship_id: 1, pilot_id: 1 },
    { starship_id: 1, pilot_id: 2 },
    { starship_id: 1, pilot_id: 3 },
    { starship_id: 2, pilot_id: 1 }
  ]);

  console.log('Database populated !\n');
})();
