import cors from "cors";
import express from "express";
const app = express();
import LibraryRoute from "./infrastructure/routes/libraryRoutes.js";
import Author from "./database/model/AuthorModel.js";
import Book from "./database/model/BookModel.js";
import sequelize from "./database/databaseConnection.js";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(LibraryRoute);

Author.hasMany(Book);
Book.belongsTo(Author);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((e) => console.log(e));
