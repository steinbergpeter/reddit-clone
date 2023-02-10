import { useState, ChangeEvent, FormEvent } from 'react'
import { Input, Button, Flex, Text } from '@chakra-ui/react'
import { modalState } from '@/atoms/modalAtom'
import { useSetRecoilState } from 'recoil'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/firebaseErrors'

const Signup = () => {
  const setAuthModalState = useSetRecoilState(modalState)
  const signupFormDefault = {
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [signupForm, setSignupForm] = useState(signupFormDefault)
  const { email, password, confirmPassword } = signupForm

  const [error, setError] = useState('')
  const isSubmitActive =
    email === '' || password === '' || confirmPassword === ''
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
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }
  const switchToLogin = () => {
    setAuthModalState(p => ({ ...p, authModalView: 'login' }))
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

      <Text textAlign="center" color="red" fontSize="10pt">
        {error && error}
        {userError &&
          FIREBASE_ERRORS[userError.code as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        width="100%"
        height="36px"
        my={2}
        type="submit"
        isLoading={loading}
        isActive={isSubmitActive}
      >
        Sign Up
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
