import React from "react";
import ChangeClubBook from "./Club/ChangeBook";
import "./Carousel.scss";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Book from "./Search/Book";

export default function Carousel(props) {
  const books = props.carouselBooks;

  const handleClick = (input) => {
    props.newBook(input);
    props.setShow({ item: `${input.title} added successfully.`, status: true });
  };

  let subjects;
  const getSubjects = (bookSubjectsStr) => {
    subjects = bookSubjectsStr.split(",").slice(0, 3);
  };

  return (
    <section className="carousel">
      <h2 className="carousel__category">{props.carouselTitle}</h2>
      <div className="carousel__covers">
        {books.map((book) => (
          <div className="carousel__container">
            <img
              key={book.id}
              className="carousel__book-cover"
              src={`https://covers.openlibrary.org/b/olid/${book.id}-L.jpg`}
              alt={book.title}
            />
            <span className="carousel__info">
              <h3 className="carousel__book-title">{book.title}</h3>
              <h5 className="carousel__book-author">by {book.author}</h5>
              <span className="carousel__book-description">
                {book.description}
              </span>
              <span className="carousel__book-subjects">
                {getSubjects(book.subject)}
                <Badge className="carousel__subject-badge" variant="dark">
                  {subjects[0]}
                </Badge>
                <Badge className="carousel__subject-badge" variant="dark">
                  {subjects[1]}
                </Badge>
                <Badge className="carousel__subject-badge" variant="dark">
                  {subjects[2]}
                </Badge>
              </span>
              <span className="carousel__buttons">
                <Button
                  className="carousel__book-button"
                  onClick={() => handleClick(book)}
                >
                  Add to Shelf
                </Button>
                <Button className="carousel__book-button">Share Book</Button>
              </span>
              <ChangeClubBook
                book={book}
                setClubBook={props.setClubBook}
                clubs={props.clubs}
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
