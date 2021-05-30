import { Box, HStack, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'gatsby'
import React from 'react'
import { PEK_URL } from '../../utils/constants'

interface BlogAuthorProps {
  date: Date
  name: string
  hasLongDate?: boolean
}

const BlogAuthor: React.FC<BlogAuthorProps> = ({ date, name, hasLongDate }) => (
  <HStack marginTop={2} spacing={2} display="flex" alignItems="center">
    <Link to={`${PEK_URL}/profiles/${name}/`}>
      <Image borderRadius="full" boxSize="2.25rem" src={`${PEK_URL}/photos/${name}/`} fallbackSrc="../../favicon.png" />
    </Link>

    {hasLongDate ? (
      <HStack>
        <Text as={Link} fontWeight="medium" fontSize="md" to={`${PEK_URL}/profiles/${name}/`}>
          {name}
        </Text>
        <Text>—</Text>
        <Text fontWeight="light" fontSize="md" fontStyle="italic" textColor={useColorModeValue('gray.600', 'gray.400')}>
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
    ) : (
      <Box>
        <Text as={Link} fontWeight="medium" fontSize="md" to={`${PEK_URL}/profiles/${name}/`}>
          {name}
        </Text>
        <Text fontWeight="light" fontSize="sm" fontStyle="italic" textColor={useColorModeValue('gray.600', 'gray.400')}>
          {date.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })}
        </Text>
      </Box>
    )}
  </HStack>
)

export default BlogAuthor
