const router = require("express").Router()

const servicesRouter = require("./services")
const cardsRouter = require("./cards")
const authRouter = require("./auth")

router.use("/", servicesRouter)
router.use("/", cardsRouter)
router.use("/", authRouter)

module.exports = router