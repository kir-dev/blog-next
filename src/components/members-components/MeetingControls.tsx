import { Badge, Box, Grid, HStack, Icon, IconButton, Text, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import { BiCommentDetail, BiMicrophoneOff, BiVideoOff } from 'react-icons/bi'
import { FaPhone } from 'react-icons/fa'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineClosedCaption, MdOutlineFrontHand, MdOutlineInfo, MdOutlinePeople, MdPresentToAll } from 'react-icons/md'

const ACTION_ICONS_CENTER1 = [BiMicrophoneOff, BiVideoOff]
const ACTION_ICONS_CENTER2 = [MdOutlineClosedCaption, MdOutlineFrontHand, MdPresentToAll]
const ACTION_ICONS_CENTER3 = [HiOutlineDotsVertical]
const ACTION_ICONS_RIGHT = [MdOutlineInfo, MdOutlinePeople, BiCommentDetail]

type Props = {
  numberOfActives: number
}

export const MeetingControls = ({ numberOfActives }: Props) => {
  const [showControls, setShowControls] = useState(true)
  const close = () => setShowControls(false)
  const showOnScreenSize = useBreakpointValue({ base: false, md: true })

  return (
    <Grid
      display={showControls ? 'grid' : 'none'}
      zIndex="modal"
      py={4}
      px={{ base: 1, md: 10 }}
      my={{ base: 0, sm: 10 }}
      w="full"
      templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2, md: 3 })}, 1fr)`}
      gap={2}
      alignItems="center"
      position={{ base: 'fixed', sm: 'relative' }}
      bottom={0}
      left={0}
      bgColor={{ base: 'gray.900', sm: undefined }}
      rounded={{ base: 'none', sm: 'lg' }}
      color="gray.900"
    >
      <HStack>
        <Text px={4} fontSize={{ base: 'lg', sm: '2xl' }} textAlign={{ base: 'center', sm: 'start' }} color="gray.100" fontFamily="heading">
          Kir-Dev gyűlés
        </Text>
      </HStack>
      <HStack justifySelf="center" fontSize={{ base: 'md', sm: 'xl' }}>
        {ACTION_ICONS_CENTER1.map((icon) => (
          <HStack key={icon.toString()}>
            <IconButton
              size="sm"
              fontSize={{ base: 'lg', md: 'xl' }}
              rounded="full"
              h={12}
              icon={<Icon as={icon} m={4} />}
              aria-label="Non-functional button"
              color="gray.100"
              bgColor="red.500"
              _hover={{ bgColor: 'red.600' }}
            />
          </HStack>
        ))}
        {showOnScreenSize &&
          ACTION_ICONS_CENTER2.map((icon) => (
            <HStack key={icon.toString()}>
              <IconButton
                size="sm"
                fontSize={{ base: 'lg', md: 'xl' }}
                rounded="full"
                h={12}
                icon={<Icon as={icon} m={4} />}
                aria-label="Non-functional button"
                bgColor="gray.700"
                color="gray.100"
                _hover={{ bgColor: 'gray.800' }}
              />
            </HStack>
          ))}
        {ACTION_ICONS_CENTER3.map((icon) => (
          <HStack key={icon.toString()}>
            <IconButton
              size="sm"
              fontSize={{ base: 'lg', md: 'xl' }}
              rounded="full"
              h={12}
              icon={<Icon as={icon} m={4} />}
              aria-label="Non-functional button"
              bgColor="gray.700"
              color="gray.100"
              _hover={{ bgColor: 'gray.800' }}
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
            _hover={{ bgColor: 'red.600' }}
          />
        </HStack>
      </HStack>
      {showOnScreenSize && (
        <HStack justifySelf="end" fontSize={{ base: 'md', sm: 'xl' }}>
          {ACTION_ICONS_RIGHT.map((icon) => (
            <Box position="relative" key={icon.toString()}>
              <IconButton
                size="sm"
                fontSize={{ base: 'xl', md: '2xl' }}
                variant="ghost"
                h={12}
                icon={<Icon as={icon} m={3} />}
                aria-label="Non-functional button"
                color="gray.100"
                _hover={{ bgColor: 'gray.800' }}
              />
              {icon === MdOutlinePeople && (
                <Badge position="absolute" rounded="full" right={-1} top={-0.5} bgColor="gray.600" color="gray.100">
                  {numberOfActives}
                </Badge>
              )}
            </Box>
          ))}
        </HStack>
      )}
    </Grid>
  )
}
