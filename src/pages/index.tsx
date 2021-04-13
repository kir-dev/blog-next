import { Heading } from '@chakra-ui/react'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import Terminal from '../components/terminal/Terminal'
import IndexLayout from '../layouts'

const IndexPage: React.FC = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Heading as="h1" py={5}>
          Hello World
        </Heading>
        <div>
          <Terminal />
        </div>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
