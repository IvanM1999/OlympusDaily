import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "teste@teste.com",
      name: "Usuário de Teste",
      tags: ["blog", "diario"]
    }
  });

  await prisma.post.create({
    data: {
      title: "Primeira entrada",
      content: "Bem-vindo ao diário!",
      authorId: user.id
    }
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());