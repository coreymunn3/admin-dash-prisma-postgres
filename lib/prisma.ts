import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
// if issue: https://stackoverflow.com/questions/68251777/namespace-nodejs-has-no-exported-member-global
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;

// this code directly from prisma documentation
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
