import { Box, Heading, Link } from '@chakra-ui/react'
import { HasChildren } from '~utils/HasChildren'

type Props = {
  id?: string
  title?: string
  titleSize?: string
} & HasChildren

export const AboutParagraph = ({ id, title, titleSize, children }: Props) => {
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
