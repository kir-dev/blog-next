import { ProjectProps } from 'types/project.props'

export interface ProjectPreviewProps {
  project: {
    fields: {
      slug: string
    }
    frontmatter: ProjectProps
  }
}
