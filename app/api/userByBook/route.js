import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {

    const {userId , bookId} = await req.json();

    try{

        if(!userId || !bookId){
            return NextResponse.json({message: "usuario ou livro não informados!"}, {status: 404})
        }

        const user = await prisma.user.findUnique({
            where: {id: Number(userId)}
        })

        if(!user){
            return NextResponse.json({message: "usuario não encontrado no sistema"}, {status: 404})
        }

        const book = await prisma.book.findUnique({
            where: {id: Number(bookId)}
        })

        if(!book){
            return NextResponse.json({message: "livro não encontrado no sistema"}, { status: 404})
        }

        // Verifica se o livro não está associado a um usuário
        if (book.userId) {
            return NextResponse.json({ message: "O livro já está associado a um usuário." }, { status: 401 });
        }

        // Atualiza o livro associando ao usuário
        const updatedBook = await prisma.book.update({
            where: { id: Number(bookId) },
            data: { userId: Number(userId) }
        });

        return NextResponse.json(updatedBook, { status: 200 });

    }catch(err){
        return NextResponse.json(err, {status: 500})
    }

}