import { Box, Heading } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import Container from '../components/Container'
import IndexLayout from '../layouts'

export interface MemberProps {
  member: {
    fields: {
      slug: string
    }
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
      frontmatter: MemberProps['member']['frontmatter']
    }
  }
}

const MemberTemplate: React.FC<MemberTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Box>
      <Container>
        <Heading as="h1" fontSize="3xl">
          {data.markdownRemark.frontmatter.realName}
        </Heading>
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
