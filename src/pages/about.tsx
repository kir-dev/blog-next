import { Heading } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import MemberCard from '../components/about-components/MemberCard'
import Container from '../components/Container'
import Header from '../components/Header'
import Page from '../components/Page'
import IndexLayout from '../layouts'

export interface MembersProps {
  data: {
    allMarkdownRemark: {
      nodes: {
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
      }[]
    }
  }
}

const AboutPage: React.FC<MembersProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Header>
        <Container>
          <Heading as="h1">Csapatunk</Heading>
        </Container>
      </Header>
      <Container>
        {data.allMarkdownRemark.nodes.map((member) => (
          <MemberCard member={member} key={member.fields.slug} />
        ))}
      </Container>
    </Page>
  </IndexLayout>
)

export default AboutPage

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
