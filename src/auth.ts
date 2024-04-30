import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';

const GIT_HUB_CLIENT_ID = process.env.GIT_HUB_CLIENT_ID;
const GIT_HUB_CLIENT_SECRET = process.env.GIT_HUB_CLIENT_SECRET;

if (!GIT_HUB_CLIENT_ID || !GIT_HUB_CLIENT_SECRET) {
  throw new Error('Missing environment variables for GitHub OAuth');
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: GIT_HUB_CLIENT_ID,
      clientSecret: GIT_HUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Usually not needed, here we are fixing a bug in next-auth
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
