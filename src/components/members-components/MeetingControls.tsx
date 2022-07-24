import { Badge, Box, Grid, HStack, Icon, IconButton, Text, useBreakpointValue } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { FaMicrophone, FaPhone, FaVideo } from 'react-icons/fa'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineInfo, MdOutlinePeople } from 'react-icons/md'

const ACTION_ICONS_CENTER = [FaMicrophone, FaVideo, HiOutlineDotsVertical]
const ACTION_ICONS_RIGHT = [MdOutlineInfo, MdOutlinePeople, BiCommentDetail]

type Props = {
  numberOfActives: number
}

export const MeetingControls = ({ numberOfActives }: Props) => {
  const [showControls, setShowControls] = useState(true)
  const close = () => setShowControls(false)

  return (
    <Grid
      display={showControls ? 'grid' : 'none'}
      zIndex="modal"
      py={4}
      my={useBreakpointValue({ base: 0, sm: 10 })}
      w="full"
      templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2, md: 3 })}, 1fr)`}
      gap={2}
      alignItems="center"
      position={useBreakpointValue({ base: 'fixed', sm: 'relative' })}
      bottom={0}
      left={0}
      bgColor={useBreakpointValue({ base: useColorModeValue('white', 'gray.900'), sm: undefined })}
      rounded={useBreakpointValue({ base: 'none', sm: 'lg' })}
      color="gray.900"
    >
      <Text
        px={4}
        fontSize={useBreakpointValue({ base: 'lg', sm: '2xl' })}
        color={useColorModeValue('gray.900', 'gray.100')}
        fontFamily="heading"
      >
        Kir-Dev gyűlés
      </Text>
      <HStack justifySelf="center" fontSize={useBreakpointValue({ base: 'md', sm: 'xl' })}>
        {ACTION_ICONS_CENTER.map((icon) => (
          <HStack>
            <IconButton
              size="sm"
              fontSize={{ base: 'lg', md: 'xl' }}
              rounded="full"
              h={12}
              icon={<Icon as={icon} m={4} />}
              aria-label="Non-functional button"
              bgColor={useColorModeValue('gray.300', 'gray.700')}
            />
          </HStack>
        ))}
        <HStack
          onClick={useBreakpointValue({
            base: close,
            sm: () => {}
          })}
        >
          <IconButton
            size="sm"
            fontSize={{ base: 'lg', md: 'xl' }}
            rounded="full"
            h={12}
            icon={<Icon as={FaPhone} my={3} mx={6} transform="rotate(-135deg)" />}
            aria-label="Non-functional button"
            color="gray.100"
            bgColor="red.500"
          />
        </HStack>
      </HStack>
      <HStack
        justifySelf="end"
        fontSize={useBreakpointValue({ base: 'md', sm: 'xl' })}
        display={useBreakpointValue({ base: 'none', md: 'flex' })}
      >
        {ACTION_ICONS_RIGHT.map((icon) =>
          icon === MdOutlinePeople ? (
            <Box position="relative">
              <IconButton
                size="sm"
                fontSize={{ base: 'xl', md: '2xl' }}
                variant="ghost"
                icon={<MdOutlinePeople />}
                aria-label="Non-functional button"
              />
              <Badge position="absolute" rounded="full" right={-2} top={-1} bgColor="gray.600" color="gray.100">
                {numberOfActives}
              </Badge>
            </Box>
          ) : (
            <HStack cursor="pointer">
              <IconButton
                size="sm"
                fontSize={{ base: 'xl', md: '2xl' }}
                variant="ghost"
                aria-label="Non-functional button"
                icon={<Icon as={icon} />}
                my={3}
                mx={3.5}
              />
            </HStack>
          )
        )}
      </HStack>
    </Grid>
  )
}
