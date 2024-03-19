import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { sliceState } from "../types";

const initialState: sliceState = {
  books: [],
  searchBooks: [],
  authorName: "",
  bookName: "",
  author: "",
  price: 0,
  id: -1,
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState: initialState,
  reducers: {
    setBooks(state, action: PayloadAction<[]>) {
      state.books = action.payload;
    },
    setSearchBooks(state, action: PayloadAction<[]>) {
      state.searchBooks = action.payload;
    },

    setEditBook(
      state,
      action: PayloadAction<{
        book: { bookName: string; price: number; id: number };
        author: string;
      }>
    ) {
      state.bookName = action.payload.book.bookName;
      state.author = action.payload.author;
      state.price = action.payload.book.price;
      state.id = action.payload.book.id;
    },

    setUpdateBook(state) {
      state.bookName = "";
      state.author = "";
      state.price = 0;
      state.id = -1;
    },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;
