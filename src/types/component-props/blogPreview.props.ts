import { PostProps } from '~types/post.props'

export interface BlogPreviewProps {
  post: {
    fields: {
      slug: string
    }
    wordCount: {
      words: number
    }
    frontmatter: PostProps
  }
}
