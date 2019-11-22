import { Box } from '@chakra-ui/core'
import * as React from 'react'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Box bg="tomato" w="100%" p={4} color="white">
    {title}
  </Box>
)

export default Header
