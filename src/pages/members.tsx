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
        <Flex flexDirection="column" pt={10} px={2} bgColor="gray.900">
          <Flex flexWrap="wrap" justifyContent="center" maxWidth="82rem" mx="auto">
            {getMemberCollage(data.actives.nodes, { base: '12rem', lg: '16rem' }, { base: '10rem', lg: '12rem' })}
          </Flex>
          <MeetingControls numberOfActives={data.actives.nodes.length} />
        </Flex>
        {data.inactives.nodes.length > 0 && (
          <Container>
            <Heading as="h2" size="lg" mt={32} mb={8}>
              Korábbi tagjaink
            </Heading>
            <Flex flexWrap="wrap" justifyContent="center">
              {getMemberCollage(
                data.inactives.nodes,
                { base: '12rem', lg: '16rem' },
                { base: '10rem', lg: '12rem' },
                { base: '100%', sm: '50%', md: '33%' }
              )}
            </Flex>
          </Container>
        )}
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
