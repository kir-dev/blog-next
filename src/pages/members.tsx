import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import MeetingControls from '../components/members-components/MeetingControls'
import MemberCard from '../components/members-components/MemberCard'
import Page from '../components/Page'
import IndexLayout from '../layouts'
import { MemberProps } from '../templates/member'

export interface MembersProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: MemberProps['member']['frontmatter']
      }[]
    }
  }
}

const MembersPage: React.FC<MembersProps> = ({ data }) => {
  return (
    <IndexLayout>
      <Page>
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
              >
                <MemberCard member={member} key={member.fields.slug} />
              </Flex>
            ))}
          </Flex>
          <MeetingControls />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default MembersPage

export const query = graphql`
  query AboutPageQueries {
    allMarkdownRemark(filter: { fields: { layout: { eq: "member" } } }, sort: { fields: [frontmatter___joinDate], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          pekUsername
          realName
          position
          email
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
