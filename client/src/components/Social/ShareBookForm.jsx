import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ShareBookForm(props) {
  const [post, setPost] = useState(props.placeholder ? props.placeholder : '');
  const user = props.user;

  const date = new Date();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      user_id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      [id]: value,
      timestamp: date.toLocaleString('en-CA'),
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (!post.title) {
      props.setShow({ item: `Title cannot be blank.`, status: true });
      return null;
    }
    // else if (!post.body) {
    //   props.setShow({ item: `Body cannot be blank.`, status: true });
    //   return null;
    // }

    console.log('USER IN POST ', user);
    props.setNews(post);
    setPost({ title: '', body: '' });
  };

  return (
    <div className='form__share-book-post'>
      <Form>
        <Form.Group controlId='title'>
          <Form.Control
            onChange={handleChange}
            name='title'
            className='form__share-book-title'
            value={post.title}
            placeholder='Post Title'
            readOnly
          />
        </Form.Group>
        <Form.Group controlId='body'>
          <Form.Control
            onChange={handleChange}
            name='body'
            as='textarea'
            className='form__share-book-body'
            rows={4}
            value={post.body}
            placeholder="What did you think about a book you've read? Any
          other literary thoughts?"
          />
        </Form.Group>
        <Button block type='submit' onClick={handleSubmitClick}>
          Post
        </Button>
      </Form>
    </div>
  );
}
