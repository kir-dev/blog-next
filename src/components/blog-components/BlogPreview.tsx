/* eslint-disable react/destructuring-assignment */
import { Box, Flex, Heading, HStack, Image, Link, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import { FaClock } from 'react-icons/fa'
import BlogAuthor from './BlogAuthor'

export interface BlogPreviewProps {
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
  isBig?: boolean
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post, isBig }) => {
  const result = getImage(post.frontmatter.featuredImage)

  return (
    <Flex mt={2} direction={{ base: 'column', sm: isBig ? 'row' : 'column', md: 'row' }} justifyContent="space-between">
      <Flex flex={1} position="relative" mr={{ base: 0, md: 2 }} pb={isBig ? 2 : { base: 2, md: 0 }}>
        <Box w="80%" zIndex={2}>
          <Link href={post.fields.slug}>
            {result ? <GatsbyImage image={result} alt="Blog preview" objectFit="contain" /> : <Image src="../../post-default.jpg" />}
          </Link>
        </Box>
        <Box zIndex={1} w="100%" h="100%" position="absolute" ml={1} mt={1}>
          <Box
            bgGradient="radial(orange.400 1px, transparent 1px)"
            bgSize={{ base: '1.5rem 1.5rem', sm: isBig ? '1rem 1rem' : '1.5rem 1.5rem', md: '1rem 1rem' }}
            h="100%"
          />
        </Box>
      </Flex>
      <Flex
        flex={1.75}
        direction="column"
        justifyContent="center"
        mt={{ base: 3, md: 0 }}
        pl={isBig ? { base: 0, sm: 3 } : { base: 0, md: 3 }}
      >
        {isBig ? (
          <Heading>
            <Link href={post.fields.slug}>{post.frontmatter.title}</Link>
          </Heading>
        ) : (
          <Text fontWeight="light" fontSize="2xl">
            <Link href={post.fields.slug}>{post.frontmatter.title}</Link>
          </Text>
        )}
        <Text mt={1} fontSize="md">
          {post.frontmatter.lead}
        </Text>
        <Flex justifyContent="space-between">
          <BlogAuthor
            hasLongDate={isBig && useBreakpointValue({ base: false, md: true })}
            name={post.frontmatter.author}
            date={new Date(post.frontmatter.date)}
          />
          <HStack fontWeight="light" fontSize={{ base: 'sm', md: 'xs', lg: 'sm' }} textColor={useColorModeValue('gray.600', 'gray.400')}>
            <FaClock />
            <Text>{Math.ceil(post.fields.readingTime.minutes)}&nbsp;perc</Text>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BlogPreview
