import NextAuth from "next-auth";
import { db } from "../db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "../db/schemas/auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    authenticatorsTable: authenticators,
    sessionsTable: sessions,
    usersTable: users,
    verificationTokensTable: verificationTokens,
  }),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [GitHub],
});