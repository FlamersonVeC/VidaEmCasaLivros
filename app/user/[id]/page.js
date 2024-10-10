'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import LoadingPage from '../../../lib/componets/loading-page'
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function User() {

    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
              const response = await axios.get(`/api/user/${id}`);
              const users = response.data;
      
              setUser(users);
            } catch (error) {
              console.error("Erro ao buscar livros:", error);
            } finally {
              setLoading(false); // Finaliza o loading
            }
          };

        fetchUser();
    }, [])

    if (loading) {
      return <LoadingPage />; // Exibe um carregando enquanto espera a resposta
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <main className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Usuário que está com o livro</h1>
                {
                  user ?
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-1xl font-bold text-center text-gray-800">Nome : {user.name}</p>
                      <p className="text-1xl font-bold text-center text-gray-800">Telefone : {user.telefone}</p>
                    </div>
                  : <></>
                }
                <div className="flex flex-col items-center m-4">
                  <Button asChild>
                    <Link href="/books/listBookByUsers">Voltar a lista</Link>
                  </Button>
                </div>
            </main>
        </div>
    )
}