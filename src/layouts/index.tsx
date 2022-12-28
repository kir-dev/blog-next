import { Box, Flex } from '@chakra-ui/react'
import { Footer } from 'components/footer/Footer'
import { Navbar } from 'components/navbar/Navbar'
import React from 'react'

type Props = {
  background?: string
}

export const IndexLayout: React.FC<React.PropsWithChildren<Props>> = ({ background, children }) => (
  <Flex direction="column" minHeight="100vh">
    <Navbar />
    <Box background={background} flex={1} pb={20}>
      {children}
    </Box>
    <Footer />
  </Flex>
)
