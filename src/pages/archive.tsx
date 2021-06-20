import { Box, Heading, Link } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
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
    <Box>
      <Header>
        <Container>
          <Heading as="h1">Archívum</Heading>
        </Container>
      </Header>
      <Container>
        {data.allMarkdownRemark.nodes.map((post) => (
          <Box key={post.fields.slug} fontSize={{ base: 'md', md: 'lg' }} py={1}>
            <span>{post.frontmatter.date.split('T')[0]} » </span>
            <Link fontWeight="bold" href={post.fields.slug}>
              {post.frontmatter.title}
            </Link>
          </Box>
        ))}
      </Container>
    </Box>
  </IndexLayout>
)

export default Archive
