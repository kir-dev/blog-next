import { Box, Grid, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import BlogPreview from '../components/blog-components/BlogPreview'
import Container from '../components/Container'
import Header from '../components/Header'
import Page from '../components/Page'
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
        frontmatter: {
          title: string
          lead: string
          date: string
          author: string
          featuredImage: ImageDataLike
        }
      }[]
    }
  }
}

const Blog: React.FC<BlogPostsProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Header>
        <Container>
          <Heading as="h1">Legújabb posztjaink</Heading>
        </Container>
      </Header>
      <Container>
        <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2 })}, 1fr)`} gap={{ base: 24, sm: 12 }}>
          {data.allMarkdownRemark.nodes.map((post) => (
            <BlogPreview key={post.fields.slug} post={post} />
          ))}
        </Grid>
        <Box textAlign="right" mt={8}>
          <Text as={Link} fontSize="lg" to="/archive">
            Még több...
          </Text>
        </Box>
      </Container>
    </Page>
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
