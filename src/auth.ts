import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend"
import vercelPostgresAdapter from "@/lib/vercelPostgresAdapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: vercelPostgresAdapter(),
  providers: [Google, Facebook, GitHub,
    Resend({
      from: process.env.EMAIL_FROM,
    }),
  ],
});