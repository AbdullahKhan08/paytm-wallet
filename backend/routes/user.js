const express = require('express')
const { User } = require('../models/User')
const router = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const zod = require('zod')
const JWT_SECRET = process.env.JWT_SECRET
const { authMiddleware } = require('../middleware/auth')
const { Account } = require('../models/Account')

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.userId })
  if (!user) {
    return res.status(401).json({ message: 'user doesnt exist' })
  } else {
    res.status(200).json({ id: req.userId })
  }
})

router.post('/signup', async (req, res) => {
  const success = signupBody.safeParse(req.body)

  if (!success) {
    return res
      .status(411)
      .json({ message: 'Email already taken / Incorrect inputs' })
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  })

  if (existingUser) {
    return res.status(411).json({ message: 'User already exists' })
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })

  const userId = user._id

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  })

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '48h' })

  return res.status(201).json({ token, message: 'User created successfully ' })
})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

router.post('/signin', async (req, res) => {
  const { success } = signinBody.safeParse(req.body)

  if (!success) {
    return res
      .status(411)
      .json({ message: 'Email is incorrect / Incorrect inputs' })
  }

  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })

  if (!existingUser) {
    return res
      .status(411)
      .json({ message: 'User does not exist / Incorrect inputs' })
  }

  const userId = existingUser._id

  if (existingUser) {
    const token = jwt.sign(
      {
        userId: userId,
      },
      JWT_SECRET
    )

    return res.status(200).json({
      token: token,
      message: 'User logged in successfully ',
    })
  }
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})

router.put('/updated', authMiddleware, async (req, res) => {
  const success = updateBody.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: 'Error while updating information',
    })
  }

  const updatedUser = await User.findByIdAndUpdate(req.userId, req.body)

  return res.status(200).json({
    message: 'Updated successfully',
  })
})

router.get('/bulk', async (req, res) => {
  const filter = req.query.filter || ''

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  })

  return res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  })
})

module.exports = router
