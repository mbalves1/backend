const express = require("express");
const cors = require("cors")
const app = express()
// Login Auth
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const port = 3000;

app.use(cors())
app.use(express.json());

const conn = require("./db/conn")
conn()

// Routes
const routes = require("./routes/router")
app.use("/api", routes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}!`);
});

// murilobalves1
//
