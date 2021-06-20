import { ImageDataLike } from 'gatsby-plugin-image'

export interface ProjectProps {
  title: string
  lead: string
  github: string
  website: string
  featuredImage: ImageDataLike
  status: {
    label: string
    color: string
  }
  techs: string
}
