import { Inject, Service } from "typedi";
import { Logger } from "winston";

import { PrismaClient } from "@prisma/client";
import { UserListDTO } from "../interface/User";

@Service()
export default class UserService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("prisma") private prisma: PrismaClient
  ) {}

  public async ListUsers(): Promise<UserListDTO[]> {
    this.logger.silly("🤵🤵 Listing users");
    let users = await this.prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        about: true,
        avatar: true,
        email: true,
        mobile: true,
        country_code: true,
        created_at: true,
        updated_at: true,
      },
    });

    return users;
  }
}
