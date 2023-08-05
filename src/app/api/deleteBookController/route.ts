import { Books } from "@/models/books";
import { mongooseConnect } from "@/mongooseConnection";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse) {
    try{
        await mongooseConnect();
        let book:any = await req.json();
        const id = new mongoose.Types.ObjectId(book._id);
        const books = await Books.collection.deleteOne({_id: id});
        return NextResponse.json(books);
    }
    catch(error){
        console.log(error);
        return NextResponse.error();
    }
}