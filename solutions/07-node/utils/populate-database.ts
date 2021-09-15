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
const tatooine = {
  id: 1,
  name: 'Tatooine',
  diameter: 10465,
};
const yavin = {
  id: 2,
  name: 'Yavin IV',
  diameter: 10200,
};

(async () => {
  await database.from('human').upsert([lukeSkywalker, leiaOrgana]);
  await database.from('film').upsert([newHope, empireStrikesBack]);
  await database
  .from('planet')
  .upsert([tatooine, yavin]);

  console.log('Database populated !\n');
})();
