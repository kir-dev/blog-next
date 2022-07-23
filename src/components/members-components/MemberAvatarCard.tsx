import { Avatar, Badge, Box, Flex, HStack, Icon } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import { BiMicrophoneOff } from 'react-icons/bi'
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
      target="_blank"
      pos="relative"
      h="12rem"
      w="full"
      bgColor="gray.700"
      borderRadius="lg"
      onMouseOver={onOverlayEnter}
      onMouseLeave={onOverlayLeave}
    >
      {featuredImage ? (
        <GatsbyImage image={featuredImage} alt="avatar" style={{ width: '100%', height: '12rem' }} objectFit="contain" />
      ) : (
        <Flex h="12rem" alignItems="center" justifyContent="center">
          <Avatar name={member.realName} src="" px={2} size="xl" colorScheme="blue" />
        </Flex>
      )}
      <HStack pos="absolute" bottom={0} left={0} zIndex={2} m={1} bgColor="gray.800" color="gray.100" borderRadius="lg" px={2} spacing={1}>
        <Box fontSize="md">{member.realName}</Box>
        <Badge lineHeight="base" px={1} bg="gray.600" color="white" fontSize="xs" fontWeight="600">
          {member.position}
        </Badge>
      </HStack>
      <Box pos="absolute" top={0} right={0} zIndex={2} m={2} px={1} fontSize="md" bgColor="gray.800" color="gray.100" borderRadius="full">
        <Icon as={BiMicrophoneOff} w={4} h={4} mt={1} />
      </Box>
      <Box
        pos="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        h="full"
        w="full"
        borderRadius="lg"
        zIndex={1}
        opacity={overlayShown ? 1 : 0}
        transition="200ms ease"
      >
        {funnyImage && <GatsbyImage image={funnyImage} alt="avatar" style={{ width: '100%', height: '12rem' }} objectFit="contain" />}
      </Box>
    </Box>
  )
}
