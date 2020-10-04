import { Box, Flex, Icon, useColorMode } from '@chakra-ui/core'
import { Link } from 'gatsby'
import * as React from 'react'

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex bg="tomato" p={4} color="white">
      <Link to="/">
        <Box px={4}>Home</Box>
      </Link>
      <Link to="/about">
        <Box px={4}>About us</Box>
      </Link>
      <Link to="/blog">
        <Box px={4}>Blog</Box>
      </Link>
      <Link to="/archive">
        <Box px={4}>Archívum</Box>
      </Link>
      {colorMode === 'dark' && <Icon mx={4} size="24px" cursor="pointer" name="sun" onClick={toggleColorMode} />}
      {colorMode === 'light' && <Icon mx={4} size="24px" cursor="pointer" name="moon" onClick={toggleColorMode} />}
    </Flex>
  )
}

export default Navbar
