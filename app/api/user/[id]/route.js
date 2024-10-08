import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req , {params} ){

  const { id } = params;

  try{

      const user = await prisma.user.findUnique({
          where: {id: Number(id)}
      })

      if(!user){
          return NextResponse.json({message: "Usuário não encontrado!"}, {status: 404})
      }

      return NextResponse.json(user);

  }catch(err){
      console.error(err);
      return NextResponse.json({ message: "Erro ao buscar o Usuário" }, { status: 500 });
  }

}

export async function PUT(request, { params }) {
    const { id } = params;
    const { name, cpf, telefone } = await request.json(); // Supondo que os dados venham no corpo da requisição
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) }, // Converte o ID para número
        data: { name, cpf, telefone }, // Atualiza os dados do usuário
      });
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return NextResponse.json({ message: 'Erro ao atualizar usuário' }, { status: 500 });
    }
  }
  

export async function DELETE(request, { params }) {
    const { id } = params;
  
    try {
      await prisma.user.delete({
        where: { id: Number(id) }, // Converte o ID para número
      });
      return NextResponse.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return NextResponse.json({ message: 'Erro ao deletar usuário' }, { status: 500 });
    }
  }