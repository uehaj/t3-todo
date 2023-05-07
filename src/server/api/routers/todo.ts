import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "GET", path: "/todo/getall" } })
    .input(z.void())
    .output(
      z.array(
        z.object({
          id: z.string(),
          done: z.boolean(),
          text: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      )
    )
    .query(({ ctx }) => {
      return ctx.prisma.todo.findMany({
        orderBy: [{ createdAt: "desc" }],
      });
    }),
  add: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "POST", path: "/todo" } })
    .input(
      z.object({
        text: z.string(),
      })
    )
    .output(
      z.object({
        id: z.string(),
        done: z.boolean(),
        text: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { text } = input;
      return ctx.prisma.todo.create({
        data: {
          done: false,
          text,
        },
      });
    }),
  delete: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "DELETE", path: "/todo/{id}" } })
    .input(z.object({ id: z.string() }))
    .output(
      z.object({
        id: z.string(),
        done: z.boolean(),
        text: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.todo.delete({ where: { id } });
    }),
  done: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "PUT", path: "/todo/{id}" } })
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .output(
      z.object({
        id: z.string(),
        done: z.boolean(),
        text: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      console.log(`id=`, id, ` done=`, done);
      return ctx.prisma.todo.update({ where: { id }, data: { done } });
    }),
});
