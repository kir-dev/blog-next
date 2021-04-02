import { Box, Heading, Text } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import IndexLayout from '../layouts'

export interface BlogPostsProps {
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

const Blog: React.FC<BlogPostsProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <Heading py={5} as="h1">
          Blog posts
        </Heading>

        {data.allMarkdownRemark.nodes.map((post) => (
          <Box key={post.fields.slug}>
            <Link to={post.fields.slug}>
              <Heading as="h2">{post.frontmatter.title}</Heading>
            </Link>
            <Text>
              {new Date(post.frontmatter.date).toLocaleTimeString('hu-HU', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
            <Text>{post.frontmatter.lead}</Text>
          </Box>
        ))}
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
          date
        }
      }
    }
  }
`
