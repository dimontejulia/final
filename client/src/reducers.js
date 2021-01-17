import { ADD_BOOK, REMOVE_BOOK, SET_USERS } from './actions';

export const books = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOOK: {
      const { text } = payload;
      const addBook = {
        text
      };
      return state.concat(addBook);
    }
    case REMOVE_BOOK: {
      const { text } = payload;
      const removeBook = {
        text
      };
      return state.filter(book => book.text !== text);
    }
    default:
      return state;
  }
};

export const users = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
            loading: false,         
      }
    }
    default:
      return state;
  }
}