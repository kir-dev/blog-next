/* eslint-disable react/destructuring-assignment */
import { Box, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'gatsby'
import React from 'react'
import BlogAuthor from './BlogAuthor'

interface BlogPreviewProps {
  post: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      lead: string
      date: string
      author: string
      previewImg: string
    }
  }
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post }) => (
  <Box marginTop={{ base: '1', sm: '5' }} display="flex" flexDirection={{ base: 'column', sm: 'row' }} justifyContent="space-between">
    <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
      <Box width={{ base: '100%', sm: '85%' }} zIndex="2" marginLeft={{ base: '0', sm: '5%' }} marginTop="5%">
        <Link to={post.fields.slug}>
          <Image
            borderRadius="lg"
            src={post.frontmatter.previewImg ?? '../../blog-noimg.png'}
            fallbackSrc="../../blog-noimg.png"
            alt="Blog preview"
            objectFit="contain"
          />
        </Link>
      </Box>
      <Box zIndex="1" width="100%" position="absolute" height="100%">
        <Box bgGradient="radial(orange.500 1px, transparent 1px)" backgroundSize="20px 20px" height="100%" />
      </Box>
    </Box>
    <Box display="flex" flex="1" flexDirection="column" justifyContent="center" mt={{ base: '3', sm: '0' }} pl={{ base: '0', sm: '3' }}>
      <Heading marginTop="1">
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </Heading>
      <Text as="p" marginTop="2" color={useColorModeValue('gray.700', 'gray.200')} fontSize="lg">
        {post.frontmatter.lead}
      </Text>
      <BlogAuthor name={post.frontmatter.author} date={new Date(post.frontmatter.date)} />
    </Box>
  </Box>
)

export default BlogPreview
