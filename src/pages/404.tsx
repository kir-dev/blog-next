import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { BlogContainer } from 'components/BlogContainer'
import { Header } from 'components/Header'
import { SEO } from 'components/SEO'
import { Link } from 'gatsby'
import { IndexLayout } from 'layouts'
import React from 'react'

const NotFoundPage: React.FC = () => (
  <SEO title="404" robots="nofollow, noindex">
    <IndexLayout background="url(/background/top-right.svg) right top no-repeat, url(/background/bottom-left.svg) left top no-repeat">
      <Box>
        <Header>
          <BlogContainer>
            <Heading as="h1">Page not found (404)</Heading>
          </BlogContainer>
        </Header>
        <BlogContainer>
          <Flex justifyContent="space-between">
            You've hit the void.{' '}
            <Button as={Link} colorScheme="orange" to="/">
              Go back
            </Button>
          </Flex>
        </BlogContainer>
      </Box>
    </IndexLayout>
  </SEO>
)

export default NotFoundPage
