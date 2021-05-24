import { Box, Container, HStack, Img, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaAt, FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa'
import SocialButton from './SocialButton'

const Footer: React.FC = () => (
  <Box textAlign="center" zIndex={1} mt={32}>
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
          <Img src="../../kirdev.png" h="12" />
          <Text>&copy; 2021 Kir-Dev</Text>
        </HStack>
        <Box>
          <FaAt style={{ display: 'inline' }} />
          &nbsp;
          <span>kir-dev [kukac] sch.bme.hu</span>
        </Box>
        <Stack direction="row" spacing={3}>
          <SocialButton label="GitHub" href="https://github.com/kir-dev" size={12}>
            <FaGithub />
          </SocialButton>
          <SocialButton label="YouTube" href="https://youtube.com/channel/UCkpMTj9qST_7RDt2YL4RUEw" size={12}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label="Facebook" href="https://facebook.com/kirdevteam" size={12}>
            <FaFacebook />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  </Box>
)

export default Footer
