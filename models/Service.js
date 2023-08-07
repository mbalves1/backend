const mongoose = require("mongoose")

const { Schema } = mongoose

const { cardsSchema } = require("./Card")

const serviceSchema = new Schema({
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

const Service = mongoose.model("Service", serviceSchema)

module.exports = {
  Service,
  serviceSchema,
}