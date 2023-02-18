import { atom } from 'recoil'

export type AuthModalView = 'login' | 'signup' | 'resetPassword'

export interface ModalState {
  isAuthModalOpen: boolean
  authModalView: AuthModalView
  isCreateCommunityModalOpen: boolean
}

const defaultModalState: ModalState = {
  isAuthModalOpen: false,
  authModalView: 'login',
  isCreateCommunityModalOpen: false,
}

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: defaultModalState,
})
