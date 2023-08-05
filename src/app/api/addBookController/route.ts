import { Books } from "@/models/books";
import { mongooseConnect } from "@/mongooseConnection";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse) {
    try{
        await mongooseConnect();
        let book:any = await req.json();
        const id = new mongoose.Types.ObjectId(book._id);
        const bookObj = {
            Title : book.Title,
            Author : book.Author,
            Publisher: book.Publisher,
            PublishDate: new Date(book.PublishDate)

        }
        const books = await Books.updateOne({_id: id},{$set:{...bookObj}},{upsert:true});
        return NextResponse.json(books);
    }
    catch(error){
        console.log(error);
        return NextResponse.error();
    }
}