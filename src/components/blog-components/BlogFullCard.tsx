import { Box, Flex, Heading, HStack, Image, Tag, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { FaClock } from 'react-icons/fa'
import { readTimeInMinutes } from '~utils/commonFunctions'
import BlogAuthor from './BlogAuthor'
import { BlogPreviewProps } from './BlogPreviewCard'

const BlogFullCard: React.FC<BlogPreviewProps> = ({ post }) => {
  const featuredImage = getImage(post.frontmatter.featuredImage)

  return (
    <Flex mt={2} direction={{ base: 'column', sm: 'row' }} justifyContent="space-between">
      <Flex flex={1} position="relative" mr={{ base: 0, md: 2 }} pb={2}>
        <Box w="80%" zIndex={2}>
          <Link to={post.fields.slug}>
            {featuredImage ? (
              <GatsbyImage image={featuredImage} alt="Blog preview" objectFit="contain" />
            ) : (
              <Image src="../../post-default.jpg" />
            )}
          </Link>
        </Box>
        <Box zIndex={1} w="100%" h="100%" position="absolute" ml={1} mt={1}>
          <Box bgGradient="radial(orange.400 1px, transparent 1px)" bgSize={{ base: '1.5rem 1.5rem', sm: '1rem 1rem' }} h="100%" />
        </Box>
      </Flex>
      <Flex flex={1.75} direction="column" justifyContent="center" mt={{ base: 3, md: 0 }} pl={{ base: 0, sm: 3 }}>
        <Heading as={Link} fontSize="4xl" fontWeight="600" lineHeight="tight" to={post.fields.slug}>
          {post.frontmatter.title}
        </Heading>

        <Text mt={1} fontSize="md">
          {post.frontmatter.lead}
        </Text>
        <Flex mt={2} justifyContent="space-between">
          <BlogAuthor
            hasLongDate={useBreakpointValue({ base: false, md: true })}
            name={post.frontmatter.author}
            date={new Date(post.frontmatter.date)}
          />
          <HStack fontWeight="light" fontSize={{ base: 'sm', md: 'xs', lg: 'sm' }} textColor={useColorModeValue('gray.600', 'gray.400')}>
            <FaClock />
            <Text>{readTimeInMinutes(post.wordCount.words)}&nbsp;perc</Text>
          </HStack>
        </Flex>

        <Flex>
          {post.frontmatter.tags && (
            <HStack flex={1} my={3} flexWrap={{ base: 'wrap', sm: 'nowrap' }} justifyContent="flex-end">
              {post.frontmatter.tags.map((tag) => (
                <Tag key={tag}>#{tag.trim()}</Tag>
              ))}
            </HStack>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BlogFullCard
