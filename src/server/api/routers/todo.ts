import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendRequest } from "../../chatRequest";
const TodoSchema = z.object({
  id: z.string(),
  done: z.boolean(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "GET", path: "/todo/getall" } })
    .input(z.void())
    .output(z.array(TodoSchema))
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
    .output(TodoSchema)
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
    .output(TodoSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.todo.delete({ where: { id } });
    }),
  done: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "PUT", path: "/todo/{id}" } })
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .output(TodoSchema)
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.prisma.todo.update({ where: { id }, data: { done } });
    }),
  addWithAIAnswer: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "PUT", path: "/todo/{id}" } })
    .input(
      z.object({
        text: z.string(),
        apiKey: z.string(),
      })
    )
    .output(TodoSchema)
    .mutation(({ ctx, input }) => {
      const { text } = input;
      const createdTodo = ctx.prisma.todo.create({
        data: {
          done: false,
          text: text,
        },
      });
      (async () => {
        const result = await sendRequest(text);

        ctx.prisma.todo.update({
          data: {
            done: false,
            text: text + result + "xxxxx",
          },
          where: {
            id: (await createdTodo).id,
          },
        });
      })();
      return createdTodo;
    }),
});
