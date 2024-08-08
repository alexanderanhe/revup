import NextAuth, { User } from "next-auth";
import { authConfig } from './auth.config';
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend"
import Credentials from 'next-auth/providers/credentials';
import vercelPostgresAdapter from "@/lib/vercelPostgresAdapter";
import { z } from 'zod';
import { findUserByEmail } from "@/lib/data";
import bcrypt from 'bcryptjs'; 

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: vercelPostgresAdapter(),
  ...authConfig,
  providers: [Google, Facebook, GitHub,
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = z
        .object({
          email: z.string().email(),
          password: z.string().min(8).max(32),
        })
        .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await findUserByEmail({ email, includePassword: true });
          if (user) {
            const passwordsMatch = await bcrypt.compare(password, user?.password ?? '');
            console.log({passwordsMatch, user});
            if (passwordsMatch) return user;
          };
        }
        return null;
      },
    }),
    Resend({
      from: process.env.EMAIL_FROM,
    }),
  ],
});