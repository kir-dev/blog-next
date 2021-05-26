/* eslint-disable react/destructuring-assignment */
import { Box, Flex, HStack, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import { FaClock } from 'react-icons/fa'
import BlogAuthor from './BlogAuthor'

interface BlogPreviewProps {
  post: {
    fields: {
      slug: string
      readingTime: {
        minutes: number
      }
    }
    frontmatter: {
      title: string
      lead: string
      date: string
      author: string
      featuredImage: ImageDataLike
    }
  }
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post }) => {
  const result = getImage(post.frontmatter.featuredImage)

  return (
    <Flex mt={2} direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
      <Flex flex={1} position="relative" mr={{ base: 0, md: 2 }} pb={{ base: 2, md: 0 }}>
        <Box w="80%" zIndex={2}>
          <Link href={post.fields.slug}>
            {result ? <GatsbyImage image={result} alt="Blog preview" objectFit="contain" /> : <Image src="../../post-default.jpg" />}
          </Link>
        </Box>
        <Box zIndex={1} w="100%" h="100%" position="absolute" ml={1} mt={1}>
          <Box bgGradient="radial(orange.400 1px, transparent 1px)" bgSize={{ base: '1.5rem 1.5rem', md: '1rem 1rem' }} h="100%" />
        </Box>
      </Flex>
      <Flex flex={1.5} direction="column" justifyContent="center" mt={{ base: 3, md: 0 }} pl={{ base: 0, md: 3 }}>
        <Text fontWeight="light" fontSize="2xl">
          <Link href={post.fields.slug}>{post.frontmatter.title}</Link>
        </Text>
        <Text mt={1} fontSize="md">
          {post.frontmatter.lead}
        </Text>
        <Flex justifyContent="space-between">
          <BlogAuthor name={post.frontmatter.author} date={new Date(post.frontmatter.date)} />
          <HStack fontWeight="light" fontSize="sm" textColor={useColorModeValue('gray.600', 'gray.400')}>
            <FaClock />
            <Text>{Math.ceil(post.fields.readingTime.minutes)} perc</Text>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BlogPreview
