import { Box, Container, Flex, HStack, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaAt, FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa'
import KirdevLogo from '~assets/images/kirdev.svg'
import VercelLogo from '~assets/images/powered-by-vercel.svg'
import { FACEBOOK_PAGE_URL, GITHUB_ORG_URL, PUBLIC_EMAIL, YOUTUBE_CHANNEL_URL } from '~utils/configurations'
import SocialButton from './SocialButton'

const Footer: React.FC = () => (
  <Box zIndex={1}>
    <Box borderTopWidth={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Container maxW="6xl" py={4}>
        <Flex flexDirection={{ base: 'column-reverse', sm: 'row' }}>
          <Flex flex={1} justifyContent={{ base: 'center', sm: 'flex-start' }}>
            <HStack>
              <KirdevLogo height="3rem" style={{ fill: useColorModeValue('black', 'white') }} />
              <Link href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss">
                <VercelLogo height="1.75rem" />
              </Link>
            </HStack>
          </Flex>

          <Box py={{ base: 4, sm: 0 }} flex={1} textAlign="center">
            <FaAt style={{ display: 'inline' }} />
            &nbsp;
            <span>{PUBLIC_EMAIL}</span>
            <Text>&copy; 2021 Kir-Dev</Text>
          </Box>

          <Flex flex={1} textAlign="right" justifyContent={{ base: 'center', sm: 'flex-end' }}>
            <HStack spacing={3}>
              <SocialButton label="GitHub" href={GITHUB_ORG_URL} size={12}>
                <FaGithub />
              </SocialButton>
              <SocialButton label="YouTube" href={YOUTUBE_CHANNEL_URL} size={12}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label="Facebook" href={FACEBOOK_PAGE_URL} size={12}>
                <FaFacebook />
              </SocialButton>
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  </Box>
)

export default Footer
