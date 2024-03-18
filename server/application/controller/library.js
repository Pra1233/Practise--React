import container from "../../library/dependencyInjection/container.js";
const library = container.resolve("libraryService"); //key

export const getBooks = async (req, res) => {
  try {
    const books = await library.getAllBooks();
    res.status(200).json({
      success: true,
      books: books,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = req.body;
    await library.createBook(book);
    res.status(201).json({
      success: true,
      message: "Send data successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await library.deleteBook(id);
    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      book: book,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const searchBook = async (req, res) => {
  try {
    const { authorName, bookName } = req.query;

    const authors = await library.searchBooks(bookName, authorName);
    res.status(200).json({ authors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateBook = async (req, res) => {
  try {
    const book = req.body;
    const row = await library.updateBook(book);

    res.status(200).json({
      success: true,
      status: row,
      message: "Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
