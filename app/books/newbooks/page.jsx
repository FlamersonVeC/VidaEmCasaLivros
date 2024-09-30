'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fragment, useState } from "react";
import axios from "axios";

export default function NewBooks() {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [loading, setLoading] = useState(false); // Estado para controlar o loading

    const handler = async () => {
        if (nome && tipo) {
            await registerBook();
            setNome("");
            setTipo("");
        } else {
            alert("Preencher ambos os campos para cadastrar.");
        }
    };

    const registerBook = async () => {
        setLoading(true); // Inicia o loading
        try {
            const response = await axios.post('/api/newBook', {
                nome,
                tipo
            });
            // Aqui você pode tratar a resposta
            console.log("Livro cadastrado:", response.data);
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error);
            alert("Erro ao cadastrar livro");
        } finally {
            alert("Cadastrado com sucesso!");
            setLoading(false); // Finaliza o loading
        }
    };

    return (
        <Fragment>
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-foreground">Cadastro de Livro</h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bookName">Nome do livro</Label>
                            <Input id="bookName" placeholder="Digite o nome do livro" value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bookType">Tipo de livro</Label>
                            <Input id="bookType" placeholder="Digite o tipo do livro" value={tipo} onChange={e => setTipo(e.target.value)} />
                        </div>
                        <Button className="w-full" onClick={handler} disabled={loading}>
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
