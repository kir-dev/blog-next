import { Box, chakra, Flex, Image, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'

interface MemberProps {
  member: {
    fields: {
      slug: string
    }
    frontmatter: {
      pekUsername: string
      realName: string
      position: string
      interests: string
      joinDate: string
      featuredImage: ImageDataLike
      active: boolean
    }
  }
}

const MemberCard: React.FC<MemberProps> = ({ member }) => (
  <Flex p={50} w="full" alignItems="center" justifyContent="center">
    <Box w="xs" bg={useColorModeValue('white', 'gray.800')} shadow="lg" rounded="lg" overflow="hidden" mx="auto">
      <Image
        w="full"
        h={56}
        fit="cover"
        src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="avatar"
      />

      <Box py={5} textAlign="center">
        <Box display="block" fontSize="2xl" color={useColorModeValue('gray.800', 'white')} fontWeight="bold">
          <Link to="./">John Doe</Link>
        </Box>
        <chakra.span fontSize="sm" color={useColorModeValue('gray.700', 'gray.200')}>
          Software Engineer
        </chakra.span>
      </Box>
    </Box>
  </Flex>
)

export default MemberCard
