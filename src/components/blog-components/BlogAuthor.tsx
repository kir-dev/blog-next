import { HStack, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor: React.FC<BlogAuthorProps> = ({ date, name }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image borderRadius="full" boxSize="40px" src={`https://pek.sch.bme.hu/photos/${name}/`} fallbackSrc="../../kirdev-simplified.png" />
      <Link fontWeight="medium" href={`https://pek.sch.bme.hu/profiles/${name}/`}>
        {name}
      </Link>
      <Text>—</Text>
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
