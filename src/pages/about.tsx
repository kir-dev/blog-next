import { Heading } from '@chakra-ui/react'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const PageTwo = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Heading as="h1" py={5}>
          About
        </Heading>
      </Container>
    </Page>
  </IndexLayout>
)

export default PageTwo
