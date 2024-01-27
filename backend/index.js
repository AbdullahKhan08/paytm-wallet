const express = require('express')
const connectDb = require('./db/connect')
const userRouter = require('./routes/user')
const mainRouter = require('./routes/index')
const accountRouter = require('./routes/account')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/account', accountRouter)
app.use('/api/v1', mainRouter)

const PORT = process.env.PORT || 3009

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
