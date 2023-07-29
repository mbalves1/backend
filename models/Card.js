const mongoose = require("mongoose")

const { Schema } = mongoose

const { serviceSchema } = require("./Service")

const cardsSchema = new Schema({
    name: String, // apelido para cartao
    bank: String, // banco
    type: String, // credito - debito
    flag: String,
    expiration: String, 
    number_card: Number, // numero cartao
    code: Number,
    attached: [serviceSchema] // cartao atrelado a uma transacao
  },
  { timestamps: true }
)

const Card = mongoose.model("Cards", cardsSchema)

module.exports = {
  Card,
  cardsSchema,
}