import { Box, Button, Flex, Heading, HStack, Tag, Text, useBreakpointValue } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'

import { FaClock } from 'react-icons/fa'
import { Utterances } from 'utterances-react-component'
import { BlogAuthor } from '~components/blog-components/BlogAuthor'
import { ScrollButton } from '~components/blog-components/ScrollButton'
import { Container } from '~components/Container'
import { Header } from '~components/Header'
import { SEO } from '~components/SEO'
import { PostProps } from '~types/post.props'
import { readTimeInMinutes } from '~utils/commonFunctions'
import { IndexLayout } from '../layouts'

type Props = {
  data: {
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: PostProps
      wordCount: {
        words: number
      }
    }
  }
}

const PostTemplate = ({ data }: Props) => {
  const post = data.markdownRemark
  const featuredImage = getImage(post.frontmatter.featuredImage || null)
  const ogImageSrc = post.frontmatter.ogImage
    ? getSrc(post.frontmatter.ogImage)
    : post.frontmatter.featuredImage
    ? getSrc(post.frontmatter.featuredImage)
    : undefined

  return (
    <SEO title={post.frontmatter.title} description={post.frontmatter.lead} type="article" image={ogImageSrc}>
      <IndexLayout
        background={useBreakpointValue({
          xl: 'url(/background/pattern-right.svg) right top repeat-y,url(/background/pattern-left.svg) left top repeat-y'
        })}
      >
        <Box>
          <Header>
            <Container>
              <Flex mt={2} direction={{ base: 'column', sm: 'row' }} justifyContent="space-between">
                <Flex flex={1} position="relative" mr={{ base: 0, sm: 2 }} pb={{ base: 2, sm: 0 }}>
                  <Box w="80%" zIndex={2}>
                    {featuredImage && <GatsbyImage image={featuredImage} alt="Blog preview" objectFit="contain" />}
                  </Box>
                  <Box zIndex={1} w="100%" h="100%" position="absolute" ml={1} mt={1}>
                    <Box
                      bgGradient="radial(orange.400 1px, transparent 1px)"
                      bgSize={{ base: '1.5rem 1.5rem', sm: '1rem 1rem' }}
                      h="100%"
                    />
                  </Box>
                </Flex>
                <Flex flex={{ base: 2, md: 4 }} direction="column" justifyContent="center" mt={{ base: 3, sm: 0 }} pl={{ base: 0, sm: 3 }}>
                  <Heading as="h1">{post.frontmatter.title}</Heading>
                  <Flex justifyContent="space-between" wrap="wrap-reverse">
                    <BlogAuthor
                      hasLongDate={useBreakpointValue({ base: false, md: true })}
                      name={post.frontmatter.author}
                      date={new Date(post.frontmatter.date)}
                    />
                    <HStack
                      ml={4}
                      mb={2}
                      flex={1}
                      fontWeight="light"
                      alignItems="center"
                      justifyContent="flex-end"
                      fontSize="sm"
                      textColor={useColorModeValue('gray.600', 'gray.400')}
                    >
                      <FaClock />
                      <Text>{readTimeInMinutes(post.wordCount.words)}&nbsp;perc</Text>
                    </HStack>
                  </Flex>
                </Flex>
              </Flex>
              <Flex>
                {post.frontmatter.tags && (
                  <HStack flex={1} my={3} flexWrap={{ base: 'wrap', sm: 'nowrap' }} justifyContent="flex-end">
                    {post.frontmatter.tags.map((tag) => (
                      <Tag key={tag}>#{tag.trim()}</Tag>
                    ))}
                  </HStack>
                )}
              </Flex>
            </Container>
          </Header>
          <Container>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <Box
              textAlign="right"
              mt={10}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
              }}
            >
              <Button colorScheme="orange">Vissza a tetejére</Button>
            </Box>
            <div id="top-scroll"></div>
            {post.frontmatter.comment && (
              <>
                <Utterances repo="kir-dev/blog-next" theme="github-light" issueTerm="pathname" label="Utterances" />
                <Box textAlign="right" mt={2}>
                  <Button
                    colorScheme="orange"
                    onClick={() => {
                      document.getElementById('top-scroll')?.scrollIntoView()
                    }}
                  >
                    Vissza a kommentek tetejére
                  </Button>
                </Box>
              </>
            )}
          </Container>
        </Box>
        <ScrollButton />
      </IndexLayout>
    </SEO>
  )
}

export default PostTemplate

export const query = graphql`
  query PostTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        lead
        title
        date
        author
        tags
        comment
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        ogImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO])
          }
        }
      }
      wordCount {
        words
      }
    }
  }
`
