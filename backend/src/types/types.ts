import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

export interface ExtendedJwtPayload extends JwtPayload {
  id?: string | undefined
}

export interface AuthenticatedRequest extends Request {
  userId?: string | ExtendedJwtPayload | undefined
}
