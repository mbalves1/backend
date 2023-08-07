const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Corrigido o método split e o índice do token

  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }

  // Aqui você pode adicionar lógica para verificar a validade do token e autorização, se necessário.

  try {

    const secret = process.env.SECRET
    jwt.verify(token, secret)

    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;

    next();

  } catch(error) {
    res.status(400).json({ msg: "Invalid token" })
  }

};

module.exports = checkToken; // Exporta a função correta do middleware.