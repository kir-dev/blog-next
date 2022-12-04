// src/@chakra-ui/gatsby-plugin/theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = {
  fonts: {
    heading: 'Poppins, sans-serif'
  },
  components: {
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'orange.400' : 'orange.500'
      })
    }
  }
}

export default extendTheme(theme)
