import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { Participant, Prisma, PrismaClient } from "@prisma/client";

@Service()
export default class ParticipantsService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("prisma") private prisma: PrismaClient
  ) {}

  public async List(): Promise<Participant[]> {
    this.logger.silly("🤵🤵 Listing Participants");
    let Participants = await this.prisma.participant.findMany();

    return Participants;
  }

  public async Create(
    data: Prisma.ParticipantCreateInput
  ): Promise<Participant> {
    this.logger.silly("🤵🤵 Creating participants");

    let participant = await this.prisma.participant.create({ data });
    return participant;
  }

  public async Update(
    id: string,
    data: Prisma.ParticipantCreateInput
  ): Promise<Participant> {
    this.logger.silly("🤵🤵 Updating participants");

    let participant = await this.prisma.participant.update({
      where: { id },
      data,
    });
    return participant;
  }

  public async Delete(id: string): Promise<Participant> {
    this.logger.silly("🤵🤵 Deleting participants");

    await this.prisma.participant.findFirstOrThrow({ where: { id } });

    let deleted = await this.prisma.participant.delete({
      where: {
        id,
      },
    });
    return deleted;
  }
}
