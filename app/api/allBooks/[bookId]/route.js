import prisma from "@/lib/prisma";
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
        console.error(err);
        return NextResponse.json({ message: "Erro ao buscar o livro" }, { status: 500 });
    }

}