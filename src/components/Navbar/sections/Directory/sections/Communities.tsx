import CreateCommunityModal from '@/components/Modals/CreateCommunityModal'
import { Flex, Icon, MenuItem } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'
import { modalState } from '@/atoms/modalAtom'
import { useRecoilState } from 'recoil'

const Communities = () => {
  const [allModalsState, setAllModalsState] = useRecoilState(modalState)
  const { isCreateCommunityModalOpen } = allModalsState

  const handleOpen = () =>
    setAllModalsState(p => ({ ...p, isCreateCommunityModalOpen: true }))
  const handleClose = () =>
    setAllModalsState(p => ({ ...p, isCreateCommunityModalOpen: false }))

  return (
    <>
      <CreateCommunityModal
        isOpen={isCreateCommunityModalOpen}
        handleClose={handleClose}
      />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: 'gray.100' }}
        onClick={handleOpen}
      >
        <Flex align="center">
          <Icon fontSize={20} as={GrAdd} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  )
}

export default Communities
