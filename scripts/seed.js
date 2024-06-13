const { db } = require('@vercel/postgres');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        email_verified BOOLEAN DEFAULT false,
        image TEXT,
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

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedAccounts(client);
  await seedSessions(client);
  await seedVerificationToken(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
