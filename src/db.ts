import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    // log: [
    //     {
    //       emit: "event",
    //       level: "query",
    //     },
    //   ],
})

// prisma.$on("query", async (e) => {
//     console.log(`${e.query} ${e.params}`)
// });

export default prisma;