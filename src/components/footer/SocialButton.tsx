import { Button, Link } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { HasChildren } from '~utils/HasChildren'

type Props = {
  label: string
  href: string
  size: string | number
} & HasChildren

export const SocialButton = ({ children, label, href, size }: Props) => {
  return (
    <Link isExternal href={href} rounded="full">
      <Button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded="full"
        p={0}
        w={size}
        h={size}
        cursor="pointer"
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
    </Link>
  )
}
