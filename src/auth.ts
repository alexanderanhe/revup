import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// const pool = new Pool({
//   host: process.env.POSTGRES_DATABASE,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // adapter: PostgresAdapter(pool),
  providers: [Google, GitHub],
});