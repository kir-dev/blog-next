import { Box, Container, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import { MeetingControls } from 'components/members-components/MeetingControls'
import { YouAvatarCard } from 'components/members-components/YouAvatarCard'
import { SEO } from 'components/SEO'
import { graphql } from 'gatsby'
import React from 'react'
import { MembersProps } from 'types/page-props/members.props'
import { getMemberCollage } from 'utils/commonFunctions'
import { IndexLayout } from '../layouts'

const MembersPage: React.FC<MembersProps> = ({ data }) => (
  <SEO title="Csapatunk">
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
            <Flex
              py={{ base: 2, sm: 1 }}
              px={{ base: 0, sm: 1 }}
              flex={`0 0 ${useBreakpointValue({ base: '100%', sm: '50%', md: '33%', lg: '25%' })}`}
            >
              <YouAvatarCard height={{ base: '12rem', lg: '16rem' }} avatarBoxSize={{ base: '10rem', lg: '12rem' }} />
            </Flex>
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
  </SEO>
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
