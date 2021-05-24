import { Box, Button, Flex, Grid, Heading, HStack, Spacer, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import { FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa'
import Logo from '../assets/images/kirdev-simplified.svg'
import BlogPreview from '../components/blog-components/BlogPreview'
import Container from '../components/Container'
import InfoBox from '../components/indexpage-components/InfoBox'
import Page from '../components/Page'
import Terminal from '../components/terminal/Terminal'
import IndexLayout from '../layouts'
import { BlogPostsProps } from './blog'

const IndexPage: React.FC<BlogPostsProps> = ({ data }) => {
  const socialSize = useBreakpointValue({ base: '2rem', lg: '3rem' })
  const [post] = data.allMarkdownRemark.nodes

  return (
    <IndexLayout>
      <Page>
        <Box
          bgImage="url('../../index-bg.jpeg')"
          bgPos="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          width="100%"
          height="100%"
          zIndex={0}
          _before={{
            zIndex: 0,
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '80%',
            content: '" "',
            bgGradient: useColorModeValue('linear(to-b, orange.50, white)', 'linear(to-t, gray.800, black)'),
            opacity: useColorModeValue(0.4, 0.8)
          }}
        >
          <Container>
            <Box py="8" zIndex={1} px={{ base: 0, lg: 8 }}>
              <Flex direction={{ base: 'column', lg: 'row' }}>
                <Terminal />
                <Flex flex={1} direction={{ base: 'row', lg: 'column' }} justifyContent={{ base: 'center', sm: 'left' }}>
                  <Box textAlign={{ base: 'center', lg: 'right' }} mt={[0, 0, '0rem', '2rem']}>
                    <Button color="white" bg="orange.500" _hover={{ bg: 'orange.600' }} as="a" href="#" my={6} px={4}>
                      Csatlakozz!
                    </Button>
                    <HStack direction="row" alignItems={{ base: 'baseline', md: 'end' }} mb={6} spacing={6}>
                      {useBreakpointValue({ lg: <Spacer /> })}
                      <Box as={Link} _hover={{ color: 'orange.500' }} to="https://github.com/kir-dev">
                        <FaGithub size={socialSize} />
                      </Box>
                      <Box as={Link} _hover={{ color: 'orange.500' }} to="https://youtube.com/channel/UCkpMTj9qST_7RDt2YL4RUEw">
                        <FaYoutube size={socialSize} />
                      </Box>
                      <Box as={Link} _hover={{ color: 'orange.500' }} to="https://facebook.com/kirdevteam">
                        <FaFacebook size={socialSize} />
                      </Box>
                    </HStack>
                  </Box>
                </Flex>
              </Flex>
              <Logo
                style={{
                  marginTop: useBreakpointValue([0, '-14rem', '-18rem', '-10rem']),
                  height: useBreakpointValue([0, '14rem', '18rem', '20rem']),
                  fill: useColorModeValue('black', '#EBECEC'),
                  marginLeft: 'auto'
                }}
              />
            </Box>
          </Container>
        </Box>
        <Container>
          <Box pt="16" zIndex={1}>
            <Heading pb={10}>Amivel foglalkozunk</Heading>
            <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, md: 3 })}, 1fr)`} gap={{ base: 4, md: 10 }}>
              <InfoBox imgSrc="../../laptop.png" title="Webfejlesztés">
                <Text textAlign="justify">
                  Webes alkalmazásokat fejlesztünk a kollégiumi közélet különböző területein annak olajozott működése érdekében, a
                  kollégisták igényeit mindig szem előtt tartva.
                </Text>
              </InfoBox>
              <InfoBox imgSrc="../../mobile.png" title="Mobil alkalmazások">
                <Text textAlign="justify">
                  Mobil alkalmazások fejlesztésére használt technológiákkal kísérletezünk, mint az Ionic vagy a Flutter.
                </Text>
              </InfoBox>
              <InfoBox imgSrc="../../coffee.png" title="Üzemeltetés">
                <Text textAlign="justify">
                  Alkalmazásaink nagy részét mi magunk üzemeltetjük, kipróbálunk mindenféle DevOps technológiákat, pl.: CI/CD, cloud
                  szolgáltatások.
                </Text>
              </InfoBox>
            </Grid>
          </Box>

          <Box pt="16" zIndex={1}>
            <Heading pb={10}>Legutóbbi bejegyzés blogunkból</Heading>
            <BlogPreview post={post} />
          </Box>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { layout: { eq: "post" } } }, sort: { fields: [frontmatter___date], order: DESC }, limit: 1) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          lead
          date
          author
        }
      }
    }
  }
`
