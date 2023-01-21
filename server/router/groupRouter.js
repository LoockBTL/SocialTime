const express = require('express')
const {
  getAllGroups,
  getShortGroups,
  getGroupById,
} = require('../service/groupService')
const router = express.Router()

router.get('/group/:id', getGroupById)
router.get('/groups', getAllGroups)

module.exports = router
