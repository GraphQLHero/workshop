import { SupabaseClient } from '@supabase/supabase-js';

const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  avatar_url: 'https://graphqlhero.com/img/luke.jpg',
  height: 172,
  mass: 77.1,
  is_jedi: true,
};

const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
  birth_year: '19BBY',
  height: 150,
  avatar_url: 'https://graphqlhero.com/img/LeiaOrgana.png',
  mass: 49.3,
  is_jedi: false,
};

const hanSolo = {
  id: 3,
  name: 'Han Solo',
  birth_year: '29BBY',
  avatar_url: 'https://graphqlhero.com/img/HanSolo.png',
  height: 180,
  mass: 80.0,
  is_jedi: false,
};

const r2d2 = {
  id: 1,
  name: 'R2-D2',
  height: 96,
  mass: 32.0,
  model: 'Série R2',
};
const c3po = {
  id: 2,
  name: 'C-3PO',
  height: 167,
  mass: 75.0,
  model: '',
};

const chewbacca = {
  id: 1,
  name: 'Chewbacca',
  hair_color: 'Brown',
  height: 228,
  mass: 112,
};

export default async (supabase: SupabaseClient) => {
  const { error, data } = await supabase.from('human').upsert([lukeSkywalker, leiaOrgana, hanSolo]);
  if (error) {
    console.error(error);
  }

  await supabase.from('droid').upsert([r2d2, c3po]);

  await supabase.from('wookie').upsert([chewbacca]);

  console.log('Database populated !\n');
};
