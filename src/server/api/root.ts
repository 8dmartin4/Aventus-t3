import { userRouter } from './routers/user';
import { womRouter } from './routers/wom';
import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  wom: womRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
