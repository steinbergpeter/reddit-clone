import { Flex } from '@chakra-ui/react'
import { ReactNode, FC } from 'react'
import Navbar from '../Navbar'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Flex justify="center" bg="white">
        <Navbar />
      </Flex>
      <main>{children}</main>
    </>
  )
}

export default Layout
