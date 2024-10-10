'use client'

import { Fragment, useEffect, useState } from "react";
import LoadingPage from '../../../lib/componets/loading-page'
import BookListUsers from '@/lib/componets/book-list-users'
import axios from "axios";

export default function ListBookByUsers() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
              const response = await axios.get('/api/allBooks/users');
              const allBooks = response.data;

              // Filtra os livros onde userId é null e mapeia para o formato desejado
              const availableBooks = allBooks
              .map(book => ({
              id: book.id,
              name: book.name,
              link: `${book.userId}` // Cria o link conforme solicitado
              }));
      
              setBooks(availableBooks); // Atualiza o estado com os livros filtrados
            } catch (error) {
              console.error("Erro ao buscar livros:", error);
            } finally {
              setLoading(false); // Finaliza o loading
            }
          };

        fetchBooks();
    }, [])

    if (loading) {
        return <LoadingPage />; // Exibe um carregando enquanto espera a resposta
    }

    return(
        <Fragment>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <main className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista com todos os livros</h1>
                    <BookListUsers books={books}/>
                </main>
            </div>
        </Fragment>
    )
}