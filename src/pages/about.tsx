import { Heading } from '@chakra-ui/react'
import * as React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const AboutPage: React.FC = () => (
  <IndexLayout>
    <Page>
      <Header>
        <Container>
          <Heading as="h1">Csapatunk</Heading>
        </Container>
      </Header>
      <Container>{' Content here '}</Container>
    </Page>
  </IndexLayout>
)

export default AboutPage
