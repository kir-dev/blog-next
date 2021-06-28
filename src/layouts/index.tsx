import { Box, Flex } from '@chakra-ui/react'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
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
      <Box flex="1">{children}</Box>
      <Footer />
    </Flex>
  </>
)

export default IndexLayout
