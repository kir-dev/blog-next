import { Heading } from '@chakra-ui/react'
import * as React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import Page from '../components/Page'
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
          github: string
          previewImg: string
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
        </Container>
      </Header>
      <Container>{/* data.allMarkdownRemark.nodes.map((project) => (
          <BlogPreview post={project} />
        )) */}</Container>
    </Page>
  </IndexLayout>
)

export default Projects

/* export const query = graphql`
  query Projects {
    allMarkdownRemark(filter: { fields: { layout: { eq: "project" } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          github
          previewImg
        }
      }
    }
  }
` */
