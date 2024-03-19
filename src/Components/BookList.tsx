import { useDispatch } from "react-redux";
import { deleteBook } from "../store/book-action";
import { bookActions } from "../store/bookSlice";
import { book, bookProps } from "../types";

const BookList = ({ books, author }: bookProps) => {
  const dispatch = useDispatch();
  const deleteBookHandler = (id: number) => {
    dispatch(deleteBook(id));
  };

  const editBookHandler = (book: book, author: string) => {
    dispatch(bookActions.setEditBook({ book, author }));
  };

  return (
    <div>
      <h2>{author}</h2>
      {books.map((book: book) => (
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
