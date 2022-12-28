import { ProjectProps } from 'types/project.props'

export interface ProjectsProps {
  data: {
    activeProjects: {
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: ProjectProps
      }[]
    }
    oldProjects: {
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: ProjectProps
      }[]
    }
  }
}
