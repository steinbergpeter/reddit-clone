import { Flex, Button, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'

const OAuthButtons: FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  const handleGoogleClick = () => {
    signInWithGoogle()
  }

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        mb={2}
        variant="oauth"
        isLoading={loading}
        onClick={handleGoogleClick}
      >
        <Image src="/images/googlelogo.png" height="21px" mr={2} />
        Continue with Google
      </Button>
      <Button mb={2} variant="oauth">
        <Image src="/images/github-mark.png" height="21px" mr={2} />
        Continue with GitHub
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  )
}

export default OAuthButtons
