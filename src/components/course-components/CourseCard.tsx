import { Box, Divider, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaChalkboardTeacher, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { CourseProps, ISession } from 'types/course.props'

type Props = {
  course: CourseProps
}

const getSessionString = (session: ISession): string => {
  const startDate = new Date(parseInt(session.startDate))
  return `${startDate.toLocaleDateString('hu', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })} ${session.startTime} - ${session.endTime}`
}

export const CourseCard: React.FC<Props> = ({ course }) => (
  <Box borderWidth="1px" rounded="lg" shadow="lg">
    <Box pt={4} pb={4} px={4}>
      <Heading fontWeight="400" fontSize="2xl">
        {course.title}
      </Heading>
      <Box mt={6}>
        {course.sessions.map((session, index) => (
          <Flex key={course.lecturer + index} mt={2} justifyContent="space-between" alignItems="center" flexWrap="wrap">
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
