// Our objects fetched from our database
const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
};
const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
};
const darthVader = {
  id: 3,
  name: 'Anakin Skywalker',
};
const r2d2 = {
  id: 4,
  name: 'R2-D2',
};
const c3po = {
  id: 5,
  name: 'C-3PO',
};
const chewbacca = {
  id: 6,
  name: 'Chewbacca',
};
const obiWan = {
  id: 7,
  name: 'Obi-Wan Kenobi',
};
const hanSolo = {
  id: 8,
  name: 'Han Solo',
};
const palpatine = {
  id: 9,
  name: 'Palpatine',
};

export default async (supabase) => {
  const characters = [
    lukeSkywalker,
    leiaOrgana,
    darthVader,
    r2d2,
    c3po,
    chewbacca,
    obiWan,
    hanSolo,
    palpatine,
  ];
  const { error } = await supabase.from('characters').upsert(characters);
  if (error) {
    console.error(error);
  }
};
