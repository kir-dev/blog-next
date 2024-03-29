import { ImageDataLike } from 'gatsby-plugin-image'

export interface PostProps {
  title: string
  lead: string
  author: string
  date: string
  tags?: string[]
  featuredImage?: ImageDataLike
  ogImage?: ImageDataLike
  comment?: boolean
}
