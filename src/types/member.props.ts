import { ImageDataLike } from 'gatsby-plugin-image'

export interface MemberProps {
  pekUsername: string
  realName: string
  position: string
  interests: Array<string>
  joinDate: string
  avatar: ImageDataLike
  active: boolean
}
