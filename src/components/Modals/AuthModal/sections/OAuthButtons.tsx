import { Flex, Button, Image, Text } from '@chakra-ui/react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'

const OAuthButtons = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  const handleGoogleClick = () => {
    signInWithGoogle()
  }

  return (
    <Flex direction="column" width="100%" mb={2}>
      <Button
        mb={2}
        variant="oauth"
        isLoading={loading}
        onClick={handleGoogleClick}
      >
        <Image
          alt="google logo"
          src="/images/googlelogo.png"
          height="21px"
          mr={2}
        />
        Continue with Google
      </Button>
      <Button mb={2} variant="oauth">
        <Image
          alt="GitHub logo"
          src="/images/github-mark.png"
          height="21px"
          mr={2}
        />
        Continue with GitHub
      </Button>
      {error && <Text>{error.message}</Text>}
      <Text
        color="gray.500"
        fontWeight={700}
        fontSize={12}
        textAlign="center"
        mt={2}
      >
        ---------- Or ----------
      </Text>
    </Flex>
  )
}

export default OAuthButtons
