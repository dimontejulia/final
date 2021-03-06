module.exports = (db) => {
  const getClubs = () => {
    const query = {
      text: "SELECT * FROM users_books",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getClubNews = (clubID) => {
    const query = {
      text: `
        SELECT 
        posts.id AS postid,
        users.id AS userid,
        first_name AS firstname,
        last_name AS lastname,
        title,
        body,
        book_club_id,
        timestamp
        FROM club_posts posts
        JOIN users ON users.id = posts.user_id
        WHERE book_club_id = $1 ORDER BY posts.id DESC;
      `,
      values: [clubID],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addClubNews = (post) => {
    const { userId, clubId, title, body, timestamp } = post;
    const query = {
      text: `
      INSERT INTO club_posts (user_id, book_club_id, title, body, timestamp)
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *;
      `,
      values: [userId, clubId, title, body, timestamp],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSpecificClub = (clubID) => {
    const query = {
      text: `
        SELECT  
        club.id AS id, 
        club.current_book,
        club.admin_id,
        club.book_club_name,
        club.club_description,
        ub.date_read,
        ub.rating,
        ub.comments,
        ub.status,
        club.avatar
        FROM book_club club
	      LEFT OUTER JOIN users_books ub ON club.id = ub.club_id
        LEFT OUTER JOIN books ON ub.book_id = books.id
        WHERE club.id = $1;
      `,
      values: [clubID],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addClub = (userId, clubName, clubDescription, avatar) => {
    const query = {
      text: `
          INSERT INTO book_club (admin_id, book_club_name, club_description, avatar) 
          VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [userId, clubName, clubDescription, avatar],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addClubToUsersClubs = (userId, clubId) => {
    const query = {
      text: `
          INSERT INTO user_book_clubs (user_id, book_club_id) 
          VALUES ($1, $2) RETURNING *`,
      values: [userId, clubId],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const editClubWithBook = (clubObj, bookObj) => {
    const { current_book, book_club_name, avatar } = clubObj;
    const query = {
      text: `
        UPDATE book_club
        SET current_book = $2,
        book_club_name = $3,
        avatar = $4
        WHERE id = $1
        RETURNING *;
      `,
      values: [clubObj.id, current_book, book_club_name, avatar],
    };
    return checkDBForBook(bookObj.id)
      .then((bookInDB) => {
        if (!bookInDB) {
          console.log("Adding BOOK TO DB...");
          addBookToDB(bookObj);
        }
      })
      .then(() => {
        console.log("UPDATING CLUB DB...");
        return db.query(query);
      });
  };

  const editClub = (clubObj) => {
    const { id, club_description, book_club_name, avatar } = clubObj;
    const query = {
      text: `
        UPDATE book_club
        SET club_description = $2,
        book_club_name = $3,
        avatar = $4
        WHERE id = $1
        RETURNING *;
      `,
      values: [id, club_description, book_club_name, avatar],
    };
    console.log("CHECKING>>>", clubObj);

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const checkDBForBook = (bookId) => {
    const query = {
      text: `SELECT count(*) FROM books WHERE id = $1`,
      values: [bookId],
    };

    return db
      .query(query)
      .then((res) => Number(res.rows[0].count))
      .catch((err) => err);
  };

  const addBookToDB = (bookObj) => {
    const { id, title, author, subject } = bookObj;
    const query = {
      text: `INSERT INTO books (id, title, author, subject) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [id, title, author[0], subject],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const deleteClub = (clubId) => {
    const query = {
      text: `DELETE FROM book_club WHERE id = $1`,
      values: [clubId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getClubBookHistory = (clubId) => {
    const query = {
      text: `
      SELECT books.id, title, author, subject, first_publish_year
      FROM books
      JOIN users_books ON books.id = users_books.book_id
      WHERE club_id = $1`,
      values: [clubId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getClubMembers = (clubId) => {
    const query = {
      text: `
      SELECT concat(users.first_name,' ', users.last_name) as name
      FROM book_club bc
      JOIN user_book_clubs uc ON uc.book_club_id = bc.id
      JOIN users on uc.user_id = users.id
      WHERE bc.id = $1;`,
      values: [clubId],
    };
    console.log("mbrs start", query);
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getClubs,
    getSpecificClub,
    addClub,
    addClubToUsersClubs,
    editClub,
    editClubWithBook,
    deleteClub,
    getClubNews,
    addClubNews,
    getClubBookHistory,
    getClubMembers,
  };
};
