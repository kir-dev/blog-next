import { IconButton } from '@chakra-ui/react'

type Props = {
  label: string
  href: string
  size: string | number
}

export const SocialButton: React.FC<React.PropsWithChildren<Props>> = ({ children, label, href, size }) => {
  return (
    <IconButton
      rounded="full"
      w={size}
      h={size}
      display="inline-flex"
      title={label}
      aria-label={`Látogasd meg oldalunk itt: ${label}`}
      onClick={() => window.open(href, '_blank')}
    >
      {children}
    </IconButton>
  )
}
