## How to add database

### 1. Create new supabase project

Sign up to Supabase - [https://app.supabase.io](https://app.supabase.io) and create a new project. Wait for your database to start.

### 2. Setup database schema

Inside of your project, enter the `SQL editor` tab and run a new query :

```sql
drop table if exists starship_pilots;
drop table if exists planet_featured_in_film;
drop table if exists character_friends;
drop table if exists character;

drop table if exists human;
create table human (
  id integer generated by default as identity primary key,
  name text,
  birth_year text,
  gender text,
  height integer,
  mass float,
  avatar_url text,
  is_jedi boolean,
  likes_count integer
);

drop table if exists wookie;
create table wookie (
  id integer generated by default as identity primary key,
  name text,
  birth_year text,
  height integer,
  mass float,
  hair_color text,
  gender text,
  likes_count integer
);

drop table if exists droid;
create table droid (
  id integer generated by default as identity primary key,
  name text,
  birth_year text,
  height integer,
  mass float,
  model text,
  likes_count integer
);

drop table if exists film;
create table film (
  id integer generated by default as identity primary key,
  title text,
  episode_number integer,
  poster_url text,
  release_date text,
  saga text,
  likes_count integer
);
drop table if exists planet;
create table planet (
  id integer generated by default as identity primary key,
  name text,
  climate text,
  diameter integer,
  likes_count integer
);

create table planet_featured_in_film(
  planet_id integer,
  film_id integer,
  -- Constraints:
  primary key (planet_id, film_id),
  foreign key (planet_id) references planet(id),
  foreign key (film_id) references film(id)
);

drop table if exists starship;
create table starship (
  id integer generated by default as identity primary key,
  name text,
  model text,
  manufacturer text,
  likes_count integer
);

create table starship_pilots(
  starship_id integer,
  pilot_id integer,
  -- Constraints:
  primary key (starship_id, pilot_id),
  foreign key (starship_id) references starship(id),
  foreign key (pilot_id) references human(id)
);

drop table if exists character;
create table character (
  id integer generated by default as identity primary key,
  human_id integer,
  droid_id integer,
  wookie_id integer,
    -- Constraints:
  foreign key (human_id) references human(id),
  foreign key (droid_id) references droid(id),
  foreign key (wookie_id) references wookie(id)
);

create table character_friends(
  character_id integer,
  friend_id integer,
  -- Constraints:
  primary key (character_id, friend_id),
  foreign key (character_id) references character(id),
  foreign key (friend_id) references character(id)
);
```

### 3. Get the URL and Key

Go to the Project Settings (the cog icon), open the API tab, and find your API URL and `anon`,`public` key, you'll need these to fill :

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

You should use a `.env` file at the root of each exercise, it will be loaded by NodeJS :

```
SUPABASE_URL=xyz
SUPABASE_ANON_KEY=xyz
```