const express = require("express");
const router = express.Router();

module.exports = ({
  getClubs,
  getSpecificClub,
  deleteClub,
  addClub,
  editClub,
}) => {
  // clubs

  router
    .get("/:id", (req, res) => {
      getSpecificClub(req.params.id)
        .then((club) => {
          console.log("ClubDetails fr Svr", club);
          res.json(club);
        })
        .catch((err) => res.json({ msg: err.message }));
    })
    .put("/:id", (req, res) => {
      editClub(req.params.id)
        .then((clubs) => {
          res.json(clubs);
        })
        .catch((err) => res.json({ msg: err.message }));
    })
    .delete("/:id", (req, res) => {
      deleteClub(req.params.id)
        .then((clubs) => {
          res.json(clubs);
        })
        .catch((err) => res.json({ msg: err.message }));
    });

  // users
  router.get("/", (req, res) => {
    getClubs()
      .then((users) => res.json(users))
      .catch((err) => res.json({ msg: err.message }));
  });

  return router;
};