import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Book from "./Components/Book/Book";

const App = () => {
  return (
    <>
      <Book />
      <ToastContainer />
    </>
  );
};

export default App;
