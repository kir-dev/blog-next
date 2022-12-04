import { Badge, Box, Flex, HStack, Icon, Image } from '@chakra-ui/react'
import { navigate } from 'gatsby'
import { BiMicrophoneOff } from 'react-icons/bi'

type Props = {
  height: any
  avatarBoxSize: any
}

export const YouAvatarCard = ({ height = '12rem', avatarBoxSize = '10rem' }: Props) => (
  <Box pos="relative" h={height} w="full" bgColor="gray.700" borderRadius="lg">
    <Flex h={height} alignItems="center" justifyContent="center">
      <Image
        src="/csatlakozz.png"
        boxSize={avatarBoxSize}
        rounded="full"
        objectFit="contain"
        onClick={() => navigate('/about#contact')}
        cursor="pointer"
      />
    </Flex>
    <HStack pos="absolute" bottom={0} left={0} zIndex={10} m={2} px={2} fontSize="md" spacing={2}>
      <Box color="gray.100" textShadow="1px 1px 1px #000000, 2px 2px 4px #000000" fontFamily="heading">
        Vendég (Te)
      </Box>
    </HStack>
    <Box pos="absolute" top={0} right={0} zIndex={10} m={2} fontSize="md" bgColor="gray.800" borderRadius="full">
      <Icon as={BiMicrophoneOff} color="gray.100" w={4} h={4} mx={3} mt={3} mb={2} />
    </Box>
    <Badge pos="absolute" top={0} left={0} zIndex={10} m={3} px={1} color="gray.100" bg="gray.800">
      újonc
    </Badge>
  </Box>
)
