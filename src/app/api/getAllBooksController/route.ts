import { Books } from "@/models/books";
import { mongooseConnect } from "@/mongooseConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse) {
    try{
        await mongooseConnect();
        const books = await Books.find({});
        return NextResponse.json(books);
    }
    catch(error){
        console.log(error);
        return NextResponse.error();
    }
}