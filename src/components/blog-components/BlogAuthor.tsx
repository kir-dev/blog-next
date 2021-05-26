import { HStack, Image, Text } from '@chakra-ui/react'
import { Link } from 'gatsby'
import React from 'react'
import { PEK_URL } from '../../utils/constants'

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor: React.FC<BlogAuthorProps> = ({ date, name }) => {
  const pekUrl = PEK_URL

  return (
    <HStack marginTop={2} spacing={2} display="flex" alignItems="center">
      <Link to={`${pekUrl}/profiles/${name}/`}>
        <Image borderRadius="full" boxSize="2.25rem" src={`${pekUrl}/photos/${name}/`} fallbackSrc="../../favicon.png" />
      </Link>
      <Text fontWeight="medium" fontSize="md" as={Link} to={`${pekUrl}/profiles/${name}/`}>
        {name}
      </Text>
      <Text>·</Text>
      <Text>
        {date.toLocaleTimeString('hu-HU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </Text>
    </HStack>
  )
}

export default BlogAuthor
