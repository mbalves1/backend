const mongoose = require("mongoose")

async function main() {
  try {
    mongoose.set("strictQuery", true)
    await mongoose.connect(
      "mongodb+srv://murilobalves1:uJ5yCjqpOe3ha0AW@cluster0.fbti6mp.mongodb.net/?retryWrites=true&w=majority"
    )
    console.log("conectado ao banco");
  } catch (error) {
    console.log(error)
  }
}

module.exports = main;