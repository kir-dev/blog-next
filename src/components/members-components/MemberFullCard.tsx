import { Badge, Box, chakra, Flex, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { FaBriefcase, FaCalendar, FaHeart, FaUserCircle } from 'react-icons/fa'
import { MemberProps } from '../../types/member.props'
import { PEK_URL } from '../../utils/configurations'

const MemberFullCard: React.FC<{ member: MemberProps }> = ({ member }) => {
  const originalAvatarImage = getImage(member.avatar)
  const originalAvatarComponent = originalAvatarImage ? (
    <GatsbyImage image={originalAvatarImage} alt="avatar" style={{ width: '100%', height: '12rem' }} objectFit="contain" />
  ) : null
  // const funnyAvatarComponent = <Image src="../../../coffee.png" objectFit="contain" w="full" />

  const [avatarComponent, setAvatarComponent] = useState(originalAvatarComponent)
  const onOverlayEnter = () => null // setAvatarComponent(funnyAvatarComponent)
  const onOverlayLeave = () => null // setAvatarComponent(originalAvatarComponent)

  return (
    <Flex my={6} direction={{ base: 'column', sm: 'row' }} w="full" overflow="hidden">
      {avatarComponent && (
        <Flex flex={1} h="12rem" position="relative" mb={4} mr={6} onMouseEnter={onOverlayEnter} onMouseLeave={onOverlayLeave}>
          <Box w={{ base: 'inherit', sm: '90%' }} zIndex={2} transition="all 300ms ease">
            {avatarComponent}
          </Box>
          <Box zIndex={1} w="100%" h="100%" position="absolute" ml={1} mt={1}>
            <Box bgGradient="radial(orange.400 1px, transparent 1px)" bgSize={{ base: '1.5rem 1.5rem', sm: '1rem 1rem' }} h="100%" />
          </Box>
        </Flex>
      )}
      <Flex flexWrap="wrap" flex={{ base: 1, sm: 1, md: 2, lg: 3 }}>
        <Box lineHeight="taller">
          <Heading fontSize="2xl" fontWeight="bold">
            {member.realName}
          </Heading>
          <Flex alignItems="center">
            <FaUserCircle />
            <Text pl={3} fontSize="sm" as={Link} href={`${PEK_URL}/profiles/${member.pekUsername}`}>
              {member.pekUsername}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <FaBriefcase />
            <Text pl={3} fontSize="sm">
              {member.position}
              <chakra.span fontStyle="italic">{!member.active && ' - inaktív'}</chakra.span>
            </Text>
          </Flex>
          <Flex alignItems="center">
            <FaCalendar />
            <Text pl={3} fontSize="sm">
              {member.joinDate} óta a csapatban
            </Text>
          </Flex>
          {member.interests && (
            <Flex flexWrap="wrap" alignItems="center">
              <FaHeart />
              <Text pl={3} fontSize="sm">
                Érdeklődés:
              </Text>
              {member.interests.map((interest) => (
                <Badge
                  key={interest}
                  lineHeight="base"
                  px={1}
                  ml={1}
                  color="white"
                  bg={useColorModeValue('blue.400', 'orange.600')}
                  fontWeight="600"
                >
                  {interest.trim()}
                </Badge>
              ))}
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default MemberFullCard
