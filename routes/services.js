const router = require("express").Router()

const serviceController = require("../controllers/serviceController")
const checkToken = require("../middleware/checkToken.js")

router
  .route("/services")
  .post(checkToken, (req, res) => serviceController.create(req, res))

router
  .route("/services")
  .get(checkToken, (req, res) => serviceController.getAll(req, res))

router
  .route("/services/:id")
  .get(checkToken, (req, res) => serviceController.getById(req, res))

router
  .route("/services/:id")
  .delete(checkToken, (req, res) => serviceController.delete(req, res))

router
  .route("/services/:id")
  .put(checkToken, (req, res) => serviceController.update(req, res))

module.exports = router