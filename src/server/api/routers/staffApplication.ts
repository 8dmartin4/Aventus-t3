import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";

export const staffApplicationRouter = createTRPCRouter({
    findStaffApplication: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
        return ctx.prisma.staffApplication.findUnique({
            where: {
                id: input.id,
            },
        });
        }),
    updateStaffApplication: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                submittingUserId: z.string(),
                status: z.string(),
                submittingUser: z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string().email().nullish().optional(),
                    image: z.string().nullish().optional(),
                }),
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
            return ctx.prisma.staffApplication.update({
                where: {
                    id: input.id
                },
                data: {
                    id: input.id,
                    submittingUserId: input.submittingUserId,
                    status: input.status,
                    submittingUser: input.submittingUser,
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
