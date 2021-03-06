import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from 'gatsby'
import * as React from 'react'
import Container from '~components/Container'
import Header from '~components/Header'
import IndexLayout from '../layouts'

const NotFoundPage: React.FC = () => (
  <IndexLayout background="url(/background/top-right.svg) right top no-repeat, url(/background/bottom-left.svg) left top no-repeat">
    <Box>
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
    </Box>
  </IndexLayout>
)

export default NotFoundPage
