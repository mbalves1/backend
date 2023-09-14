const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const router = require("express").Router()

const { host, port, user, pass } = require('../config/mailer.json')

var transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
});

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: './html',
}))

module.export = transport