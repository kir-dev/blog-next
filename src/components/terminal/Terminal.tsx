import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Frame, Keyframes } from './react-keyframes'

const sleepDuration = 500
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5)

interface LineProps {
  text?: string
  name?: string
  noPrompt?: boolean
  noCaret?: boolean
}

const Line: React.FC<LineProps> = ({ text, name, noPrompt = false, noCaret = false }) => {
  const usernameColor = useColorModeValue('cyan.900', 'cyan.300')

  return (
    <>
      {!noPrompt && (
        <Box color={usernameColor} as="span">
          kirdev@sch:
          <Box color="cyan.600" as="span">
            ~${' '}
          </Box>
        </Box>
      )}
      <Box color="cyan.600" as="span">
        {name ?? ''}
      </Box>
      {text}
      {!noCaret && (
        <Box as="span" display="inline-block" w="8px" marginBottom="-3px" borderBottom="3px" borderStyle="solid" borderColor="tomato" />
      )}
    </>
  )
}

const Terminal: React.FC = () => {
  const [lineCount, setLineCount] = useState(0)

  const showLine = (text: string, name?: string) => {
    const frames = [
      <Frame key={`${text}-last`}>
        <Line name={name} text={text} noCaret noPrompt />
      </Frame>
    ]

    return (
      <Keyframes component="p" onEnd={() => setLineCount((c) => c + 1)}>
        {frames}
      </Keyframes>
    )
  }

  const emptyLine = () => {
    const frames = []

    // cursor animation 10 times
    for (let i = 0; i < 10; i += 1) {
      frames.push(
        <Frame duration={sleepDuration} key={`${i}`}>
          <Line noCaret={i % 2 === 0} />
        </Frame>
      )
    }

    return (
      <Keyframes component="p" onEnd={() => setLineCount((c) => c)}>
        {frames}
      </Keyframes>
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
      <Keyframes component="p" onEnd={() => setLineCount((c) => c + 1)}>
        {frames}
      </Keyframes>
    )
  }

  const borderColor = useColorModeValue('gray.200', 'gray.800')
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box
      fontSize={['0.65rem', 'xs', 'sm', 'md']}
      h={['2xs', '2xs', 'xs', 'sm']}
      w={['full', 'md', 'lg', 'xl']}
      boxShadow={{ base: 'md', lg: 'xl' }}
    >
      <Flex
        rounded="lg"
        border="1px"
        borderColor={borderColor}
        direction="column"
        position="relative"
        height="full"
        _before={{
          rounded: 'lg',
          zIndex: 0,
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '100%',
          content: '""',
          bgColor,
          opacity: useColorModeValue(0.8, 0.95)
        }}
      >
        <Flex
          roundedTop="lg"
          bgColor={bgColor}
          zIndex={1}
          alignItems="center"
          borderBottom="1px"
          borderBottomColor={borderColor}
          h={['1rem', '1.5rem', '1.5rem', '2rem']}
        >
          <Box marginLeft="1" marginTop="auto" w={['3rem', '4rem', '4rem', '6rem']}>
            <Link
              href="https://bit.ly/3uOVmYt"
              target="_blank"
              w={['0.5rem', '0.75rem', '0.75rem', '1rem']}
              h={['0.5rem', '0.75rem', '0.75rem', '1rem']}
              marginLeft={['0.25rem', '0.375rem', '0.375rem', '0.5rem']}
              borderRadius="50%"
              display="inline-block"
              bg="red.400"
            />
            <Box
              w={['0.5rem', '0.75rem', '0.75rem', '1rem']}
              h={['0.5rem', '0.75rem', '0.75rem', '1rem']}
              marginLeft={['0.25rem', '0.375rem', '0.375rem', '0.5rem']}
              borderRadius="50%"
              display="inline-block"
              bg="yellow.400"
            />
            <Box
              w={['0.5rem', '0.75rem', '0.75rem', '1rem']}
              h={['0.5rem', '0.75rem', '0.75rem', '1rem']}
              marginLeft={['0.25rem', '0.375rem', '0.375rem', '0.5rem']}
              borderRadius="50%"
              display="inline-block"
              bg="green.400"
            />
          </Box>
          <Box flex="1" textAlign="center">
            Kir-Dev
          </Box>
          <Box w={['3rem', '4rem', '4rem', '6rem']} />
        </Flex>
        <Box zIndex={1} flex="1" fontFamily="mono" p="3">
          {renderLine('yarn run load:kirdev-blog')}
          {lineCount >= 1 && showLine('Kir-Dev is running in development mode', '[yarn] ')}
          {lineCount >= 2 && renderLine('cat feladatunk.md')}
          {lineCount >= 3 && showLine('Feladatunk a Villanykar hallgatói számára webalkalmazások fejlesztése és üzemeltetése.')}
          {lineCount >= 4 && renderLine('cat technologiaink.md')}
          {lineCount >= 5 && showLine('Technológiáink közé tartozik a Node.js, a Ruby on Rails és a SpringBoot + Kotlin.')}
          {lineCount >= 6 && emptyLine()}
        </Box>
      </Flex>
    </Box>
  )
}

export default Terminal
