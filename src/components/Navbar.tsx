import { Box } from '@chakra-ui/core'
import { Link } from 'gatsby'
import * as React from 'react'

const Navbar: React.FC = () => (
  <Box bg="tomato" w="100%" p={4} color="white">
    <Link to="/">Home</Link>
    <Link to="/about">About us</Link>
    <Link to="/blog">Blog</Link>
    <Link to="/archive">Archívum</Link>
  </Box>
)

export default Navbar
