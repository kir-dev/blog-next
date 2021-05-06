import { Box, Heading } from '@chakra-ui/react'
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
          date
        }
      }
    }
  }
`

const Archive: React.FC<BlogPostsProps> = ({ data }) => (
  <IndexLayout>
    <Container>
      <Heading as="h1" py={5}>
        Archívum
      </Heading>

      {data.allMarkdownRemark.nodes.map((post) => (
        <Box key={post.fields.slug}>
          <span>{post.frontmatter.date.split('T')[0]} » </span>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </Box>
      ))}
    </Container>
  </IndexLayout>
)

export default Archive
