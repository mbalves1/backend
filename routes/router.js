const router = require("express").Router()

const tansactionRouter = require("./transactions")
const cardsRouter = require("./cards")
const authRouter = require("./auth")

router.use("/", tansactionRouter)
router.use("/", cardsRouter)
router.use("/", authRouter)

module.exports = router