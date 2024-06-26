// https://medium.com/@tord.standnes/how-to-use-next-auth-with-vercel-postgres-8ba9a6af5da0
import { sql } from "@vercel/postgres";
import { Account } from "next-auth";
import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import { AdapterUserInfo } from "./definitions";

export default function vercelPostgresAdapter(): Adapter {
  try {
    const createUser = async (
      user: Omit<AdapterUser, "id">
    ): Promise<AdapterUser> => {
      const { rows } = await sql`
        INSERT INTO users (name, email, image) 
        VALUES (${user.name}, ${user.email}, ${user.image}) 
        RETURNING id, name, email, email_verified, image`;
      // Create user info
      const {rows: userInfo} = await sql`
        INSERT INTO users_info (user_id) 
        VALUES (${rows[0].id}) 
        RETURNING theme, assessment, onboarding`;
      const newUser: AdapterUser = {
        ...rows[0],
        id: rows[0].id.toString(),
        emailVerified: rows[0].email_verified,
        email: rows[0].email,
        ...userInfo[0],
      };
      return newUser;
    };

    const getUser = async (id: string) => {
      const { rows } = await sql`
          SELECT *
          FROM users
          WHERE id = ${id};
        `;
      return {
        ...rows[0],
        id: rows[0].id.toString(),
        emailVerified: rows[0].email_verified,
        email: rows[0].email,
      };
    };

    const getUserByEmail = async (email: string) => {
      const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
      return rows[0]
        ? {
            ...rows[0],
            id: rows[0].id.toString(),
            emailVerified: rows[0].email_verified,
            email: rows[0].email,
          }
        : null;
    };

    const getUserByAccount = async ({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }): Promise<AdapterUser | null> => {
      const { rows } = await sql`
      SELECT u.* 
      FROM users u join accounts a on u.id = a.user_id 
      WHERE a.provider_id = ${provider} 
      AND a.provider_account_id = ${providerAccountId}`;
      const user = rows[0]
        ? {
            email: rows[0].email,
            emailVerified: rows[0].email_verified,
            id: rows[0].id,
          }
        : null;
      return user;
    };

    const updateUser = async (
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<AdapterUser> => {
      const { rows } = await sql`
            UPDATE users
            SET name = ${user.name}, email = ${user.email}, image = ${user.image}
            WHERE id = ${user.id}
            RETURNING id, name, email, image;
            `;
      const updatedUser: AdapterUser = {
        ...rows[0],
        id: rows[0].id.toString(),
        emailVerified: rows[0].email_verified,
        email: rows[0].email,
      };
      return updatedUser;
    };

    const deleteUser = async (userId: string) => {
      await sql`DELETE FROM users WHERE id = ${userId}`;
      return;
    };

    const createSession = async ({
      sessionToken,
      userId,
      expires,
    }: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> => {
      const expiresString = expires.toDateString();
      await sql`
        INSERT INTO auth_sessions (user_id, expires, session_token) 
        VALUES (${userId}, ${expiresString}, ${sessionToken})
      `;
      const createdSession: AdapterSession = {
        sessionToken,
        userId,
        expires,
      };
      return createdSession;
    };

    const getSessionAndUser = async (
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser & AdapterUserInfo } | null> => {
      const session = await sql`
        SELECT * 
        FROM auth_sessions 
        WHERE session_token = ${sessionToken}`;
      if (!session.rows[0]) return null;

      const { rows } = await sql`
        SELECT u.*, ui.theme, ui.assessment, ui.onboarding 
        FROM users u join users_info ui on u.id = ui.user_id
        WHERE u.id = ${session.rows[0]?.user_id}`;
      const expiresDate = new Date(session.rows[0].expires);
      const sessionAndUser: { session: AdapterSession; user: AdapterUser & AdapterUserInfo } = {
        session: {
          sessionToken: session.rows[0].session_token,
          userId: session.rows[0].user_id,
          expires: expiresDate,
        },
        user: {
          id: rows[0].id,
          emailVerified: rows[0].email_verified,
          email: rows[0].email,
          name: rows[0].name,
          image: rows[0].image,
          // AdapterUserInfo
          theme: rows[0].theme.trim(),
          assessment: rows[0].assessment,
          onboarding: rows[0].onboarding,
        },
      };

      return sessionAndUser;
    };

    const updateSession = async (
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> => {
      console.log(
        "Unimplemented function! updateSession in vercelPostgresAdapter. Session:",
        JSON.stringify(session)
      );
      return;
    };

    const deleteSession = async (sessionToken: string) => {
      await sql`
          DELETE FROM auth_sessions
          WHERE session_token = ${sessionToken};
        `;
      return;
    };

    const linkAccount = async (
      account: AdapterAccount
    ): Promise<AdapterAccount | null | undefined> => {
      await sql`
        INSERT INTO accounts (
            user_id, 
            provider_id, 
            provider_type, 
            provider_account_id, 
            refresh_token,
            access_token,
            expires_at,
            token_type,
            scope,
            id_token
        ) 
        VALUES (
            ${account.userId}, 
            ${account.provider},
            ${account.type}, 
            ${account.providerAccountId}, 
            ${account.refresh_token},
            ${account.access_token}, 
            to_timestamp(${account.expires_at}),
            ${account.token_type},
            ${account.scope},
            ${account.id_token}
        )`;
      return account;
    };

    const unlinkAccount = async ({
      providerAccountId,
      provider,
    }: {
      providerAccountId: Account["providerAccountId"];
      provider: Account["provider"];
    }) => {
      await sql`
            DELETE FROM accounts 
            WHERE provider_account_id = ${providerAccountId} AND provider_id = ${provider}}`;
      return;
    };

    const createVerificationToken = async ({
      identifier,
      expires,
      token,
    }: VerificationToken): Promise<VerificationToken | null | undefined> => {
      const { rows } = await sql`
        INSERT INTO verification_tokens (identifier, token, expires) 
        VALUES (${identifier}, ${token}, ${expires.toString()})`;
      const createdToken: VerificationToken = {
        identifier: rows[0].identifier,
        token: rows[0].token,
        expires: rows[0].expires,
      };
      return createdToken;
    };

    //Return verification token from the database and delete it so it cannot be used again.
    const useVerificationToken = async ({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }) => {
      const { rows } = await sql`
        SELECT * FROM verification_tokens 
        WHERE identifier = ${identifier} 
        AND token = ${token} AND expires > NOW()`;
      await sql`
        DELETE FROM verification_tokens
        WHERE identifier = ${identifier}
        AND token = ${token}`;
      return {
        expires: rows[0].expires,
        identifier: rows[0].identifier,
        token: rows[0].token,
      };
    };

    return {
      createUser,
      getUser,
      updateUser,
      getUserByEmail,
      getUserByAccount,
      deleteUser,
      getSessionAndUser,
      createSession,
      updateSession,
      deleteSession,
      createVerificationToken,
      useVerificationToken,
      linkAccount,
      unlinkAccount,
    };
  } catch (error) {
    throw error;
  }
}