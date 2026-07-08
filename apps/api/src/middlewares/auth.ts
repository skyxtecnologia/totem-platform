import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import { jwtPayloadSchema } from "@totem/validators";
import type { DeviceJWTPayload } from "@totem/types";
import type { Env } from "../types";

/**
 * Middleware to protect routes that should only be accessed by authenticated devices.
 * It verifies the JWT token sent in the Authorization header and validates its schema.
 */
export const deviceAuthMiddleware = () => {
  return createMiddleware<{
    Bindings: Env;
    Variables: { jwtPayload: DeviceJWTPayload };
  }>(async (c, next) => {
    // 1. Execute Hono's built-in JWT verification
    const auth = jwt({ secret: c.env.JWT_DEVICE_SECRET, alg: "HS256" });

    // We execute the jwt middleware but intercept execution to validate the payload afterwards.
    // Hono's jwt middleware will throw an HTTP 401 response if the signature or expiration is invalid.
    await auth(c, async () => {});

    // 2. Validate the decoded payload schema
    const rawPayload = c.get("jwtPayload");
    const result = jwtPayloadSchema.safeParse(rawPayload);

    if (!result.success) {
      return c.json(
        {
          error: "Unauthorized",
          message: "Invalid JWT payload structure",
          issues: result.error.issues,
        },
        401,
      );
    }

    // 3. Set the typed and validated payload back into the context
    c.set("jwtPayload", result.data);

    await next();
  });
};
