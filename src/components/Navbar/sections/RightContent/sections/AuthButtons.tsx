import { Button, Flex } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'

const AuthButtons = () => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const handleLogIn = () => setAuthModalState({ isOpen: true, view: 'login' })
  const handleSignUp = () => setAuthModalState({ isOpen: true, view: 'signup' })

  return (
    <Flex
      mr={2}
      display={{
        base: 'none',
        sm: 'flex',
      }}
    >
      <Button
        variant="outline"
        height="28px"
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
