const express = require('express')
const { loginInApp, registrationInApp } = require('../service/authService')
const router = express.Router()

router.post('/login', loginInApp)
router.post('/registration', registrationInApp)
module.exports = router
