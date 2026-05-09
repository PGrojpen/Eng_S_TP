import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const dbPath = dbUrl.replace("file:", "");
const absolutePath = path.isAbsolute(dbPath)
  ? dbPath
  : path.resolve(process.cwd(), dbPath);

const adapter = new PrismaBetterSqlite3({ url: absolutePath });

const prisma = new PrismaClient({ adapter });
export default prisma;
