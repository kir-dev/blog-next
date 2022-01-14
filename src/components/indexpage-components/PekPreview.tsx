/* eslint-disable react/destructuring-assignment */
import { Box, Flex, Heading, HStack, Image, Link as ChakraLink, Tag, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { getIcon, ProjectPreviewProps } from '~components/project-components/ProjectPreview'

const PekPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  const featuredImage = getImage(project.frontmatter.featuredImage)
  const statusIcon = getIcon(project.frontmatter.status)

  return (
    <Flex mt={2} direction={{ base: 'column', sm: 'row' }} justifyContent="space-between">
      <Flex flex={1} position="relative" mr={{ base: 0, md: 2 }} pb={2}>
        <Box w="80%" zIndex={2}>
          <Link to={project.fields.slug}>
            {featuredImage ? (
              <GatsbyImage image={featuredImage} alt="Project preview" objectFit="contain" />
            ) : (
              <Image src="../../post-default.jpg" />
            )}
          </Link>
        </Box>
        <Box zIndex={1} w="100%" h="100%" position="absolute" ml={1} mt={1}>
          <Box bgGradient="radial(orange.400 1px, transparent 1px)" bgSize={{ base: '1.5rem 1.5rem', sm: '1rem 1rem' }} h="100%" />
        </Box>
      </Flex>
      <Flex flex={1.75} direction="column" justifyContent="center" mt={{ base: 3, md: 0 }} pl={{ base: 0, sm: 3 }}>
        <Flex flex={1} h="fit-content" py={4} direction="column">
          <Box flex={1}>
            <Flex justifyContent="space-between" direction={{ base: 'column-reverse', md: 'row' }}>
              <Heading as={Link} fontSize="4xl" fontWeight="600" lineHeight="tight" to={project.fields.slug}>
                {project.frontmatter.title}
              </Heading>
              <HStack justifyContent="flex-end" fontSize="xs" color="gray.600">
                <Text color={useColorModeValue('gray.700', 'gray.400')}>{project.frontmatter.status.label}</Text>
                {statusIcon}
              </HStack>
            </Flex>
            <Text fontSize="md">{project.frontmatter.lead}</Text>
          </Box>
          <Box pt={4}>
            <Flex wrap="wrap" justifyContent="space-between" direction={{ base: 'column', md: 'row' }}>
              <HStack alignItems="center">
                <FaGithub />
                <Text as={ChakraLink} whiteSpace="nowrap" fontSize="md" to={project.frontmatter.github}>
                  kir-dev/pek-next
                </Text>
              </HStack>
              <HStack flex={1} justifyContent="flex-end">
                {project.frontmatter.techs.map((tech) => (
                  <Tag key={tech}>{tech.trim()}</Tag>
                ))}
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PekPreview
