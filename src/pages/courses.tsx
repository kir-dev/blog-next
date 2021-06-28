import { Box, Button, chakra, Flex, Grid, Heading, Link as ChakraLink, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import TechsLogo from '~assets/images/techs-logo.svg'
import Container from '~components/Container'
import CourseCard from '~components/course-components/CourseCard'
import Header from '~components/Header'
import { CourseProps } from '~types/course.props'
import { CURRENT_COURSE_FORM_URL, CURRENT_COURSE_SEMESTER } from '~utils/configurations'
import IndexLayout from '../layouts'

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
  <IndexLayout
    background={
      `url(/background/pattern-right.svg) right top repeat-y,url(/background/pattern-left.svg) left top repeat-y,` +
      `${useBreakpointValue({
        base: '',
        md: 'url(/background/bottom-left.svg) left top no-repeat, '
      })}url(/background/bottom-right.svg) right bottom no-repeat`
    }
  >
    <Box>
      <Header>
        <Container>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Heading as="h1" size="2xl">
                Tanfolyamaink
              </Heading>
              <Text fontFamily="mono" mt={4} fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}>
                A tavaszi félévek folyamán webes alapozót, és több alkalmas tanfolyamokat tartunk, ahol megismerkedhettek a HTML és a CSS
                alapjaival, egy-egy keretrendszer használatával, illetve a webfejlesztés során előkerülő fogalmakkal, eszközökkel.
              </Text>
            </Box>
            <Flex justifyContent={CURRENT_COURSE_FORM_URL ? 'space-between' : 'flex-end'} mt={4}>
              {CURRENT_COURSE_FORM_URL && (
                <Button
                  display={{ base: 'inherit', md: 'none' }}
                  color="white"
                  bg="orange.500"
                  _hover={{ bg: 'orange.600' }}
                  as={ChakraLink}
                  px={4}
                  href={CURRENT_COURSE_FORM_URL}
                >
                  Jelentkezz!
                </Button>
              )}
              <Flex justifyContent="flex-end" h={{ base: '7rem', sm: '9rem', md: '14rem', lg: '12rem' }} ml={4}>
                <TechsLogo style={{ height: '100%' }} />
              </Flex>
            </Flex>
          </Flex>
          {CURRENT_COURSE_FORM_URL && (
            <Box display={{ base: 'none', md: 'inherit' }} mt={4}>
              <Button color="white" bg="orange.500" _hover={{ bg: 'orange.600' }} as={ChakraLink} px={8} href={CURRENT_COURSE_FORM_URL}>
                Jelentkezz!
              </Button>
            </Box>
          )}
        </Container>
      </Header>
      <Container>
        <Box>
          <Heading as="h2">{CURRENT_COURSE_SEMESTER}</Heading>
          <Box mt={6}>
            <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, sm: 2 })}, 1fr)`} gap={6}>
              {data.allMarkdownRemark.nodes.map((course) => (
                <CourseCard key={course.fields.slug} course={course} />
              ))}
            </Grid>
          </Box>
        </Box>

        <Box mt={12}>
          <Heading as="h2">Jelentkezés</Heading>
          <Flex mt={4} direction={{ base: 'column', md: 'row' }}>
            <Text>
              A tanfolyamra azokat várjuk, akik szeretnének elsajátítani egy olyan tudást, ami az iparban is haszon lehet. Sajnos a
              férőhelyek száma korlátos, így a tanfolyam résztvevőinek listáját jelentkezési sorrend alapján alakítjuk ki.
            </Text>
            <Flex flex={1} justifyContent="flex-end" pl={{ base: 0, md: 8 }} mt={{ base: 4, md: 0 }}>
              {CURRENT_COURSE_FORM_URL ? (
                <Button color="white" bg="orange.500" _hover={{ bg: 'orange.600' }} as={ChakraLink} px={8} href={CURRENT_COURSE_FORM_URL}>
                  Jelentkezz!
                </Button>
              ) : (
                <Button colorScheme={useColorModeValue('blackAlpha', 'blue')} variant="outline">
                  Nincs jelentkezési időszak
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>

        <Box mt={8}>
          <Heading as="h2">Folytatás: mentorprogram</Heading>
          <Text mt={4}>
            Mentorprogramunk 2021 tavaszán indult azzal a céllal, hogy hagyományt teremtsünk, és megalapozzuk újoncozási stratégiánkat.
            Egy-egy tanfolyam lezárása után elkezdődik a <strong>mentorálási időszak</strong>, minden tanfolyamra indul egy-egy{' '}
            <strong>mentorálási munkacsoport</strong>, ahol a mentorok begyűjtik a mentorálandó újoncokat, és a hallgatott tanfolyam
            technológiájában segítenek elmélyedni.
          </Text>
          <Text mt={2}>
            A mentorálás során lehetőséged van tagjaink felügyelete alatt megismerkedni az alapvető munkafolyamatokkal és eszközökkel
            körünknél, ezzel is segítve szakmai fejlődésed és a lehetőséget megteremtve számodra, hogy a kör vérkeringésébe bekerülhess,
            azaz beszállj körünk projektjeibe.
          </Text>
          <Text mt={2}>
            Természetesen lehetőséget adunk azok számára is bekapcsolódni a mentorprogramba, akik nem vesznek részt tanfolyamainkon, csupán
            szeretnének valóban a körbe csatlakozni. Azonban ez csak akkor tud működni, ha úgy érkezel mentorprogramunkba, hogy már van egy
            alapszintű ismereted a megfelelő keretrendszerben, aminek mentorálási munkacsoportjába jelentkezel.
          </Text>
          <Text mt={2}>
            Hogy a hagyományteremtés valóban sikeres legyen, és kialakulhasson egy stabil mentorrendszer, még sok dolgunk van annak további
            kidolgozásában. Erre áldozzuk időnk jó részét 2021 őszi félévében. Így részletes tájékoztatást csak később tudunk adni, addig is
            figyeljétek{' '}
            <chakra.span color="orange.400" _hover={{ textDecor: 'underline', color: 'tomato' }} as={Link} to="/blog">
              blogunkat
            </chakra.span>
            , várhatóak hírek a következő tavaszi félév mentorálásával kapcsolatosan.
          </Text>
        </Box>

        <Box my={8}>
          <Heading as="h2">Egyéb információk</Heading>
          <Text mt={4}>
            Bátorítunk, hogy érdeklődj nyugodtan, ha még maradt kérdésed akármivel kapcsolatosan. Keress minket{' '}
            <chakra.span color="orange.400" _hover={{ textDecor: 'underline', color: 'tomato' }} as={Link} to="/about#contact">
              elérhetőségeinken
            </chakra.span>
            ! Körünkről és küldetésünkről{' '}
            <chakra.span color="orange.400" _hover={{ textDecor: 'underline', color: 'tomato' }} as={Link} to="/about">
              itt olvashatsz
            </chakra.span>{' '}
            többet.
          </Text>
        </Box>
      </Container>
    </Box>
  </IndexLayout>
)

export default CoursesPage

export const query = graphql`
  query Courses {
    allMarkdownRemark(filter: { fields: { layout: { eq: "course" } }, frontmatter: { active: { eq: true } } }) {
      nodes {
        fields {
          slug
        }
        html
        frontmatter {
          title
          sessions {
            startDateTime
            lengthInHours
            place
          }
          lecturer
          active
        }
      }
    }
  }
`
