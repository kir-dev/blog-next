import { Box, Heading, Link } from '@chakra-ui/react'
import React from 'react'

type Props = {
  id?: string
  title?: string
  titleSize?: string
}

export const AboutParagraph: React.FC<React.PropsWithChildren<Props>> = ({ id, title, titleSize, children }) => {
  return (
    <Box mt={10} mb={2}>
      <Link id={id} href="." />
      <Heading lineHeight="none" fontSize={titleSize}>
        {title}
      </Heading>
      {children}
    </Box>
  )
}
