import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, useColorMode } from '@chakra-ui/react'
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
      <IconButton
        aria-label="Switch color mode"
        px={4}
        h="min"
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="unstyled"
      />
    </Flex>
  )
}

export default Navbar
