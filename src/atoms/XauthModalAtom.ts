import { atom } from 'recoil'

export type AuthModalView = 'login' | 'signup' | 'resetPassword'
export interface AuthModalState {
  isAuthModalOpen: boolean
  authModalView: AuthModalView
}

const defaultModalState: AuthModalState = {
  isAuthModalOpen: false,
  authModalView: 'login',
}

export const authModalState = atom<AuthModalState>({
  key: 'authModalState',
  default: defaultModalState,
})
