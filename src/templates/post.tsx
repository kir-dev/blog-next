import { Heading } from '@chakra-ui/core'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import Post from '../components/Post'
import IndexLayout from '../layouts'

interface PostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
      }
    }
  }
}

const PostTemplate: React.SFC<PostTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Post>
      <Container>
        <Heading as="h1">{data.markdownRemark.frontmatter.title}</Heading>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Container>
    </Post>
  </IndexLayout>
)

export default PostTemplate

export const query = graphql`
  query PostTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`
