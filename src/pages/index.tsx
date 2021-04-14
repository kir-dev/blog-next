import { Box } from '@chakra-ui/react'
import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import Terminal from '../components/terminal/Terminal'
import IndexLayout from '../layouts'

const IndexPage: React.FC = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Box mt="5">
          <Terminal />
        </Box>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
