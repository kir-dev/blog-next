import { Box } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '~components/Container'
import MemberFullCard from '~components/members-components/MemberFullCard'
import { MemberProps } from '~types/member.props'
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
      frontmatter: MemberProps
    }
  }
}

const MemberTemplate: React.FC<MemberTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Box>
      <Container>
        <MemberFullCard member={data.markdownRemark.frontmatter} />
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
