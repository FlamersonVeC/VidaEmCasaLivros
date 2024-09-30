'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "@/lib/componets/book-list";
import LoadingPage from "@/lib/componets/loading-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BooksPage() {
  const [books, setBooks] = useState([]); // Estado para armazenar os livros
  const [loading, setLoading] = useState(true); // Estado para controle de loading

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/allBooks');
        const allBooks = response.data;

        // Filtra os livros onde userId é null e mapeia para o formato desejado
        const availableBooks = allBooks
          .filter(book => book.userId === null)
          .map(book => ({
            id: book.id,
            name: book.name,
            link: `/books/verifyBook/${book.id}` // Cria o link conforme solicitado
          }));

        setBooks(availableBooks); // Atualiza o estado com os livros filtrados
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };

    fetchBooks(); // Chama a função para buscar os livros
  }, []); // Executa apenas uma vez ao montar o componente

  if (loading) {
    return <LoadingPage />; // Exibe um carregando enquanto espera a resposta
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Book List</h1>
        <BookList books={books} />
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          <h1 className="text-lg font-bold">Cadastrar um livro novo</h1>
          <Button>
            <Link href="/books/newbooks">
              Cadastrar livro
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
