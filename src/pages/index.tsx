import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { modalState } from '@/state/recoil/atoms/modalAtom'
import { useRecoilState } from 'recoil'
import { auth } from '@/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Text } from '@chakra-ui/react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [viewModalState, setViewModalState] = useRecoilState(modalState)
  const { isAuthModalOpen, authModalView, isCreateCommunityModalOpen } =
    viewModalState
  const [user, loading, error] = useAuthState(auth)

  return (
    <div style={{ marginLeft: '10px', marginTop: '10px' }}>
      <Text fontSize={18} fontWeight={700} mb={6}>
        Home Page
      </Text>
      <h2>isAuthModalOpen: {isAuthModalOpen.toString()}</h2>
      <h2>authModalView: {authModalView}</h2>
      <br />
      <h2>
        isCreateCommunityModalOpen: {isCreateCommunityModalOpen.toString()}
      </h2>
      <br />
      <h2>firebase-user: {user?.email || 'no user'}</h2>
    </div>
  )
}
