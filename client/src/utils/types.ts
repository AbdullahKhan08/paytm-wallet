import { ChangeEvent } from 'react'

export interface UserState {
  isLoading: boolean
  id: null | string
  username: string
  firstName: string
  lastName: string
}

export interface HeadingProps {
  label: string
}

export interface InputBoxProps {
  label: string
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  type: string
}

export interface ButtonProps {
  label: string
  onClick: () => void
}

export interface BottomWarningProps {
  label: string
  buttonText: string
  to: string
}

export interface BalanceProps {
  value: string
}

export interface UserType {
  user: {
    _id: string
    firstName: string
    lastName: string
    username: string
  }
}

export interface UserProps {
  _id: string
  firstName: string
  lastName: string
  username: string
}
