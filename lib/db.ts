import { PrismaClient } from "@prisma/client";


//@ts-ignore
const db = globalThis.prisma || new PrismaClient();
//@ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;