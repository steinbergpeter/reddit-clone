import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'

const AuthButtons: FC = () => {
  const handleLogIn = () => {}
  const handleSignUp = () => {}

  return (
    <Flex>
      <Button
        variant="outline"
        height="28px"
        display={{
          base: 'none',
          sm: 'flex',
        }}
        width={{
          base: '70px',
          md: '110px',
        }}
        mr={2}
        onClick={handleLogIn}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{
          base: 'none',
          sm: 'flex',
        }}
        width={{
          base: '70px',
          md: '110px',
        }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </Flex>
  )
}

export default AuthButtons
