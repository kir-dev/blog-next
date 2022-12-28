import { Box, Popover, PopoverContent, PopoverTrigger, Stack, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { Link } from 'gatsby'
import React from 'react'
import { NAV_ITEMS } from '../NAV_ITEMS'
import { DesktopSubNav } from './DesktopSubNav'

export const DesktopNav: React.FC = () => {
  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Text
                p={2}
                as={Link}
                to={navItem.href ?? '#'}
                fontSize="md"
                fontWeight={500}
                _hover={{
                  textDecoration: 'none',
                  color: 'orange.500'
                }}
              >
                {navItem.label}
              </Text>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow="xl" bg={useColorModeValue('white', 'gray.800')} p={4} rounded="xl" maxW="2xs">
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} navItem={child} />
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
