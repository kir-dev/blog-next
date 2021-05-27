import { Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const NotFoundPage: React.FC = () => (
  <IndexLayout>
    <Page>
      <Header>
        <Container>
          <Heading as="h1">Page not found (404)</Heading>
        </Container>
      </Header>
      <Container>
        <Flex justifyContent="space-between">
          You've hit the void.{' '}
          <Button as={Link} colorScheme="orange" to="/">
            Go back
          </Button>
        </Flex>
      </Container>
    </Page>
  </IndexLayout>
)

export default NotFoundPage
