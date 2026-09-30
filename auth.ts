// auth.ts  (project root)
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { getUserByEmail } from '@/lib/meetings-db'; // your DB query function

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsed.success) return null;

                const { email, password } = parsed.data;
                const user = await getUserByEmail(email);
                if (!user) return null;

                console.log('Attempting password compare');
                console.log('Password received:', password);
                console.log('Full hash from getUserByEmail:', user.passwordHash);
                console.log('Hash length:', user.passwordHash?.length);

                const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
                console.log('Passwords match:', passwordsMatch);
                if (passwordsMatch) return user;

                return null;
            },
        }),
    ],
});