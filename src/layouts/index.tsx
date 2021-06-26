import { Box, Flex } from '@chakra-ui/react'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import { graphql, StaticQuery } from 'gatsby'
import 'modern-normalize'
import * as React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const IndexLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords }
          ]}
          link={[{ rel: 'icon', href: '/favicon.png' }]}
        />
        <Flex direction="column" minHeight="100vh">
          <Navbar />
          <Box flex="1">{children}</Box>
          <Footer />
        </Flex>
      </>
    )}
  />
)

export default IndexLayout
