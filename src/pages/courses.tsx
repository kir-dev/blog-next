import { Box, Button, chakra, Heading, Link as ChakraLink, Text } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Container from '../components/Container'
import CourseCard from '../components/course-components/CourseCard'
import Header from '../components/Header'
import IndexLayout from '../layouts'
import { CourseProps } from '../types/course.props'
import { CURRENT_COURSE_FORM_URL, CURRENT_COURSE_SEMESTER } from '../utils/configurations'

interface CoursesProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
        html: string
        frontmatter: CourseProps
      }[]
    }
  }
}

const CoursesPage: React.FC<CoursesProps> = ({ data }) => (
  <IndexLayout>
    <Box>
      <Header>
        <Container>
          <Heading as="h1">Tanfolyamaink</Heading>
          <Text fontFamily="mono" pt={4} fontSize="xl">
            A tavaszi félévek folyamán webes alapozót, és több tanfolyamsorozatot tartunk, ahol megismerkedhettek a HTML és a CSS
            alapjaival, egy-egy keretrendszer használatával, illetve a munka világában használatos fogalmakkal, eszközökkel.
          </Text>
        </Container>
      </Header>
      <Container>
        <Box>
          <Heading as="h2">{CURRENT_COURSE_SEMESTER}</Heading>
          {data.allMarkdownRemark.nodes.map((course) => (
            <CourseCard key={course.fields.slug} course={course} />
          ))}
        </Box>

        <Box>
          <Heading as="h2">Jelentkezés</Heading>
          <Text>
            A tanfolyamra azokat várjuk, akik szeretnének elsajátítani egy olyan tudást, ami az iparban is haszon lehet. Sajnos a férőhelyek
            száma korlátos, így a tanfolyam résztvevőinek listáját jelentkezési sorrend alapján alakítjuk ki.
          </Text>
          <Button color="white" bg="orange.500" _hover={{ bg: 'orange.600' }} as={ChakraLink} px={6} href={CURRENT_COURSE_FORM_URL}>
            Jelentkezz!
          </Button>
        </Box>

        <Box>
          <Heading as="h2">Információk</Heading>
          <Text>
            Körünk a Kollégiumi Információs Rendszer Fejlesztői és Üzemeltetői, kicsit egyszerűbben a BME VIK hallgatóiból álló webfejlesztő
            csapat. Feladatunk a Villanykar hallgatói számára hasznos webes alkalmazások készítése és üzemeletetése. Körünkről{' '}
            <Link to="/about">
              <chakra.span color="orange.400" _hover={{ textDecor: 'underline', color: 'tomato' }}>
                itt
              </chakra.span>
            </Link>{' '}
            olvashatsz többet. További információkért keress minket{' '}
            <Link to="/about#contact">
              <chakra.span color="orange.400" _hover={{ textDecor: 'underline', color: 'tomato' }}>
                elérhetőségeinken
              </chakra.span>
            </Link>
            !
          </Text>
        </Box>
      </Container>
    </Box>
  </IndexLayout>
)

export default CoursesPage

export const query = graphql`
  query Courses {
    allMarkdownRemark(filter: { fields: { layout: { eq: "course" } } }) {
      nodes {
        fields {
          slug
        }
        html
        frontmatter {
          title
          sessions {
            time
            place
          }
          lecturer
          active
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`
