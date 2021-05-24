import { Heading } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
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
            <BlogAuthor name={data.markdownRemark.frontmatter.author} date={new Date(data.markdownRemark.frontmatter.date)} />
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
    }
  }
`
