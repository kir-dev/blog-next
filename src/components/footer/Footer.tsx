import { Box, Container, Flex, HStack, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaAt, FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa'
import KirdevOriginal from '~components/themed-svgs/KirdevOriginal'
import { FACEBOOK_PAGE_URL, GITHUB_ORG_URL, PUBLIC_EMAIL, YOUTUBE_CHANNEL_URL } from '~utils/configurations'
import SocialButton from './SocialButton'

const socialButtons = [
  {
    href: GITHUB_ORG_URL,
    label: 'GitHub',
    icon: <FaGithub size="2rem" />
  },
  {
    href: YOUTUBE_CHANNEL_URL,
    label: 'YouTube',
    icon: <FaYoutube size="2rem" />
  },
  {
    href: FACEBOOK_PAGE_URL,
    label: 'Facebook',
    icon: <FaFacebook size="2rem" />
  }
]

const Footer: React.FC = () => (
  <Box zIndex={1}>
    <Box borderTopWidth={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Container maxW="6xl" py={4}>
        <Flex flexDirection={{ base: 'column-reverse', sm: 'row' }}>
          <Flex flex={1} justifyContent={{ base: 'center', sm: 'flex-start' }}>
            <HStack>
              <KirdevOriginal style={{ height: '3rem' }} />
              <Link href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss">
                <Image height="1.75rem" src="/svg/powered-by-vercel.svg" alt="Vercel Logo" />
              </Link>
            </HStack>
          </Flex>

          <Box py={{ base: 4, sm: 0 }} flex={1} textAlign="center">
            <FaAt style={{ display: 'inline' }} size="0.75rem" />
            &nbsp;
            <span>{PUBLIC_EMAIL}</span>
            <Text>&copy; {new Date().getFullYear()} Kir-Dev</Text>
          </Box>

          <Flex flex={1} textAlign="right" justifyContent={{ base: 'center', sm: 'flex-end' }}>
            <HStack spacing={3}>
              {socialButtons.map((btn) => (
                <SocialButton key={btn.label} label={btn.label} href={btn.href} size="3rem">
                  {btn.icon}
                </SocialButton>
              ))}
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  </Box>
)

export default Footer
