const nodemailer = require("nodemailer")

/**
 * @desc Send mail to user for password recovery
 * @param {email, subject, message} options 
 */
const sendEmail = async (options) => {
  const { email, subject, message } = options
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  const mail = {
    from: process.env.SMTP_FROM_NAME + `<${process.env.SMTP_FROM_MAIL}>`,
    to: email,
    subject: subject,
    text: message
  }

  await transport.sendMail(mail)
}

module.exports = sendEmail