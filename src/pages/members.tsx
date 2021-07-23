import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '~components/Container'
import MeetingControls from '~components/members-components/MeetingControls'
import MemberAvatarCard from '~components/members-components/MemberAvatarCard'
import { MemberProps } from '~types/member.props'
import IndexLayout from '../layouts'

interface AllMarkdownRemark {
  nodes: {
    fields: {
      slug: string
    }
    frontmatter: MemberProps
  }[]
}

export interface MembersProps {
  data: {
    actives: AllMarkdownRemark
    inactives: AllMarkdownRemark
  }
}

const getMemberCollage = ({ nodes }: AllMarkdownRemark): JSX.Element[] =>
  nodes.map((member) => (
    <Flex
      py={{ base: 2, sm: 1 }}
      px={{ base: 0, sm: 1 }}
      flex={`0 0 ${useBreakpointValue({ base: '100%', sm: '50%', md: '33%', lg: '25%' })}`}
      key={member.fields.slug}
    >
      <MemberAvatarCard member={member} />
    </Flex>
  ))

const MembersPage: React.FC<MembersProps> = ({ data }) => {
  return (
    <IndexLayout
      background={`${useBreakpointValue({
        base: '',
        sm: 'url(/background/bottom-left2.svg) left top no-repeat,'
      })}url(/background/top-right2.svg) right top no-repeat`}
    >
      <Box>
        <Container>
          <Heading as="h1" size="2xl" mt={8} mb={12}>
            Csapatunk
          </Heading>
          <Flex flexWrap="wrap" justifyContent="center">
            {getMemberCollage(data.actives)}
          </Flex>
          <MeetingControls />
          {data.inactives.nodes.length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={24} mb={8}>
                Korábbi tagjaink
              </Heading>
              <Flex flexWrap="wrap" justifyContent="center">
                {getMemberCollage(data.inactives)}
              </Flex>
            </>
          )}
        </Container>
      </Box>
    </IndexLayout>
  )
}

export default MembersPage

export const query = graphql`
  query AboutPageQueries {
    actives: allMarkdownRemark(
      filter: { fields: { layout: { eq: "member" } }, frontmatter: { active: { eq: true } } }
      sort: { fields: [frontmatter___realName], order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          pekUsername
          realName
          position
          joinDate
          interests
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
    inactives: allMarkdownRemark(
      filter: { fields: { layout: { eq: "member" } }, frontmatter: { active: { eq: false } } }
      sort: { fields: [frontmatter___realName], order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          pekUsername
          realName
          position
          joinDate
          interests
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
