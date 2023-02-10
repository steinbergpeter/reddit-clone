import { Button, Flex } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import AuthModal from '@/components/Modals/AuthModal'
import AuthButtons from '../RightContent/sections/AuthButtons'
import { auth } from '@/firebase/clientApp'
import Icons from '../RightContent/sections/Icons'
import UserMenu from '../RightContent/sections/UserMenu'

type Props = { user?: User | null }

const RightContent = ({ user }: Props) => {
  return (
    <div
    // style={{ backgroundColor: 'pink' }}
    >
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </div>
  )
}

export default RightContent
