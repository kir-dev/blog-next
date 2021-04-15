import { Box, Flex } from '@chakra-ui/react'
import * as React from 'react'
import Navbar from './Navbar'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Flex bg="tomato" w="100%" p={4} color="white" justifyContent="space-between">
    <Box p={4}>{title}</Box>
    <Navbar />
  </Flex>
)

export default Header
