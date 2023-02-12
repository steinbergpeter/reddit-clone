import { auth, firestore } from '@/firebase/clientApp'
import { Button, ModalFooter } from '@chakra-ui/react'
import { doc, runTransaction, serverTimestamp } from '@firebase/firestore'
import { Dispatch, SetStateAction, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
  handleClose: () => void
  setError: Dispatch<SetStateAction<string>>
  communityName: string
  communityType: string
}

const Footer = (props: Props) => {
  const { handleClose, setError, communityName, communityType } = props
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false)

  //create community as transaction along with creating user snippet
  async function handleCreateCommunity() {
    setError('')
    setIsLoading(true)
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/
    try {
      //Make sure proposed name is valid
      if (format.test(communityName) || communityName.length < 3) {
        throw new Error(
          'Community Names must be between 3-21 Characters and can only contain letters, numbers, and underscores.'
        )
      }
      //look up reference for list of communities
      await runTransaction(firestore, async transaction => {
        const communityDocRef = doc(firestore, 'communities', communityName)
        const communityDoc = await transaction.get(communityDocRef)
        //verify same name community doesn't already exist
        if (communityDoc.exists()) {
          throw new Error(
            `Sorry, r/${communityName} is already taken. Try another name.`
          )
        }
        //include addition of community to the transaction
        const communityBase = {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        }
        transaction.set(communityDocRef, communityBase)
        //include addition of user/snippet in the transaction
        const path = doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityName
        )
        const snippet = {
          communityId: communityName,
          isModerator: true,
        }
        transaction.set(path, snippet)
      })
      handleClose()
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
    <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
      <Button variant="outline" height="30px" mr={3} onClick={handleClose}>
        Cancel
      </Button>
      <Button
        height="30px"
        onClick={handleCreateCommunity}
        isLoading={isLoading}
      >
        Create Community
      </Button>
    </ModalFooter>
  )
}

export default Footer
