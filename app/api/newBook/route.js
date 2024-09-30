import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Certifique-se de que o prisma está importado corretamente

// Função POST para cadastrar um novo livro
export async function POST(req) {
  try {
    const { nome, tipo } = await req.json(); // Extrai os dados do corpo da requisição

    if (nome && tipo) {
      // Insere o livro no banco de dados usando Prisma
      const newBook = await prisma.book.create({
        data: {
          name: nome,
          tipo: tipo,
        },
      });

      return NextResponse.json({ message: "Cadastrado com sucesso", book: newBook }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Erro ao cadastrar: dados não informados!" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao cadastrar o livro" }, { status: 500 });
  }
}
