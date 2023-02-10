import { auth, firestore } from '@/firebase/clientApp'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { doc, getDoc, serverTimestamp, setDoc } from '@firebase/firestore'
import { ChangeEvent, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

const CreateCommunityModal = ({ isOpen, handleClose }: Props) => {
  const [user] = useAuthState(auth)
  const [communityName, setCommunityName] = useState('')
  const [charsRemaining, setCharsRemaining] = useState(21)
  const [communityType, setCommunityType] = useState('public')
  const [error, setError] = useState('')
  const handleCloseAndClear = () => {
    setCommunityName('')
    setCharsRemaining(21)
    handleClose()
  }
  const [isLoading, setIsLoading] = useState(false)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 21) return
    setCommunityName(value)
    setCharsRemaining(21 - value.length)
  }

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name)
  }

  const handleCreateCommunity = async () => {
    setIsLoading(true)
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/
    try {
      if (format.test(communityName) || communityName.length < 3) {
        throw new Error(
          'Community Names must be between 3-21 Characters and can only contain letters, numbers, and underscores.'
        )
      }
      const communityDocRef = doc(firestore, 'communities', communityName)
      const communityDoc = await getDoc(communityDocRef)
      if (communityDoc.exists()) {
        throw new Error(
          `Sorry, r/${communityName} is already taken. Try another.`
        )
      }
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      })
    } catch (err) {
      console.log('Error in handleCreateCommunity: ', err)
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseAndClear} size="lg">
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
                onChange={handleNameChange}
                size="sm"
                pl="22px"
              />
              <Text
                fontSize="9pt"
                color={charsRemaining > 0 ? 'gray.500' : 'red'}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box my={4}>
                <Text fontWeight={600} fontSize={15} mb={2}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    onChange={handleTypeChange}
                    isChecked={communityType === 'public'}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                      <Text fontSize="10pt" mr={3}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500">
                        Anyone can view, post, and comment on, this community.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    onChange={handleTypeChange}
                    isChecked={communityType === 'restricted'}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} mr={2} color="gray.500" />

                      <Text fontSize="10pt" mr={3}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users
                        can post.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    onChange={handleTypeChange}
                    isChecked={communityType === 'private'}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} mr={2} color="gray.500" />

                      <Text fontSize="10pt" mr={3}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit to this
                        community.{' '}
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button height="30px" onClick={handleCreateCommunity}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateCommunityModal
