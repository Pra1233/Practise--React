import React from "react";
import { deleteBook, editBook } from "../store/book-action";

type Book = {
  books: [];
  author: string;
};
type EditBook = {
  id: number;
  bookName: string;
  price: number;
};

const BookList = ({ books, author }: Book) => {
  const deleteBookHandler = (id: number) => {
    deleteBook(id);
  };

  const editBookHandler = (book: EditBook, author: string) => {
    editBook(book, author);
  };

  return (
    <div>
      <h2>{author}</h2>
      {books.map((book: any) => (
        <div key={book.id}>
          <span>{book.bookName} </span>
          <span>{book.price}</span>
          <button onClick={() => deleteBookHandler(book.id)}>Delete</button>
          <button onClick={() => editBookHandler(book, author)}>Edit</button>
          <br />
        </div>
      ))}
      <hr />
    </div>
  );
};

export default BookList;
