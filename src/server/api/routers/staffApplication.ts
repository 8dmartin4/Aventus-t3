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
    findPendingStaffApplicationsByUserId: protectedProcedure
        .input(z.object({
          userId: z.string(),
        }))
        .query(({ ctx, input }) => {
        return ctx.prisma.staffApplication.findMany({
            where: {
                submittingUserId: input.userId,
                status: "Pending Review",
            },
        });
        }),
    findFinalizedStaffApplicationsByUserId: protectedProcedure
        .input(z.object({
          userId: z.string(),
        }))
        .query(({ ctx, input }) => {
        return ctx.prisma.staffApplication.findMany({
            where: {
                submittingUserId: input.userId,
                NOT: {
                  status: "Pending Review"
                }
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
                discordName: z.string(),
                staffReference: z.boolean(),
                staffReferenceName: z.string(),
                desiredRoles: z.string().array(),
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
                  id: input.id,
                  status: input.status,
                  ...input.approvingUserId && { approvingUserId: input.approvingUserId },
                  osrsName: input.osrsName,
                  discordName: input.discordName,
                  staffReference: input.staffReference,
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
                  discordName: input.discordName,
                  staffReference: input.staffReference,
                  staffReferenceName: input.staffReferenceName,
                  desiredRoles: input.desiredRoles,
                  joinedAventusInput: input.joinedAventusInput,
                  reasonForApplicationInput: input.reasonForApplicationInput,
                  reasonForGoodFitInput: input.reasonForGoodFitInput,
                },
            });
        }),
});
