import { Box, Flex, Heading, HStack, Link, useColorModeValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import * as React from 'react'
import { FaGithub } from 'react-icons/fa'
import SvgPattern from '../assets/images/circuit-board.svg'
import Container from '../components/Container'
import Page from '../components/Page'
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
        featuredImage: ImageDataLike
        status: string
        techs: string
      }
    }
  }
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ data }) => {
  const result = getImage(data.markdownRemark.frontmatter.featuredImage)

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
            <Flex
              justifyContent="space-between"
              direction={{ base: 'column', lg: 'row' }}
              shadow="xl"
              bgGradient={`linear(to-b, ${useColorModeValue('white', 'gray.800')}, 70%, ${useColorModeValue('gray.200', 'blue.900')})`}
              zIndex={1}
              py={result ? 2 : 12}
              px={6}
            >
              <Heading>{data.markdownRemark.frontmatter.title}</Heading>
              <HStack>
                <FaGithub />
                <Link fontSize="md" href={data.markdownRemark.frontmatter.github}>
                  {`kir-dev/${data.markdownRemark.frontmatter.github.substring(
                    data.markdownRemark.frontmatter.github.lastIndexOf('/') + 1
                  )}`}
                </Link>
              </HStack>
            </Flex>
          </Container>
        </Box>
        <Container>
          <Box py={8}>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          </Box>
        </Container>
      </Page>
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
