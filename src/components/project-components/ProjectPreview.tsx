import { Box, HStack, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

interface ProjectForPreview {
  project: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      lead: string
      github: string
      featuredImage: ImageDataLike
    }
  }
}

const ProjectPreview: React.FC<ProjectForPreview> = ({ project }) => {
  const result = getImage(project.frontmatter.featuredImage)

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} borderWidth="1px" rounded="lg" shadow="lg" position="relative">
      <Box
        maxH="4rem"
        onClick={() => {
          window.location.href = project.fields.slug
        }}
        cursor="pointer"
      >
        {result ? (
          <GatsbyImage
            image={result}
            alt="Project preview"
            objectFit="cover"
            imgStyle={{ borderRadius: '0.3rem 0.3rem 0 0', maxHeight: '4rem', width: '100%' }}
          />
        ) : (
          <Image src="../../project-default.png" objectFit="cover" style={{ maxHeight: 'inherit', width: '100%' }} />
        )}
      </Box>

      <Box py={4} px={6}>
        <Link fontSize="2xl" fontWeight="semibold" lineHeight="tight" href={project.fields.slug}>
          {project.frontmatter.title}
        </Link>
        <Text fontSize="md">{project.frontmatter.lead}</Text>
        <HStack pt={4}>
          <FaGithub />
          <Link fontSize="md" href={project.frontmatter.github}>
            {`kir-dev/${project.frontmatter.github.substring(project.frontmatter.github.lastIndexOf('/') + 1)}`}
          </Link>
        </HStack>
      </Box>
    </Box>
  )
}

export default ProjectPreview
