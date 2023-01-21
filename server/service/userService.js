const { users, usersShort, dialogs } = require('../FAKEDB.JS')

const db = users

const getShortUsers = (req, res) => {
  res.status(200).send(usersShort)
}

const getDialogs = (req, res) => {
  const { userId } = req.cookies.cookieName
  console.log(userId)
  const choisenUserDialogs = dialogs.filter(
    (obj) => obj.firstUser === userId || obj.secondUser === userId
  )
  if (choisenUserDialogs.length === 0)
    return res.status(404).send('Have no dialogs')
  else return res.status(200).send(choisenUserDialogs)
}

module.exports = { getShortUsers, getDialogs }
