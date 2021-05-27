import { Box, Button, Flex, Heading, HStack, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import { FaGithub, FaHome } from 'react-icons/fa'
import SvgPattern from '../assets/images/circuit-board.svg'
import ScrollButton from '../components/blog-components/ScrollButton'
import Container from '../components/Container'
import Page from '../components/Page'
import { getIcon } from '../components/project-components/ProjectPreview'
import IndexLayout from '../layouts'

interface ProjectTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        github: string
        website: string
        featuredImage: ImageDataLike
        status: string
        techs: string
      }
    }
  }
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ data }) => {
  const result = getImage(data.markdownRemark.frontmatter.featuredImage)
  const statusIcon = getIcon(data.markdownRemark.frontmatter.status)
  const statusText = data.markdownRemark.frontmatter.status.substring(0, data.markdownRemark.frontmatter.status.lastIndexOf(' '))
  const { hostname } = new URL(data.markdownRemark.frontmatter.website)

  return (
    <IndexLayout>
      <Page>
        <Box pt={result ? 2 : 16}>
          <Container>
            {result ? (
              <GatsbyImage image={result} alt="Project" />
            ) : (
              <SvgPattern
                style={{
                  maxHeight: '10rem',
                  fill: useColorModeValue('black', 'white'),
                  position: 'absolute',
                  marginTop: '-2rem',
                  marginLeft: '-6rem',
                  zIndex: 0
                }}
              />
            )}
            <Box
              shadow="xl"
              bgGradient={`linear(to-b, ${useColorModeValue('white', 'gray.800')}, 70%, ${useColorModeValue('gray.200', 'blue.900')})`}
              zIndex={1}
              py={result ? 4 : 12}
              px={6}
            >
              <Flex justifyContent="space-between" wrap="wrap">
                <Heading>{data.markdownRemark.frontmatter.title}</Heading>
                <HStack pl={6} flex={1} justifyContent="flex-end" fontSize="md">
                  <Text>{statusText}</Text>
                  <Box>{statusIcon}</Box>
                </HStack>
              </Flex>
              <Flex justifyContent="space-between" alignItems="flex-end" placeContent="flex-end" wrap="wrap" mt={4}>
                <Box pr={6} mb={4} flex={1}>
                  <HStack>
                    <FaGithub />
                    <Text as={Link} fontSize="md" to={data.markdownRemark.frontmatter.github}>
                      {`kir-dev/${data.markdownRemark.frontmatter.github.substring(
                        data.markdownRemark.frontmatter.github.lastIndexOf('/') + 1
                      )}`}
                    </Text>
                  </HStack>
                  <HStack>
                    <FaHome />
                    <Text as={Link} fontSize="md" to={data.markdownRemark.frontmatter.website}>
                      {hostname}
                    </Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack wrap="wrap" justifyContent="flex-end">
                    {data.markdownRemark.frontmatter.techs.split(',').map((tech) => (
                      <Tag colorScheme="blue" key={tech}>
                        {tech.trim()}
                      </Tag>
                    ))}
                  </HStack>
                </Box>
              </Flex>
            </Box>
          </Container>
        </Box>
        <Container>
          <Box py={8}>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          </Box>
          <Box textAlign="right" mt={10} onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }}>
            <Button colorScheme="orange">Vissza a tetejére</Button>
          </Box>
        </Container>
      </Page>
      <ScrollButton />
    </IndexLayout>
  )
}

export default ProjectTemplate

export const query = graphql`
  query ProjectTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        github
        website
        status
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
