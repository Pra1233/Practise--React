export type libraryBook = {
  name: string;
  author: string;
  amount: number;
};

export type sliceState = {
  books: [];
  searchBooks: [];
  authorName: string;
  bookName: string;
  author: string;
  price: number;
  id: number;
};

export type book = {
  id: number;
  bookName: string;
  price: number;
};

export type updatedBook = libraryBook & {
  id: number;
};

export type getAllBooks = {
  id: number;
  authorName: string;
  Books: [];
};

export type bookProps = {
  books: [];
  author: string;
};
