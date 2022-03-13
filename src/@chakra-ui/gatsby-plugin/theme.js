// src/@chakra-ui/gatsby-plugin/theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = {
  fonts: {
    heading: 'Poppins, sans-serif',
    body: '"Open Sans", sans-serif'
  },
  components: {
    Link: {
      baseStyle: {
        color: 'orange.400',
        _hover: { color: 'orange.600', textDecor: 'underline' }
      }
    },
    Button: {
      baseStyle: {
        colorScheme: 'orange'
      }
    }
  }
}

export default extendTheme(theme)
