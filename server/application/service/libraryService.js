import ErrorHandler from "../../utility/errorHandler.js";
import container from "../../library/dependencyInjection/container.js";

class LibraryService {
  constructor() {
    this.bookRepository = container.resolve("BookRepository");
    this.authorRepository = container.resolve("AuthorRepository");
  }

  async getAllBooks() {
    try {
      const books = await this.authorRepository.findAll();
      return books;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createBook(book) {
    try {
      if (!ErrorHandler.checkBook(book)) {
        const error = new Error();
        error.message = "Please provide all Field";
        error.status = 1000;
        throw error;
      }
      const author = await this.authorRepository.findOne(book.author);

      if (author) {
        await this.bookRepository.create(book, author.id);
      } else {
        //create author then add new book AuthorId
        const author = await this.authorRepository.create(book.author);
        await this.bookRepository.create(book, author.id);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteBook(id) {
    try {
      if (!ErrorHandler.checkId(id)) {
        const error = new Error();
        error.message = "Id is Missing";
        error.status = 1001;
        throw error;
      }

      const authorid = await this.bookRepository.findOne(id);
      const { count } = await this.bookRepository.findAndCountAll(authorid);

      if (count <= 1) {
        //book is 1 delete Author also
        await this.authorRepository.destroy(authorid);
      }
      // Delete book
      const row = await this.bookRepository.destroy(id);
      return row;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchBooks(bookName, authorName) {
    try {
      const authors = await this.authorRepository.searchAllBooks(
        authorName,
        bookName
      );
      return authors;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateBook(book) {
    try {
      if (!ErrorHandler.checkId(book.id)) {
        const error = new Error();
        error.message = "Id is Missing";
        error.status = 1001;
        throw error;
      } else if (!ErrorHandler.checkBook(book)) {
        const error = new Error();
        error.message = "Book is Missing";
        error.status = 1002;
        throw error;
      }

      const author = await this.authorRepository.findOne(book.author);
      if (author) {
        const row = await this.bookRepository.update(
          book,
          author.dataValues.id
        );
        return row;
      } else {
        // new author- create new book then add id
        const author = await this.authorRepository.create(book.author);
        const row = await this.bookRepository.update(
          book,
          author.dataValues.id
        );
        return row;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default LibraryService;
