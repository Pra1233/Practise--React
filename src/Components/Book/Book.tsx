import { useRef, useEffect, FC } from "react";
import { libraryBook, book } from "../../types";
import BookList from "../BookList";
import "./Book.css";
import { useSelector, useDispatch } from "react-redux";
import {
  createBooks,
  // createBooks,
  getBooks,
  searchBooks,
  updateBook,
} from "../../store/book-action";
import { updatedBook, getAllBooks } from "../../types";
import { RootState } from "../../store/index";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { bookActions } from "../../store/bookSlice";

const Book = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const url = "http://localhost:3000";
  const getBooks = async (obj: any) => {
    console.log(obj, "obj");
    try {
      const res = await axios.get(`${url}/books`);
      if (res.status === 200) {
        const books = res.data.books;
        dispatch(bookActions.setBooks(books));
        return books;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const b = useQuery({
    queryKey: ["getBook"],
    queryFn: getBooks,
    // staleTime: 5000,
  });
  // if (b.status === "pending") console.log("Loading.................");
  // if (b.status === "error") console.log(JSON.stringify(b.error), "ERROR");
  // b.status==="pending"
  console.log(b.data, "DATA");

  // console.log(b.isSuccess, "DDDATA");
  // console.log(b.data, "data");

  const createBook = async (book: libraryBook) => {
    try {
      const res = await axios.post(`${url}/book`, book);

      if (res.status === 201) {
        toast.success(res.data.message);
        return res;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const newPostMutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBook"], exact: true });
    },
  });

  // Update Book
  const updateBook = async (book: libraryBook) => {
    try {
      const res = await axios.put(`${url}/book/update`, book);
      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(bookActions.setUpdateBook());
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const newUpdateMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBook"], exact: true });
    },
  });

  // console.log(newPostMutation.isPending, "sadasdas");
  const books = useSelector((state: RootState) => state.book.books);
  const newBooks = useSelector((state: RootState) => state.book.searchBooks);
  const book = useSelector((state: RootState) => state.book);
  const bookName = useRef<HTMLInputElement>(null);
  const searchAuthorName = useRef<HTMLInputElement>(null);
  const author = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);
  const search = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   dispatch(getBooks());
  // }, [dispatch]);

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
      const libraryBook: libraryBook = {
        name: bookNameInput,
        author: descriptionInput,
        amount: Number(amountInput),
      };
      newPostMutation.mutate(libraryBook);
      // createBooks(libraryBook);
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
      const bookNameInput = bookName.current!.value;
      const descriptionInput = author.current?.value;
      const amountInput = amount.current?.value;

      const newBook: updatedBook = {
        id: book.id,
        name: bookNameInput,
        author: descriptionInput,
        amount: Number(amountInput),
      };
      newUpdateMutation.mutate(newBook);
    }
  };

  const searchBooks = async (book: string, authorName: string) => {
    try {
      const res = await axios.get(
        `${url}/searchBook/?authorName=${authorName}&bookName=${book}`
      );
      dispatch(bookActions.setSearchBooks(res.data.authors));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const searchHandler = async () => {
    if (
      search.current?.value != null &&
      searchAuthorName.current?.value != null
    ) {
      const searchInput = search.current.value;
      const authorInput = searchAuthorName.current.value;

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
            {newBooks?.map((author: getAllBooks) => (
              <div key={author.id} className="author">
                <h3>Author: {author.authorName}</h3>
                <h4>Books</h4>
                <div className="book">
                  {author.Books.map((book: book) => (
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
        <button onClick={submitHandler} disabled={newPostMutation.isPending}>
          {!newPostMutation.isPending ? "Add Book" : "Loading..."}
        </button>
        <button onClick={updateDataHandler}>Update Book</button>
      </div>

      {books?.map((book: getAllBooks) => (
        <div key={book.id}>
          <BookList books={book.Books} author={book.authorName} />
        </div>
      ))}
    </>
  );
};

export default Book;
