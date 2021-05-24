import { Heading } from '@chakra-ui/react'
import { graphql } from 'gatsby'
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
        {data.allMarkdownRemark.nodes.map((post) => (
          <BlogPreview key={post.fields.slug} post={post} />
        ))}
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
