import database from '../database';

const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  avatar_url: 'https://graphqlhero.com/img/Luke.jpg',
  height: 172,
  mass: 77.1,
  is_jedi: true
};
const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
  birth_year: '19BBY',
  avatar_url: 'https://graphqlhero.com/img/LeiaOrgana.png',
  height: 150,
  mass: 49.3,
  is_jedi: false
};

const hanSolo = {
  id: 3,
  name: 'Han Solo',
  birth_year: '29BBY',
  avatar_url: 'https://graphqlhero.com/img/HanSolo.png',
  height: 180,
  mass: 80.0,
  is_jedi: false
};

(async () => {
  console.log('Populating database…\n');
  await database.from('human').upsert([lukeSkywalker, leiaOrgana, hanSolo]);
  console.log('Database populated !\n');
})();
