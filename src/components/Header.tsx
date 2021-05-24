/* eslint-disable react/jsx-props-no-spreading */
import { Box, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

const Header: React.FC = ({ children }) => (
  <Box bgGradient={`linear(to-tl, transparent, 90%, ${useColorModeValue('orange.100', 'blue.900')})`} py={14}>
    {children}
  </Box>
)

export default Header
