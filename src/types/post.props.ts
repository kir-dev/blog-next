import { ImageDataLike } from 'gatsby-plugin-image'

export interface PostProps {
  title: string
  lead: string
  author: string
  date: string
  tags?: Array<string>
  featuredImage: ImageDataLike
}
