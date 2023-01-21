const express = require('express')
const {
  getUserById,
  getAllUsers,
  getShortUsers,
  getDialogs,
} = require('../service/userService')

const router = express.Router()

router.get('/short-users', getShortUsers)

router.get('/get-dialogs', getDialogs)

module.exports = router
