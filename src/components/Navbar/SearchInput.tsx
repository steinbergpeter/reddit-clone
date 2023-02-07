import { SearchIcon } from '@chakra-ui/icons'
import {
  background,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  // user:
}

const SearchInput: FC<Props> = () => {
  return (
    <Flex flexGrow={1} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          fontSize="10pt"
          placeholder="Search Reddit"
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
        />
      </InputGroup>
    </Flex>
  )
}

export default SearchInput
