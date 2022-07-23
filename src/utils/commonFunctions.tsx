import { Flex, Icon, useBreakpointValue } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import {
  FaCheckCircle,
  FaCircle,
  FaExclamationCircle,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaMoon,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
import { MemberAvatarCard } from '~components/members-components/MemberAvatarCard'
import { AllMarkdownRemark } from '~types/page-props/members.props'
import { environment } from './configurations'

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

type SocialId = 'github' | 'youtube' | 'facebook' | 'insta' | 'twitter'
type SocialItem = {
  id: SocialId
  url: string
  Icon: IconType
  shortText: string
  longText: string
}
const SOCIALS: SocialItem[] = [
  { id: 'github', url: environment.githubOrgUrl, Icon: FaGithub, shortText: 'GitHub', longText: 'GitHub szervezetünk' },
  { id: 'youtube', url: environment.youtubeUrl, Icon: FaYoutube, shortText: 'YouTube', longText: 'YouTube csatornánk' },
  { id: 'facebook', url: environment.facebookUrl, Icon: FaFacebook, shortText: 'Facebook', longText: 'Facebook oldalunk' },
  { id: 'insta', url: environment.instagramUrl, Icon: FaInstagram, shortText: 'Instagram', longText: 'Instagram oldalunk' },
  {
    id: 'twitter',
    url: `https://twitter.com/${environment.twitterUsername}`,
    Icon: FaTwitter,
    shortText: 'Twitter',
    longText: 'Twitter oldalunk'
  }
]

export const getSocials = (socialIds: SocialId[] = []) => {
  if (socialIds.length === 0) return SOCIALS
  else return SOCIALS.filter((social) => socialIds.includes(social.id))
}
