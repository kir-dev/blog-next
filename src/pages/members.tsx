import { Grid, Heading, useBreakpointValue } from '@chakra-ui/react'
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
          <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 })}, 1fr)`} gap={2}>
            {data.allMarkdownRemark.nodes.map((member) => (
              <MemberCard member={member} key={member.fields.slug} />
            ))}
          </Grid>
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
