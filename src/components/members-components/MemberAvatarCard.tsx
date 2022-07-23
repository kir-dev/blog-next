import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import { FaMicrophoneSlash } from 'react-icons/fa'
import { MemberProps } from '~types/member.props'
import { environment } from '~utils/configurations'

type Props = {
  member: MemberProps
}

export const MemberAvatarCard = ({ member }: Props) => {
  const featuredImage = getImage(member.featuredImage)
  const funnyImage = getImage(member.funnyImage)

  const [overlayShown, setOverlayShown] = useState(false)
  const onOverlayEnter = () => setOverlayShown(true)
  const onOverlayLeave = () => setOverlayShown(false)

  return (
    <Box
      as={Link}
      to={`${environment.pekUrl}/profiles/${member.pekUsername}`}
      pos="relative"
      h="12rem"
      w="full"
      bgGradient="linear(to-t, black, 20%, gray.900)"
      onMouseOver={onOverlayEnter}
      onMouseLeave={onOverlayLeave}
    >
      {featuredImage ? (
        <GatsbyImage image={featuredImage} alt="avatar" style={{ width: '100%', height: '12rem' }} objectFit="contain" />
      ) : (
        <Flex h="12rem" alignItems="center" textAlign="center">
          <Text color="gray.100" flex={1} fontSize="2xl">
            {member.realName}
          </Text>
        </Flex>
      )}
      <Box pos="absolute" bottom={0} left={0} zIndex={2} px={2} fontSize="md" bgColor="rgb(0, 0, 0, 0.75)">
        <chakra.span color="red.400">
          <FaMicrophoneSlash style={{ display: 'inline' }} />
        </chakra.span>
        {featuredImage && <chakra.span color="gray.100">&nbsp;{member.realName}</chakra.span>}
      </Box>
      <Box
        pos="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        h="full"
        w="full"
        zIndex={1}
        opacity={overlayShown ? 1 : 0}
        transition="200ms ease"
        bgColor={funnyImage ? 'rgb(0, 0, 0, 0)' : 'rgb(0, 0, 0, 0.7)'}
      >
        {funnyImage ? (
          <GatsbyImage image={funnyImage} alt="avatar" style={{ width: '100%', height: '12rem' }} objectFit="contain" />
        ) : (
          <Flex fontSize="sm" direction="column" h="full" justifyContent="center" alignItems="center" color="white">
            <Text fontSize="lg">{member.realName}</Text>
            <Badge lineHeight="base" px={1} color="white" bg="orange.600" fontWeight="600">
              {member.position}
            </Badge>
            <Text mt={4}>{member.joinDate} óta a csapatban</Text>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
