import { Language } from 'prism-react-renderer'
import { codeCpp, codeJava, codeJavaScript, codeRuby } from './codeExamples'

export type QuizProps = {
  id: string
  code: string
  lang: Language
  prompt: string
  answer: AnswerType
}

export type AnswerType = 'JavaScript' | 'Ruby' | 'Java' | 'C++' | 'Python'

export const QUIZ_QUESTIONS: QuizProps[] = [
  { id: '1', code: codeJava, lang: 'go', prompt: 'Milyen nyelven írodhatott a következő webalkalmazás egy Controllere?', answer: 'Java' },
  {
    id: '2',
    code: codeRuby,
    lang: 'python',
    prompt: 'Milyen nyelven írodhatott ez a pár Controller függvény a moduljukban?',
    answer: 'Ruby'
  },
  {
    id: '3',
    code: codeJavaScript,
    lang: 'jsx',
    prompt: 'Milyen nyelven írodhatott ez a felhasználói felület komponens?',
    answer: 'JavaScript'
  },
  { id: '4', code: codeCpp, lang: 'cpp', prompt: 'Milyen nyelven írodhatott ez a webes kommunikációt létesítő kódrészlet?', answer: 'C++' }
]

export const POSSIBLE_ANSWERS: AnswerType[] = ['JavaScript', 'Ruby', 'Java', 'C++', 'Python']
