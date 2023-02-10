import { Flex, Image } from '@chakra-ui/react'

const LeftContent = () => {
  return (
    <Flex
      align="center"
      width={{ base: '40px', md: 'auto' }}
      mr={{ base: 0, md: 2 }}
    >
      <Image
        src="/images/redditlogo_face.png"
        boxSize={9}
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
