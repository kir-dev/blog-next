import { Box, Grid, HStack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaMicrophone, FaPhone, FaVideo } from 'react-icons/fa'

const MeetingControls: React.FC = () => {
  const [showControls, setShowControls] = React.useState(true)
  const close = () => setShowControls(false)

  return (
    <Grid
      display={showControls ? 'grid' : 'none'}
      zIndex="modal"
      py={4}
      my={useBreakpointValue({ base: 0, sm: 10 })}
      w={useBreakpointValue({ base: 'full', md: '90%' })}
      mx="auto"
      bgColor={useColorModeValue('white', 'gray.900')}
      rounded={useBreakpointValue({ base: 'none', sm: 'lg' })}
      shadow={useBreakpointValue({
        base: 'none',
        sm: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;'
      })}
      color="gray.900"
      templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2, md: 3 })}, 1fr)`}
      gap={2}
      alignItems="center"
      position={useBreakpointValue({ base: 'fixed', sm: 'relative' })}
      bottom={0}
      left={0}
    >
      <Text
        px={4}
        fontSize={useBreakpointValue({ base: 'lg', sm: '2xl' })}
        color={useColorModeValue('gray.900', 'gray.100')}
        fontWeight="bold"
      >
        Kir-Dev gyűlés
      </Text>
      <HStack justifySelf="center" fontSize={useBreakpointValue({ base: 'md', sm: 'xl' })}>
        <Box rounded="full" cursor="pointer" p={4} bgColor="gray.200">
          <FaMicrophone />
        </Box>
        <Box
          onClick={useBreakpointValue({
            base: close,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            sm: () => {}
          })}
          rounded="full"
          cursor="pointer"
          p={4}
          color="gray.100"
          bgColor="red.500"
        >
          <FaPhone />
        </Box>
        <Box rounded="full" cursor="pointer" p={4} bgColor="gray.200">
          <FaVideo />
        </Box>
      </HStack>
    </Grid>
  )
}

export default MeetingControls
