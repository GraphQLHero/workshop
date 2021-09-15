import database from '../database';

const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
};
const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
};
const newHope = {
  id: 1,
  title: 'A New Hope',
};
const empireStrikesBack = {
  id: 2,
  title: 'The Empire Strikes Back',
};

(async () => {
  await database.from('human').upsert([lukeSkywalker, leiaOrgana]);
  await database.from('film').upsert([newHope, empireStrikesBack]);
  console.log('Database populated !\n');
})();
