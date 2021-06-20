import { Box, Button, Flex, Grid, Heading, HStack, Spacer, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import { FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa'
import Logo from '../assets/images/kirdev-simplified.svg'
import BlogPreview from '../components/blog-components/BlogPreview'
import Container from '../components/Container'
import InfoBox from '../components/indexpage-components/InfoBox'
import PekPreview from '../components/indexpage-components/PekPreview'
import Page from '../components/Page'
import Terminal from '../components/terminal/Terminal'
import IndexLayout from '../layouts'
import { FACEBOOK_PAGE_URL, GITHUB_ORG_URL, PEK_URL, YOUTUBE_CHANNEL_URL } from '../utils/configurations'
import { PostProps } from '../utils/post.props'
import { ProjectProps } from '../utils/project.props'

interface IndexPageProps {
  data: {
    post: {
      nodes: [
        {
          fields: {
            slug: string
            readingTime: {
              minutes: number
            }
          }
          frontmatter: PostProps
        }
      ]
    }
    pek: {
      fields: {
        slug: string
      }
      frontmatter: ProjectProps
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const socialSize = useBreakpointValue({ base: '2rem', lg: '3rem' })
  const [post] = data.post.nodes
  const { pek } = data

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
            <Box filter="none" py={10} zIndex={1} px={{ base: 0, lg: 8 }}>
              <Flex direction={{ base: 'column', lg: 'row' }}>
                <Terminal />
                <Flex flex={1} direction={{ base: 'row', lg: 'column' }} justifyContent={{ base: 'center', sm: 'left' }}>
                  <Flex
                    direction={{ base: 'column-reverse', lg: 'column' }}
                    textAlign={{ base: 'center', lg: 'right' }}
                    mt={[0, 0, '0rem', '2rem']}
                  >
                    <Box my={4}>
                      <Button color="white" bg="orange.500" _hover={{ bg: 'orange.600' }} as={Link} px={6} to="/about#contact">
                        Csatlakozz!
                      </Button>
                    </Box>
                    <HStack direction="row" alignItems={{ base: 'baseline', md: 'end' }} my={6} mx={{ base: 4, lg: 0 }} spacing={6}>
                      {useBreakpointValue({ lg: <Spacer /> })}
                      <Box as={Link} color={useColorModeValue('black', 'grey.200')} _hover={{ color: 'orange.500' }} to={GITHUB_ORG_URL}>
                        <FaGithub size={socialSize} />
                      </Box>
                      <Box
                        as={Link}
                        color={useColorModeValue('black', 'grey.200')}
                        _hover={{ color: 'orange.500' }}
                        to={YOUTUBE_CHANNEL_URL}
                      >
                        <FaYoutube size={socialSize} />
                      </Box>
                      <Box as={Link} color={useColorModeValue('black', 'grey.200')} _hover={{ color: 'orange.500' }} to={FACEBOOK_PAGE_URL}>
                        <FaFacebook size={socialSize} />
                      </Box>
                    </HStack>
                  </Flex>
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
          <Box pt={16} zIndex={1}>
            <Heading pb={4}>Amivel foglalkozunk</Heading>
            <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, md: 3 })}, 1fr)`} gap={{ base: 4, md: 10 }}>
              <InfoBox imgSrc="../../laptop.png" title="Webfejlesztés">
                <Text textAlign={{ base: 'left', md: 'center' }}>
                  Webes alkalmazásokat fejlesztünk a kollégiumi közélet különböző területein annak olajozott működése érdekében, a
                  kollégisták igényeit mindig szem előtt tartva.
                </Text>
              </InfoBox>
              <InfoBox imgSrc="../../mobile.png" title="Mobil alkalmazások">
                <Text textAlign={{ base: 'left', md: 'center' }}>
                  Mobil alkalmazások fejlesztésére használt technológiákkal kísérletezünk, mint az Ionic vagy a Flutter.
                </Text>
              </InfoBox>
              <InfoBox imgSrc="../../coffee.png" title="Üzemeltetés">
                <Text textAlign={{ base: 'left', md: 'center' }}>
                  Alkalmazásaink nagy részét mi magunk üzemeltetjük, kipróbálunk mindenféle DevOps technológiákat, pl.: CI/CD, cloud
                  szolgáltatások.
                </Text>
              </InfoBox>
            </Grid>
          </Box>

          <Box pt={16} zIndex={1}>
            <Heading pb={4}>Fő projektünk: PéK</Heading>
            <Text fontFamily="mono" mb={4} textAlign="justify">
              Fő feladatunk a{' '}
              <Text as={Link} textColor="orange.500" to={PEK_URL}>
                Profil és Körök
              </Text>{' '}
              folyamatos fejlesztése és karbantartása. Ez a rendszer már több generációt is megélt az aktív körtagoknak köszönhetően.
              Jelenleg ezen az alkalmazáson keresztül folyik a kar közösségi pontozása. A felhasználók száma eléri a 30000-et és közel 20
              évre visszamenőleg tartalmaz információkat a kar közösségi életéről.
            </Text>
            <PekPreview project={pek} />
            <Box textAlign="right" mt={8}>
              <Text as={Link} textColor="orange.500" fontSize="lg" to="/projects">
                További projektjeink...
              </Text>
            </Box>
          </Box>

          <Box py={16} zIndex={1}>
            <Heading pb={4}>Legutóbbi bejegyzés blogunkból</Heading>
            <BlogPreview isBig post={post} />
            <Box textAlign="right" mt={8}>
              <Text as={Link} textColor="orange.500" fontSize="lg" to="/blog">
                További posztjaink...
              </Text>
            </Box>
          </Box>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQueries {
    post: allMarkdownRemark(filter: { fields: { layout: { eq: "post" } } }, sort: { fields: [frontmatter___date], order: DESC }, limit: 1) {
      nodes {
        fields {
          slug
          readingTime {
            minutes
          }
        }
        frontmatter {
          title
          lead
          date
          author
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
    pek: markdownRemark(fields: { slug: { eq: "/project/pek-next/" } }) {
      fields {
        slug
      }
      frontmatter {
        title
        lead
        github
        status {
          label
          color
        }
        techs
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`
