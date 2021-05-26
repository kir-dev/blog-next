import { HStack, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor: React.FC<BlogAuthorProps> = ({ date, name }) => {
  const pekUrl = 'https://pek.k8s.sch.bme.hu'

  return (
    <HStack marginTop={2} spacing={2} display="flex" alignItems="center">
      <Link href={`${pekUrl}/profiles/${name}/`}>
        <Image borderRadius="full" boxSize="2.25rem" src={`${pekUrl}/photos/${name}/`} fallbackSrc="../../favicon.png" />
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
