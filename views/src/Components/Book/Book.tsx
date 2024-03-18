import React, { useRef, useEffect } from "react";

import BookList from "../BookList";
import "./Book.css";
import { useSelector, useDispatch } from "react-redux";
import { createBooks, getBooks, searchBooks } from "../../store/book-action";

type BookObject = {
  name: string;
  author: string;
  amount: number;
};
type Book = {
  id: number;
  bookName: string;
  price: string;
};
const Book = () => {
  const dispatch = useDispatch();

  const books = useSelector((state: any) => state.book.books);
  const newBooks = useSelector((state: any) => state.book.searchBooks);
  const book = useSelector((state: any) => state.book);
  const bookName = useRef<HTMLInputElement>(null);
  const searchAuthorName = useRef<HTMLInputElement>(null);
  const author = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    if (
      bookName.current?.value != null &&
      author.current?.value != null &&
      amount.current?.value != null
    ) {
      bookName.current.value = book.bookName;
      author.current.value = book.author;
      amount.current.value = book.price.toString();
      console.log(book.bookName);
    }
  }, [book.id]);

  const submitHandler = () => {
    if (
      bookName.current?.value &&
      author.current?.value &&
      amount.current?.value
    ) {
      const bookNameInput: string = bookName.current?.value;
      const descriptionInput: string = author.current?.value;
      const amountInput: string = amount.current?.value;
      const libraryBook: BookObject = {
        name: bookNameInput,
        author: descriptionInput,
        amount: Number(amountInput),
      };
      console.log(libraryBook);
      createBooks(libraryBook);
      // bookCtx.createBook(libraryBook);
    } else {
      alert("Enter all field");
    }
  };

  const updateDataHandler = () => {
    if (
      bookName.current?.value &&
      author.current?.value &&
      amount.current?.value
    ) {
      const bookNameInput = bookName.current?.value;
      const descriptionInput = author.current?.value;
      const amountInput = amount.current?.value;

      const libraryBook = {
        id: book.id,
        name: bookNameInput,
        author: descriptionInput,
        amount: Number(amountInput),
      };
      // bookCtx.updateBook(libraryBook);
    }
  };

  const searchHandler = async () => {
    if (
      search.current?.value != null &&
      searchAuthorName.current?.value != null
    ) {
      const searchInput = search.current.value;
      const authorInput = searchAuthorName.current.value;

      // bookCtx.search(searchInput, authorInput);
      console.log(searchInput, authorInput, "sads");
      dispatch(searchBooks(searchInput, authorInput));
    }
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Enter Book Name  " ref={search} />
        <input
          type="text"
          placeholder="Enter Author Name"
          ref={searchAuthorName}
          required
        />
        <button onClick={searchHandler}>Search</button>
        <hr />
        <div className="search">
          <div className="books">
            {newBooks?.map((author: any) => (
              <div key={author.id} className="author">
                <h3>Author: {author.authorName}</h3>
                <h4>Books</h4>
                <div className="book">
                  {author.Books.map((book: Book) => (
                    <h3 className="h3" key={book.id}>
                      {book.bookName + "  " + book.price}
                    </h3>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <input type="text" placeholder="Enter Book Name" ref={bookName} />

        <input type="text" placeholder="Enterauthor" ref={author} />
        <input type="number" placeholder="Enter Amount" ref={amount} required />
        <button onClick={submitHandler}>Add Book</button>
        <button onClick={updateDataHandler}>Update Book</button>
      </div>
      {books?.map((book: any) => (
        <div key={book.id}>
          <BookList books={book.Books} author={book.authorName} />
        </div>
      ))}
    </>
  );
};

export default Book;
