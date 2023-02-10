import { atom } from 'recoil'

export interface CreateCommunityModalState {
  isCreateCommunityModalOpen: boolean
}

const defaultCreateCommunityModalState: CreateCommunityModalState = {
  isCreateCommunityModalOpen: false,
}

export const createCommunityModalState = atom<CreateCommunityModalState>({
  key: 'createCommunityModalState',
  default: defaultCreateCommunityModalState,
})
