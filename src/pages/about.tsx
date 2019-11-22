import { Heading } from '@chakra-ui/core'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const PageTwo = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Heading as="h1">About</Heading>
      </Container>
    </Page>
  </IndexLayout>
)

export default PageTwo
