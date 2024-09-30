import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { bookId } = params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
    });

    if (!book) {
      return new Response(JSON.stringify({ message: 'Livro não encontrado' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(book), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar o livro' }), {
      status: 500,
    });
  }
}
