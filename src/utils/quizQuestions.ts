import { Language } from 'prism-react-renderer'

export type QuizProps = {
  id: string
  code: string
  lang: Language
  prompt: string
  answer: AnswerType
}

export type AnswerType = 'JavaScript' | 'Ruby' | 'Java' | 'C++' | 'Python'

export const QUIZ_QUESTIONS: QuizProps[] = [{ id: 'first', code: '', lang: 'jsx', prompt: '', answer: 'C++' }]

export const POSSIBLE_ANSWERS: AnswerType[] = ['JavaScript', 'Ruby', 'Java', 'C++', 'Python']
