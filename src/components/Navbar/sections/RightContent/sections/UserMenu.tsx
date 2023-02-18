import { modalState } from '@/state/recoil/atoms/modalAtom'
import { auth } from '@/firebase/clientApp'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import { CgProfile } from 'react-icons/cg'
import { FaRedditSquare } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'
import { MdOutlineLogin } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { communityState } from '@/state/recoil/atoms/communitiesAtom'

type Props = { user?: User | null }

const UserMenu = ({ user }: Props) => {
  const resetCommunityState = useResetRecoilState(communityState)
  const setAuthModalState = useSetRecoilState(modalState)

  const goToLogin = () => {
    setAuthModalState((p) => ({
      ...p,
      isAuthModalOpen: true,
      authModalView: 'login',
    }))
  }

  const handleSignOut = async () => {
    await signOut(auth)
    // clear community state
    resetCommunityState()
  }

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0 6px"
        borderRadius={4}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />

                <Flex
                  direction="column"
                  display={{ base: 'none', lg: 'flex' }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={6}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split('@')[0]}
                  </Text>
                  <Flex align="center">
                    <Icon as={IoSparkles} color="brand.100" />
                    <Text color="gray.400" width={16}>
                      1 karma
                    </Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} mr={1} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10px"
              fontWeight={700}
              _hover={{ bg: 'blue.500', color: 'white' }}
            >
              <Flex align="center">
                <Icon as={CgProfile} mr={2} fontSize={20} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10px"
              fontWeight={700}
              _hover={{ bg: 'blue.500', color: 'white' }}
              onClick={handleSignOut}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} mr={2} fontSize={20} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={goToLogin}
              fontSize="10px"
              fontWeight={700}
              _hover={{ bg: 'blue.500', color: 'white' }}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} mr={2} fontSize={20} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  )
}

export default UserMenu
