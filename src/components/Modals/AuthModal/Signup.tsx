import { Input, Button, Flex, Text } from '@chakra-ui/react'
import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { authModalState, AuthModalState } from '@/atoms/authModalAtom'
import { useSetRecoilState } from 'recoil'
import { auth } from '@/firebase/clientApp'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

const Signup: FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState)

  const signupFormDefault = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [signupForm, setSignupForm] = useState(signupFormDefault)

  const [error, setError] = useState('')

  const { email, password, confirmPassword } = signupForm

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    userError,
  ] = useCreateUserWithEmailAndPassword(auth)

  //Firebase logic
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (error) setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    createUserWithEmailAndPassword(email, password)
    setSignupForm(signupFormDefault)
    setAuthModalState(prev => ({ ...prev, isOpen: false }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const switchToLogin = () => {
    setAuthModalState(p => ({ ...p, view: 'login' }))
  }

  return (
    <form onSubmit={submitForm}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        value={email}
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
        value={password}
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
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        mb={2}
        value={confirmPassword}
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
      {error && (
        <Text textAlign="center" color="red">
          {error}
        </Text>
      )}
      <Button
        width="100%"
        height="36px"
        my={2}
        type="submit"
        isLoading={loading}
      >
        Submit
      </Button>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={switchToLogin}
          mb={2}
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  )
}

export default Signup
