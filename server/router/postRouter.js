const express = require('express')
const {
  getAllPost,
  getAllPostComment,
  getAllPostLikes,
} = require('../service/postService')
const router = express.Router()

router.get('/posts', getAllPost)
router.get('/post-comment', getAllPostComment)
router.get('/post-likes', getAllPostLikes)

module.exports = router
