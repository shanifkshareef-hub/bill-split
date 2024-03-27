import { PrismaClient } from "@prisma/client";
import Prisma from "prisma";

const prisma: Prisma.PrismaClient = new PrismaClient();
export default prisma;
