import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MoreInfo from './MoreInfo';

const Book = ({ book, ...props }) => {
  const {
    title,
    author_name,
    id_goodreads = [],
    key,
    first_publish_year,
    cover_edition_key,
  } = book;

  const buttonBook = {
    id: cover_edition_key,
    title,
    author: author_name,
    description: book.description,
  };

  const { currBook, setCurrBook } = props;
  const [modalShow, setModalShow] = useState(false);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const bookKey = key.split('/works/')[1];
    props.setUserBooks((prevState) => ({
      ...prevState,
      [cover_edition_key]: {
        id: cover_edition_key,
        title: title,
        author: author_name,
      },
    }));
  };

  const handleClick = (input) => {
    props.newBook(input);
  };

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img
        variant='top'
        src={`http://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {/* {author_name.join(', ')} */}
          {author_name}
        </Card.Subtitle>

        <Button onClick={() => handleClick(buttonBook)}>Add to shelf</Button>
        <Button
          variant='primary'
          onClick={() => {
            setCurrBook({ id: book.text[0] });
            setModalShow(true);
          }}
        >
          More Info
        </Button>

        <MoreInfo
          book={book}
          key={book.key}
          description={currBook.description}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Card.Body>
    </Card>
  );
};

export default Book;
