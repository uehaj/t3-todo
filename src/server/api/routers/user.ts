import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const CreateUserSchema = z.object({
  contractId: z.string(),
  auditLogId: z.string(),
});

export const UserSchema = CreateUserSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UpdateUserSchema = z
  .object({
    id: z.string(),
  })
  .merge(CreateUserSchema.partial());

export type User = z.infer<typeof UserSchema>;

export const userRouter = createTRPCRouter({
  getList: publicProcedure
    .meta({ openapi: { method: "GET", path: "/user" } })
    .input(z.void())
    .output(z.array(UserSchema))
    .query(({ ctx }) => {
      return ctx.prisma.user.findMany({
        orderBy: [{ createdAt: "desc" }],
      });
    }),
  getOne: publicProcedure
    .meta({ openapi: { method: "GET", path: "/user/{id}" } })
    .input(z.object({ id: z.string() }))
    .output(UserSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUniqueOrThrow({ where: { id: input.id } });
    }),
  create: publicProcedure
    .meta({ openapi: { method: "POST", path: "/user" } })
    .input(CreateUserSchema)
    .output(UserSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: input,
      });
    }),
  update: publicProcedure
    .meta({ openapi: { method: "PATCH", path: "/user/{id}" } })
    .input(UpdateUserSchema)
    .output(UserSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: input,
      });
    }),
  deleteOne: publicProcedure
    .meta({ openapi: { method: "DELETE", path: "/user/{id}" } })
    .input(z.object({ id: z.string() }))
    .output(UserSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.user.delete({ where: { id } });
    }),
});
