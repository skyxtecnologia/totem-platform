import { betterAuth } from "better-auth";

const rawBaseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

const baseURL =
  rawBaseURL.startsWith("http://") || rawBaseURL.startsWith("https://")
    ? rawBaseURL
    : `https://${rawBaseURL}`;

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "347b25e6fae4c2cc7d1757cef3876b0af019d050ec2f07c03c020f1b77757910",
  baseURL,
  emailAndPassword: {
    enabled: true,
  },
});

