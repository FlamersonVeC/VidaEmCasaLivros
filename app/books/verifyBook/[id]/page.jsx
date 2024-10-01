'use client';

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter para redirecionamento
import axios from 'axios'; // Importa o axios
import BookSend from "../../../../lib/componets/book-send";
import LoadingPage from "../../../../lib/componets/loading-page";

const VerifyBooks = ({ params }) => {
    const { id } = params;
    const router = useRouter(); // Inicializa o roteador
    const [loading, setLoading] = useState(true); // Estado para carregar
    const [bookId, setBookId] = useState(null); // Estado para armazenar o id do livro

    useEffect(() => {
        const checkBook = async () => {
            try {
                const response = await axios.get(`/api/allBooks/${id}`); // Faz a chamada à API
                
                if (response.data.userId !== null) {
                    // Se userId não for null, redireciona
                    router.push(`/books/returnBook/${id}`);
                } else {
                    // Se userId for null, mantém o id do livro
                    setBookId(id);
                }
            } catch (error) {
                console.error("Erro ao verificar o livro:", error);
            } finally {
                setLoading(false); // Atualiza o estado de carregamento
            }
        };

        checkBook(); // Chama a função
    }, [id, router]); // Dependências do useEffect

    if (loading) {
        return <LoadingPage />; // Exibe loading enquanto verifica
    }

    return (
        <Fragment>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                {bookId && <BookSend bookId={bookId} />} {/* Passa bookId apenas se disponível */}
            </div>
        </Fragment>
    );
};

export default VerifyBooks;
