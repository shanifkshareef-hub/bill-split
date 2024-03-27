import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { Order, Prisma, PrismaClient } from "@prisma/client";

@Service()
export default class OrderService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("prisma") private prisma: PrismaClient
  ) {}

  public async List(): Promise<Order[]> {
    this.logger.silly("🤵🤵 Listing orders");
    let orders = await this.prisma.order.findMany();

    return orders;
  }

  public async Create(data: Prisma.OrderCreateInput): Promise<Order> {
    this.logger.silly("🤵🤵 Creating orders");

    let order = await this.prisma.order.create({ data });
    return order;
  }

  public async Update(
    id: string,
    data: Prisma.OrderUpdateInput
  ): Promise<Order> {
    this.logger.silly("🤵🤵 Updating orders");

    let order = await this.prisma.order.update({ where: { id }, data });
    return order;
  }

  public async Delete(id: string): Promise<Order> {
    this.logger.silly("🤵🤵 Deleting expenses");

    await this.prisma.order.findFirstOrThrow({ where: { id } });

    let deleted = await this.prisma.order.delete({
      where: {
        id,
      },
    });
    return deleted;
  }
}
