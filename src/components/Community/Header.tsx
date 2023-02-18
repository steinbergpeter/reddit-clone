import useCommunityData from '@/hooks/useCommunityData'
import { Community } from '@/state/recoil/atoms/communitiesAtom'
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'

interface Props {
  communityData: Community
}

const Header = ({ communityData }: Props) => {
  const { communityStateValue, onJoinOrLeaveCommunity, isLoading } =
    useCommunityData()

  const isJoined = !!communityStateValue.currentUsersSnippets.find((item) => {
    return item.communityId === communityData.id
  })

  const handleClick = () => onJoinOrLeaveCommunity(communityData, isJoined)

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {!communityData ? (
            <Image alt="reddit logo" />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              fill="blue.500"
              border="4px solid white"
              borderRadius="50%"
              outline="white 2px solid"
              outlineOffset="-5px"
              position="relative"
              top={-3}
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              height="30px"
              px={6}
              variant={isJoined ? 'outline' : 'solid'}
              isLoading={isLoading}
              onClick={handleClick}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
