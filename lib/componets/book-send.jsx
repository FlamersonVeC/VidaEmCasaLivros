import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from 'axios'; // Importa o axios

const BookSend = ({ bookId }) => {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        setLoading(true);
        setError("");

        // Remove caracteres indesejados do CPF
        const sanitizedCpf = cpf.replace(/[.\-]/g, '');

        try {
            // Verifica se o usuário existe
            const userResponse = await axios.get(`/api/user/cpf/${sanitizedCpf}`);
            
            const userId = userResponse.data.id; // Supondo que o ID do usuário esteja na resposta

            // Atualiza o livro com o userId encontrado
            await axios.post('/api/userByBook', { userId, bookId });

            alert("Livro atualizado com sucesso!");

        } catch (error) {
            // Se o usuário não existir, cadastra o novo usuário
            if (error.response?.status === 404) {
                try {
                    const newUserResponse = await axios.post('/api/user', { nome, cpf: sanitizedCpf, telefone });
                    const userId = newUserResponse.data.id; // Supondo que o ID do novo usuário esteja na resposta

                    // Atualiza o livro com o novo userId
                    await axios.post('/api/userByBook', { userId, bookId });

                    alert("Usuário cadastrado e livro atualizado com sucesso!");
                } catch (err) {
                    console.error("Erro ao cadastrar usuário:", err);
                    setError("Erro ao cadastrar usuário.");
                }
            } else {
                console.error("Erro ao verificar usuário:", error);
                setError("Erro ao verificar usuário.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Empréstimo de Livro</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input 
                            id="nome" 
                            placeholder="Digite seu nome" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input 
                            id="cpf" 
                            placeholder="Digite seu CPF somente os números" 
                            value={cpf} 
                            onChange={(e) => setCpf(e.target.value)} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input 
                            id="telefone" 
                            placeholder="Digite seu telefone" 
                            value={telefone} 
                            onChange={(e) => setTelefone(e.target.value)} 
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Carregando..." : "Pegar emprestado"}
                    </Button>
                    {error && <p className="text-red-500">{error}</p>} {/* Exibe erro, se houver */}
                </form>
            </CardContent>
        </Card>
    );
};

export default BookSend;
