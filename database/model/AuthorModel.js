import { DataTypes } from "sequelize";
import sequelize from "../databaseConnection.js";

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Author is required",
      },
    },
  },
});
export default Author;
