import { Flex } from '@chakra-ui/core'
import * as React from 'react'

const Container: React.FC = ({ children }) => (
  <Flex flexDirection="column" px={[4, 4, 0]} mx="auto" maxWidth={['100%', '640px', '640px', '1024px']}>
    {children}
  </Flex>
)

export default Container
