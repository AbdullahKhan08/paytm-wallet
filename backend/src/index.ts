import express from 'express'
import { connectDb } from './db/connect'

import userRouter from './routes/user'
import mainRouter from './routes/index'
import accountRouter from './routes/account'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/account', accountRouter)
app.use('/api/v1', mainRouter)

const PORT = process.env.PORT || 3009

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI as string)
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
