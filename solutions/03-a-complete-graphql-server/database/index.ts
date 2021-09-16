import createClient from './createClient';

let database = createClient();

type Human = {
  id: string;
  name: string;
  birth_year: string;
  avatar_url: string;
  height: number;
  mass: number;
  is_jedi: boolean;
};

export const findHumanById = async (id: number): Promise<Human | null> => {
  const { data, error } = await database
    .from('human')
    .select('*')
    .filter('id', 'eq', id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const findDroidById = async (id: number) => {
  const { data, error } = await database
    .from('droid')
    .select('*')
    .filter('id', 'eq', id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const findWookieById = async (id: number) => {
  const { data, error } = await database
    .from('wookie')
    .select('*')
    .filter('id', 'eq', id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export default database;
