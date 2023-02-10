import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  Input,
} from '@chakra-ui/react'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateCommunityModal = ({ isOpen, setIsOpen }: Props) => {
  const [communityName, setCommunityName] = useState('')
  const [charsRemaining, setCharsRemaining] = useState(21)

  const handleClose = () => {
    setCommunityName('')
    setCharsRemaining(21)
    setIsOpen(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 21) return
    setCommunityName(value)
    setCharsRemaining(21 - value.length)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
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
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color="gray.500" fontSize={11}>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.500"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                onChange={handleChange}
                size="sm"
                pl="22px"
              />
              <Text
                fontSize="9pt"
                color={charsRemaining > 0 ? 'gray.500' : 'red'}
              >
                {charsRemaining} Characters remaining
              </Text>
            </ModalBody>
          </Box>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost">Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateCommunityModal
