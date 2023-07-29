const router = require("express").Router()

const cardController = require("../controllers/cardController")

router
  .route("/cards")
  .post((req, res) => cardController.create(req, res))

router
  .route("/cards")
  .get((req, res) => cardController.getAll(req, res))

router
  .route("/cards/:id")
  .get((req, res) => cardController.getById(req, res))

router
  .route("/cards/:id")
  .delete((req, res) => cardController.delete(req, res))

router
  .route("/cards/:id")
  .put((req, res) => cardController.update(req, res))

module.exports = router