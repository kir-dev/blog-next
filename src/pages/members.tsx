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
            {getMemberCollage(data.actives)}
          </Flex>
          <MeetingControls />
          {data.inactives.nodes.length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={24} mb={8}>
                Korábbi tagjaink
              </Heading>
              <Flex flexWrap="wrap" justifyContent="center">
                {getMemberCollage(data.inactives)}
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
  query AboutPageQueries {
    actives: allMarkdownRemark(
      filter: { fields: { layout: { eq: "member" } }, frontmatter: { active: { eq: true } } }
      sort: { fields: [frontmatter___realName], order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          pekUsername
          realName
          position
          joinDate
          interests
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [WEBP])
            }
          }
          funnyImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [WEBP])
            }
          }
        }
      }
    }
    inactives: allMarkdownRemark(
      filter: { fields: { layout: { eq: "member" } }, frontmatter: { active: { eq: false } } }
      sort: { fields: [frontmatter___realName], order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          pekUsername
          realName
          position
          joinDate
          interests
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [WEBP])
            }
          }
          funnyImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [WEBP])
            }
          }
        }
      }
    }
  }
`
