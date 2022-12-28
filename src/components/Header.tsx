import { Box } from '@chakra-ui/react'

type Props = {}

export const Header: React.FC<React.PropsWithChildren<Props>> = ({ children }) => <Box py={12}>{children}</Box>
