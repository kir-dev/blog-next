import { Box, Button, Flex, Heading, HStack, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import { FaGithub, FaHome } from 'react-icons/fa'
import SvgPattern from '../assets/images/circuit-board.svg'
import ScrollButton from '../components/blog-components/ScrollButton'
import Container from '../components/Container'
import Page from '../components/Page'
import { getIcon } from '../components/project-components/ProjectPreview'
import IndexLayout from '../layouts'
import { ProjectProps } from '../types/project.props'

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
      frontmatter: ProjectProps
    }
  }
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ data }) => {
  const project = data.markdownRemark.frontmatter
  const featuredImage = getImage(project.featuredImage)
  const statusIcon = getIcon(project.status)
  const { hostname } = new URL(project.website)

  return (
    <IndexLayout>
      <Page>
        <Box pt={featuredImage ? 2 : 16}>
          <Container>
            {featuredImage ? (
              <GatsbyImage image={featuredImage} alt="Project" />
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
              py={featuredImage ? 4 : 12}
              px={6}
            >
              <Flex justifyContent="space-between" wrap="wrap">
                <Heading>{project.title}</Heading>
                <HStack pl={6} flex={1} justifyContent="flex-end" fontSize="md">
                  <Text>{project.status.label}</Text>
                  <Box>{statusIcon}</Box>
                </HStack>
              </Flex>
              <Flex justifyContent="space-between" alignItems="flex-end" placeContent="flex-end" wrap="wrap" mt={4}>
                <Box pr={6} mb={4} flex={1}>
                  <HStack>
                    <FaGithub />
                    <Text as={Link} fontSize="md" to={project.github}>
                      {`kir-dev/${project.github.substring(project.github.lastIndexOf('/') + 1)}`}
                    </Text>
                  </HStack>
                  <HStack>
                    <FaHome />
                    <Text as={Link} fontSize="md" to={project.website}>
                      {hostname}
                    </Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack wrap="wrap" justifyContent="flex-end">
                    {project.techs.split(',').map((tech) => (
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
