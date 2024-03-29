export interface ISession {
  startDate: string
  startTime: string
  endTime: string
  place: string
}

export interface CourseProps {
  title: string
  order: number
  sessions: ISession[]
  lecturer: string
  active: boolean
  description: string
}
