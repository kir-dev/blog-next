import { Box, Heading, Img, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'

interface InfoBoxProps {
  imgSrc: string
  title: string
}

const InfoBox: React.FC<InfoBoxProps> = ({ imgSrc, title, children }) => (
  <Box>
    <Img
      float={{ base: 'right', md: 'none' }}
      pl={{ base: 3, md: 0 }}
      maxWidth={useBreakpointValue({ base: '40%', md: '100%' })}
      src={imgSrc}
    />
    <Heading textAlign="center" as="h4" size={useBreakpointValue({ base: 'md', lg: 'lg' })} minH="4rem" py={3}>
      {title}
    </Heading>
    {children}
  </Box>
)

export default InfoBox
