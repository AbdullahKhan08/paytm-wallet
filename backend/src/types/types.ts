import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

export interface ExtendedJwtPayload extends JwtPayload {
  id?: string | undefined
}

export interface AuthenticatedRequest extends Request {
  user?: string | ExtendedJwtPayload | undefined
}

export type TransferRequest = {
  amount: number
  to: string
}
