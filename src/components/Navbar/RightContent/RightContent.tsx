import { FC } from 'react'
import { Flex } from '@chakra-ui/react'

import AuthModal from '@/components/Modals/AuthModal'
import AuthButtons from './AuthButtons'

type Props = {
  // user:
}

const RightContent: FC<Props> = () => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  )
}

export default RightContent
