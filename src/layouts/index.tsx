import { Box, Flex } from '@chakra-ui/react'
import { graphql, StaticQuery } from 'gatsby'
import 'modern-normalize'
import * as React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
        />
        <Flex direction="column" minHeight="100vh">
          <Header />
          <Box flex="1">{children}</Box>
          <Footer />
        </Flex>
      </>
    )}
  />
)

export default IndexLayout
