import { ImageDataLike } from 'gatsby-plugin-image'

interface CourseProps {
  title: string
  sessions: Array<{ time: string; place: string }>
  lecturer: string
  featuredImage: ImageDataLike
  active: boolean
}
