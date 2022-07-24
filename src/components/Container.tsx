import { Flex } from '@chakra-ui/react'
import { HasChildren } from '~utils/HasChildren'

type Props = {} & HasChildren

export const Container = ({ children }: Props) => (
  <Flex flexDirection="column" px="4" mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
    {children}
  </Flex>
)
