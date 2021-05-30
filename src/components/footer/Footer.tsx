import { Box, Container, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaAt, FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa'
import Logo from '../../assets/images/kirdev.svg'
import { FACEBOOK_PAGE_URL, GITHUB_ORG_URL, PUBLIC_EMAIL, YOUTUBE_CHANNEL_URL } from '../../utils/configurations'
import SocialButton from './SocialButton'

const Footer: React.FC = () => (
  <Box textAlign="center" zIndex={1} mt={12}>
    <Box borderTopWidth={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <HStack>
          <Logo height="3rem" style={{ fill: useColorModeValue('black', 'white') }} />
          <Text>&copy; 2021 Kir-Dev</Text>
        </HStack>
        <Box>
          <FaAt style={{ display: 'inline' }} />
          &nbsp;
          <span>{PUBLIC_EMAIL}</span>
        </Box>
        <Stack direction="row" spacing={3}>
          <SocialButton label="GitHub" href={GITHUB_ORG_URL} size={12}>
            <FaGithub />
          </SocialButton>
          <SocialButton label="YouTube" href={YOUTUBE_CHANNEL_URL} size={12}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label="Facebook" href={FACEBOOK_PAGE_URL} size={12}>
            <FaFacebook />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  </Box>
)

export default Footer
