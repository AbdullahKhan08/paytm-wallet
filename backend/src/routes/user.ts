import express, { Request, Response } from 'express'
import { User } from '../models/User'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import zod from 'zod'
const JWT_SECRET = process.env.JWT_SECRET
import { authMiddleware } from '../middleware/auth'
import { Account } from '../models/Account'
import { AuthenticatedRequest, ExtendedJwtPayload } from '../types/types'

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

router.get(
  '/me',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findOne({ _id: req.user })
    if (!user) {
      return res.status(401).json({ message: 'user doesnt exist' })
    } else {
      res.status(200).json({ user })
    }
  }
)

router.post('/signup', async (req: Request, res: Response) => {
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
    balance: Number((1 + Math.random() * 10000).toFixed(2)),
  })

  const token = jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: '48h' })

  return res
    .status(201)
    .json({ token, message: 'User created successfully', id: userId, user })
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
      JWT_SECRET as string
    )

    return res.status(200).json({
      token: token,
      message: 'User logged in successfully ',
      id: userId,
      user: existingUser,
    })
  }
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})

router.put(
  '/updated',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const success = updateBody.safeParse(req.body)
    if (!success) {
      return res.status(411).json({
        message: 'Error while updating information',
      })
    }

    const updatedUser = await User.findByIdAndUpdate(req.user, req.body)

    return res.status(200).json({
      message: 'Updated successfully',
    })
  }
)

router.get(
  '/bulk',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
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

    const updatedUsers = users.filter((user) => user._id.toString() != req.user)

    return res.status(200).json({
      user: updatedUsers.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    })
  }
)

export default router
