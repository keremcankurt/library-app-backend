import CustomError from "../helpers/error/CustomError";
import Book from "../models/Book";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("object")
    const book = req.body
    // Kitap oluştur ve veritabanına kaydet
    const newBook = await Book.create(book);

    res.status(200).json({
      message: "Yeni kitap başarıyla oluşturuldu",
      data: newBook
    });
  } catch (err) {
    console.log(err.message)
    next(err);
  }
};
const delBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    
    // Kitabı bul
    const book = await Book.findById(bookId);

    // Eğer kitap bulunamadıysa, hata döndür
    if (!book) {
      throw new CustomError('Bu ID ile ilişkilendirilmiş bir kitap bulunamadı', 404);
    }

    // Kitabı sil
    await Book.deleteOne({ _id: bookId });

    res.status(200).json({ message: 'Kitap başarıyla silindi' });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const updatedBookInfo = req.body;

    // Kitabı güncelle
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookInfo, { new: true });

    // Eğer kitap bulunamadıysa, hata döndür
    if (!updatedBook) {
      throw new CustomError('Bu ID ile ilişkilendirilmiş bir kitap bulunamadı', 404);
    }

    res.status(200).json({ message: 'Kitap başarıyla güncellendi', data: updatedBook });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export { addBook, delBook, updateBook, getAllBooks };
