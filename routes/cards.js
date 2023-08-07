const router = require("express").Router()

const cardController = require("../controllers/cardController")
const checkToken = require("../middleware/checkToken.js")

router
  .route("/cards")
  .post(checkToken, (req, res) => cardController.create(req, res))

router
  .route("/cards")
  .get(checkToken, (req, res) => cardController.getAll(req, res))

router
  .route("/cards/:id")
  .get(checkToken, (req, res) => cardController.getById(req, res))

router
  .route("/cards/:id")
  .delete(checkToken, (req, res) => cardController.delete(req, res))

router
  .route("/cards/:id")
  .put(checkToken, (req, res) => cardController.update(req, res))

module.exports = router