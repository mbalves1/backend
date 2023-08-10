const express = require("express");
const cors = require("cors")
const app = express()
// Login Auth
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: ['http://localhost:3000', 'https://fin-card.vercel.app'], // Origem permitida (seu frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  credentials: true, // Permitir cookies e cabeçalhos de autenticação
};

const port = 3001;

app.use(cors(corsOptions))
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
