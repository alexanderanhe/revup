const { db } = require('@vercel/postgres');

console.log(process.env.POSTGRES_URL);

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE users(
        id SERIAL,
        name VARCHAR(255),
        email VARCHAR(255),
        "emailVerified" TIMESTAMPTZ,
        image TEXT,
        PRIMARY KEY (id)
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
      CREATE TABLE accounts(
        id SERIAL,
        "userId" INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        "providerAccountId" VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        id_token TEXT,
        scope TEXT,
        session_state TEXT,
        token_type TEXT,
        PRIMARY KEY (id)
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
      CREATE TABLE sessions(
        id SERIAL,
        "userId" INTEGER NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        "sessionToken" VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
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
      CREATE TABLE verification_token(
        identifier TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        token TEXT NOT NULL,
        PRIMARY KEY (identifier, token)
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
