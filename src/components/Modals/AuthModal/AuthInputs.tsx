import { authModalState } from '@/atoms/authModalAtom'
import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import Login from './Login'
import Signup from './Signup'

const AuthInputs: FC = () => {
  const { view } = useRecoilValue(authModalState)
  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {view === 'login' && <Login />}
      {view === 'signup' && <Signup />}
      {/* {view === 'resetPassword' && <ResetPassword />} */}
    </Flex>
  )
}

export default AuthInputs
