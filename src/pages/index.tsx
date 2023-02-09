import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { authModalState } from '@/atoms/authModalAtom'
import { useRecoilState } from 'recoil'
import { auth } from '@/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth)

  return (
    <div style={{ marginLeft: '10px', marginTop: '10px' }}>
      <h2>isOpen: {modalState.isOpen.toString()}</h2>
      <h2>view: {modalState.view}</h2>
      <h2>user: {user?.displayName || 'no user'}</h2>
    </div>
  )
}
