import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

import CommunityName from './sections/CommunityName'
import CommunityType from './sections/CommunityType'
import Footer from './sections/Footer'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

const CreateCommunityModal = ({ isOpen, handleClose }: Props) => {
  const [communityName, setCommunityName] = useState('')
  const [charsRemaining, setCharsRemaining] = useState(21)
  const [communityType, setCommunityType] = useState('public')
  const [error, setError] = useState('')

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Create a community
        </ModalHeader>
        <Box pl={3} pr={3}>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0">
            <CommunityName
              communityName={communityName}
              setCommunityName={setCommunityName}
              charsRemaining={charsRemaining}
              setCharsRemaining={setCharsRemaining}
            />
            <Text fontSize="9pt" color="red" pt={1}>
              {error}
            </Text>
            <CommunityType
              communityType={communityType}
              setCommunityType={setCommunityType}
            />
          </ModalBody>
        </Box>
        <Footer
          handleClose={handleClose}
          setError={setError}
          communityName={communityName}
          communityType={communityType}
        />
      </ModalContent>
    </Modal>
  )
}

export default CreateCommunityModal
