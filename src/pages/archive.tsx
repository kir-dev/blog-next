import { Box, Heading } from '@chakra-ui/core'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import { BlogPostsProps } from './blog'

export const query = graphql`
  query {
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

const Archive: React.FC<BlogPostsProps> = ({ data }) => (
  <IndexLayout>
    <Container>
      <Box p={5}>
        <Heading as="h1">Archívum</Heading>
      </Box>
      <Box p={5}>
        {data.allMarkdownRemark.nodes.map(post => (
          <Box key={post.fields.slug}>
            <span>{post.frontmatter.date} » </span>
            <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
          </Box>
        ))}
      </Box>
    </Container>
  </IndexLayout>
)

export default Archive
