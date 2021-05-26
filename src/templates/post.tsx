import { Flex, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react'
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

  return (
    <IndexLayout>
      <Post>
        <Header>
          <Container>
            {result && <GatsbyImage image={result} alt="Blog preview" objectFit="contain" />}
            <Heading as="h1" py={5}>
              {data.markdownRemark.frontmatter.title}
            </Heading>
            <Flex direction={{ base: 'column-reverse', sm: 'row' }} justifyContent="space-between">
              <BlogAuthor longDate name={data.markdownRemark.frontmatter.author} date={new Date(data.markdownRemark.frontmatter.date)} />
              <HStack fontWeight="light" fontSize="md" px={1} ml="auto" textColor={useColorModeValue('gray.600', 'gray.400')}>
                <FaClock />
                <Text>{Math.ceil(data.markdownRemark.fields.readingTime.minutes)} perc</Text>
              </HStack>
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
