import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  name: string;
  ISBN: string;
  authors: string[];
  genre: string;
  coverImage: string;
  description: string;
}

const BookSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true,
    validate: {
        validator: function(isbn: string) {
          return isbn.length === 13;
        },
        message: "ISBN numarası 13 karakter olmak zorunda"
      }
  },
  authors: {
    type: [String],
    validate: {
      validator: function(authors: string[]) {
        return authors.length > 0;
      },
      message: "En az bir yazar belirtmelisiniz"
    },
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
