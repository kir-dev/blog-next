import { Box, Flex, Heading, Image, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  imgSrc?: string
  img?: JSX.Element
  title: string
}

export const InfoBox: React.FC<React.PropsWithChildren<Props>> = ({ imgSrc, img, title, children }) => (
  <Box py={2}>
    {imgSrc ? (
      <Image float={{ base: 'right', md: 'none' }} pl={{ base: 3, md: 0 }} maxWidth={{ base: '40%', md: '100%' }} src={imgSrc} />
    ) : (
      <Flex
        maxWidth={useBreakpointValue({ base: '40%', sm: '25%', md: '100%' })}
        display={useBreakpointValue({ base: 'block', md: 'flex' })}
        justifyContent="center"
        float={{ base: 'right', md: 'none' }}
        pl={{ base: 3, md: 0 }}
      >
        {img}
      </Flex>
    )}
    <Heading textAlign="center" as="h4" size={useBreakpointValue({ base: 'md', lg: 'lg' })} minH="4rem" py={3}>
      {title}
    </Heading>
    {children}
  </Box>
)
