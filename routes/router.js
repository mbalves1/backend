const router = require("express").Router()

const servicesRouter = require("./services")
const cardsRouter = require("./cards")

router.use("/", servicesRouter)
router.use("/", cardsRouter)

module.exports = router