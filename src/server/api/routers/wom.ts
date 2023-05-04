import { z } from "zod";
import { CompetitionStatus, Metric } from "@wise-old-man/utils";

import {
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";

export const womRouter = createTRPCRouter({
    findPlayersByName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.players.searchPlayers(input.name, { limit: 1 });
        }),
    findPlayerCompetitionDetails: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.womClient.players.getPlayerCompetitionStandings(input.name, {status: CompetitionStatus.ONGOING});
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
    createCompetition: protectedProcedure
        .input(z.object({ 
            title: z.string(), 
            metric: z.string(), 
            startsAt: z.date(), 
            endsAt: z.date(), 
            groupId: z.number().optional(),
            groupVerificationCode: z.string()
        }))
        .mutation(async({ ctx, input }) => {
            await ctx.womClient.competitions.createCompetition({
                title: input.title, 
                metric: input.metric as Metric, 
                startsAt: input.startsAt, 
                endsAt: input.endsAt, 
                groupId: input.groupId,
                groupVerificationCode: input.groupVerificationCode,
                participants: []
            });
            return
        }),
    deleteCompetition: protectedProcedure
        .input(z.object({ id: z.number(), groupVerificationCode: z.string() }))
        .mutation(async({ ctx, input }) => {
            await ctx.womClient.competitions.deleteCompetition(input.id, input.groupVerificationCode);
            return
        })
});