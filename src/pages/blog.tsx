import { Box, Grid, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import BlogPreviewCard from '~components/blog-components/BlogPreviewCard'
import Container from '~components/Container'
import Header from '~components/Header'
import { PostProps } from '~types/post.props'
import IndexLayout from '../layouts'

export interface BlogPostsProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
          readingTime: {
            minutes: number
          }
        }
        frontmatter: PostProps
      }[]
    }
  }
}

const Blog: React.FC<BlogPostsProps> = ({ data }) => (
  <IndexLayout>
    <Box>
      <Header>
        <Container>
          <Heading as="h1">Legújabb posztjaink</Heading>
        </Container>
      </Header>
      <Container>
        <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, md: 2 })}, 1fr)`} gap={{ base: 24, sm: 10 }}>
          {data.allMarkdownRemark.nodes.map((post) => (
            <BlogPreviewCard key={post.fields.slug} post={post} />
          ))}
        </Grid>
        <Box textAlign="right" mt={8}>
          <Text as={Link} fontSize="lg" to="/archive" color="orange.400" _hover={{ color: 'tomato', textDecor: 'underline' }}>
            Még több...
          </Text>
        </Box>
      </Container>
    </Box>
  </IndexLayout>
)

export default Blog

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark(filter: { fields: { layout: { eq: "post" } } }, sort: { fields: [frontmatter___date], order: DESC }, limit: 6) {
      nodes {
        fields {
          slug
          readingTime {
            minutes
          }
        }
        frontmatter {
          title
          lead
          date
          author
          tags
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`
