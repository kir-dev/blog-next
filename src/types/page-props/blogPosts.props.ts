import { PostProps } from '~types/post.props'

export interface BlogPostsProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
        wordCount: {
          words: number
        }
        frontmatter: PostProps
      }[]
    }
  }
}
