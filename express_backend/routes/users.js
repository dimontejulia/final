const express = require("express");
const router = express.Router();
const { getPostsByUsers } = require("../helpers/dataHelpers");

module.exports = ({
  getUsers,
  getUserBooks,
  deleteBook,
  getFriends,
  getUserClubs,
  getUserByEmail,
  getWishlist,
  getPosts,
  addPost,
  updateUsersBooks,
  addBookToUser,
  addFriend,
  deleteFriend,
  joinBookClub,
  rmvUsersBooks,
  deleteBookWishList,
  checkDBforBook,
  addBookToDB,
  addToWishlist,
  addToShelf
}) => {


  router
    .get("/:id/books", (req, res) => {
      //Join from user Books & User Books Data
      getUserBooks(req.params.id)
        .then((books) => {
          res.json(books);
        })
        .catch((err) => res.json({ msg: err.message }));
    })
    // .post("/:id/books", (req, res) => {
    //   addBookToUser(req.params.id, req.body)
    //     .then((book) => {
    //       res.json(book);
    //     })
    //     .catch((err) => {
    //       res.json({ msg: err.message });
    //     });
    // })

    .post("/:id/books", (req, res) => {
      const bookData = req.body;
      const bookId = bookData.id;
      const userId = req.params.id;
      checkDBforBook(bookId)
        .then(check => {
          console.log("check????", check[0].count)
          if (check[0].count === '0') {
            console.log("check!!!", check[0].count)
            return addBookToDB(bookData);
          }
          return "Book Exists";
        })
        .then(() => {
          console.log("STRT CHECK", bookId, userId, bookData);
          return addToShelf(userId, bookId);
        })
        .then((res) => res.json(res))
        .catch((err) => res.json({ msg: err.message }));
    })

    .delete("/:userId/books/:bookId", (req, res) => {
      const { userId, bookId } = req.params;
      rmvUsersBooks(bookId, userId)
        .then(() => getUserBooks(req.params.userId))
        .then((books) => {
          res.json(books);
        })
        .catch((err) => res.json({ msg: err.message }));
    });

  //users/:userId/books/:bookId
  router.put("/:id/books/:bookId", (req, res) => {
    const userId = req.params.id;
    // const bookId = req.params.bookId;
    const bookData = req.body;
    updateUsersBooks(userId, bookData)
      .then((res) => {
        res.json("Success");
      })
      .catch((err) => res.json({ msg: err.message }));
  });

  // api/users/:id/friends
  router
    .get("/:id/friends", (req, res) => {
      getFriends(req.params.id)
        .then((friends) => res.json(friends))
        .catch((err) => res.json({ msg: err.message }));
    })
    .post("/:id/friends", (req, res) => {
      getUserByEmail(req.body)
        .then((user) => {
          if (!user) {
            return res.json("NO USER FOUND");
          }
          //Duplicate Checking occurs on client side
          addFriend(req.params.id, user.id)
            .then((results) => {
              res.json(user);
            });
        })
        .catch((err) => res.json({ msg: err.message }));
    })
    .delete("/:id/friends/:friendId", (req, res) => {
      deleteFriend(req.params.id, req.params.friendId)
        .then(() => getFriends(req.params.id))
        .then((newFriends) => {
          res.json(newFriends);
        })
        .catch((err) => res.json({ msg: err.message }));
    });

  // users/:id/clubs
  router
    .get("/:id/clubs", (req, res) => {
      getUserClubs(req.params.id)
        .then((clubs) => {
          res.json(clubs);
        })
        .catch((err) => res.json({ msg: err.message }));
    })
    .post("/:id/clubs", (req, res) => {
      console.log(req.body)
      const { userId, clubId } = req.body;
      joinBookClub(userId, Number(clubId))
        .then((result) => {
          console.log("Getting USER CLUBS", result);
          return getUserClubs(req.params.id);
        })
        .then(clubs => res.json(clubs))
        .catch((err) => res.json({ msg: err.message }));
    })
    .delete("/:id/clubs", (req, res) => {
      getUsers()
        .then((users) => res.json(users))
        .catch((err) => res.json({ msg: err.message }));
    });

  router
    .get("/:id/wishlist", (req, res) => {
      getWishlist(req.params.id)
        .then((wishlistBooks) => res.json(wishlistBooks))
        .catch((err) => res.json({ msg: err.message }));
    })
    .post("/:id/wishlist", (req, res) => {
      const bookData = req.body;
      const bookId = bookData.id;
      const userId = req.params.id;
      checkDBforBook(bookId)
        .then(check => {
          console.log("check????", check[0].count)
          if (check[0].count === '0') {
            console.log("check!!!", check[0].count)
            return addBookToDB(bookData);
          }
          return "Book Exists";
        })
        .then(() => {
          console.log("STRT CHECK", bookId, userId, bookData);
          return addToWishlist(userId, bookId);
        })
        .then((res) => res.json(res))
        .catch((err) => res.json({ msg: err.message }));
    })
    .delete("/:userId/wishlist/:bookId", (req, res) => {
      const { userId, bookId } = req.params;
      deleteBookWishList(userId, bookId)
        .then(() => getWishlist(req.params.userId))
        .then((books) => {
          res.json(books);
        })

        //     .then((book) => res.json(book))
        .catch((err) => res.json({ msg: err.message }));
    });

  // users/:id/posts
  router
    .get("/:id/posts", (req, res) => {
      getPosts(req.params.id)
        .then((posts) => res.json(posts))
        .catch((err) => res.json({ msg: err.message }));
    })
    .post("/:id/posts", (req, res) => {
      addPost(req.body)
        .then((posts) => res.json(posts))
        .catch((err) => res.json({ msg: err.message }));
    })
    .delete("/:id/posts", (req, res) => {
      getUsers()
        .then((posts) => res.json(posts))
        .catch((err) => res.json({ msg: err.message }));
    });

  // users/posts
  router.get("/posts", (req, res) => {
    getUsersPosts()
      .then((usersPosts) => {
        const formattedPosts = getPostsByUsers(usersPosts);
        res.json(formattedPosts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );

    // users/:id
    router
      .get("/:id", (req, res) => {
        getUsers()
          .then((users) => res.json(users))
          .catch((err) => res.json({ msg: err.message }));
      })
      .post("/:id", (req, res) => {
        getUsers()
          .then((users) => res.json(users))
          .catch((err) => res.json({ msg: err.message }));
      })
      .delete("/:id", (req, res) => {
        getUsers()
          .then((users) => res.json(users))
          .catch((err) => res.json({ msg: err.message }));
      });



    // users
    router.get("/", (req, res) => {
      getUsers()
        .then((users) => res.json(users))
        .catch((err) => res.json({ msg: err.message }));
    });
  });

  return router;
};
