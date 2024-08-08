const { db } = require('@vercel/postgres');
const { tags } = require('./data');

const sql = {
  dropAll: [{ // TODO: Add drop tables for plans
    dropUserInfo: 'DROP TABLE IF EXISTS users_info;',
    dropAssessments: 'DROP TABLE IF EXISTS assessments;',
    dropVerificationToken: 'DROP TABLE IF EXISTS verification_tokens;',
    dropAuthSessions: 'DROP TABLE IF EXISTS auth_sessions;',
    dropTagsLang: 'DROP TABLE IF EXISTS tags_lang;',
    dropWorkoutsLang: 'DROP TABLE IF EXISTS workouts_lang;',
    dropPlansUser: 'DROP TABLE IF EXISTS plans_user;',
    dropPlansLang: 'DROP TABLE IF EXISTS plans_lang;',
    dropPlansUserWC: 'DROP TABLE IF EXISTS plans_user_workouts_complex;',
    dropPlansUserDay: 'DROP TABLE IF EXISTS plans_user_day;',
    dropPlans: 'DROP TABLE IF EXISTS plans;',
    dropWorkoutsComplex: 'DROP TABLE IF EXISTS workouts_complex;',
    dropWorkoutsLiked: 'DROP TABLE IF EXISTS workouts_liked;',
    dropWorkouts: 'DROP TABLE IF EXISTS workouts;',
    dropTags: 'DROP TABLE IF EXISTS tags;',
    dropAccounts: 'DROP TABLE IF EXISTS accounts;',
    dropUsers: 'DROP TABLE IF EXISTS users;',
    dropLanguages: 'DROP TABLE IF EXISTS languages;',
    dropTypeGender: 'DROP TYPE IF EXISTS gender;',
    dropTypeTag: 'DROP TYPE IF EXISTS tagType;',
  }, 'Dropped all types and tables'],
  seedTypes: [{
    createGenderType: 'CREATE TYPE gender AS ENUM (\'M\', \'F\', \'O\');',
    createTagType: 'CREATE TYPE tagType AS ENUM (\'muscle\', \'equipment\', \'difficulty\', \'goal\', \'place\', \'gender\', \'other\');',
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
      key_name VARCHAR(100) NOT NULL,
      value VARCHAR(100) DEFAULT NULL,
      parent_id UUID NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (type, key_name)
    );`,
    createTableLanguages: `CREATE TABLE IF NOT EXISTS tags_lang (
      name VARCHAR(100) NOT NULL,
      tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
      language_id CHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
      PRIMARY KEY (tag_id, language_id)
    );`,
    insertDefault: async function (client) {
      for (const tag of tags) {
        const [type, nameEn, nameEs, value, children] = tag;
        const { rows } = await client.sql`INSERT INTO tags (type, key_name, value) VALUES (${ type }, ${ nameEn }, ${ value ?? null }) RETURNING id`;
        if (!rows.length) throw new Error('Error inserting tag');
  
        const { id: tagId } = rows[0];
        await client.sql`INSERT INTO tags_lang (name, language_id, tag_id) VALUES (${ nameEn }, \'en\', ${ tagId });`;
        await client.sql`INSERT INTO tags_lang (name, language_id, tag_id) VALUES (${ nameEs }, \'es\', ${ tagId });`;

        if (children) {
          for (const child of children) {
            const [type, nameEn, nameEs, value] = child;
            const { rows } = await client.sql`INSERT INTO tags (type, key_name, value, parent_id) VALUES (${ type }, ${ nameEn }, ${ value ?? null }, ${ tagId }) RETURNING id`;
            if (!rows.length) throw new Error('Error inserting tag');
      
            const { id: childTagId } = rows[0];
            await client.sql`INSERT INTO tags_lang (name, language_id, tag_id) VALUES (${ nameEn }, \'en\', ${ childTagId });`;
            await client.sql`INSERT INTO tags_lang (name, language_id, tag_id) VALUES (${ nameEs }, \'es\', ${ childTagId });`;
          }
        }
      }
    }
  }, 'Created "tags" table'],
  seedUsers: [{
    createTable: `CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NULL,
      email_verified TIMESTAMPTZ NULL,
      image TEXT,
      gender gender NULL,
      birthdate DATE NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );`,
    createInfoTable: `CREATE TABLE IF NOT EXISTS users_info (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      theme CHAR(10) NOT NULL DEFAULT 'light',
      assessment BOOLEAN DEFAULT false,
      onboarding BOOLEAN DEFAULT false,
      dashboard TEXT DEFAULT NULL,
      weight_unit CHAR(2) DEFAULT 'kg',
      height_unit CHAR(2) DEFAULT 'cm',
      user_id UUID NULL REFERENCES users(id)
    );`
  }, 'Created "users" table'],
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
      workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
      language_id CHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
      PRIMARY KEY (workout_id, language_id)
    );`,
    createTableWorkoutsComplex: `CREATE TABLE IF NOT EXISTS workouts_complex (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      body_zones UUID[] DEFAULT NULL,
      reps SMALLINT DEFAULT NULL,
      time SMALLINT DEFAULT NULL,
      time_unit CHAR(3) DEFAULT NULL,
      rest SMALLINT DEFAULT NULL,
      rest_between SMALLINT DEFAULT NULL,
      rest_sets SMALLINT DEFAULT NULL,
      sets SMALLINT DEFAULT NULL,
      weight SMALLINT DEFAULT NULL,
      weight_unit CHAR(2) DEFAULT NULL,
      total_minutes SMALLINT DEFAULT NULL,
      comments TEXT DEFAULT NULL,
      recommendations TEXT DEFAULT NULL,
      workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE
    );`,
    createUsersLikedTable: `CREATE TABLE IF NOT EXISTS workouts_liked (
      workout_id UUID NULL REFERENCES workouts(id),
      user_id UUID NULL REFERENCES users(id),
      enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (workout_id, user_id)
    );`,
  }, 'Created "workouts", "workouts_lang", "workouts_complex" and "workouts_liked" tables'],
  seedPlans: [{
    createTable: `CREATE TABLE IF NOT EXISTS plans (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      tags UUID[] DEFAULT NULL,
      body_zones UUID[] DEFAULT NULL,
      workouts_complex UUID[] DEFAULT NULL,
      days SMALLINT DEFAULT NULL,
      sets_per_week SMALLINT DEFAULT NULL,
      custom_emails JSONB NULL,
      type CHAR(10) DEFAULT 'public',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );`,
    createTableLanguages: `CREATE TABLE IF NOT EXISTS plans_lang (
      name VARCHAR(100) NOT NULL,
      comments TEXT DEFAULT NULL,
      plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
      language_id CHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
      PRIMARY KEY (plan_id, language_id)
    );`,
    createTableUsersDay: `CREATE TABLE IF NOT EXISTS plans_user_day (
      day SMALLINT DEFAULT 1 UNIQUE,
      user_id UUID REFERENCES users(id),
      plan_id UUID REFERENCES plans(id),
      name VARCHAR(100) NULL,
      percentage SMALLINT DEFAULT 0,
      started_at TIMESTAMP DEFAULT NULL,
      completed BOOLEAN DEFAULT FALSE,
      completed_at TIMESTAMP DEFAULT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (user_id, plan_id, day)
    );`,
    createTableUserWorkoutsComplex: `
    CREATE TABLE IF NOT EXISTS plans_user_workouts_complex (
      id UUID DEFAULT uuid_generate_v4(),
      day SMALLINT REFERENCES plans_user_day(day),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
      reps SMALLINT DEFAULT NULL,
      time SMALLINT DEFAULT NULL,
      time_unit CHAR(3) DEFAULT NULL,
      rest SMALLINT DEFAULT NULL,
      rest_between SMALLINT DEFAULT NULL,
      rest_sets SMALLINT DEFAULT NULL,
      weight SMALLINT DEFAULT NULL,
      weight_unit CHAR(2) DEFAULT NULL,
      workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
      workout_complex_id UUID REFERENCES workouts_complex(id) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (user_id, plan_id, day, id)
    );`,
    createTableUsers: `CREATE TABLE IF NOT EXISTS plans_user (
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
      is_current BOOLEAN DEFAULT FALSE,
      current_day SMALLINT REFERENCES plans_user_day(day) DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (user_id, plan_id)
    );`
  }, 'Created "plans" table'],
  seedAccounts: [{
    createTable: `CREATE TABLE IF NOT EXISTS accounts (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id),
      provider_id VARCHAR(255) NOT NULL,
      provider_type VARCHAR(255) NOT NULL,
      provider_account_id VARCHAR(255) NOT NULL,
      refresh_token TEXT,
      access_token TEXT NOT NULL,
      expires_at BIGINT,
      id_token TEXT,
      scope TEXT,
      session_state TEXT,
      token_type TEXT
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
      identifier TEXT,
      expires TIMESTAMPTZ NOT NULL,
      token TEXT NOT NULL,
      PRIMARY KEY (identifier, token)
    );`
  }, 'Created "verification_token" table'],
  seedAssessments: [{
    createTable: `CREATE TABLE IF NOT EXISTS assessments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      tags UUID[] DEFAULT NULL,
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
  let currentTable = '';
  try {
    if (!sql[procedure]) throw new Error(`Procedure ${procedure} not found`);
    const [queries, successMessage] = sql[procedure];
    const queriesKeys = Object.keys(queries);
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; // Enable uuid generation

    const result = []
    for (queryKey of queriesKeys) {
      const query = queries[queryKey];
      currentTable = queryKey;
      if (typeof query === 'function') return query(client);
      result.push(client.query(`${query}`));
    }
    Promise.all(result).then(() => {
      console.log(successMessage);
    }).catch((error) => {
      throw error;
    });
    return result;
  } catch (error) {
    console.error(`Error seeding ${procedure} on table ${currentTable}:`, error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  const allSeeds = Object.keys(sql);
  const result = []
  for (const seedName of allSeeds) {
    result.push(seed(client, seedName));
  }

  Promise.all(result)
  .catch((err) => {
    throw err;
  })
  .finally(() => {
    client.end();
    console.log("FINISHED!");
  })
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
