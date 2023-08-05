import mongoose, { Schema, Types, models } from "mongoose";

const booksSchema = new Schema({
    _id:{
        type:Types.ObjectId
    },
    Title: {
        type: String
    },
    Author: {
        type: String
    },
    Publisher: {
        type: String
    },
    PublishDate:{
        type: Date
    }
});

export const Books = models.books || mongoose.model("books", booksSchema);