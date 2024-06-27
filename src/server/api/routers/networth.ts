import { count, sql } from "drizzle-orm";
import { z } from "zod";
import * as imageSearch from "image-search-google";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { networths } from "~/server/db/schema";
import { env } from "~/env";

export const networthRouter = createTRPCRouter({
  getRandom: publicProcedure
    .input(z.object({ count: z.number() }))
    .query(async ({ ctx, input }) => {
      const query = await ctx.db
        .select({
          fullName: networths.fullName,
          amount: networths.amount,
        })
        .from(networths)
        .orderBy(sql.raw("rand()"))
        .limit(input.count);
      return query;

      //   const client = new imageSearch(
      //     "037c1744c10404e6c",
      //     "AIzaSyC-4c8Lea6bZzLanZcJiDDB6l7Il-xy7wc",
      //   );
      //   const res = query.map(async (item) => {
      //     const images = await client.search(item.fullName, { page: 1 });

      //     return { ...item, imgUrl: images[0].thumbnail };
      //   });
      //   return await Promise.all(res);
    }),

  add: protectedProcedure
    .input(z.object({ fullName: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(networths)
        .values({ fullName: input.fullName, amount: input.amount });
    }),
});
