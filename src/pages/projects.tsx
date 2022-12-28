import { Box, Grid, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { BlogContainer } from 'components/BlogContainer'
import { Header } from 'components/Header'
import { ProjectPreview } from 'components/project-components/ProjectPreview'
import { SEO } from 'components/SEO'
import { graphql } from 'gatsby'
import React from 'react'
import { ProjectsProps } from 'types/page-props/projects.props'
import { IndexLayout } from '../layouts'

const Projects: React.FC<ProjectsProps> = ({ data }) => (
  <SEO title="Projektjeink">
    <IndexLayout
      background={`${useBreakpointValue({
        base: '',
        sm: 'url(/background/bottom-left2.svg) left top no-repeat,url(/background/bottom-left.svg) left bottom no-repeat,'
      })}url(/background/top-right3.svg) right top no-repeat`}
    >
      <Box>
        <Header>
          <BlogContainer>
            <Heading as="h1">Projektjeink</Heading>
            <Text fontFamily="mono" pt={4} fontSize="xl">
              A kör által készített minden alkalmazás nyílt forráskódú, ez a fejlesztőeszközeink kiválasztásánál is fő szempont.
            </Text>
          </BlogContainer>
        </Header>
        <BlogContainer>
          <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2 })}, 1fr)`} gap={8}>
            {data.activeProjects.nodes.map((project) => (
              <ProjectPreview key={project.fields.slug} project={project} />
            ))}
            {data.oldProjects.nodes.map((project) => (
              <ProjectPreview key={project.fields.slug} project={project} />
            ))}
          </Grid>
        </BlogContainer>
      </Box>
    </IndexLayout>
  </SEO>
)

export default Projects

export const query = graphql`
  query Projects {
    activeProjects: allMarkdownRemark(
      filter: { fields: { layout: { eq: "project" } }, frontmatter: { status: { color: { in: "green" } } } }
      sort: { frontmatter: { title: ASC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          lead
          github
          status {
            label
            color
          }
          techs
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
    oldProjects: allMarkdownRemark(
      filter: { fields: { layout: { eq: "project" } }, frontmatter: { status: { color: { nin: "green" } } } }
      sort: { frontmatter: { title: ASC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          lead
          github
          status {
            label
            color
          }
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
