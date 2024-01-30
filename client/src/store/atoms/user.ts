import { atom } from 'recoil'
import { UserState } from '../../utils/types'

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    isLoading: true,
    id: null,
    username: '',
    firstName: '',
    lastName: '',
  },
})
