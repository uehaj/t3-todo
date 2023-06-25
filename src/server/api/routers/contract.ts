import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const CreateContractSchema = z.object({
  userRepresentativeName: z.string(),
  userRepresentativeEmail: z.string(),
  openAIAccountEmail: z.string(),
  openAIAccountBillingURL: z.string(),
  openAIAccountPassword: z.string(),
  openAIApiKey: z.string(),
  monthlyBillingLimit: z.number(),
});

export const ContractSchema = CreateContractSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UpdateContractSchema = z
  .object({
    id: z.string(),
  })
  .merge(CreateContractSchema.partial());

export type Contract = z.infer<typeof ContractSchema>;

export const contractRouter = createTRPCRouter({
  getList: publicProcedure
    .meta({ openapi: { method: "GET", path: "/contract" } })
    .input(z.void())
    .output(z.array(ContractSchema))
    .query(({ ctx }) => {
      return ctx.prisma.contract.findMany({ orderBy: [{ createdAt: "desc" }] });
    }),
  getOne: publicProcedure
    .meta({ openapi: { method: "GET", path: "/contract/{id}" } })
    .input(z.object({ id: z.string() }))
    .output(ContractSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.contract.findUniqueOrThrow({ where: { id: input.id } });
    }),
  create: publicProcedure
    .meta({ openapi: { method: "POST", path: "/contract" } })
    .input(CreateContractSchema)
    .output(ContractSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contract.create({
        data: input,
      });
    }),
  update: publicProcedure
    .meta({ openapi: { method: "PATCH", path: "/contract/{id}" } })
    .input(UpdateContractSchema)
    .output(ContractSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contract.update({
        where: { id: input.id },
        data: input,
      });
    }),
  deleteOne: publicProcedure
    .meta({ openapi: { method: "DELETE", path: "/contract/{id}" } })
    .input(z.object({ id: z.string() }))
    .output(ContractSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.contract.delete({ where: { id } });
    }),
});
