import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ajuste o caminho conforme sua estrutura

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // Busca todos os usuários
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return NextResponse.json({ message: 'Erro ao listar usuários' }, { status: 500 });
  }
}

export async function POST(request) {
  const { name, cpf, telefone } = await request.json(); // Supondo que os dados venham no corpo da requisição

  console.log(name, cpf , telefone);

  try {
    const newUser = await prisma.user.create({
      data: { name, cpf, telefone }, // Cria um novo usuário
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return NextResponse.json({ message: 'Erro ao cadastrar usuário' }, { status: 500 });
  }
}



