import { Stack, Checkbox, Flex, Icon, Text, Box } from '@chakra-ui/react'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'

type Props = {
  communityType: string
  setCommunityType: Dispatch<SetStateAction<string>>
}

const CommunityType = ({ communityType, setCommunityType }: Props) => {
  function handleTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setCommunityType(e.target.name)
  }

  return (
    <Box my={4}>
      <Text fontWeight={600} fontSize={15} mb={2}>
        Community Type
      </Text>
      <Stack spacing={2}>
        <Checkbox
          name="public"
          onChange={handleTypeChange}
          isChecked={communityType === 'public'}
        >
          <Flex align="center">
            <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
            <Text fontSize="10pt" mr={3}>
              Public
            </Text>
            <Text fontSize="8pt" color="gray.500">
              Anyone can view, post, and comment on, this community.
            </Text>
          </Flex>
        </Checkbox>
        <Checkbox
          name="restricted"
          onChange={handleTypeChange}
          isChecked={communityType === 'restricted'}
        >
          <Flex align="center">
            <Icon as={BsFillEyeFill} mr={2} color="gray.500" />

            <Text fontSize="10pt" mr={3}>
              Restricted
            </Text>
            <Text fontSize="8pt" color="gray.500" pt={1}>
              Anyone can view this community, but only approved users can post.
            </Text>
          </Flex>
        </Checkbox>
        <Checkbox
          name="private"
          onChange={handleTypeChange}
          isChecked={communityType === 'private'}
        >
          <Flex align="center">
            <Icon as={HiLockClosed} mr={2} color="gray.500" />

            <Text fontSize="10pt" mr={3}>
              Private
            </Text>
            <Text fontSize="8pt" color="gray.500" pt={1}>
              Only approved users can view and submit to this community.{' '}
            </Text>
          </Flex>
        </Checkbox>
      </Stack>
    </Box>
  )
}

export default CommunityType
