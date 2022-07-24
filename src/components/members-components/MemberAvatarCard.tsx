import { Avatar, Badge, Box, Flex, HStack, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { BiMicrophoneOff } from 'react-icons/bi'
import { MemberProps } from '~types/member.props'
import { environment } from '~utils/configurations'

type Props = {
  member: MemberProps
  height: any
  avatarBoxSize: any
}

export const MemberAvatarCard = ({ member, height = '12rem', avatarBoxSize = '10rem' }: Props) => {
  const [overlayShown, setOverlayShown] = useState(false)
  const onOverlayEnter = () => setOverlayShown(true)
  const onOverlayLeave = () => setOverlayShown(false)

  return (
    <Box
      as="a"
      href={`${environment.pekUrl}/profiles/${member.pekUsername}`}
      target="_blank"
      pos="relative"
      h={height}
      w="full"
      bgColor="gray.700"
      borderRadius="lg"
      onMouseOver={onOverlayEnter}
      onMouseLeave={onOverlayLeave}
    >
      <Flex h={height} alignItems="center" justifyContent="center">
        <Avatar
          name={member.realName}
          src={member.normalImageUrl}
          size={member.normalImageUrl ? undefined : { base: 'xl', lg: '2xl' }}
          boxSize={member.normalImageUrl ? avatarBoxSize : undefined}
        />
      </Flex>
      <HStack pos="absolute" bottom={0} left={0} zIndex={10} m={2} px={2} fontSize="md" spacing={2}>
        <Box color="gray.100" textShadow="1px 1px 1px #000000, 2px 2px 4px #000000" fontFamily="heading">
          {member.realName}
        </Box>
      </HStack>
      <Box pos="absolute" top={0} right={0} zIndex={10} m={2} fontSize="md" bgColor="gray.800" borderRadius="full">
        <Icon as={BiMicrophoneOff} color="gray.100" w={4} h={4} mx={3} mt={3} mb={2} />
      </Box>
      <Badge pos="absolute" top={0} left={0} zIndex={10} m={3} px={1} color="gray.100" bg="gray.800">
        {member.position}
      </Badge>
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
      >
        <Flex h={height} alignItems="center" justifyContent="center">
          <Avatar
            name={member.realName}
            src={member.funnyImageUrl || member.normalImageUrl}
            size={member.funnyImageUrl || member.normalImageUrl ? undefined : { base: 'xl', lg: '2xl' }}
            boxSize={member.normalImageUrl || member.normalImageUrl ? avatarBoxSize : undefined}
          />
        </Flex>
      </Box>
    </Box>
  )
}
