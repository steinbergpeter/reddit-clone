import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from '../Community/Header'
import { Community } from '@/state/recoil/atoms/communitiesAtom'

interface Props {
  communityData: Community
  children: ReactNode
}

const PageContent = ({ communityData, children }: Props) => {
  return (
    <>
      <Header communityData={communityData} />
      <Flex justify="center" bg="pink.300" p="16px 0">
        <Flex width="95%" maxWidth="860px" justify="center" bg="blue.200">
          <Flex
            direction="column"
            width={{ base: '100%', md: '65%' }}
            mr={{ base: 0, md: 6 }}
            bg="green.300"
          >
            {children && children[0 as keyof typeof children]}
          </Flex>
          <Flex
            bg="purple.300"
            direction="column"
            width="30%"
            display={{ base: 'none', md: 'flex' }}
            flexGrow={1}
          >
            {children && children[1 as keyof typeof children]}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default PageContent
