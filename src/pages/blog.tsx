import { Box, Heading, Text } from '@chakra-ui/core'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import IndexLayout from '../layouts'

interface BlogPostsProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          lead: string
          date: string
        }
      }[]
    }
  }
}

const Blog: React.SFC<BlogPostsProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <Box p={5}>
          <Heading as="h1">Blog posts</Heading>
        </Box>
        <Box p={5}>
          {data.allMarkdownRemark.nodes.map(post => (
            <Box key={post.fields.slug}>
              <Heading as="h2">{post.frontmatter.title}</Heading>
              <Text>{post.frontmatter.date}</Text>
              <Text>{post.frontmatter.lead}</Text>
            </Box>
          ))}
        </Box>
      </Container>
    </Page>
  </IndexLayout>
)

export default Blog

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark(filter: { fields: { layout: { eq: "post" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          lead
          date(formatString: "YYYY.MM.DD.")
        }
      }
    }
  }
`
