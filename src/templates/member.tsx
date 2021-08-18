import { Box, useBreakpointValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '~components/Container'
import MemberFullCard from '~components/members-components/MemberFullCard'
import SEO from '~components/SEO'
import { MemberProps } from '~types/member.props'
import IndexLayout from '../layouts'

interface MemberTemplateProps {
  data: {
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: MemberProps
    }
  }
}

const MemberTemplate: React.FC<MemberTemplateProps> = ({ data }) => {
  const member = data.markdownRemark.frontmatter

  return (
    <>
      <SEO
        robots="nofollow, noindex"
        title={member.realName}
        description={`${member.realName}, ${member.position} a Kir-Dev csapatában.`}
      />
      <IndexLayout
        background={useBreakpointValue({
          xl: 'url(/background/pattern-right.svg) right top repeat-y,url(/background/pattern-left.svg) left top repeat-y'
        })}
      >
        <Box>
          <Container>
            <MemberFullCard member={member} />
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          </Container>
        </Box>
      </IndexLayout>
    </>
  )
}

export default MemberTemplate

export const query = graphql`
  query MemberTemplateQuery($slug: String!) {
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
