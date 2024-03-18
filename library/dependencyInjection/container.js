import container from "./DependencyContainer.js";
import LibraryService from "../../application/service/libraryService.js";
import AuthorRepository from "../../repository/authorRepository.js";
import BookRepository from "../../repository/bookRepository.js";

container.register("libraryService", () => new LibraryService());
container.register("AuthorRepository", () => new AuthorRepository());
container.register("BookRepository", () => new BookRepository());

export default container;
