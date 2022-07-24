import { Box, Collapse, Flex, Icon, IconButton, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { FaBars, FaMoon, FaTimes } from 'react-icons/fa'
import { HiOutlineSun } from 'react-icons/hi'
import { KirdevNamed } from '~components/themed-svgs/KirdevNamed'
import { DesktopNav } from './desktop/DesktopNav'
import { MobileNav } from './mobile/MobileNav'

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box fontFamily="heading">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.800', 'white')}
        minH={{ base: '3rem', md: '4.5rem' }}
        maxW={['100%', '100%', '56rem', '72rem']}
        px={4}
        mx="auto"
        alignItems="center"
      >
        <Flex flex={{ base: 1, md: '1' }} ml={{ base: -2, md: 0 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <Icon as={FaTimes} w={5} h={5} /> : <Icon as={FaBars} w={5} h={5} />}
            variant="ghost"
            aria-label="Navigáció megnyitása"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Box
            as={Link}
            to="/"
            display="block"
            rounded="md"
            _hover={{
              textDecoration: 'none',
              color: 'orange.500'
            }}
          >
            <Box textAlign={{ base: 'center', md: 'left' }} mx="2">
              <KirdevNamed style={{ height: '1.25rem' }} />
            </Box>
          </Box>
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} flex={{ base: 1 }} justify={{ base: 'center', md: 'flex-end' }}>
          <Flex display={{ base: 'none', md: 'flex' }} mx={4}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Flex flex={{ base: 1, md: 0 }} mr={{ base: -2, md: 0 }} justify="flex-end">
          <IconButton
            aria-label="Sötét-világos mód váltás"
            icon={colorMode === 'dark' ? <Icon as={HiOutlineSun} w={6} h={6} /> : <Icon as={FaMoon} w={5} h={5} />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}
