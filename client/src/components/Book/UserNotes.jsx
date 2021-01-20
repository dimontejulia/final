import React from 'react';
import Button from '../Button';

export default function UserNotes(props) {
  const { comments } = props;

  return (
    <div>
      <h3>Notes</h3>
      <br />
      <textarea
        name='userNotes'
        rows='15'
        cols='75'
        placeholder='Any notes about the book? Write them here...'
        value={comments ? comments : ''}
      ></textarea>
      <br />
      <Button>Save Notes</Button>
    </div>
  );
}
