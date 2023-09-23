const { User: UserModel } = require("../models/Auth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkToken = require("../middleware/checkToken")
const crypto = require('crypto')
const transporter = require('./transporter')
const nodemailer = require('nodemailer')

const authController = {
  
  create: async(req, res) => {
    try {
      const {
        first_name, last_name, email, terms, password, confirmpassword
      } = req.body

      // Validation
      if(!first_name) {
        res.status(422).json({msg: "O nome é obrigatório!"})
      }
      if(!email) {
        res.status(422).json({msg: "O email é obrigatório!"})
      }
      if(!password) {
        res.status(422).json({msg: "O password é obrigatório!"})
      }
      if (password !== confirmpassword) {
        res.status(422).json({msg: "As senhas não conferem!"})
      }
      if (!terms) {
        res.status(422).json({msg: "O aceite dos termos são obrogatórios!"})
      }

      // Check if user exists
      const userExists = await UserModel.findOne({ email: email })

      if(userExists) {
        res.status(422).json({msg: "Por favor, use outro email!"})
      }

      // crete password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      // create user
      const user = new UserModel({
        first_name,
        last_name,
        email,
        terms,
        password: passwordHash
      })

      try {
        await user.save()

        res.status(201).json({ msg: "Usuário criado com sucesso!" })
      } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Erro ao logar, tente novamente mais tarde!" })
      }

    } catch(e) {
      console.log(e);
    }
  },

  createL: async(req, res) => {
    
    const { email, password } = req.body

    if(!email) {
      res.status(422).json({msg: "O email é obrigatório!"})
    }
    if(!password) {
      res.status(422).json({msg: "O password é obrigatório!"})
    }

    // check if exists
    const user = await UserModel.findOne({ email: email })

    if(!user) {
      res.status(404).json({msg: "Usuário não encontrado!"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    
    if(!checkPassword) {
      res.status(422).json({msg: "Usuário ou senha inválida!"})
    }

    try {
      const secret = process.env.SECRET

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
      )

      res.status(200).json({ msg: "Successfully authenticated", token })

    } catch (error) {
      console.error(error)
      res.status(500).json({ msg: "Erro ao logar, tente novamente mais tarde!" })
    }
  },

  // getUser: async (req, res) => {
  //   try {
  //     // Aqui você chama o middleware checkToken antes de continuar com a lógica da rota
  //     checkToken(req, res, async () => {
  //       const id = req.params.id;

  //       // Check if user exists
  //       const user = await UserModel.findById(id, "-password");

  //       if (!user) {
  //         return res.status(404).json({ msg: "User not found!" });
  //       }

  //       res.status(200).json({ user });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ msg: "Erro ao obter usuário, tente novamente mais tarde!" });
  //   }
  // }

  getUser: async (req, res) => {
    try {
      // Aqui você chama o middleware checkToken antes de continuar com a lógica da rota
      const { id } = req.user

      // Check if user exists
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ msg: "User not found!" });
      }

      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;

      res.status(200).json({ user: userWithoutPassword });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro ao obter usuário, tente novamente mais tarde!" });
    }
  },

  forgotPass: async (req, res) => {
    try {
      const { email }= req.body
      const user = await UserModel.findOne({ email });

      if (!user) return res.status(400).send({ error: 'user not found' })

      // const token = crypto.randomBytes(20).toString('hex')
      const now = new Date();
      now.setHours(now.getHours() + 1)

      const secret = process.env.SECRET

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
      )

      const updatePass = {
        passwordResetToken: token,
        passwordResetExpired: now
      }
      
      await UserModel.findByIdAndUpdate(user.id, updatePass)

      var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "fincardplan@gmail.com",
          pass: "jkstpysmdctunljl"
        }
      })

      var message = {
        from: "fincardplan@gmail.com",
        to: email,
        subject: "fin.card reset password",
        text: "Reset password",
        html: `<h1>fin.card</h1>
        <h2>Seu Guia para a Saúde Financeira</h2>
        <h2>Todas as Suas Contas, 
        <strong>
          Um Único Lugar
        </strong>.</h2>
        <a href="https://fincard.vercel.app/${token}/${email}/reset">
          Redefinir senha
        </a>
        </p>`
      }

      transport.sendMail(message, (err) => {
        if (err) {
          return res.status(400).send({ error: err });
        } else {
          return res.status(200).send({ message: 'Password reset email sent successfully' });
        }
      });
      
    } catch (error) {
      res.status(400).send({ error: 'Error on forgot password, try again' })
    }
  },

  resetPass: async (req, res) => {
    const { email, token, password } = req.body
    try {
      const user = await UserModel.findOne({ email })
        .select('passwordResetToken passwordResetExpired')

      if (!user) return res.status(400).send({ error: 'user not found in reset' })

      if (token !== user.passwordResetToken) return res.status(400).send({ error: 'token invalid' })

      const now = new Date();
      if (now > user.passwordResetExpired) return res.status(400).send({ error: 'token expired, generate a new one' })

      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash

      await user.save()

      res.send()

    } catch (error) {
      res.status(400).send({ error: 'Error canoot reset password, try again' })
    }

  }
}

module.exports = authController