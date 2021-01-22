import React from "react";
import BookList from "./BookList";
import CardGroup from "react-bootstrap/CardGroup";
import { numBooksAward, oldBook, newBook } from "./awards";

export default function Index(props) {
  const { books, setUserBooks, setCurrBook, user, clubs } = props;

  const date = new Date();
  const currentYear = date.getFullYear();

  const numBooks = Object.keys(books).length;
  const years = Object.values(books).map((book) =>
    parseInt(book.first_publish_year)
  );
  const oldestBook = Math.min.apply(Math, years);
  const newestBook = Math.max.apply(Math, years);

  return (
    <div>
      <h1>Hello!</h1>
      {/* awards */}
      <CardGroup>
        {numBooksAward(numBooks)}
        {oldBook(currentYear, oldestBook)}
        {newBook(currentYear, newestBook)}
      </CardGroup>

      <BookList
        books={books}
        setUserBooks={setUserBooks}
        setCurrBook={setCurrBook}
      />
    </div>
  );
}
