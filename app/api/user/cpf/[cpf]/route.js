import prisma from "@/connection/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}){

    const {cpf} = params;

    try{

        const user = await prisma.user.findUnique({
            where : {cpf: cpf}
        })

        if(!user){
            return NextResponse.json({message: "Usuario não encontrado"}, {status: 404})
        }

        return NextResponse.json(user, {status: 200})

    }catch(err){
        return NextResponse.json({err}, {status: 501})
    }

}