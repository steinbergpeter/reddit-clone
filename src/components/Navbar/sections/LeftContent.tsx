import { Flex, Image } from '@chakra-ui/react'

const LeftContent = () => {
  return (
    <Flex align="center">
      <Image
        src="/images/redditlogo_face.png"
        height="40px"
        width="40px"
        alt="reddit site logo"
        mr={2}
      />
      <Image
        src="/images/redditlogo_title.png"
        height="27px"
        alt="reddit site title"
        display={{ base: 'none', md: 'unset' }}
      />
    </Flex>
  )
}

export default LeftContent
