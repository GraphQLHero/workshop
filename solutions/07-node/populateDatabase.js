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
const empireStikesBack = {
  id: 2,
  title: 'The Empire Strikes Back',
};

export default async (supabase) => {
  await supabase.from('human').upsert([lukeSkywalker, leiaOrgana]);
  await supabase.from('film').upsert([newHope, empireStikesBack]);
};
