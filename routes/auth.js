const router = require("express").Router()

const authController = require("../controllers/authController")

router
  .route("/auth/register")
  .post((req, res) => authController.create(req, res))

router
  .route("/auth/user")
  .post((req, res) => authController.createL(req, res))

router
  .route("/user/:id")
  .get((req, res) => authController.getUser(req, res))


  module.exports = router