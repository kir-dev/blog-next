import { Button, Link } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import React from 'react'

interface SocialButtonProps {
  label: string
  href: string
  size: string | number
}

const SocialButton: React.FC<SocialButtonProps> = ({ children, label, href, size }) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded="full"
      p={0}
      w={size}
      h={size}
      cursor="pointer"
      as={Link}
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: 'orange.500'
      }}
      title={label}
    >
      {children}
    </Button>
  )
}

export default SocialButton
