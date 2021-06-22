import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaChalkboardTeacher, FaClock } from 'react-icons/fa'
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

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <Flex direction="column">
    <Text fontWeight="light" fontSize="2xl">
      {course.frontmatter.title}
    </Text>
    <Box mt={2}>
      {course.frontmatter.sessions.map((session) => (
        <HStack mt={1} justifyItems="center">
          <FaClock />
          <Text>
            {session.time} - {session.place}
          </Text>
        </HStack>
      ))}
      {course.frontmatter.lecturer && (
        <HStack mt={2}>
          <FaChalkboardTeacher />
          <Text>{course.frontmatter.lecturer}</Text>
        </HStack>
      )}
    </Box>
    <Box mt={2} fontSize="md">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: course.html }} />
    </Box>
  </Flex>
)

export default CourseCard
