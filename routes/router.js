const router = require("express").Router()

const tansactionRouter = require("./transactions")
const cardsRouter = require("./cards")
const authRouter = require("./auth")
const categoryRouter = require("./category")

router.use("/", tansactionRouter)
router.use("/", cardsRouter)
router.use("/", authRouter)
router.use("/", categoryRouter)

module.exports = router