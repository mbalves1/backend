const mongoose = require("mongoose")

const { Schema } = mongoose

const categorySchema = new Schema({
    categoryname: String, // categoria
    id: String, // categoria id
  },
  { timestamps: true }
)

const Category = mongoose.model("Categorys", categorySchema)

module.exports = {
  Category,
  categorySchema,
}