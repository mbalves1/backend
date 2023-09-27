const router = require("express").Router()

const categoryController = require("../controllers/categoryController")
const checkToken = require("../middleware/checkToken.js")

router
  .route("/category")
  .post(checkToken, (req, res) => categoryController.create(req, res))

router
  .route("/categorys")
  .get(checkToken, (req, res) => categoryController.getAll(req, res))

router
  .route("/category/:id")
  .delete(checkToken, (req, res) => categoryController.delete(req, res))

router
  .route("/category/:id")
  .put(checkToken, (req, res) => categoryController.update(req, res))

module.exports = router