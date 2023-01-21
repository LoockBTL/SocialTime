require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./router/authRouter')
const userRouter = require('./router/userRouter')
const groupRouter = require('./router/groupRouter')
const postRouter = require('./router/postRouter')

const PORT = process.env.PORT || 5000
const app = express()

app.listen(PORT, 'localhost', () => console.log(`Success | ${PORT}`))
app.use(cors())
app.use(bodyParser.json())
app.use(authRouter)
app.use(userRouter)
app.use(groupRouter)
app.use(postRouter)
