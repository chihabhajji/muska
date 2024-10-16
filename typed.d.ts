// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { User as PrismaUser } from '@prisma/client';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & PrimsaUser;
  }
  interface User extends DefaultUser {
    isActive: boolean;
    role: ERole;
  }
}
