import { Box, Heading } from '@chakra-ui/react'
import * as React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import IndexLayout from '../layouts'

const CoursesPage: React.FC = () => (
  <IndexLayout>
    <Box>
      <Header>
        <Container>
          <Heading as="h1">Tanfolyamaink</Heading>
        </Container>
      </Header>
      <Container>{' Content here '}</Container>
    </Box>
  </IndexLayout>
)

export default CoursesPage
