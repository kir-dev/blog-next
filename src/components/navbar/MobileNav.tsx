/* eslint-disable react/no-children-prop */
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Collapse, Flex, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { Link } from 'gatsby'
import React from 'react'
import { NavItem, NAV_ITEMS } from './NavItem'

const MobileNavItem: React.FC<NavItem> = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={children ? '#' : href}
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
              <Text key={child.label} py={2} as={Link} to={child.href}>
                {child.label}
              </Text>
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
        <MobileNavItem key={navItem.label} label={navItem.label} children={navItem.children} href={navItem.href} />
      ))}
    </Stack>
  )
}

export default MobileNav
