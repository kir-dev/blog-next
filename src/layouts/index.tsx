import { Box, Flex } from '@chakra-ui/react'
import * as React from 'react'
import Footer from '~components/footer/Footer'
import Navbar from '~components/navbar/Navbar'

type IndexLayoutProps = {
  background?: string
}

const IndexLayout: React.FC<IndexLayoutProps> = ({ background, children }) => (
  <>
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box background={background} flex={1} pb={20}>
        {children}
      </Box>
      <Footer />
    </Flex>
  </>
)

export default IndexLayout
