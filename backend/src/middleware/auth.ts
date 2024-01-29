import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../types/types'
import { ExtendedJwtPayload } from '../types/types'

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'authentication Failed' })
      } else {
        req.userId = user as ExtendedJwtPayload
        next()
      }
    })
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' })
  }
}
