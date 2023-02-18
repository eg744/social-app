// Social post router

import { TypeOf, z } from "zod";
import { postSchema } from "../../../components/CreatePost";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  // Require user to be logged in
  create: protectedProcedure
    .input(
      postSchema
      // Old schema, replaced with postSchema zod object
      // z.object({
      //   // Text property
      //   text: z.string({
      //     // Error
      //     required_error: "Post text is required",
      //   }),
      // })
    )
    // Context, input for mutation to create post.
    .mutation(({ ctx, input }) => {
      // Connect author to the post using session ID
      const { prisma, session } = ctx;
      const { text } = input;

      const userId = session.user.id;

      return prisma.post.create({
        data: {
          text,
          author: {
            // Link the user to data of post
            connect: {
              id: userId,
            },
          },
        },
      });
    }),

  // Posts previously made: Public, viewable if user is logged out
  timeline: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),

        // Intended number of posts fetched on each request
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit } = input;

      // Simple query

      const posts = await prisma.post.findMany({
        // Pop off last post to get cursor
        take: limit + 1,
        orderBy: [
          {
            // Descending
            createdAt: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      // Remove last post, get id and set cursor.
      if (posts.length > limit) {
        const currentItem = posts.pop() as (typeof posts)[number];

        nextCursor = currentItem.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
});
