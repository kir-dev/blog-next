import { Box } from '@chakra-ui/react'
import { HasChildren } from '~utils/HasChildren'

type Props = {} & HasChildren

export const Header = ({ children }: Props) => <Box py={12}>{children}</Box>
