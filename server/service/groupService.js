const { groups } = require('../FAKEDB.JS')

const getAllGroups = (req, res) => {
  res.status(200).send(groups)
}

const getGroupById = (req, res) => {
  const { id } = req.params
  const choisenGroup = groups.find((obj) => obj.id === id)
  if (choisenGroup === undefined)
    return res.status(404).send("Group doesn't exist")
  res.status(200).send(choisenGroup)
}

module.exports = { getAllGroups, getGroupById }
