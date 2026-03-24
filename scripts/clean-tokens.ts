import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.verificationToken.deleteMany({})
  console.log(`Deleted ${count.count} verification tokens to allow schema change.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
