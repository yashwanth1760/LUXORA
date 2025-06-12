import { PrismaClient } from "../lib/generated/prisma";

// Disable Prisma Accelerate engine by removing the accelerateEngine option
const prismaOptions = {};

// Prisma Accelerate connection pooling is disabled to avoid internal minified code exposure in stack traces
// if (process.env.NODE_ENV === "production" || process.env.PRISMA_ACCELERATE === "true") {
//   prismaOptions.__internal = {
//     // Enable Prisma Accelerate engine
//     accelerateEngine: true,
//   };
// }

export const db = globalThis.prisma || new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// Optional: Add error handling for connection errors related to pooling
db.$on("error", (e) => {
  if (e.message.includes("connection pool")) {
    console.error("Prisma connection pool error:", e);
  }
});



