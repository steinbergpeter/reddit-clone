import { authModalState } from '@/atoms/authModalAtom'
import { auth } from '@/firebase/clientApp'
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import AuthInputs from './sections/AuthInputs'
import OAuthButtons from './sections/OAuthButtons'

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, _loading, _error] = useAuthState(auth)
  const { isOpen, view } = modalState
  const handleClose = () => setModalState(p => ({ ...p, isOpen: false }))

  useEffect(() => {
    if (user) handleClose()
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
