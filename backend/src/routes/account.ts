import express, { Response } from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import { Account } from '../models/Account'
import { authMiddleware } from '../middleware/auth'
import { AuthenticatedRequest, TransferRequest } from '../types/types'

router.get(
  '/balance',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const account = await Account.findOne({ userId: req.user })

    return res.status(200).json({ balance: account?.balance })
  }
)

router.post(
  '/transfer',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { amount, to }: TransferRequest = req.body
    const account = await Account.findOne({ userId: req.user })

    if (account?.balance !== undefined && account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' })
    }

    const toAccount = await Account.findOne({ userId: to })
    if (!toAccount) {
      return res.status(400).json({ message: 'Invalid account' })
    }

    await Account.updateOne(
      { userId: req.user },
      {
        $inc: {
          balance: -amount,
        },
      }
    )

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    )

    return res.status(200).json({ message: 'Transfer successfull' })
  }
)

export default router
