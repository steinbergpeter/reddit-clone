import { Input, Box, Text } from '@chakra-ui/react'
import { ChangeEvent, SetStateAction, Dispatch } from 'react'

type Props = {
  communityName: string
  setCommunityName: Dispatch<SetStateAction<string>>
  charsRemaining: number
  setCharsRemaining: Dispatch<SetStateAction<number>>
}

const CommunityName = (props: Props) => {
  const {
    communityName,
    setCommunityName,
    charsRemaining,
    setCharsRemaining,
  } = props

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (value.length > 21) return
    setCommunityName(value)
    setCharsRemaining(21 - value.length)
  }

  return (
    <Box>
      <Text fontWeight={600} fontSize={15}>
        Name
      </Text>
      <Text color="gray.500" fontSize={11}>
        Community names including capitalization cannot be changed
      </Text>
      <Text
        position="relative"
        top="28px"
        left="10px"
        width="20px"
        color="gray.500"
      >
        r/
      </Text>
      <Input
        position="relative"
        value={communityName}
        onChange={handleNameChange}
        size="sm"
        pl="22px"
      />
      <Text fontSize="9pt" color={charsRemaining > 0 ? 'gray.500' : 'red'}>
        {charsRemaining} Characters remaining
      </Text>
    </Box>
  )
}

export default CommunityName
