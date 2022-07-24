import { Box, Flex } from '@chakra-ui/react'

import { Footer } from '~components/footer/Footer'
import { Navbar } from '~components/navbar/Navbar'
import { HasChildren } from '~utils/HasChildren'

type Props = {
  background?: string
} & HasChildren

export const IndexLayout = ({ background, children }: Props) => (
  <Flex direction="column" minHeight="100vh">
    <Navbar />
    <Box background={background} flex={1} pb={20}>
      {children}
    </Box>
    <Footer />
  </Flex>
)
