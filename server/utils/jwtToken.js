// send token information along with cookie to user 
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken()

  // cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE_TIME),
    httpOnly: true,
  }

  res.status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({ success: true, user, token })
}

module.exports = sendToken