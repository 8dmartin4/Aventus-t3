import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const womRouter = createTRPCRouter({
    findPlayersByName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.players.searchPlayers(input.name, {limit: 1});
        }),
    findGroupsByName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.groups.searchGroups(input.name, {limit: 1});
        }),
});