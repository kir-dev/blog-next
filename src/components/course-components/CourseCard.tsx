import { Box, Divider, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaChalkboardTeacher, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { CourseProps, ISession } from '~types/course.props'

interface CourseCardProps {
  course: CourseProps
}

const getSessionString = (session: ISession): string => {
  const startDateTime = new Date(session.startDateTime)
  const targetDateTime = new Date(startDateTime)
  targetDateTime.setHours(targetDateTime.getHours() + session.lengthInHours)

  return `${startDateTime.toLocaleTimeString('hu', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })} - ${targetDateTime.toLocaleTimeString('hu', {
    hour: '2-digit',
    minute: '2-digit'
  })}`
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <Box borderWidth="1px" rounded="lg" shadow="lg">
    <Box pt={4} pb={4} px={4}>
      <Heading fontWeight="400" fontSize="2xl">
        {course.title}
      </Heading>
      <Box mt={6}>
        {course.sessions.map((session) => (
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
        {course.lecturer && (
          <HStack mt={6}>
            <FaChalkboardTeacher />
            <Text>{course.lecturer}</Text>
          </HStack>
        )}
      </Box>
      <Box mt={2} fontSize="md">
        {course.description}
      </Box>
    </Box>
  </Box>
)

export default CourseCard
