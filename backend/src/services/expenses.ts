import { Inject, Service } from "typedi";
import { Logger } from "winston";
import Prisma from "prisma";
import { PrismaClient } from "@prisma/client";

@Service()
export default class ExpenseService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("prisma") private prisma: PrismaClient
  ) {}

  public async List(): Promise<Prisma.ExpenseType[]> {
    this.logger.silly("🤵🤵 Listing expenses");
    let expenses = await this.prisma.expenseType.findMany();

    return expenses;
  }

  public async Create(
    data: Prisma.ExpenseTypeCreateInput
  ): Promise<Prisma.ExpenseType> {
    this.logger.silly("🤵🤵 Listing expenses");

    let expense = await this.prisma.expenseType.create({ data });
    return expense;
  }

  public async Update(
    id: string,
    data: Prisma.ExpenseTypeUpdateInput
  ): Promise<Prisma.ExpenseType> {
    this.logger.silly("🤵🤵 Updating expenses");

    await this.prisma.expenseType.findFirstOrThrow({ where: { id } });

    let expense = await this.prisma.expenseType.update({
      where: {
        id,
      },
      data,
    });
    return expense;
  }

  public async Delete(id: string): Promise<Prisma.ExpenseType> {
    this.logger.silly("🤵🤵 Deleting expenses");

    await this.prisma.expenseType.findFirstOrThrow({ where: { id } });

    let deleted = await this.prisma.expenseType.delete({
      where: {
        id,
      },
    });
    return deleted;
  }
}
