import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { bookActions } from "./bookSlice";
import { libraryBook } from "../types";
import { useQuery } from "@tanstack/react-query";

const url = "http://localhost:3000";

export const getBooks: any = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get(`${url}/books`);
      if (res.status === 200) {
        const books = res.data.books;
        dispatch(bookActions.setBooks(books));
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
};

export const createBooks: any = (book: libraryBook) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(`${url}/book`, book);

      if (res.status === 201) {
        dispatch(getBooks());
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
};

export const deleteBook: any = (libraryId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.delete(`${url}/book/${libraryId}`);
      if (res.status === 200) {
        dispatch(getBooks());
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
};

export const searchBooks: any = (book: string, authorName: string) => {
  return async (dispatch: Dispatch) => {
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
};

export const updateBook: any = (book: libraryBook) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.put(`${url}/book/update`, book);
      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(bookActions.setUpdateBook());
        dispatch(getBooks());
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
};
