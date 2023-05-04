import { z } from "zod";
import {getOnePost, getPosts} from '../../../utils/sanity'

import {
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

export const sanityRouter = createTRPCRouter({
    getAllPosts: publicProcedure
        .query(()=>{
            return getPosts()
        }),
    getOnePost: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
        const post = getOnePost(input.slug);
        return post;
        }),
})