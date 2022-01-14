import { Box, Button, Flex, Heading, HStack, Image, Tag, Text, useBreakpointValue } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import * as React from 'react'
import { FaGithub, FaHome } from 'react-icons/fa'
import ScrollButton from '~components/blog-components/ScrollButton'
import Container from '~components/Container'
import { getIcon } from '~components/project-components/ProjectPreview'
import SEO from '~components/SEO'
import { ProjectProps } from '~types/project.props'
import IndexLayout from '../layouts'

interface ProjectTemplateProps {
  data: {
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
  const featuredImageSrc = getSrc(project.featuredImage)
  const statusIcon = getIcon(project.status)
  const hostname = project.website ? new URL(project.website).hostname : null

  return (
    <>
      <SEO title={project.title} description={project.lead} image={featuredImageSrc} />
      <IndexLayout
        background={useBreakpointValue({
          xl: 'url(/background/pattern-right.svg) right top repeat-y,url(/background/pattern-left.svg) left top repeat-y'
        })}
      >
        <Box>
          <Box pt={featuredImage ? 2 : 16}>
            <Container>
              {featuredImage ? (
                <GatsbyImage image={featuredImage} alt="Project" />
              ) : (
                <Image
                  maxHeight="10rem"
                  fill={useColorModeValue('black', 'white')}
                  position="absolute"
                  marginTop="-2rem"
                  marginLeft="-1.5rem"
                  zIndex={0}
                  src="/svg/circuit-board.svg"
                  alt="Circuit board"
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
                    {project.website && (
                      <HStack>
                        <FaHome />
                        <Text as={Link} fontSize="md" to={project.website}>
                          {hostname}
                        </Text>
                      </HStack>
                    )}
                  </Box>
                  <Box>
                    <HStack wrap="wrap" justifyContent="flex-end">
                      {project.techs.map((tech) => (
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
        </Box>
        <ScrollButton />
      </IndexLayout>
    </>
  )
}

export default ProjectTemplate

export const query = graphql`
  query ProjectTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        lead
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
