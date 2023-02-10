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
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: 'space-between' }}
      align="center"
      gap={4}
      maxWidth="1000px"
      flexGrow={1}
    >
      <LeftContent />
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  )
}

export default Navbar
