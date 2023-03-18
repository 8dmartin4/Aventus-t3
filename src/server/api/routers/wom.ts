import { Metric } from "@wise-old-man/utils";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const womRouter = createTRPCRouter({
    findPlayersByName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.players.searchPlayers(input.name, { limit: 1 });
        }),
    findGroupsByName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.groups.searchGroups(input.name, { limit: 1 });
        }),
    findGroupCompetitions: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.groups.getGroupCompetitions(input.id);
        }),
    findCompetitionDetails: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.competitions.getCompetitionDetails(input.id);
        }),
});