import { Box } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface MemberTemplateProps {
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
        pekUsername: string
        realName: string
        position: string
        interests: string
        joinDate: string
        featuredImage: ImageDataLike
        active: boolean
      }
    }
  }
}

const MemberTemplate: React.FC<MemberTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Box>
      <Container>
        <h1>{data.markdownRemark.frontmatter.realName}</h1>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Container>
    </Box>
  </IndexLayout>
)

export default MemberTemplate

export const query = graphql`
  query MemberTemplateQuery($slug: String!) {
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
        pekUsername
        realName
        position
        interests
        joinDate
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        active
      }
    }
  }
`
