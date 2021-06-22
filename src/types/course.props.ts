export interface ISession {
  startDateTime: string
  lengthInHours: number
  place: string
}

export interface CourseProps {
  title: string
  sessions: Array<ISession>
  lecturer: string
  active: boolean
}
