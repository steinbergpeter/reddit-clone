import { Input, Button, Flex, Text } from '@chakra-ui/react'
import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { authModalState, AuthModalState } from '@/atoms/authModalAtom'
import { useSetRecoilState } from 'recoil'

const Login: FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState)

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }
  //Firebase logic
  const submitForm = (e: FormEvent) => {
    e.preventDefault()
  }

  const switchToSignup = () => {
    setAuthModalState(p => ({ ...p, view: 'signup' }))
  }

  return (
    <form onSubmit={submitForm}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        value={loginForm.email}
        onChange={handleChange}
        fontSize="10pt"
        bg="gray.50"
        _placeholder={{
          color: 'gray.500',
        }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        value={loginForm.password}
        onChange={handleChange}
        fontSize="10pt"
        bg="gray.50"
        _placeholder={{
          color: 'gray.500',
        }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
      />
      <Button width="100%" height="36px" my={2} type="submit">
        Submit
      </Button>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>New Here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={switchToSignup}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  )
}

export default Login
