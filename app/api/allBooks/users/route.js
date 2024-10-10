import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Função GET para retornar todos os livros
export async function GET() {
    try {
      const books = await prisma.book.findMany({
        where: { userId: {
            not: null
        } }
      }); // Consulta todos os livros no banco
      return NextResponse.json(books, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Erro ao buscar os livros", error }, { status: 500 });
    }
  }