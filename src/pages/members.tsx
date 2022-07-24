import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'

import { Container } from '~components/Container'
import { MeetingControls } from '~components/members-components/MeetingControls'
import { SEO } from '~components/SEO'
import { MembersProps } from '~types/page-props/members.props'
import { getMemberCollage } from '~utils/commonFunctions'
import { IndexLayout } from '../layouts'

const MembersPage = ({ data }: MembersProps) => (
  <>
    <SEO title="Csapatunk" />
    <IndexLayout
      background={`${useBreakpointValue({
        base: '',
        sm: 'url(/background/bottom-left2.svg) left top no-repeat,'
      })}url(/background/top-right2.svg) right top no-repeat`}
    >
      <Box>
        <Container>
          <Heading as="h1" size="2xl" mt={8} mb={12}>
            Csapatunk
          </Heading>
          <Flex flexWrap="wrap" justifyContent="center">
            {getMemberCollage(data.actives.nodes)}
          </Flex>
          <MeetingControls numberOfActives={data.actives.nodes.length} />
          {data.inactives.nodes.length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={32} mb={8}>
                Korábbi tagjaink
              </Heading>
              <Flex flexWrap="wrap" justifyContent="center">
                {getMemberCollage(data.inactives.nodes)}
              </Flex>
            </>
          )}
        </Container>
      </Box>
    </IndexLayout>
  </>
)

export default MembersPage

export const query = graphql`
  query Members {
    actives: allActiveYaml {
      nodes {
        pekUsername
        realName
        position
        joinDate
        normalImageUrl
        funnyImageUrl
      }
    }
    inactives: allInactiveYaml {
      nodes {
        pekUsername
        realName
        position
        joinDate
        normalImageUrl
        funnyImageUrl
      }
    }
  }
`
