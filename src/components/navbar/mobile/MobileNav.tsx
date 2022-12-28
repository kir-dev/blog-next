import { Stack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import React from 'react'
import { NAV_ITEMS } from '../NAV_ITEMS'
import { MobileNavItem } from './MobileNavItem'

export const MobileNav: React.FC = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} navItem={navItem} />
      ))}
    </Stack>
  )
}
