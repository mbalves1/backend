const mongoose = require("mongoose")

const { Schema } = mongoose

const { cardsSchema } = require("./Card")

const transactionSchema = new Schema({
    name: String,
    description: String,
    type: String,
    method_payment: String,
    value: Number,
    month: String,
    attached: [cardsSchema],
    id: String
  },
  { timestamps: true }
)

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = {
  Transaction,
  transactionSchema,
}