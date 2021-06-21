import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { CourseProps } from '../../types/course.props'

interface CourseCardProps {
  course: {
    html: string
    fields: {
      slug: string
    }
    frontmatter: CourseProps
  }
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const featuredImage = getImage(course.frontmatter.featuredImage)

  return (
    <Flex mt={2} direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
      <Box zIndex={2}>
        <Link to={course.fields.slug}>{featuredImage && <GatsbyImage image={featuredImage} alt="Blog preview" objectFit="contain" />}</Link>
      </Box>
      <Flex flex={1} direction="column" justifyContent="center" mt={{ base: 3, md: 0 }} pl={{ base: 0, md: 3 }}>
        <Text fontWeight="light" fontSize="2xl">
          <Text as={Link} to={course.fields.slug}>
            {course.frontmatter.title}
          </Text>
        </Text>
        <Text mt={1} fontSize="md">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: course.html }} />
        </Text>
        <Flex justifyContent="space-between">asd</Flex>
      </Flex>
    </Flex>
  )
}

export default CourseCard
