import { Badge, Box, Grid, HStack, Icon, IconButton, Text, useBreakpointValue } from '@chakra-ui/react'
import { navigate } from 'gatsby'
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { BiCommentDetail, BiMicrophoneOff, BiVideoOff } from 'react-icons/bi'
import { FaPhone } from 'react-icons/fa'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineClosedCaption, MdOutlineFrontHand, MdOutlineInfo, MdOutlinePeople, MdPresentToAll } from 'react-icons/md'

interface ActionIcon {
  align: 'center' | 'right'
  icon: IconType
  bgColor?: string
  hoverBgColor?: string
  showAlways?: boolean
  showBadge?: boolean
  href?: string
}

const ACTION_ICONS: ActionIcon[] = [
  { align: 'center', icon: BiMicrophoneOff, bgColor: 'red.500', hoverBgColor: 'red.600', showAlways: true },
  { align: 'center', icon: BiVideoOff, bgColor: 'red.500', hoverBgColor: 'red.600', showAlways: true },
  { align: 'center', icon: MdOutlineClosedCaption, bgColor: 'gray.700', hoverBgColor: 'gray.800' },
  { align: 'center', icon: MdOutlineFrontHand, bgColor: 'gray.700', hoverBgColor: 'gray.800' },
  { align: 'center', icon: MdPresentToAll, bgColor: 'gray.700', hoverBgColor: 'gray.800' },
  { align: 'center', icon: HiOutlineDotsVertical, bgColor: 'gray.700', hoverBgColor: 'gray.800', showAlways: true },
  { align: 'right', icon: MdOutlineInfo },
  { align: 'right', icon: MdOutlinePeople, showBadge: true },
  { align: 'right', icon: BiCommentDetail }
]

type Props = {
  numberOfActives: number
}

export const MeetingControls: React.FC<Props> = ({ numberOfActives }) => {
  const [showControls, setShowControls] = useState(true)
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
      <HStack justifySelf="center">
        {ACTION_ICONS.filter((a) => a.align === 'center' && (a.showAlways || showOnScreenSize)).map((a) => (
          <IconButton
            key={a.icon.toString()}
            size="sm"
            fontSize={{ base: 'lg', md: 'xl' }}
            rounded="full"
            h={12}
            icon={<Icon as={a.icon} m={3.5} />}
            aria-label="Non-functional button"
            color="gray.100"
            bgColor={a.bgColor}
            _hover={{ bgColor: a.hoverBgColor }}
            onClick={() => {
              if (a.href) navigate(a.href)
            }}
          />
        ))}
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
          onClick={useBreakpointValue({
            base: () => setShowControls(false),
            sm: () => {}
          })}
        />
      </HStack>
      {showOnScreenSize && (
        <HStack justifySelf="end">
          {ACTION_ICONS.filter((a) => a.align === 'right').map((a) => (
            <Box position="relative" key={a.icon.toString()}>
              <IconButton
                size="sm"
                fontSize={{ base: 'xl', md: '2xl' }}
                variant="ghost"
                h={12}
                icon={<Icon as={a.icon} m={3} />}
                aria-label="Non-functional button"
                color="gray.100"
                _hover={{ bgColor: 'gray.800' }}
                onClick={() => {
                  if (a.href) navigate(a.href)
                }}
              />
              {a.showBadge && (
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
