import { Box, Button, Heading, Text, useColorMode } from '@chakra-ui/core'
import { Link } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const IndexPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IndexLayout>
      <Page>
        <Container>
          <Box p={5}>
            <Heading size="md" mb={5}>
              Hello World
            </Heading>
          </Box>
          <Text mb={3}>Color mode: {colorMode}</Text>
          <Button variantColor="teal" onClick={toggleColorMode}>
            Toggle color mode
          </Button>
          <Link to="/page-2/">Go to page 2</Link>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
