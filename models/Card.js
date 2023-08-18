const mongoose = require("mongoose")

const { Schema } = mongoose

const cardsSchema = new Schema({
    name: String, // apelido para cartao
    bank: String, // banco
    type: String, // credito - debito
    flag: String,
    expiration: String, 
    number_card: Number, // numero cartao
    code: Number, // cartao atrelado a uma transacao
    color: String,
    id: String, // cartao atrelado a uma transacao
  },
  { timestamps: true }
)

const Card = mongoose.model("Cards", cardsSchema)

module.exports = {
  Card,
  cardsSchema,
}