import { Avatar, Box, HStack, Link, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { environment } from '~utils/configurations'

type Props = {
  date: Date
  name: string
  hasLongDate?: boolean
}

export const BlogAuthor = ({ date, name, hasLongDate }: Props) => (
  <HStack spacing={2} display="flex" alignItems="center">
    <a href={`${environment.pekUrl}/profiles/${name}`}>
      <Avatar name={name} src={`${environment.pekUrl}/photos/${name}`} size={hasLongDate ? 'md' : 'sm'} />
    </a>

    {hasLongDate ? (
      <HStack flex={1}>
        <Link fontWeight="medium" fontSize="md" isExternal href={`${environment.pekUrl}/profiles/${name}`}>
          {name}
        </Link>
        <Text>—</Text>
        <Text fontWeight="light" fontSize="md" textColor={useColorModeValue('gray.600', 'gray.400')}>
          {date.toLocaleTimeString('hu-HU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </HStack>
    ) : (
      <Box flex={1}>
        <Link fontWeight="medium" fontSize="md" isExternal href={`${environment.pekUrl}/profiles/${name}`}>
          {name}
        </Link>
        <Text whiteSpace="nowrap" fontWeight="light" fontSize="xs" textColor={useColorModeValue('gray.600', 'gray.400')}>
          {date.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })}
        </Text>
      </Box>
    )}
  </HStack>
)
