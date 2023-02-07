import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

import LeftContent from './LeftContent'
import Directory from './Directory'
import SearchInput from './SearchInput'
import RightContent from './RightContent'

const Navbar: FC = () => {
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
        <RightContent />
      </Flex>
    </Flex>
  )
}

export default Navbar
