import Author from "../database/model/AuthorModel.js";
import Book from "../database/model/BookModel.js";
import { Op } from "sequelize";

class AuthorRepository {
  async create(author) {
    try {
      const newAuthor = await Author.create({ authorName: author });
      return newAuthor;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const books = await Author.findAll({
        include: [{ model: Book, attributes: ["id", "bookName", "price"] }],
        attributes: ["id", "authorName"],
      });

      return books;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchAllBooks(authorName, bookName = "") {
    try {
      const authors = await Author.findAll({
        where: { authorName: { [Op.like]: authorName + "%" } },
        attributes: ["id", "authorName"],
        include: [
          {
            model: Book,
            attributes: ["id", "bookName", "price"],
            where: { bookName: { [Op.like]: "%" + bookName + "%" } },
          },
        ],
      });
      return authors;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async destroy(id) {
    try {
      await Author.destroy({ where: { id: id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(authorname) {
    try {
      const author = await Author.findOne({
        where: { authorName: authorname },
      });

      return author;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async search(searchInput) {
    try {
      const searchResult = await Author.findAll({
        where: {
          authorName: { [Op.like]: "%" + searchInput + "%" },
        },
        attributes: ["id", "authorName"],
      });
      if (!searchResult) {
        throw new Error("Author Does not exist");
      }

      return searchResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AuthorRepository;
