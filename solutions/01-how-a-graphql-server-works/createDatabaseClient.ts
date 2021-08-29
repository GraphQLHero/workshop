import { createClient } from '@supabase/supabase-js';
import populateDatabase from './populateDatabase';

const createDatabaseClient = async () => {
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL) {
  throw new Error('You must provide a `SUPABASE_URL`');
}
if (!SUPABASE_ANON_KEY) {
  throw new Error('You must provide a `SUPABASE_ANON_KEY`');
}
const database = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// We put objects in our database
await populateDatabase(database);

return database;
}

export default createDatabaseClient;