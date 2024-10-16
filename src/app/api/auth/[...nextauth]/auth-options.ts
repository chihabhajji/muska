import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

import { env } from '@/env.mjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (!session.user) return session;

      session.user.id = user.id;
      session.user.isActive = user.isActive;

      return session;
    },
  },
  events: {
    signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const p = profile as GoogleProfile;
        if (!p.email_verified) {
          throw new Error('Email not verified');
        }
      }
    },
  },
};
