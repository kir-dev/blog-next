import { Box, chakra, Flex, Text } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { FaMicrophoneSlash } from 'react-icons/fa'
import { MemberProps } from '../../templates/member'

const MemberCard: React.FC<MemberProps> = ({ member }) => {
  const avatar = getImage(member.frontmatter.featuredImage)

  return (
    <Box as={Link} to={member.fields.slug} pos="relative" h="12rem" bgGradient="linear(to-t, black, 20%, gray.900)">
      <Box>
        <Link to={member.fields.slug}>
          {avatar ? (
            <GatsbyImage image={avatar} alt="avatar" style={{ width: '100%', height: '12rem' }} objectFit="cover" />
          ) : (
            <Flex h="12rem" alignItems="center" textAlign="center">
              <Text color="gray.100" flex={1} fontSize="2xl">
                {member.frontmatter.realName}
              </Text>
            </Flex>
          )}
        </Link>
      </Box>
      <Box pos="absolute" bottom={0} left={0} px={2} fontSize="md" bgColor="rgb(0, 0, 0, 0.75)">
        <chakra.span color="red.400">
          <FaMicrophoneSlash style={{ display: 'inline' }} />
        </chakra.span>
        {avatar && <chakra.span color="gray.100">&nbsp;{member.frontmatter.realName}</chakra.span>}
      </Box>
    </Box>
  )
}

export default MemberCard
