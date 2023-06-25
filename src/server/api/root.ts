import { contractRouter } from "~/server/api/routers/contract";
import { userRouter } from "~/server/api/routers/user";
import { todoRouter } from "~/server/api/routers/todo";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contract: contractRouter,
  user: userRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
