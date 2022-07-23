import { CheckIcon, MoonIcon, WarningIcon } from '@chakra-ui/icons'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { MemberAvatarCard } from '~components/members-components/MemberAvatarCard'
import { CircleIcon } from '~components/project-components/CircleIcon'
import { AllMarkdownRemark } from '~types/page-props/members.props'

export const readTimeInMinutes = (wordCount: number) => {
  const wpm = 200
  return Math.ceil(wordCount / wpm)
}

export const getIcon = (status: { label: string; color: string }): JSX.Element => {
  let { color } = status
  color = color.trim()
  color = color === 'grey' ? 'gray' : color
  const tone: string = color === 'gray' ? useColorModeValue('.600', '.400') : '.500'
  switch (status.label) {
    case 'Archivált':
      return <MoonIcon color={color + tone} />
    case 'Kész':
    case 'Üzemel':
      return <CheckIcon color={color + tone} />
    case 'Áll':
    case 'Megszakadt':
      return <WarningIcon color={color + tone} />
    default:
      return <CircleIcon color={color + tone} />
  }
}

export const getMemberCollage = ({ nodes }: AllMarkdownRemark): JSX.Element[] =>
  nodes.map((member) => (
    <Flex
      py={{ base: 2, sm: 1 }}
      px={{ base: 0, sm: 1 }}
      flex={`0 0 ${useBreakpointValue({ base: '100%', sm: '50%', md: '33%', lg: '25%' })}`}
      key={member.fields.slug}
    >
      <MemberAvatarCard member={member} />
    </Flex>
  ))
