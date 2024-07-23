const { db } = require('@vercel/postgres');

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
    dropPlansLang: 'DROP TABLE IF EXISTS plans_user_day;',
    dropPlans: 'DROP TABLE IF EXISTS plans;',
    dropPlansLang: 'DROP TABLE IF EXISTS plans_user_workouts_complex;',
    dropWorkoutsComplex: 'DROP TABLE IF EXISTS workouts_complex;',
    dropWorkoutsLiked: 'DROP TABLE IF EXISTS workouts_liked;',
    dropWorkouts: 'DROP TABLE IF EXISTS workouts;',
    dropTags: 'DROP TABLE IF EXISTS tags;',
    dropAccounts: 'DROP TABLE IF EXISTS accounts;',
    dropUsers: 'DROP TABLE IF EXISTS users;',
    dropLanguages: 'DROP TABLE IF EXISTS languages;',
    dropTypeGender: 'DROP TYPE IF EXISTS gender;',
    dropTypeTag: 'DROP TYPE IF EXISTS tagType;'
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
      const tags = [
        // -- Insert tags muscles
        ['muscle', 'chest', 'pecho', '1'],
        ['muscle', 'back', 'espalda', '1', [
          ['muscle', 'latissimus dorsi', 'dorsal ancho' ],
          ['muscle', 'trapezius', 'trapecio' ],
          ['muscle', 'rhomboids', 'romboides' ],
          ['muscle', 'lower back', 'parte baja de la espalda' ],
          ['muscle', 'lumbar', 'lumbar' ],
          ['muscle', 'erector spinae', 'erector de la columna' ],
          ['muscle', 'teres major', 'redondo mayor' ],
          ['muscle', 'teres minor', 'redondo menor' ],
          ['muscle', 'neck', 'cuello'],
        ]],
        ['muscle', 'legs', 'piernas', '1', [
          ['muscle', 'quadriceps', 'cuádriceps' ],
          ['muscle', 'hamstrings', 'isquiotibiales' ],
          ['muscle', 'calves', 'gemelos' ],
          ['muscle', 'anterior thigh muscles', 'músculos anteriores del muslo' ],
          ['muscle', 'posterior thigh muscles', 'músculos posteriores del muslo' ],
          ['muscle', 'inner thigh muscles', 'músculos internos del muslo' ],
          ['muscle', 'outer thigh muscles', 'músculos externos del muslo' ],
          ['muscle', 'abductores de cadera', 'hip abductors' ],
          ['muscle', 'glutes', 'glúteo', '1'],
        ]],
        ['muscle', 'deltoids', 'deltoides', '1', [
          ['muscle', 'front deltoids', 'deltoides frontales' ],
          ['muscle', 'middle deltoids', 'deltoides medios' ],
          ['muscle', 'rear deltoids', 'deltoides posteriores' ],
        ]],
        ['muscle', 'biceps', 'bíceps', '1'],
        ['muscle', 'triceps', 'tríceps', '1'],
        ['muscle', 'forearm', 'antebrazo', '1'],
        ['muscle', 'abs', 'abdominales', '1', [
          ['muscle', 'obliques', 'oblicuos' ],
          ['muscle', 'transverse abdominis', 'transverso del abdomen' ],
          ['muscle', 'rectus abdominis', 'recto del abdomen' ],
          ['muscle', 'lower abs', 'abdominales inferiores' ],
          ['muscle', 'upper abs', 'abdominales superiores' ],
          ['muscle', 'core', 'core' ],
          ['muscle', 'six pack', 'six pack' ],
          ['muscle', 'v line', 'v line' ],
        ]],
        ['muscle', 'pelvic floor', 'suelo pélvico' ],
        ['muscle', 'functional workout', 'entrenamiento funcional', '1'],
        ['muscle', 'cardio', 'cardio', '1'],
        ['muscle', 'stretching', 'estiramiento', '1'],
        // -- Insert tags equipment
        ['equipment', 'with equipment', 'con equipo', '1', [
          ['equipment', 'barbell', 'barra'],
          ['equipment', 'dumbbells', 'mancuernas'],
          ['equipment', 'kettlebells', 'pesa rusa'],
          ['equipment', 'medicine ball', 'balón medicinal'],
          ['equipment', 'resistance band', 'banda de resistencia'],
          ['equipment', 'ab wheel', 'rueda abdominal'],
          ['equipment', 'trx', 'trx'],
          ['equipment', 'pull-up bar', 'barra de dominadas'],
          ['equipment', 'parallel bars', 'paralelas'],
          ['equipment', 'cardio machine', 'maquina de cardio'],
          ['equipment', 'treadmill', 'cinta de correr'],
          ['equipment', 'elliptical', 'elíptica'],
          ['equipment', 'stationary bike', 'bicicleta estática'],
          ['equipment', 'rowing machine', 'máquina de remo'],
          ['equipment', 'stair climber', 'escaladora'],
          ['equipment', 'punching bag', 'saco de boxeo'],
          ['equipment', 'jumping rope', 'cuerda para saltar'],
          ['equipment', 'dip bar', 'barra de dips'],
          ['equipment', 'bench', 'banco'],
          ['equipment', 'multifunctional bench', 'banco multifuncional'],
          ['equipment', 'cable machine', 'máquina de poleas'],
          ['equipment', 'squat rack', 'soporte para sentadillas'],
          ['equipment', 'smith machine', 'máquina smith'],
          ['equipment', 'leg press machine', 'máquina de prensa de piernas'],
          ['equipment', 'leg curl machine', 'máquina de curl de piernas'],
          ['equipment', 'leg extension machine', 'máquina de extensión de piernas'],
          ['equipment', 'leg abduction machine', 'máquina de abducción de piernas'],
          ['equipment', 'stability ball', 'pelota de estabilidad'],
          ['equipment', 'bosu ball', 'bosu'],
          ['equipment', 'foam roller', 'rodillo de espuma'],
          ['equipment', 'yoga mat', 'colchoneta de yoga'],
          ['equipment', 'pilates ball', 'pelota de pilates'],
          ['equipment', 'plyobox/platform', 'plyobox/plataforma'],
          ['equipment', 'hack machine', 'máquina hack'],
          ['equipment', 'gravitron', 'gravitron'],
          ['equipment', 'crossover', 'transversal'],
          ['equipment', 'upper block', 'bloque superior'],
          ['equipment', 'lower block', 'bloque inferior'],
          ['equipment', 'calf machine', 'máquina de gemelos'],
          ['equipment', 'ankle (wrist) weights', 'pesas de tobillo (muñeca)'],
        ]],
        ['equipment', 'without equipment', 'sin equipo', '1', [
          ['equipment', 'bodyweight', 'peso corporal'],
        ]],
        // -- Insert tags place
        ['place', 'home', 'casa'],
        ['place', 'gym', 'gimnasio'],
        ['place', 'outdoor', 'aire libre'],
        // -- Insert tags goal
        ['goal', 'general muscle building', 'ganar masa muscular' ,'1'],
        ['goal', 'weight loss', 'perder peso', '1'],
        ['goal', 'keeping fit', 'mantenerse en forma', '1'],
        // -- Insert tags gender
        ['gender', 'men', 'hombre'],
        ['gender', 'woman', 'mujer'],
        // -- Insert tags difficulty
        ['difficulty', 'no experience', 'sin experiencia', '0'],
        ['difficulty', 'beginner', 'principiante', '1'],
        ['difficulty', 'advanced', 'avanzado', '2'],
        ['difficulty', 'expert', 'experto', '3'],
        ['difficulty', 'professional', 'profesional', '4'],
        // -- Insert tags others
        ['other', 'upper body', 'parte superior'],
        ['other', 'legs+shoulders', 'piernas+hombros'],
        ['other', 'full body', 'cuerpo completo'],
      ]
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
      custom_email VARCHAR(255) NULL,
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
      current_day SMALLINT REFERENCES plans_user_day(day) DEFAULT NULL,
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

    const result = await Promise.all(queriesKeys.map((queryKey) => {
      const query = queries[queryKey];
      currentTable = queryKey;
      if (typeof query === 'function') return query(client);
      return client.query(`${query}`);
    }));
    console.log(successMessage);
    return result;
  } catch (error) {
    console.error(`Error seeding ${procedure} on table ${currentTable}:`, error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  const allSeeds = Object.keys(sql);

  for await (const seedName of allSeeds) {
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
