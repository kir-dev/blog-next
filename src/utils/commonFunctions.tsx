import { Flex, Icon, useBreakpointValue } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { FaCheckCircle, FaCircle, FaExclamationCircle, FaMoon } from 'react-icons/fa'
import { MemberAvatarCard } from '~components/members-components/MemberAvatarCard'
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
      return <Icon as={FaMoon} color={color + tone} />
    case 'Kész':
    case 'Üzemel':
      return <Icon as={FaCheckCircle} color={color + tone} />
    case 'Áll':
    case 'Megszakadt':
      return <Icon as={FaExclamationCircle} color={color + tone} />
    default:
      return <Icon as={FaCircle} color={color + tone} />
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
