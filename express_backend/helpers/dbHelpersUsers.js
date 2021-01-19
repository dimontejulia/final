module.exports = (db) => {
    const getUsers = () => {
      const query = {
        text: 'SELECT * FROM users',
      };
  
      return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
    };
  
    const getUserByEmail = email => {
  
      const query = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email]
      }
  
      return db
        .query(query)
        .then(result => result.rows[0])
        .catch((err) => err);
    }
  
    const addUser = (firstName, lastName, email, password) => {
      const query = {
        text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        values: [firstName, lastName, email, password]
      }
  
      return db.query(query)
      .then(result => {
        console.log("Add user:", result)
        return result.rows
      })
        .catch(err => console.log("SQLError",err));
    }

    const authenticateUser = (email, password) => {
      const query = {
        text: `SELECT * FROM users WHERE email = $1 and password =$2`,
        values: [email, password]
      }

      return db
        .query(query)
        .then(result => {
          console.log("DB Authenticate Results:", result)
          return result.rows
        })
        .catch(err => err);

    }
  
    const getUsersPosts = () => {
      const query = {
        text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
        FROM users
        INNER JOIN posts
        ON users.id = posts.user_id`
      }
  
      return db.query(query)
        .then(result => result.rows)
        .catch(err => err);
  
    }
  
    const getOneUsersPosts = (id) => {
      const query = {
        text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
        FROM users
        WHERE user_id = $1
        INNER JOIN posts
        ON users.id = posts.user_id`,
        values: [id]
      }
  
      return db.query(query)
        .then(result => result.rows)
        .catch(err => err);
  
    }
  
    return {
      getUsers,
      getUserByEmail,
      addUser,
      authenticateUser,
      getUsersPosts,
      getOneUsersPosts,
    };
  };