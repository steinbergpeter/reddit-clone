import CreateCommunityModal from '@/components/Modals/CreateCommunityModal'
import { Flex, Icon, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'
import { GrAdd } from 'react-icons/gr'

const Communities = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <CreateCommunityModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
