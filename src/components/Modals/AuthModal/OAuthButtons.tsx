import { Flex, Button, Image } from '@chakra-ui/react'
import { FC } from 'react'

const OAuthButtons: FC = () => {
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button mb={2} variant="oauth">
        <Image src="/images/googlelogo.png" height="21px" mr={2} />
        Continue with Google
      </Button>
      <Button mb={2} variant="oauth">
        <Image src="/images/github-mark.png" height="21px" mr={2} />
        Continue with GitHub
      </Button>
    </Flex>
  )
}

export default OAuthButtons
