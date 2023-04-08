import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    findOneUser: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
        return ctx.prisma.websiteUsers.findUnique({
            where: {
                id: input.id,
            },
        });
        }),
    updateOneUser: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().email().nullish().optional(),
                image: z.string().nullish().optional(),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.websiteUsers.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name,
                    email: input.email,
                    image: input.image,
                },
            });
        }),
    findManyUser: protectedProcedure
        .input(
            z.object({
                role: z.string().optional(),
                team: z.string().optional(),
                take: z.number().optional(),
                skip: z.number().optional(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.websiteUsers.findMany({
                ...(input.role && { where: { role: input.role } }),
                ...(input.team && { where: { team: input.team } }),
                ...(input.take && { take: input.take }),
                ...(input.skip && { skip: input.skip }),
            })
        })
});
