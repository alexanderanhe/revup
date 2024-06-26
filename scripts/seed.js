const { db } = require('@vercel/postgres');

async function dropAll(client) {
  try {
    const dropUserInfo = await client.sql`DROP TABLE IF EXISTS users_info;`;
    const dropAssessments = await client.sql`DROP TABLE IF EXISTS assessments;`;
    const dropVerificationToken = await client.sql`DROP TABLE IF EXISTS verification_tokens;`;
    const dropAuthSessions = await client.sql`DROP TABLE IF EXISTS auth_sessions;`;
    const dropAccounts = await client.sql`DROP TABLE IF EXISTS accounts;`;
    const dropUsers = await client.sql`DROP TABLE IF EXISTS users;`;
    const dropTypeGender = await client.sql`DROP TYPE  IF EXISTS gender;`;

    console.log(`Dropped all types and tables`);

    return {
      dropUserInfo,
      dropAssessments,
      dropVerificationToken,
      dropAuthSessions,
      dropAccounts,
      dropUsers,
      dropTypeGender
    };
  } catch (error) {
    console.error('Error droping all:', error);
    throw error;
  }
}

async function seedTypes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTypes = await client.sql`
      CREATE TYPE gender AS ENUM ('M', 'F', 'O');
    `;

    console.log(`Created "types" table`);

    return {
      createTypes,
    };
  } catch (error) {
    console.error('Error seeding types:', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE users (
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
      );
    `;

    console.log(`Created "users" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding Users:', error);
    throw error;
  }
}

async function seedUsersInfo(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    // Create the "users_info" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE users_info (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        theme CHAR(10) NOT NULL DEFAULT 'light',
        assessment BOOLEAN DEFAULT false,
        onboarding BOOLEAN DEFAULT false,
        user_id UUID NULL REFERENCES users(id)
      );
    `;

    console.log(`Created "users_info" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding Users Info:', error);
    throw error;
  }
}

async function seedAccounts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "accounts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE accounts (
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
      );
    `;

    console.log(`Created "accounts" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding Accounts:', error);
    throw error;
  }
}

async function seedSessions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "sessions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE auth_sessions (
        id SERIAL PRIMARY KEY,
        expires TIMESTAMP WITH TIME ZONE NOT NULL,
        session_token TEXT NOT NULL,
        user_id UUID NOT NULL REFERENCES users(id)
      );
    `;

    console.log(`Created "sessions" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding Sessions:', error);
    throw error;
  }
}

async function seedVerificationToken(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "verification_token" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE verification_tokens (
        identifier VARCHAR(255) PRIMARY KEY,
        token TEXT NOT NULL,
        expires TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;

    console.log(`Created "verification_token" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding verificationToken:', error);
    throw error;
  }
}

async function seedAssessments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "assessments" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE assessments (
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
      );
    `;

    console.log(`Created "assessments" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding Assessments:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await dropAll(client);
  await seedTypes(client);
  await seedUsers(client);
  await seedUsersInfo(client);
  await seedAccounts(client);
  await seedSessions(client);
  await seedVerificationToken(client);
  await seedAssessments(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
