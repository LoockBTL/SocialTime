const { userPost, postComment, likePost } = require('../FAKEDB.JS')

const getAllPost = (req, res) => {
  res.status(200).send(userPost)
}

const getAllPostComment = (req, res) => {
  res.status(200).send(postComment)
}

const getAllPostLikes = (req, res) => {
  res.status(200).send(likePost)
}

module.exports = {
  getAllPost,
  getAllPostComment,
  getAllPostLikes,
}
