import { Box, Flex, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import { FaClock } from 'react-icons/fa'
import BlogAuthor from '../components/blog-components/BlogAuthor'
import Container from '../components/Container'
import Header from '../components/Header'
import Post from '../components/Post'
import IndexLayout from '../layouts'

interface PostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        author: string
        date: string
        featuredImage: ImageDataLike
      }
      fields: {
        readingTime: {
          minutes: number
        }
      }
    }
  }
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => {
  const result = getImage(data.markdownRemark.frontmatter.featuredImage)
  // const pic =
  return (
    <IndexLayout>
      <Post>
        <Header>
          <Container>
            <Flex mt={2} direction={{ base: 'column', sm: 'row' }} justifyContent="space-between">
              <Flex flex={1} position="relative" mr={{ base: 0, sm: 2 }} pb={{ base: 2, sm: 0 }}>
                <Box w="80%" zIndex={2}>
                  {result && <GatsbyImage image={result} alt="Blog preview" objectFit="contain" />}
                </Box>
                <Box zIndex={1} w="100%" h="100%" position="absolute" ml={1} mt={1}>
                  <Box bgGradient="radial(orange.400 1px, transparent 1px)" bgSize={{ base: '1.5rem 1.5rem', sm: '1rem 1rem' }} h="100%" />
                </Box>
              </Flex>
              <Flex flex={{ base: 2, md: 4 }} direction="column" justifyContent="center" mt={{ base: 3, sm: 0 }} pl={{ base: 0, sm: 3 }}>
                <Heading as="h1">{data.markdownRemark.frontmatter.title}</Heading>
                <Flex justifyContent="space-between" wrap="wrap-reverse">
                  <BlogAuthor
                    hasLongDate
                    name={data.markdownRemark.frontmatter.author}
                    date={new Date(data.markdownRemark.frontmatter.date)}
                  />
                  <HStack
                    ml={4}
                    mb={2}
                    flex={1}
                    fontWeight="light"
                    alignItems="center"
                    justifyContent="flex-end"
                    fontSize="sm"
                    textColor={useColorModeValue('gray.600', 'gray.400')}
                  >
                    <FaClock />
                    <Text>{Math.ceil(data.markdownRemark.fields.readingTime.minutes)}&nbsp;perc</Text>
                  </HStack>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Header>
        <Container>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </Container>
      </Post>
    </IndexLayout>
  )
}

export default PostTemplate

export const query = graphql`
  query PostTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date
        author
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
      fields {
        readingTime {
          minutes
        }
      }
    }
  }
`
