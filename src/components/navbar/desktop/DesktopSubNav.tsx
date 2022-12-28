import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { Link } from 'gatsby'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { NavItem } from 'types/navItem'

type Props = {
  navItem: NavItem
}

export const DesktopSubNav: React.FC<Props> = ({ navItem: { label, href } }) => {
  return (
    <Box as={Link} to={href} role="group" display="block" p={2} rounded="md" _hover={{ bg: useColorModeValue('orange.50', 'gray.900') }}>
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
          <Icon color="orange.500" w={5} h={5} as={FaChevronRight} />
        </Flex>
      </Stack>
    </Box>
  )
}
