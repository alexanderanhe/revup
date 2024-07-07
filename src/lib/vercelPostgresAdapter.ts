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

export function mapExpiresAt(account: any): any {
  const expires_at: number = parseInt(account.expires_at)
  return {
    ...account,
    expires_at,
  }
}

export default function vercelPostgresAdapter(): Adapter {
  return {
    async createVerificationToken(verificationToken: VerificationToken): Promise<VerificationToken | null | undefined> {
      const { identifier, expires, token } = verificationToken
      const { rows } = await sql<VerificationToken>`
        INSERT INTO verification_tokens (identifier, token, expires) 
        VALUES (${identifier}, ${token}, ${expires.toString()})`;
      return rows[0];
    },
    //Return verification token from the database and delete it so it cannot be used again.
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      const result = await sql<VerificationToken>`
        delete from verification_token
        where identifier = ${identifier} and token = $2
        RETURNING identifier, expires, token;`;
      return result.rowCount !== 0 ? result.rows[0] : null
    },

    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const { name, email, emailVerified, image } = user
      const emailVerifiedString = emailVerified?.toDateString();
      const { rows } = await sql<AdapterUser>`
        INSERT INTO users (name, email, email_verified, image) 
        VALUES (${name}, ${email}, ${emailVerifiedString}, ${image}) 
        RETURNING id, name, email, email_verified as "emailVerified", image`;
      // BRAYFIT: Create user info
      await sql`INSERT INTO users_info (user_id) VALUES (${rows[0].id})`;

      return rows[0];
    },
    async getUser(id: string) {
      try {
        const result = await sql<AdapterUser>`SELECT *, email_verified as "emailVerified" FROM users WHERE id = ${id};
      `;
        return result.rowCount === 0 ? null : result.rows[0]
      } catch (e) {
        return null
      }
    },
    async getUserByEmail(email: string) {
      const result = await sql<AdapterUser>`SELECT *, email_verified as "emailVerified" FROM users WHERE email = ${email}`;
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async getUserByAccount({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }): Promise<AdapterUser | null> {
      const result = await sql<AdapterUser>`
      SELECT u.*, email_verified as "emailVerified"
      FROM users u join accounts a on u.id = a.user_id 
      WHERE a.provider_id = ${provider} 
      AND a.provider_account_id = ${providerAccountId}`;
      return result.rowCount !== 0 ? result.rows[0] : null
    },
    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
      const { id, name, email, emailVerified, image } = user
      const { rows } = await sql<AdapterUser>`
        UPDATE users SET
        name = ${name}, email = ${email}, email_verified = ${String(emailVerified)}, image = ${image}
        WHERE id = ${id}
        RETURNING id, name, email, email_verified as "emailVerified", image;
        `;
      return rows[0];
    },
    async linkAccount(
      account: AdapterAccount
    ): Promise<AdapterAccount | null | undefined> {
      const result = await sql`
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
            ${account.expires_at},
            ${account.token_type},
            ${account.scope},
            ${account.id_token}
        )
        RETURNING
          id,
          user_id as "userId", 
          provider_id as provider, 
          provider_type as type, 
          provider_account_id as "providerAccountId", 
          access_token,
          expires_at,
          refresh_token,
          id_token,
          scope,
          session_state,
          token_type`;
        return mapExpiresAt(result.rows[0])
    },
    async createSession({
      sessionToken,
      userId,
      expires,
    }: {
      sessionToken: string;
      userId: string | undefined;
      expires: Date;
    }): Promise<AdapterSession> {
      if (userId === undefined) {
        throw Error(`userId is undef in createSession`)
      }
      const expiresString = expires.toDateString();
      const result = await sql<AdapterSession>`INSERT INTO auth_sessions
      (user_id, expires, session_token)
      values (${userId}, ${expiresString}, ${sessionToken})
      RETURNING id, session_token as "sessionToken", user_id as "userId", expires`
      return result.rows[0]
    },

    async getSessionAndUser(sessionToken: string | undefined): Promise<{
      session: AdapterSession;
      user: AdapterUser
    } | null> {
      if (sessionToken === undefined) {
        return null
      }
      const result1 = await sql<AdapterSession>`
        SELECT id, expires, session_token as "sessionToken", user_id as "userId"
        FROM auth_sessions WHERE session_token = ${sessionToken}
      `;
      if (result1.rowCount === 0) {
        return null
      }
      let session = result1.rows[0];
      const expiresDate = new Date(session.expires);

      const result2 = await sql`SELECT * FROM users WHERE id = ${session.userId}`;
      if (result2.rowCount === 0) {
        return null
      }
      const user = result2.rows[0]

      const sessionAndUser: { session: AdapterSession; user: AdapterUser } = {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: expiresDate,
        },
        user: {
          id: user.id,
          emailVerified: user.email_verified,
          email: user.email,
          name: user.name,
          image: user.image,
        },
      };

      return sessionAndUser;
    },
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> {
      const { sessionToken, expires } = session;
      const expiresString = expires?.toDateString();

      const result = await sql<AdapterSession>`
        UPDATE auth_sessions SET expires = ${expiresString}
        WHERE session_token = ${sessionToken}
        RETURNING id, session_token as "sessionToken", user_id as "userId", expires
      `;
      return result.rows[0]
    },
    async deleteSession(sessionToken: string) {
      await sql`
        DELETE FROM auth_sessions
        WHERE session_token = ${sessionToken};
      `;
    },
    async unlinkAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: Account["providerAccountId"];
      provider: Account["provider"];
    }) {
      await sql`
        DELETE FROM accounts 
        WHERE provider_account_id = ${providerAccountId} AND provider_id = ${provider}}
      `;
    },
    async deleteUser(userId: string) {
      await sql`DELETE FROM users WHERE id = ${userId}`;
      await sql`DELETE FROM auth_sessions WHERE user_id = ${userId}`;
      await sql`DELETE FROM accounts WHERE user_id = ${userId}`;
    },
  }
}