import { IconButton } from '@chakra-ui/react'
import { HasChildren } from '~utils/HasChildren'

type Props = {
  label: string
  href: string
  size: string | number
} & HasChildren

export const SocialButton = ({ children, label, href, size }: Props) => {
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
