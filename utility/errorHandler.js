class ErrorHandler {
  static checkBook(book) {
    if (!book.name || !book.author || !book.amount) return false;
    if (typeof book !== "object") return false;
    else return true;
  }
  static checkId(id) {
    if (!id) return false;
    else return true;
  }
}
export default ErrorHandler;
