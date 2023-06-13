import { userRouter } from './routers/user';
import { womRouter } from './routers/wom';
import { sanityRouter } from './routers/sanity';
import { staffApplicationRouter } from './routers/staffApplication';
import { createTRPCRouter } from "server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  wom: womRouter,
  sanity: sanityRouter,
  staffApplication: staffApplicationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
