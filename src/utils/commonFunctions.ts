export const readTimeInMinutes = (wordCount: number) => {
  const wpm = 200
  return Math.ceil(wordCount / wpm)
}
