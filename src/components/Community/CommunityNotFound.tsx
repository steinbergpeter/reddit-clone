import { modalState } from '@/state/recoil/atoms/modalAtom'
import { Flex, Button, MenuItem, Icon, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { GrAdd } from 'react-icons/gr'
import { useRecoilState } from 'recoil'
import CreateCommunityModal from '../Modals/CreateCommunityModal'

const CommunityNotFound = () => {
  const [allModalsState, setAllModalsState] = useRecoilState(modalState)
  const { isCreateCommunityModalOpen } = allModalsState
  const handleOpen = () =>
    setAllModalsState((p) => ({ ...p, isCreateCommunityModalOpen: true }))
  const handleClose = () =>
    setAllModalsState((p) => ({ ...p, isCreateCommunityModalOpen: false }))

  return (
    <>
      <CreateCommunityModal
        isOpen={isCreateCommunityModalOpen}
        handleClose={handleClose}
      />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Box
          bg="#b2b1b1"
          height="100px"
          width="100px"
          borderRadius="50%"
          mb={8}
        ></Box>
        <Text fontSize={16} mb={2} fontWeight="semibold">
          Sorry, there aren’t any communities on Reddit with that name.{' '}
        </Text>
        <Text fontSize={14} mb={2}>
          This community may have been banned or the community name is
          incorrect.
        </Text>
        <Flex align="center" justify="space-between">
          <Link href="/">
            <Button onClick={handleOpen} mt={4} mr={4} variant="outline">
              Create Community
            </Button>
          </Link>
          <Link href="/">
            <Button variant="solid" mt={4}>
              GO HOME
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}
export default CommunityNotFound
