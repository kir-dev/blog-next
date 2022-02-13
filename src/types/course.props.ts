export interface ISession {
  startDateTime: string
  lengthInHours: number
  place: string
}

export interface CourseProps {
  title: string
  order: number
  sessions: Array<ISession>
  lecturer: string
  active: boolean
  description: string
}
