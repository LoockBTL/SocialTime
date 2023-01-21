const { login, users } = require('../FAKEDB.JS')

const db = login

const loginInApp = (req, res) => {
  console.log(req.body)
  const { login, password } = req.body
  const authUser = db.find(
    (obj) => obj.login === login && obj.password === password
  )
  const fullUserInfo = users.find((obj) => obj.id === authUser.id)
  if (authUser === undefined) {
    return res.status(403).send('Frong password or email')
  } else {
    res.cookie('userId', authUser.id, { maxAge: 900000, httpOnly: true })
    return res.status(200).send(fullUserInfo)
  }
}

const registrationInApp = (req, res) => {
  const { login, email } = req.body
  const authUser = db.find((obj) => obj.login === login || obj.email === email)
  if (authUser === undefined) {
    return res.status(200).send('Success registration')
  } else {
    return res.status(404).send('Email or login is registered')
  }
}

module.exports = { loginInApp, registrationInApp }
