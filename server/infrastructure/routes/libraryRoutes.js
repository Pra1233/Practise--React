import express from "express";
const router = express.Router();
import {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
  searchBook,
} from "../../application/controller/library.js";

router.get("/books", getBooks);
router.post("/book", createBook);
router.delete("/book/:id", deleteBook);
router.put("/book/update", updateBook);
router.get("/searchBook", searchBook);

export default router;
