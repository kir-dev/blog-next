import { Grid, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import Page from '../components/Page'
import ProjectPreview from '../components/project-components/ProjectPreview'
import IndexLayout from '../layouts'

export interface ProjectsProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          lead: string
          github: string
          status: string
          techs: string
          featuredImage: ImageDataLike
        }
      }[]
    }
  }
}

const Projects: React.FC<ProjectsProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Header>
        <Container>
          <Heading as="h1">Projektjeink</Heading>
          <Text as="kbd" pt={4} fontSize="xl">
            A kör által készített minden alkalmazás nyílt forráskódú, ez a fejlesztőeszközeink kiválasztásánál is fő szempont.
          </Text>
        </Container>
      </Header>
      <Container>
        <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2 })}, 1fr)`} gap={8}>
          {data.allMarkdownRemark.nodes.map((project) => (
            <ProjectPreview key={project.fields.slug} project={project} />
          ))}
        </Grid>
      </Container>
    </Page>
  </IndexLayout>
)

export default Projects

export const query = graphql`
  query Projects {
    allMarkdownRemark(filter: { fields: { layout: { eq: "project" } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          lead
          github
          status
          techs
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
