import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { env } from "~/env";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      userType: {
        type: "string",
        required: true,
        input: true,
      },
      name: {
        type: "string",
        required: false,
        input: true,
      },
      companyName: {
        type: "string",
        required: false,
        input: true,
      },
      onboardingCompleted: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      emailVerified: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    },
  },
  trustedOrigins: [env.NEXT_PUBLIC_BETTER_AUTH_URL],
  secret: env.BETTER_AUTH_SECRET,
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
