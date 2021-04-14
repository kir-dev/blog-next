/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import * as React from 'react'

// Source: https://chakra-templates.dev/navigation/navbar
interface NavItem {
  label: string
  children?: Array<NavItem>
  href: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Kezdőlap',
    href: '/'
  },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      {
        label: 'Legújabb posztok',
        href: '/blog'
      },
      {
        label: 'Archívum',
        href: '/archive'
      }
    ]
  },
  {
    label: 'Rólunk',
    href: '/about',
    children: [
      {
        label: 'Csapatunk',
        href: '/about'
      },
      {
        label: 'Projektjeink',
        href: '/projects'
      }
    ]
  },
  {
    label: 'Tanfolyam',
    href: '/courses'
  },
  {
    label: 'Elérhetőség',
    href: '/contact'
  }
]

const DesktopSubNav: React.FC<NavItem> = ({ label, href }) => {
  return (
    <Link href={href} role="group" display="block" p={2} rounded="md" _hover={{ bg: useColorModeValue('orange.50', 'gray.900') }}>
      <Stack direction="row" align="center">
        <Box>
          <Text transition="all .3s ease" _groupHover={{ color: 'orange.500' }} fontWeight={500}>
            {label}
          </Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="orange.500" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const DesktopNav: React.FC = () => {
  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                _hover={{
                  textDecoration: 'none',
                  color: 'orange.500'
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow="xl" bg={useColorModeValue('white', 'gray.800')} p={4} rounded="xl" maxW="2xs">
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const MobileNavItem: React.FC<NavItem> = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={children ? '#' : href}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text color={useColorModeValue('gray.800', 'gray.200')}>{label}</Text>
        {children && <Icon as={ChevronDownIcon} transition="all .25s ease-in-out" transform={isOpen ? 'rotate(180deg)' : ''} w={6} h={6} />}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0' }}>
        <Stack pl={4} borderLeft={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.800')} align="start">
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const MobileNav: React.FC = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const WithSubnavigation: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const logoColor1 = useColorModeValue('#343434', '#ffffff')
  const logoColor2 = useColorModeValue('#000000', '#ffffff')
  const logoColor3 = '#F15A29'

  return (
    <Box align="center">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.800', 'white')}
        minH={{ base: '3rem', md: '4.5rem' }}
        maxW={['100%', '100%', '720px', '1280px']}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
      >
        <Flex flex={{ base: 1, md: '1' }} ml={{ base: -2, md: 0 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Navigáció megnyitása"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link
            href="/"
            display="block"
            rounded="md"
            _hover={{
              textDecoration: 'none',
              color: 'orange.500'
            }}
          >
            <Box textAlign={{ base: 'center', md: 'left' }} mx="2">
              <svg height="20" viewBox="0 0 145 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill={logoColor1}>
                  <path d="M60.3807 11.1986H55.7419L50.9485 16.7582V4.00025H47V25.7199H50.9485V19.9184L56.1272 25.7199H61.1353L54.2975 18.3661L60.3807 11.1986Z" />
                  <path d="M64.6822 4.48218C64.0934 4.48218 63.5747 4.69197 63.1252 5.112C62.6761 5.53149 62.4513 6.04241 62.4513 6.64315C62.4513 7.21348 62.6732 7.71869 63.1174 8.15932C63.5612 8.59996 64.0828 8.82001 64.6822 8.82001C65.3029 8.82001 65.8299 8.59996 66.2634 8.15932C66.6966 7.71869 66.9131 7.21348 66.9131 6.64315C66.9131 6.05267 66.6937 5.54514 66.2552 5.11949C65.8163 4.69473 65.2923 4.48218 64.6822 4.48218Z" />
                  <path d="M62.708 25.7198H66.6565V11.1985H62.708V25.7198Z" />
                  <path d="M79.3043 10.9188C78.4376 10.9188 77.6404 11.2326 76.9128 11.8595C76.1848 12.4869 75.4627 13.4998 74.7457 14.8989H74.6815V11.1988H70.7335V25.7197H74.6815V19.0967C74.6815 18.3714 74.8608 17.6456 75.2195 16.9198C75.5777 16.195 76.0539 15.6116 76.648 15.171C77.2416 14.7308 77.8439 14.5103 78.4535 14.5103C79.1491 14.5103 80.0695 14.9251 81.2142 15.7539L82.6267 12.4116C81.9528 11.8726 81.3612 11.4891 80.8531 11.2606C80.3446 11.033 79.8283 10.9188 79.3043 10.9188Z" />
                  <path d="M83.7501 20.3406H92.0642V16.6713H83.7501V20.3406Z" />
                  <path d="M106.077 22.7969H104.006C100.807 22.7969 99.207 21.2372 99.207 18.1172C99.207 16.8215 99.6005 15.775 100.386 14.9767C101.173 14.1787 102.224 13.7793 103.541 13.7793C104.418 13.7793 105.263 13.9816 106.077 14.3858V22.7969ZM106.077 11.5252C104.889 11.1206 103.77 10.9188 102.722 10.9188C101.363 10.9188 100.098 11.2372 98.9261 11.8749C97.7543 12.5123 96.834 13.3907 96.1654 14.5103C95.4963 15.6294 95.1624 16.8735 95.1624 18.2413C95.1624 20.553 95.8816 22.3773 97.3213 23.7142C98.7598 25.051 100.678 25.7197 103.075 25.7197H110.009V4.00001H106.077V11.5252Z" />
                  <path d="M117.28 16.9045C117.44 15.7957 117.823 14.9561 118.427 14.3858C119.032 13.816 119.832 13.5308 120.827 13.5308C121.801 13.5308 122.566 13.8291 123.122 14.4247C123.678 15.0212 124.01 15.8472 124.118 16.9045H117.28ZM120.667 10.9189C118.441 10.9189 116.635 11.6184 115.25 13.0176C113.864 14.4172 113.171 16.2204 113.171 18.4282C113.171 20.7188 113.92 22.5534 115.418 23.932C116.916 25.3104 118.847 25.9998 121.212 25.9998C123.716 25.9998 125.845 25.399 127.601 24.1961V21.351C126.67 21.9939 125.768 22.4734 124.896 22.7889C124.023 23.1055 123.116 23.2633 122.175 23.2633C120.709 23.2633 119.556 22.9135 118.717 22.214C117.876 21.5144 117.376 20.517 117.216 19.221H127.825V18.6459C127.825 16.2312 127.183 14.3389 125.899 12.9712C124.615 11.603 122.87 10.9189 120.667 10.9189Z" />
                  <path d="M140.361 11.1986L136.846 19.6097L133.25 11.1986H129.013L135.882 25.9995H137.793L144.566 11.1986H140.361Z" />
                </g>
                <g fill={logoColor2}>
                  <path d="M21.0613 2.53028C22.285 2.53028 23.512 2.50279 24.7352 2.53513C25.2 2.54727 25.6638 2.58397 26.1247 2.64508L25.7856 2.59888C26.7061 2.72316 27.6122 2.95045 28.47 3.30664L28.1652 3.17913C28.8355 3.45668 29.4673 3.8182 30.0449 4.25485L29.7867 4.05712C30.2827 4.43547 30.7281 4.8748 31.1123 5.36453L30.9126 5.10859C31.2634 5.55927 31.5547 6.0525 31.7795 6.5763L31.6508 6.27416C31.8685 6.78505 32.0173 7.32209 32.0936 7.87146C32.0781 7.7592 32.0626 7.64709 32.047 7.53514C32.1188 8.06929 32.1188 8.61052 32.047 9.14468C32.0626 9.03257 32.0781 8.92046 32.0936 8.80836C32.022 9.32659 31.8825 9.83335 31.6786 10.3158L31.8072 10.0134C31.5995 10.499 31.33 10.9562 31.0053 11.374L31.2048 11.1178C30.852 11.5675 30.4432 11.971 29.9881 12.3189L30.2463 12.1212C29.6954 12.5377 29.0929 12.8825 28.4535 13.147L28.7583 13.0195C27.8844 13.3831 26.9592 13.6099 26.0212 13.7356L26.3605 13.6894C25.5998 13.7892 24.8373 13.8102 24.0713 13.8102H21.0613C20.3654 13.8102 19.7849 14.3858 19.7849 15.0753C19.7849 15.7649 20.3654 16.3405 21.0613 16.3405C22.2452 16.3405 23.4295 16.3502 24.6131 16.3405C26.7124 16.322 28.865 15.9101 30.6991 14.8608C32.1076 14.0548 33.3467 12.8204 33.9953 11.3266C34.168 10.9288 34.3271 10.5325 34.4329 10.1118C34.5387 9.6912 34.5977 9.26318 34.6341 8.83515C34.6977 8.08513 34.6135 7.312 34.4381 6.58184C34.0696 5.04876 33.1642 3.6224 31.9771 2.58225C30.553 1.3349 28.7674 0.547229 26.9009 0.226153C26.0172 0.0744927 25.122 -0.00116867 24.2251 1.36437e-05H21.0613C20.3657 1.36437e-05 19.7849 0.575641 19.7849 1.26515C19.7849 1.95465 20.3657 2.53028 21.0613 2.53028Z" />
                  <path d="M13.3603 13.8411C10.8819 13.8493 8.46097 14.5818 6.40041 15.9468C4.33417 17.3277 2.67291 19.2254 1.585 21.4476C0.557189 23.5527 0.022025 25.8606 0.0194092 28.1992C0.0194092 28.8887 0.600855 29.4644 1.29603 29.4644C1.9912 29.4644 2.57242 28.8887 2.57242 28.1992C2.57294 27.5497 2.61685 26.9009 2.70385 26.2571L2.65841 26.5934C2.82648 25.3679 3.15683 24.1696 3.64093 23.0297L3.51229 23.3318C3.96197 22.2797 4.54516 21.2887 5.24777 20.3828L5.04805 20.6389C5.70633 19.7944 6.46997 19.0359 7.32071 18.3817L7.06226 18.5797C7.85968 17.9702 8.73215 17.4638 9.65861 17.0727L9.35402 17.2002C10.2689 16.8183 11.2306 16.5575 12.2142 16.4245L11.8749 16.4707C12.3675 16.4061 12.8638 16.3734 13.3608 16.3728C14.0564 16.3728 14.6371 15.7981 14.6371 15.1076C14.6371 14.4172 14.0564 13.8414 13.3605 13.8423L13.3603 13.8411Z" />
                  <path d="M15.9185 1.26513V28.1986C15.9185 28.8881 16.4992 29.4637 17.1948 29.4637C17.8905 29.4637 18.4715 28.8881 18.4715 28.1986V1.26513C18.4715 0.575627 17.8907 0 17.1948 0C16.499 0 15.9185 0.575396 15.9185 1.26513Z" />
                </g>
                <g fill={logoColor3}>
                  <path d="M0.0163581 1.26559C0.0196207 3.93006 0.648376 6.57097 1.88072 8.9407C3.01098 11.1157 4.70336 13.0061 6.76953 14.347C8.73009 15.6137 11.0179 16.2925 13.3582 16.3019C14.054 16.3019 14.6348 15.7244 14.6348 15.0368C14.6348 14.3491 14.054 13.7728 13.3582 13.7716C12.8857 13.7712 12.4138 13.7404 11.9455 13.6792L12.2848 13.7254C11.3454 13.5985 10.4269 13.3499 9.55278 12.9863L9.85784 13.1138C8.93497 12.7253 8.0666 12.2202 7.27431 11.6112L7.53275 11.8091C6.67917 11.1489 5.91245 10.3852 5.25054 9.53596L5.45003 9.7919C4.69988 8.82456 4.07846 7.76555 3.60105 6.64096L3.72993 6.94333C3.2067 5.7037 2.84996 4.40133 2.66887 3.06963L2.71245 3.40387C2.617 2.69503 2.56881 1.98072 2.5682 1.26559C2.56843 0.575858 1.99001 0 1.29274 0C0.595475 0 0.0156589 0.575396 0.0163581 1.26513V1.26559Z" />
                  <path d="M34.9444 28.1993C34.9409 25.6256 34.2653 23.0655 32.9761 20.8307C31.7501 18.7056 29.9512 16.8902 27.8184 15.6537C25.7661 14.4696 23.4348 13.8434 21.0601 13.8384C20.3642 13.8384 19.7837 14.4147 19.7837 15.1035C19.7837 15.7923 20.3644 16.3677 21.0601 16.3686C21.6046 16.3693 22.1484 16.4056 22.6881 16.4772L22.3488 16.431C23.4102 16.5752 24.4478 16.8576 25.4348 17.2707L25.1309 17.1436C26.1122 17.5582 27.0363 18.0948 27.8808 18.7407L27.6224 18.5427C28.4952 19.2142 29.2789 19.9922 29.9549 20.8584L29.7552 20.6025C30.462 21.5115 31.0477 22.5071 31.4979 23.5644L31.3693 23.2623C31.8352 24.3644 32.1528 25.5226 32.3138 26.7068C32.2983 26.5947 32.2827 26.4826 32.2672 26.3705C32.3481 26.9771 32.389 27.5883 32.3898 28.2002C32.3898 28.8897 32.9696 29.4653 33.6662 29.4653C34.3627 29.4653 34.9435 28.8897 34.9426 28.2002L34.9444 28.1993Z" />
                </g>
              </svg>
            </Box>
          </Link>
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} flex={{ base: 1 }} justify={{ base: 'center', md: 'flex-end' }}>
          <Flex display={{ base: 'none', md: 'flex' }} mx={4}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Flex flex={{ base: 1, md: 0 }} mr={{ base: -2, md: 0 }} justify="flex-end">
          <IconButton
            aria-label="Sötét-világos mód váltás"
            icon={colorMode === 'dark' ? <SunIcon w={5} h={5} /> : <MoonIcon w={5} h={5} />}
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

export default WithSubnavigation
