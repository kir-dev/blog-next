import { Alert, AlertIcon, Box, Button, Flex, Heading, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { chakra, useColorModeValue } from '@chakra-ui/system'
import { BlogContainer } from 'components/BlogContainer'
import CourseCard from 'components/course-components/CourseCard'
import { Header } from 'components/Header'
import { SEO } from 'components/SEO'
import { graphql, Link } from 'gatsby'
import React from 'react'
import { CourseProps } from 'types/course.props'
import { environment } from 'utils/configurations'
import { IndexLayout } from '../layouts'

type Props = {
  data: {
    allCoursesYaml: {
      nodes: CourseProps[]
    }
  }
}

const CoursesPage: React.FC<Props> = ({ data }) => {
  const widthsPerBreakpoint = { base: '100%', md: '49%' }

  return (
    <IndexLayout
      background={`${useBreakpointValue({
        base: '',
        md: 'url(/background/bottom-left.svg) left top no-repeat, '
      })}url(/background/bottom-right.svg) right bottom no-repeat`}
    >
      <Box>
        <Header>
          <BlogContainer>
            <Flex direction={{ base: 'column', md: 'row' }}>
              <Box>
                <Heading as="h1" size="2xl">
                  Tanfolyamaink
                </Heading>
                <Text fontFamily="mono" mt={4} fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}>
                  A tavaszi félévek folyamán több alkalmas tanfolyamsorozatot tartunk. Megismerkedhettek a HTML-JS-CSS világával, egy-egy
                  webes keretrendszerrel, illetve a webfejlesztés szakkifejezéseivel, eszközeivel.
                </Text>
              </Box>
              <Flex justifyContent={environment.course.form.url ? 'space-between' : 'flex-end'} mt={4}>
                {environment.course.form.url && (
                  <Button
                    display={{ base: 'inherit', md: 'none' }}
                    color="white"
                    bg="orange.500"
                    _hover={{ bg: 'orange.600' }}
                    px={4}
                    onClick={() => window.open(environment.course.form.url, '_blank')}
                  >
                    Jelentkezz!
                  </Button>
                )}
                <Box w={{ base: '12rem', sm: '30rem', md: '24rem', lg: '26rem' }} ml={4}>
                  <Image src="/svg/techs-logo.svg" alt="Techs Logo" />
                </Box>
              </Flex>
            </Flex>
            {environment.course.form.url && (
              <Box display={{ base: 'none', md: 'inherit' }} mt={4}>
                <Button
                  color="white"
                  bg="orange.500"
                  _hover={{ bg: 'orange.600' }}
                  px={8}
                  onClick={() => window.open(environment.course.form.url, '_blank')}
                >
                  Jelentkezz!
                </Button>
              </Box>
            )}
          </BlogContainer>
        </Header>
        <BlogContainer>
          <Box>
            <Heading as="h2">{environment.course.semester}</Heading>
            {environment.course.extraInfo && (
              <Alert status="info" my={4}>
                <AlertIcon />
                {environment.course.extraInfo}
              </Alert>
            )}
            <Box mt={6}>
              <Flex flexWrap="wrap" display="inline-flex" gap={4} justifyContent="center">
                {data.allCoursesYaml.nodes
                  .sort((a, b) => a.order - b.order)
                  .map(
                    (course) =>
                      course.active && (
                        <Flex py={{ base: 2, sm: 1 }} flex={`0 0 ${useBreakpointValue(widthsPerBreakpoint)}`} key={course.title}>
                          <CourseCard course={course} />
                        </Flex>
                      )
                  )}
              </Flex>
            </Box>
          </Box>

          <Box mt={16}>
            <Heading as="h2">Jelentkezés</Heading>
            <Heading as="h3" size="md" mt={4}>
              Miért érdemes jelentkezned tanfolyamra?
            </Heading>
            <Text mt={4}>
              Körünkben lehetőséged van különböző webes technológiák megismerésére, amelyek használatát valódi, esetenként több ezres
              tömegeket kiszolgáló alkalmazások fejlesztésén keresztül sajátíthatod el. Nálunk olyan tudásra tehetsz szert, amit később
              közvetlenül az iparban is hasznosíthatsz. Szeretünk csapatban dolgozni, így fontosnak tartjuk az ezzel kapcsolatos soft
              skillek fejlesztését is.
            </Text>
            <Heading as="h3" size="md" mt={4}>
              Mire számíthatsz a tanfolyamokon?
            </Heading>
            <Text mt={4}>
              Tanfolyamainkon lehetőséged van betekinteni az általunk használt technológiákba és projektjeinkbe. Kellemes, baráti
              atmoszféra, gyakori szakmai poénok és segítőkész segédelőadók várnak. Nálunk nincsenek szigorú előkövetelmények, ha tudod, mik
              azok az alapvető adatstruktúrák, és hogy hogyan kell elágazásokat írni, már jó vagy. Az egyes alkalmakról minden tudnivalót
              (előadás témája, mit kell hozni, hova kell menni) előzetesen e-mail-ben fogsz megkapni az előadás előtt.
            </Text>
            {environment.course.form.closingInfo && (
              <Alert status="info" my={4}>
                <AlertIcon />
                {environment.course.form.closingInfo}
              </Alert>
            )}
            <Flex mt={10} direction={{ base: 'column', md: 'row' }}>
              <Heading as="h3" size="md">
                Sajnos, a férőhelyek száma korlátozott, így a tanfolyam résztvevőinek listáját jelentkezési sorrend alapján alakítjuk ki. A
                résztvevők emailben kapnak a jelentkezés lezárása utáni napon értesítést.
              </Heading>
              <Flex flex={1} justifyContent="flex-end" pl={{ base: 0, md: 8 }} mt={{ base: 4, md: 0 }}>
                {environment.course.form.url ? (
                  <Button
                    color="white"
                    bg="orange.500"
                    _hover={{ bg: 'orange.600' }}
                    px={8}
                    onClick={() => window.open(environment.course.form.url, '_blank')}
                  >
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

          <Box mt={16}>
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
              Természetesen lehetőséget adunk azok számára is bekapcsolódni a mentorprogramba, akik nem vesznek részt tanfolyamainkon,
              csupán szeretnének valóban a körbe csatlakozni. Azonban ez csak akkor tud működni, ha úgy érkezel mentorprogramunkba, hogy már
              van egy alapszintű ismereted a megfelelő keretrendszerben, aminek mentorálási munkacsoportjába jelentkezel.
            </Text>
            <Text mt={2}>
              Hogy a hagyományteremtés valóban sikeres legyen, és kialakulhasson egy stabil mentorrendszer, még sok dolgunk van annak
              további kidolgozásában. Erre áldoztuk időnk jó részét az elmúlt félévekben. Így részletes tájékoztatást csak később tudunk
              adni, addig is figyeljétek{' '}
              <chakra.span color="orange.400" _hover={{ textDecor: 'underline', color: 'tomato' }} as={Link} to="/blog">
                blogunkat
              </chakra.span>
              , ahol várhatóak hírek a következő tavaszi félév mentorálásával kapcsolatosan.
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
        </BlogContainer>
      </Box>
    </IndexLayout>
  )
}

export default CoursesPage

export const Head = () => <SEO title="Tanfolyamaink" />

export const query = graphql`
  query Courses {
    allCoursesYaml {
      nodes {
        title
        order
        sessions {
          startDate
          startTime
          endTime
          place
        }
        lecturer
        active
        description
      }
    }
  }
`
