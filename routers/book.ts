import express from "express";
import { addBook, delBook, getAllBooks, updateBook } from "../controllers/book";
import { checkAdmin } from "../middlewares/database/databaseErrorHelpers";

const router = express.Router();

//Admin işlemleri
router.post("/add/:userId", checkAdmin, addBook);
router.delete("/delete/:userId/:bookId", checkAdmin, delBook);
router.put("/update/:userId/:bookId", checkAdmin, updateBook);

//Genel işlemler
router.get("",getAllBooks);

export default router;
