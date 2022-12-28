import { Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {}

export const BlogContainer: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
  <Flex flexDirection="column" px="4" mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
    {children}
  </Flex>
)
