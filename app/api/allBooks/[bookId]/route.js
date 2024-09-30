import prisma from "@/connection/prisma";
import { NextResponse } from "next/server";


export async function GET(req , {params} ){

    const { bookId } = params;

    try{

        const book = await prisma.book.findUnique({
            where: {id: Number(bookId)}
        })

        if(!book){
            return NextResponse.json({message: "Livro não encontrado!"}, {status: 404})
        }

        return NextResponse.json(book);

    }catch(err){
        console.error(error);
        return NextResponse.json({ message: "Erro ao buscar o livro" }, { status: 500 });
    }

}