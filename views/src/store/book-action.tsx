import axios from "axios";
import { toast } from "react-toastify";

import { bookActions } from "./bookSlice";

const url = "http://localhost:3000";
type Book = {
  name: string;
  author: string;
  amount: number;
};
type EditBook = {
  id: number;
  bookName: string;
  price: number;
};

export const getBooks: any = () => {
  return async (dispatch: any) => {
    const getRequest = async () => {
      const res = await axios.get(`${url}/books`);
      if (res.status === 200) {
        const books = res.data.books;
        console.log(books, "get");
        return books;
      } else {
        toast.error(res.data.error);
      }
    };

    try {
      const books = await getRequest();
      dispatch(bookActions.setBooks(books));
    } catch (error: any) {
      const e = error.response.data.message;
      toast.error(e);
    }
  };
};

export const createBooks: any = async (book: Book) => {
  try {
    const res = await axios.post(`${url}/book`, book);

    if (res.status === 201) {
      getBooks();
      toast.success(res.data.message);
    } else {
      toast.error(res.data.error);
    }
  } catch (error: string | any) {
    const e = error.response.data.message;
    toast.error(e);
  }
};

export const deleteBook = async (libraryId: number) => {
  try {
    const res = await axios.delete(`${url}/book/${libraryId}`);
    if (res.status === 200) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.error);
    }
  } catch (error: string | any) {
    const e = error.response.data.message;
    toast.error(e);
  }
};

export const searchBooks: any = async (book: string, authorName: string) => {
  return async (dispatch: any) => {
    const searchRequest = async () => {
      const res = await axios.get(
        `${url}/searchBook/?authorName=${authorName}&bookName=${book}`
      );
      console.log(res, "sdfsdfsdfsd");
      const newBooks = res.data.authors;
      return newBooks;
    };

    try {
      const newBooks = await searchRequest();

      dispatch(bookActions.setSearchBooks(newBooks));
    } catch (e: string | any) {
      console.log(e);
    }
  };
};

export const editBook = async (book: EditBook, author: string) => {
  return (dispatch: any) => {
    console.log(book, author, "gs");
    try {
      dispatch(bookActions.setEditBook({ book: book, author: author }));
    } catch (error: string | any) {
      const e = error.response.data.message;
      toast.error(e);
    }
  };
};

export const updateBookHandler = async (book: Book) => {
  return async (dispatch: any) => {
    const res = await axios.put(`${url}/book/update`, book);
    if (res.status === 200) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.error);
    }
    try {
      dispatch(bookActions.setUpdateBook());
      getBooks();
    } catch (error: string | any) {
      const e = error.response.data.message;
      toast.error(e);
    }
  };
};
