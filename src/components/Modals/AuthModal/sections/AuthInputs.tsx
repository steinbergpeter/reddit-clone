import { Flex } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
import Login from './authInputs/Login'
import Signup from './authInputs/Signup'
import ResetPassword from './authInputs/ResetPassword'

const AuthInputs = () => {
  const { authModalView: view } = useRecoilValue(modalState)
  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {view === 'login' && <Login />}
      {view === 'signup' && <Signup />}
      {view === 'resetPassword' && <ResetPassword />}
    </Flex>
  )
}

export default AuthInputs
