import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";

const PAGE_SIZE = 20;

export const staffApplicationRouter = createTRPCRouter({
    findAllStaffApplications: protectedProcedure
        .input(z.object({offset: z.number().optional() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.staffApplication.findMany({take: PAGE_SIZE, skip: (input.offset || 0) * PAGE_SIZE, 
                include: {
                    approvingUser: true,
                    submittingUser: true,
                }})
        }),
    findStaffApplicationById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
        return ctx.prisma.staffApplication.findUnique({
            where: {
                id: input.id,
            },
            include: {
                approvingUser: true,
                submittingUser: true,
            }
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
            include: {
                approvingUser: true,
                submittingUser: true,
            }
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
            include: {
                approvingUser: true,
                submittingUser: true,
            }
        });
        }),
    upsertOneStaffApplication: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                submittingUserId: z.string(),
                approvingUserId: z.string().optional(),
                approvingUserName: z.string().optional(),
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
                  ...input.approvingUserName && { approvingUserName: input.approvingUserName },
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
                  ...input.approvingUserName && { approvingUserName: input.approvingUserName },
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
