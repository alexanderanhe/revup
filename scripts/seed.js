const { db } = require('@vercel/postgres');

const sql = {
  dropAll: [{
    dropUserInfo: 'DROP TABLE IF EXISTS users_info;',
    dropAssessments: 'DROP TABLE IF EXISTS assessments;',
    dropVerificationToken: 'DROP TABLE IF EXISTS verification_tokens;',
    dropAuthSessions: 'DROP TABLE IF EXISTS auth_sessions;',
    dropTagsLang: 'DROP TABLE IF EXISTS tags_lang;',
    dropTags: 'DROP TABLE IF EXISTS tags;',
    dropWorkoutsLang: 'DROP TABLE IF EXISTS workouts_lang;',
    dropWorkouts: 'DROP TABLE IF EXISTS workouts;',
    dropAccounts: 'DROP TABLE IF EXISTS accounts;',
    dropUsers: 'DROP TABLE IF EXISTS users;',
    dropLanguages: 'DROP TABLE IF EXISTS languages;',
    dropTypeGender: 'DROP TYPE IF EXISTS gender;',
    dropTypeTag: 'DROP TYPE IF EXISTS tagType;'
  }, 'Dropped all types and tables'],
  seedTypes: [{
    createGenderType: 'CREATE TYPE gender AS ENUM (\'M\', \'F\', \'O\');',
    createTagType: 'CREATE TYPE tagType AS ENUM (\'muscle\', \'equipment\', \'difficulty\', \'goal\', \'place\', \'other\');',
  }, 'Created "types" table'],
  seedLanguages: [{
    createtable: `CREATE TABLE IF NOT EXISTS languages (
      code CHAR(2) PRIMARY KEY NOT NULL,
      name VARCHAR(100) NOT NULL,
      is_default BOOLEAN DEFAULT FALSE
    );`,
    insertDefault: `INSERT INTO languages (code, name, is_default) VALUES ('en', 'English', TRUE), ('es', 'Spanish', FALSE);`,
  }, 'Created "languages" table'],
  seedTags: [{
    createTable: `CREATE TABLE IF NOT EXISTS tags (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      type tagType NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );`,
    createTableLanguages: `CREATE TABLE IF NOT EXISTS tags_lang (
      name VARCHAR(100) NOT NULL,
      language_id CHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
      tag_id UUID REFERENCES tags(id) ON DELETE CASCADE
    );`,
    insertDefault: async function (client) {
      const tags = [
        // -- Insert tags muscles
        ['muscle', 'chest', 'pecho'],
        ['muscle', 'back', 'espalda'],
        ['muscle', 'legs', 'piernas'],
        ['muscle', 'gluteus', 'glúteo'],
        ['muscle', 'deltoids', 'deltoides'],
        ['muscle', 'biceps', 'bíceps'],
        ['muscle', 'triceps', 'tríceps'],
        ['muscle', 'forearm', 'antebrazo'],
        ['muscle', 'abs', 'abdominales'],
        ['muscle', 'functional workout', 'entrenamiento funcional'],
        ['muscle', 'cardio', 'cardio'],
        ['muscle', 'stretching', 'extensión'],
        // -- Insert tags place
        ['place', 'home', 'casa'],
        ['place', 'gym', 'gimnasio'],
        ['place', 'outdoor', 'aire libre'],
      ]
      for (const tag of tags) {
        const [type, nameEn, nameEs] = tag;
        const { rows } = await client.sql`INSERT INTO tags (type) VALUES (${ type }) RETURNING id`;
        if (!rows.length) return;
  
        const { id: tagId } = rows[0];
        await client.sql`INSERT INTO tags_lang (name, language_id, tag_id) VALUES (${ nameEn }, \'en\', ${ tagId });`;
        await client.sql`INSERT INTO tags_lang (name, language_id, tag_id) VALUES (${ nameEs }, \'es\', ${ tagId });`;
      }
    }
  }, 'Created "tags" table'],
  seedWorkouts: [{
    createTable: `CREATE TABLE IF NOT EXISTS workouts (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      tags UUID[] DEFAULT NULL,
      image_banner JSONB NULL,
      images JSONB NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );`,
    createTableLanguages: `CREATE TABLE IF NOT EXISTS workouts_lang (
      name VARCHAR(100) NOT NULL,
      description TEXT DEFAULT NULL,
      instructions TEXT DEFAULT NULL,
      warnings TEXT DEFAULT NULL,
      language_id CHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
      workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE
    );`
  }, 'Created "workouts" table'],
  seedUsers: [{
    createTable: `CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NULL,
      email_verified BOOLEAN DEFAULT false,
      image TEXT,
      gender gender NULL,
      birthdate DATE NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );`
  }, 'Created "users" table'],
  seedUsersInfo: [{
    createTable: `CREATE TABLE IF NOT EXISTS users_info (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      theme CHAR(10) NOT NULL DEFAULT 'light',
      assessment BOOLEAN DEFAULT false,
      onboarding BOOLEAN DEFAULT false,
      user_id UUID NULL REFERENCES users(id)
    );`
  }, 'Created "users_info" table'],
  seedAccounts: [{
    createTable: `CREATE TABLE IF NOT EXISTS accounts (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id),
      provider_id VARCHAR(255) NOT NULL,
      provider_type VARCHAR(255) NOT NULL,
      provider_account_id VARCHAR(255) NOT NULL,
      refresh_token TEXT,
      access_token TEXT NOT NULL,
      expires_at TIMESTAMP WITH TIME ZONE,
      token_type VARCHAR(255),
      scope TEXT,
      id_token TEXT,
      session_state TEXT
    );`
  }, 'Created "accounts" table'],
  seedSessions: [{
    createTable: `CREATE TABLE IF NOT EXISTS auth_sessions (
      id SERIAL PRIMARY KEY,
      expires TIMESTAMP WITH TIME ZONE NOT NULL,
      session_token TEXT NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id)
    );`
  }, 'Created "sessions" table'],
  seedVerificationToken: [{
    createTable: `CREATE TABLE IF NOT EXISTS verification_tokens (
      identifier VARCHAR(255) PRIMARY KEY,
      token TEXT NOT NULL,
      expires TIMESTAMP WITH TIME ZONE NOT NULL
    );`
  }, 'Created "verification_token" table'],
  seedAssessments: [{
    createTable: `CREATE TABLE IF NOT EXISTS assessments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      gender gender NOT NULL,
      birthdate DATE NOT NULL,
      weight SMALLINT NOT NULL,
      height SMALLINT NOT NULL,
      goal CHAR(4) NOT NULL,
      training CHAR(4) NOT NULL,
      gym CHAR(4) NOT NULL,
      frequency CHAR(4) NOT NULL,
      health CHAR(4) NOT NULL,
      user_id UUID NULL REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );`
  }, 'Created "assessments" table'],
}

async function seed(client, procedure) {
  try {
    if (!sql[procedure]) throw new Error(`Procedure ${procedure} not found`);
    const [queries, successMessage] = sql[procedure];
    const queriesKeys = Object.keys(queries);
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; // Enable uuid generation

    const result = await Promise.all(queriesKeys.map((queryKey) => {
      const query = queries[queryKey];
      if (typeof query === 'function') return query(client);
      return client.query(`${query}`);
    }));
    console.log(successMessage);
    return result;
  } catch (error) {
    console.error(`Error seeding ${procedure}:`, error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  const allSeeds = Object.keys(sql);

  for (const seedName of allSeeds) {
    await seed(client, seedName);
  }

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
