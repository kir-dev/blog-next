import { Box, Divider, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaChalkboardTeacher, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { CourseProps, ISession } from '../../types/course.props'

interface CourseCardProps {
  course: {
    html: string
    fields: {
      slug: string
    }
    frontmatter: CourseProps
  }
}

const getSessionString = (session: ISession): string => {
  const startDateTime = new Date(session.startDateTime)
  const targetDateTime = new Date(startDateTime)
  targetDateTime.setHours(targetDateTime.getHours() + session.lengthInHours)

  return `${startDateTime.toLocaleTimeString('hu-HU', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })} - ${targetDateTime.toLocaleTimeString('hu-HU', {
    hour: '2-digit',
    minute: '2-digit'
  })}`
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <Box borderWidth="1px" rounded="lg" shadow="lg">
    <Box pt={4} pb={6} px={4}>
      <Text fontWeight="light" fontSize="2xl">
        {course.frontmatter.title}
      </Text>
      <Box mt={6}>
        {course.frontmatter.sessions.map((session) => (
          <Flex key={session.startDateTime} mt={2} justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <HStack pr={4}>
              <FaClock />
              <Text>{getSessionString(session)}</Text>
            </HStack>
            <HStack>
              <FaMapMarkerAlt />
              <Text>{session.place}</Text>
            </HStack>
            <Divider />
          </Flex>
        ))}
        {course.frontmatter.lecturer && (
          <HStack mt={6}>
            <FaChalkboardTeacher />
            <Text>{course.frontmatter.lecturer}</Text>
          </HStack>
        )}
      </Box>
      <Box mt={6} fontSize="md">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: course.html }} />
      </Box>
    </Box>
  </Box>
)

export default CourseCard
