import { Flex, Image } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  // user:
}
const LeftContent: FC<Props> = () => {
  return (
    <Flex align="center">
      <Image
        src="/images/redditlogo_face.png"
        height="40px"
        alt="reddit logo face"
        mr={2}
      />
      <Image
        src="/images/redditlogo_title.png"
        height="27px"
        alt="reddit logo title"
        display={{ base: 'none', md: 'unset' }}
      />
    </Flex>
  )
}

export default LeftContent
