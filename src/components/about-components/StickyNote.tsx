import { Box, theme } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import React from 'react'

const StickyNote: React.FC = ({ children }) => (
  <Box
    bgGradient="linear(to-br, yellow.100, orange.200)"
    shadow="base"
    p={2}
    pb={4}
    rounded="sm"
    color="gray.900"
    fontStyle="italic"
    fontSize="xs"
    pos="relative"
    _after={{
      content: `""`,
      width: '0',
      height: '0',
      borderLeft: '30px solid transparent',
      borderRight: '5px solid transparent',
      borderBottom: `10px solid ${theme.colors.orange[300]}`,
      position: 'absolute',
      bottom: '8px',
      right: '0',
      transform: 'rotate(330deg)',
      boxShadow: `0 13px 0 3px ${useColorModeValue(theme.colors.white, theme.colors.gray[800])}`
    }}
  >
    {children}
  </Box>
)

export default StickyNote
