import { Badge, Box, chakra, Flex, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { FaBriefcase, FaCalendar, FaHeart, FaUserCircle } from 'react-icons/fa'
import { MemberProps } from '~types/member.props'
import { PEK_URL } from '~utils/configurations'

const MemberFullCard: React.FC<{ member: MemberProps }> = ({ member }) => {
  const featuredImage = getImage(member.featuredImage)
  const funnyImage = getImage(member.funnyImage)

  const [overlayShown, setOverlayShown] = useState(false)
  const onOverlayEnter = () => setOverlayShown(true)
  const onOverlayLeave = () => setOverlayShown(false)

  return (
    <Flex my={6} display={{ base: 'block', sm: 'flex' }} direction={{ base: 'column', sm: 'row' }} w="full" overflow="hidden">
      <Flex
        flex={1}
        mr={{ base: 0, sm: 6 }}
        mb={{ base: 4, sm: 0 }}
        height="13rem"
        onMouseOver={onOverlayEnter}
        onMouseLeave={onOverlayLeave}
        position="relative"
        transition="all 300ms ease"
      >
        <Box position="absolute" zIndex={2} top={0} right={0}>
          {featuredImage && <GatsbyImage image={featuredImage} alt="img" style={{ width: '12rem', height: '100%' }} objectFit="contain" />}
        </Box>
        <Box position="absolute" zIndex={3} top={0} right={0} opacity={overlayShown ? 1 : 0} transition="200ms ease">
          {funnyImage && <GatsbyImage image={funnyImage} alt="funny" style={{ width: '12rem', height: '100%' }} objectFit="contain" />}
        </Box>
        <Box zIndex={1} w="full" h="full" position="absolute" top={0} left={0}>
          <Box bgGradient="radial(orange.400 1px, transparent 1px)" bgSize={{ base: '1.5rem 1.5rem', sm: '1rem 1rem' }} h="full" />
        </Box>
      </Flex>

      <Flex flexWrap="wrap" flex={{ base: 1, sm: 1, md: 2, lg: 3 }}>
        <Box lineHeight="taller">
          <Heading fontSize="2xl" fontWeight="bold">
            {member.realName}
          </Heading>
          <Flex alignItems="center" mt={4}>
            <FaUserCircle />
            <Text pl={3} fontSize="sm" as={Link} href={`${PEK_URL}/profiles/${member.pekUsername}`}>
              profiles/{member.pekUsername}
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
          {member.interests?.length > 0 && (
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
