import { Box } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'

type Props = {
  text?: string
  name?: string
  noPrompt?: boolean
  noCaret?: boolean
}

export const Line = ({ text, name, noPrompt = false, noCaret = false }: Props) => {
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
