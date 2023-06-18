import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";

export const staffApplicationRouter = createTRPCRouter({
    findStaffApplicationById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
        return ctx.prisma.staffApplication.findUnique({
            where: {
                id: input.id,
            },
        });
        }),
    findStaffApplicationsByUserId: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ ctx, input }) => {
        return ctx.prisma.staffApplication.findMany({
            where: {
                submittingUserId: input.userId,
            },
        });
        }),
    upsertOneStaffApplication: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                submittingUserId: z.string(),
                approvingUserId: z.string().optional(),
                status: z.string(),
                osrsName: z.string(),
                discordId: z.string(),
                staffReferenceName: z.string(),
                desiredRoles: z.string(),
                joinedAventusInput: z.string(),
                reasonForApplicationInput: z.string(),
                reasonForGoodFitInput: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.staffApplication.upsert({
                where: {
                    id: input.id
                },
                create: {
                  submittingUserId: input.submittingUserId,
                  status: input.status,
                  ...input.approvingUserId && { approvingUserId: input.approvingUserId },
                  osrsName: input.osrsName,
                  discordId: input.discordId,
                  staffReferenceName: input.staffReferenceName,
                  desiredRoles: input.desiredRoles,
                  joinedAventusInput: input.joinedAventusInput,
                  reasonForApplicationInput: input.reasonForApplicationInput,
                  reasonForGoodFitInput: input.reasonForGoodFitInput,
                },
                update: {
                  submittingUserId: input.submittingUserId,
                  status: input.status,
                  ...input.approvingUserId && { approvingUserId: input.approvingUserId },
                  osrsName: input.osrsName,
                  discordId: input.discordId,
                  staffReferenceName: input.staffReferenceName,
                  desiredRoles: input.desiredRoles,
                  joinedAventusInput: input.joinedAventusInput,
                  reasonForApplicationInput: input.reasonForApplicationInput,
                  reasonForGoodFitInput: input.reasonForGoodFitInput,
                },
            });
        }),
});
