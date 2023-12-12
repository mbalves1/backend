const mongoose = require("mongoose")

const { Schema } = mongoose

const { cardsSchema } = require("./Card")
const { categorySchema } = require("./Category")

const transactionSchema = new Schema({
    name: String,
    description: String,
    type: String,
    method_payment: String,
    value: Number,
    installment: Number,
    installment_total: Number,
    transaction_date: Date,
    month: String,
    category: [categorySchema],
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