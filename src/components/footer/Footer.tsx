import { Box, Container, Flex, HStack, Icon, Image, Link, Text, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { KirdevOriginal } from 'components/themed-svgs/KirdevOriginal'
import React from 'react'
import { FaAt } from 'react-icons/fa'
import { getSocials } from 'utils/commonFunctions'
import { environment } from 'utils/configurations'
import { SocialButton } from './SocialButton'

export const Footer: React.FC = () => (
  <Box zIndex={1}>
    <Box borderTopWidth={1} pt={4} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <VStack>
        <Text fontWeight="bold" px={0.5} bgClip="text" bgGradient="linear(to-r, tomato, orange.300)">
          Támogatóink
        </Text>
        <Flex gap={3} flexDirection={{ base: 'column', sm: 'row' }} alignItems="center">
          <Link isExternal href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss">
            <Image height="1.75rem" src="/svg/powered-by-vercel.svg" alt="Vercel Logo" />
          </Link>
          <Link isExternal href="https://rackhost.hu">
            <Image height="1.75rem" src="/rackhost.png" alt="Rackhost Logo" objectFit="contain" />
          </Link>
          <Link isExternal href="https://betteruptime.com/">
            <Image
              height="3.5rem"
              alt="Better Uptime Website Monitoring"
              src="https://betteruptime.com/assets/static_assets/badges/light.png"
            />
          </Link>
        </Flex>
      </VStack>
      <Container maxW="6xl" py={4}>
        <Flex flexDirection={{ base: 'column-reverse', sm: 'row' }}>
          <Flex flex={1} justifyContent={{ base: 'center', sm: 'flex-start' }}>
            <HStack>
              <KirdevOriginal style={{ height: '4rem' }} />
            </HStack>
          </Flex>

          <Box py={{ base: 4, sm: 0 }} flex={1} textAlign="center">
            <FaAt style={{ display: 'inline' }} size="0.75rem" />
            &nbsp;
            <span>{environment.socials.publicEmail}</span>
            <Text>&copy; {new Date().getFullYear()} Kir-Dev</Text>
          </Box>

          <Flex flex={1} textAlign="right" justifyContent={{ base: 'center', sm: 'flex-end' }}>
            <HStack spacing={3}>
              {getSocials(['github', 'facebook', 'youtube']).map((social) => (
                <SocialButton key={social.shortText} label={social.shortText} href={social.url} size="3rem">
                  <Icon as={social.Icon} h="2rem" w="2rem" />
                </SocialButton>
              ))}
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  </Box>
)
