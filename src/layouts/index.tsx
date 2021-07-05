import { Box, Flex } from '@chakra-ui/react'
import 'modern-normalize'
import * as React from 'react'
import Footer from '~components/footer/Footer'
import Navbar from '~components/navbar/Navbar'
import SEO from './SEO'

interface IndexLayoutProps {
  background?: string
}

const IndexLayout: React.FC<IndexLayoutProps> = ({ children, background }) => (
  <>
    <SEO />
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
