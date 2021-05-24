import { Heading } from '@chakra-ui/react'
import * as React from 'react'
import Container from '../components/Container'
import Post from '../components/Post'
import IndexLayout from '../layouts'

interface ProjectTemplateProps {
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
      frontmatter: {
        title: string
      }
    }
  }
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Post>
      <Container>
        <Heading as="h1" py={5}>
          {data.markdownRemark.frontmatter.title}
        </Heading>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Container>
    </Post>
  </IndexLayout>
)

export default ProjectTemplate

/* export const query = graphql`
  query PostTemplateQuery($slug: String!) {
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
        title
      }
    }
  }
` */
