import Book from "../database/model/BookModel.js";

class BookRepository {
  async create(book, id) {
    try {
      await Book.create({
        bookName: book.name,
        price: book.amount,
        AuthorId: id,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(book, id) {
    try {
      const row = await Book.update(
        {
          bookName: book.name,
          price: book.amount,
          AuthorId: id,
        },
        { where: { id: book.id } }
      );

      return row;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id) {
    try {
      const authorid = await Book.findOne({
        where: { id: id },
        attributes: ["AuthorId"],
      });

      return authorid.AuthorId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(id) {
    try {
      const bookArr = await Book.findAll({ where: { AuthorId: id } });
      return bookArr;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async destroy(id) {
    try {
      const row = await Book.destroy({ where: { id: id } });
      return row;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAndCountAll(id) {
    try {
      const { count, rows } = await Book.findAndCountAll({
        where: { AuthorId: id },
      });
      return { count, rows };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default BookRepository;
