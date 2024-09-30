'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from 'axios'; // Importa o axios

const BookReturn = ({ bookId }) => {
    const [cpf, setCpf] = useState(""); // Estado para armazenar o CPF
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const [error, setError] = useState(""); // Estado para mensagens de erro

    // Função para aplicar a máscara de CPF
    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (value.length > 11) value = value.slice(0, 11); // Limita o CPF a 11 dígitos
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpf(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        setLoading(true);
        setError("");

        // Remove caracteres indesejados do CPF antes de enviar
        const sanitizedCpf = cpf.replace(/[.\-]/g, '');

        try {
            // Realiza a requisição para devolver o livro
            await axios.post('/api/returnBook', { cpf: sanitizedCpf, bookId });
            alert("Livro devolvido com sucesso!");
        } catch (err) {
            console.error("Erro ao devolver livro:", err);
            setError("Erro ao devolver livro."); // Define a mensagem de erro
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Devolução de Livro</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="cpf-devolucao">CPF</Label>
                        <Input 
                            id="cpf-devolucao" 
                            placeholder="Digite seu CPF" 
                            value={cpf} 
                            onChange={handleCpfChange} 
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Carregando..." : "Devolver livro"}
                    </Button>
                    {error && <p className="text-red-500">{error}</p>} {/* Exibe erro, se houver */}
                </form>
            </CardContent>
        </Card>
    );
}

export default BookReturn;
