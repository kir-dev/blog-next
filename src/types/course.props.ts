export interface CourseProps {
  title: string
  sessions: Array<{ time: string; place: string }>
  lecturer: string
  active: boolean
}
