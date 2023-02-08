import { atom } from 'recoil'

export type ModalView = 'login' | 'signup' | 'resetPassword'
export interface AuthModalState {
  isOpen: boolean
  view: ModalView
}

const defaultModalState: AuthModalState = {
  isOpen: false,
  view: 'login',
}

export const authModalState = atom<AuthModalState>({
  key: 'authModalState',
  default: defaultModalState,
})
