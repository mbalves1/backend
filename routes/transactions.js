const router = require("express").Router()

const transactionController = require("../controllers/transactionController")
const checkToken = require("../middleware/checkToken.js")

router
  .route("/transactions")
  .post(checkToken, (req, res) => transactionController.create(req, res))

router
  .route("/transactions")
  .get(checkToken, (req, res) => transactionController.getAll(req, res))

router
  .route("/transactions/:id")
  .get(checkToken, (req, res) => transactionController.getById(req, res))

router
  .route("/transactions/:id")
  .delete(checkToken, (req, res) => transactionController.delete(req, res))

router
  .route("/transactions/:id")
  .put(checkToken, (req, res) => transactionController.update(req, res))

module.exports = router