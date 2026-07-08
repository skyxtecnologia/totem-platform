import { createAuthClient } from "better-auth/react";

const rawClientURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

const clientBaseURL =
  rawClientURL.startsWith("http://") || rawClientURL.startsWith("https://")
    ? rawClientURL
    : `https://${rawClientURL}`;

export const authClient = createAuthClient({
  baseURL: clientBaseURL,
});

export const { signIn, signOut, useSession } = authClient;

