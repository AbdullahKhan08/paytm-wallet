const express = require('express')
const router = express.Router()
const { User } = require('../../models/User')
require('dotenv').config()
const { Account } = require('../../models/Account')
const { authMiddleware } = require('../middleware/auth')

router.get('/balance', authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId })

  return res.status(200).json({ balance: account.balance })
})

router.post('/transfer', authMiddleware, async (req, res) => {
  const { amount, to } = req.body
  const account = await Account.findOne({ userId: req.userId })

  if (account.balance < amount) {
    return res.status(400).json({ message: 'Insufficient funds' })
  }

  const toAccount = await Account.findOne({ userId: to })
  if (!toAccount) {
    return res.status(400).json({ message: 'Invalid account' })
  }

  await Account.updateOne(
    { userId: req.userId },
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
})

module.exports = router
