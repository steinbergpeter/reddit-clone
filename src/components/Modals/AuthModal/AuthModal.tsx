import { FC, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { authModalState, ModalView } from '@/atoms/authModalAtom'
import AuthInputs from './AuthInputs'
import OAuthButtons from './OAuthButtons'
import ResetPassword from '../AuthModal/ResetPassword'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'

const AuthModal: FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth)
  const { isOpen, view } = modalState
  const handleClose = () => setModalState(p => ({ ...p, isOpen: false }))

  useEffect(() => {
    if (user) handleClose()
    console.log('user: ', user?.email)
  }, [user])

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center">
            {view === 'login' && 'Log In'}
            {view === 'signup' && 'Sign Up'}
            {view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {view !== 'resetPassword' && <OAuthButtons />}
              <AuthInputs />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal
