const express = require("express");
const router = express.Router();
const chalk = require("chalk");

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
          res.json(club);
        })
        .catch((err) => res.json({ msg: err.message }));
    })
    .put("/:id", (req, res) => {
      const { currBookId, clubName, avatar } = req.body;
      editClub(req.params.id, currBookId, clubName, avatar)
        .then((clubs) => res.json(clubs))
        .catch((err) => res.json({ msg: err.message }));
    })
    .delete("/:id", (req, res) => {
      deleteClub(req.params.id)
        .then((clubs) => res.json(clubs))
        .catch((err) => res.json({ msg: err.message }));
    });

  // /api/clubs/new
  router.post("/new", (req, res) => {
    const { userId, clubName, avatar } = req.body;
    addClub(userId, clubName, avatar)
      .then((club) => {
        res.json(club);
      })
      .catch((err) => res.json({ msg: err.message }));
  });

  // /api/clubs
  router.get("/", (req, res) => {
    getClubs()
      .then((users) => res.json(users))
      .catch((err) => res.json({ msg: err.message }));
  });

  return router;
};
