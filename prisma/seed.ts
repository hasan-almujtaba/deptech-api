import { PrismaClient } from "@prisma/client";
import { hash } from "../src/helpers/hash";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@deptech.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "Deptech",
      email: "admin@deptech.com",
      dateOfBirth: "2001/09/22",
      gender: "Male",
      password: hash("password"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
