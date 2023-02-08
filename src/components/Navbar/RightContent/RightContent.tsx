import { FC } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import AuthModal from '@/components/Modals/AuthModal'
import AuthButtons from './AuthButtons'
import { auth } from '@/firebase/clientApp'

type Props = {
  user: User | null | undefined
}

const RightContent: FC<Props> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button onClick={() => signOut(auth)}>Logout</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  )
}

export default RightContent
