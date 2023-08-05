import mongoose, { Types } from "mongoose";


export type Book = {
  _id: string
  Title: string,
  Author: string,
  Publisher: string,
  PublishDate: Date
};

