import { Box, Button, Flex, Heading, HStack, Tag, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import { FaClock } from 'react-icons/fa'
import BlogAuthor from '~components/blog-components/BlogAuthor'
import ScrollButton from '~components/blog-components/ScrollButton'
import Container from '~components/Container'
import Header from '~components/Header'
import SEO from '~components/SEO'
import { PostProps } from '~types/post.props'
import IndexLayout from '../layouts'

interface PostTemplateProps {
  data: {
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: PostProps
      fields: {
        readingTime: {
          minutes: number
        }
      }
    }
  }
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const featuredImage = getImage(post.frontmatter.featuredImage)

  return (
    <>
      <SEO title={post.frontmatter.title} description={post.frontmatter.lead} type="article" />
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
                    <BlogAuthor hasLongDate name={post.frontmatter.author} date={new Date(post.frontmatter.date)} />
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
                      <Text>{Math.ceil(post.fields.readingTime.minutes)}&nbsp;perc</Text>
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
            {/* eslint-disable-next-line react/no-danger */}
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
          </Container>
        </Box>
        <ScrollButton />
      </IndexLayout>
    </>
  )
}

export default PostTemplate

export const query = graphql`
  query PostTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date
        author
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
      fields {
        readingTime {
          minutes
        }
      }
    }
  }
`
