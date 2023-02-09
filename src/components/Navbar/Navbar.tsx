import { Flex } from '@chakra-ui/react'

import LeftContent from './sections/LeftContent'
import Directory from './sections/Directory'
import SearchInput from './sections/SearchInput'
import RightContent from './sections/RightContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth)

  return (
    <Flex bg="white" align="center" justify="center">
      <Flex
        bg="white"
        height="60px"
        padding="6px 12px"
        alignItems="center"
        gap={4}
        maxWidth="1100px"
        flexGrow={1}
      >
        <LeftContent />
        <Directory />
        <SearchInput />
        <RightContent user={user} />
      </Flex>
    </Flex>
  )
}

export default Navbar
