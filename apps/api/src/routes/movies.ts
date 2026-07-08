import { and, asc, db, eq, gte, movieSessions, movies } from "@totem/db";
import { createMovieSchema, createMovieSessionSchema } from "@totem/validators";
import { Hono } from "hono";

const router = new Hono();

// GET /api/v1/movies?tenantId=...
router.get("/", async (c) => {
  const tenantId = c.req.query("tenantId");

  if (!tenantId) {
    return c.json({ error: "Missing tenantId" }, 400);
  }

  try {
    // 1. Obter todos os filmes ativos do tenant
    const currentMovies = await db
      .select()
      .from(movies)
      .where(and(eq(movies.tenantId, tenantId), eq(movies.isCurrent, true)));

    if (currentMovies.length === 0) {
      return c.json({ data: [] });
    }

    // 2. Obter sessões futuras para os filmes listados
    const today = new Date();
    const sessionsList = await db
      .select()
      .from(movieSessions)
      .where(gte(movieSessions.showTime, today))
      .orderBy(asc(movieSessions.showTime));

    // 3. Aninhar sessões correspondentes dentro de cada filme
    const result = currentMovies.map((movie) => ({
      ...movie,
      sessions: sessionsList.filter((session) => session.movieId === movie.id),
    }));

    return c.json({ data: result });
  } catch (error) {
    console.error("Failed to fetch movies and sessions:", error);
    return c.json({ error: "Failed to fetch movies and sessions" }, 500);
  }
});

// POST /api/v1/movies
router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = createMovieSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { error: "Validation failed", issues: result.error.issues },
        400,
      );
    }

    const { tenantId, ...movieData } = result.data;
    const newMovieId = `movie_${crypto.randomUUID().replace(/-/g, "")}`;

    const inserted = await db
      .insert(movies)
      .values({
        id: newMovieId,
        tenantId,
        ...movieData,
      })
      .returning();

    return c.json({ status: "Movie created", data: inserted[0] }, 201);
  } catch (error) {
    console.error("Failed to create movie:", error);
    return c.json({ error: "Failed to create movie" }, 500);
  }
});

// POST /api/v1/movies/sessions
router.post("/sessions", async (c) => {
  try {
    const body = await c.req.json();
    const result = createMovieSessionSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { error: "Validation failed", issues: result.error.issues },
        400,
      );
    }

    const sessionData = result.data;
    const newSessionId = `session_${crypto.randomUUID().replace(/-/g, "")}`;

    const inserted = await db
      .insert(movieSessions)
      .values({
        id: newSessionId,
        ...sessionData,
      })
      .returning();

    return c.json({ status: "Movie session created", data: inserted[0] }, 201);
  } catch (error) {
    console.error("Failed to create movie session:", error);
    return c.json({ error: "Failed to create movie session" }, 500);
  }
});

export default router;
