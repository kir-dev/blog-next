// eslint-disable-next-line import/extensions
import { Box } from '@chakra-ui/core'
import React, { useState } from 'react'
import { Frame, KeyFrames } from './react-keyframes'
import styles from './terminal.module.css'

const sleepDuration = 500
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5)

interface LineProps {
  text?: string
  noPrompt?: boolean
  noCaret?: boolean
}

const Line: React.FC<LineProps> = ({ text, noPrompt = false, noCaret = false }) => (
  <>
    {!noPrompt && (
      <Box color="cyan.300" as="span" className={styles.root}>
        kirdev@sch:
        <Box color="teal.600" as="span" className={styles.root}>
          ~${' '}
        </Box>
      </Box>
    )}
    {text}
    {!noCaret && <span className={styles.caret} />}
  </>
)

const Terminal = () => {
  const [lineCount, setLineCount] = useState(0)

  const showLine = (text: string) => {
    const frames = [
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret noPrompt />
      </Frame>
    ]

    return (
      <KeyFrames component="p" onEnd={() => setLineCount(c => c + 1)}>
        {frames}
      </KeyFrames>
    )
  }

  const renderLine = (text: string) => {
    const frames = []

    // starting frame
    frames.push(
      <Frame duration={sleepDuration} key={`${text}-first`}>
        <Line />
      </Frame>
    )

    // typing out the line
    for (let i = 0; i < text.length; i += 1) {
      const isLastLetter = i === text.length - 1
      const duration = isLastLetter ? sleepDuration : getTypingDuration()
      frames.push(
        <Frame duration={duration} key={`${text}-${i}`}>
          <Line text={text.slice(0, i + 1)} />
        </Frame>
      )
    }

    // ending frame
    frames.push(
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret />
      </Frame>
    )

    return (
      <KeyFrames component="p" onEnd={() => setLineCount(c => c + 1)}>
        {frames}
      </KeyFrames>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.icon} />
          <span className={styles.icon} />
          <span className={styles.icon} />
        </div>
        <div className={styles.body}>
          {renderLine('yarn run load:kirdev-blog')}
          {lineCount >= 1 && showLine('Kollégiumi Információs Rendszer Fejlesztők')}
          {lineCount >= 2 && renderLine('cat feladatunk.md')}
          {lineCount >= 3 && showLine('Feladatunk a Villanykar hallgatói számára hasznos webes')}
          {lineCount >= 4 && showLine('alkalmazások fejlesztése és üzemeltetése.')}
          {lineCount >= 5 && renderLine('cat technologiaink.md')}
          {lineCount >= 6 && showLine('Leggyakrabban használt technológiáink közé tartozik a')}
          {lineCount >= 7 && showLine('Node.js, a Ruby on Rails és a Spring + Kotlin.')}
          {lineCount >= 8 && renderLine('')}
        </div>
      </div>
    </div>
  )
}

export default Terminal
