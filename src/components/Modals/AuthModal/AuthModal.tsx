import { modalState } from '@/atoms/modalAtom'
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
  const [authModalState, setAuthModalState] = useRecoilState(modalState)
  const [user, _loading, _error] = useAuthState(auth)
  const { isAuthModalOpen: isOpen, authModalView: view } = authModalState
  const handleClose = () =>
    setAuthModalState(p => ({ ...p, isAuthModalOpen: false }))

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
