import { Box, Flex, Heading, HStack, Image, Link as ChakraLink, Tag, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaGithub } from 'react-icons/fa'
import { ProjectPreviewProps } from '~types/component-props/projectPreview.props'
import { getIcon } from '~utils/commonFunctions'

export const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  const featuredImage = getImage(project.frontmatter.featuredImage)
  const statusIcon = getIcon(project.frontmatter.status)
  const githubUrlEnd = project.frontmatter.github.substring(project.frontmatter.github.lastIndexOf('/') + 1)

  return (
    <Flex direction="column" bg={useColorModeValue('white', 'gray.800')} borderWidth="1px" rounded="lg" shadow="lg" position="relative">
      <Box as={GatsbyLink} maxH="12rem" overflowY="hidden" to={project.fields.slug} cursor="pointer">
        {featuredImage ? (
          <GatsbyImage image={featuredImage} alt="Project preview" objectFit="cover" imgStyle={{ borderRadius: '0.3rem 0.3rem 0 0' }} />
        ) : (
          <Image src="../../project-default.png" objectFit="cover" style={{ maxHeight: 'inherit', width: '100%' }} />
        )}
      </Box>

      <Flex flex={1} h="fit-content" py={4} px={4} direction="column">
        <Box flex={1}>
          <Flex justifyContent="space-between" direction={{ base: 'column-reverse', md: 'row' }}>
            <Heading as={GatsbyLink} fontSize="2xl" fontWeight="400" lineHeight="tight" to={project.fields.slug}>
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
              <ChakraLink whiteSpace="nowrap" fontSize="md" isExternal href={project.frontmatter.github}>
                {`kir-dev/${githubUrlEnd}`}
              </ChakraLink>
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
  )
}
