import { Box, Heading, Link } from '@chakra-ui/react'
import React from 'react'

interface ParagraphProps {
  id?: string
  title: string | undefined
  titleSize: string | undefined
}

const AboutParagraph: React.FC<ParagraphProps> = ({ id, title, titleSize, children }) => {
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

export default AboutParagraph
