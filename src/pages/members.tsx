import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '~components/Container'
import Header from '~components/Header'
import MeetingControls from '~components/members-components/MeetingControls'
import MemberAvatarCard from '~components/members-components/MemberAvatarCard'
import { MemberProps } from '~types/member.props'
import IndexLayout from '../layouts'

export interface MembersProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: MemberProps
      }[]
    }
  }
}

const MembersPage: React.FC<MembersProps> = ({ data }) => {
  return (
    <IndexLayout
      background={
        `url(/background/pattern-right.svg) right top repeat-y,url(/background/pattern-left.svg) left top repeat-y,` +
        `${useBreakpointValue({
          base: '',
          sm: 'url(/background/bottom-left2.svg) left top no-repeat,'
        })}url(/background/top-right2.svg) right top no-repeat`
      }
    >
      <Box>
        <Header>
          <Container>
            <Heading as="h1">Csapatunk</Heading>
          </Container>
        </Header>
        <Container>
          <Flex flexWrap="wrap" justifyContent="center">
            {data.allMarkdownRemark.nodes.map((member) => (
              <Flex
                py={{ base: 2, sm: 1 }}
                px={{ base: 0, sm: 1 }}
                flex={`0 0 ${useBreakpointValue({ base: '100%', sm: '50%', md: '33%', lg: '25%' })}`}
                key={member.fields.slug}
              >
                <MemberAvatarCard member={member} />
              </Flex>
            ))}
          </Flex>
          <MeetingControls />
        </Container>
      </Box>
    </IndexLayout>
  )
}

export default MembersPage

export const query = graphql`
  query AboutPageQueries {
    allMarkdownRemark(filter: { fields: { layout: { eq: "member" } } }, sort: { fields: [frontmatter___realName], order: ASC }) {
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
          active
        }
      }
    }
  }
`
