import { Heading } from '@chakra-ui/core'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Heading as="h1" py={5}>
          Hello World
        </Heading>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
