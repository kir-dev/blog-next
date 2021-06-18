import { Box, chakra, Flex, Grid, Heading, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import * as React from 'react'
import NodeLogo from '../assets/images/node-logo.svg'
import RailsLogo from '../assets/images/rails-logo.svg'
import SpringLogo from '../assets/images/spring-logo.svg'
import AboutParagraph from '../components/about-components/AboutParagraph'
import StickyNote from '../components/about-components/StickyNote'
import Container from '../components/Container'
import InfoBox from '../components/indexpage-components/InfoBox'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const ABOUT_MAP: Map<string, string> = new Map([
  ['inception', 'Körünk alakulása'],
  ['softwares', 'Szoftveres világunk'],
  ['github', 'GitHub'],
  ['ops', 'Üzemeltetés'],
  ['slack', 'Slack'],
  ['contact', 'Kapcsolat']
])

const AboutPage: React.FC = () => {
  const firstHeadingSize = useBreakpointValue({ base: '3xl', sm: '4xl', md: '5xl' })
  const secondHeadingSize = useBreakpointValue({ base: '2xl', sm: '3xl', md: '4xl' })
  const logoStyles = { width: useBreakpointValue({ base: '100%', md: '60%' }), height: useBreakpointValue({ base: '100%', md: '60%' }) }

  return (
    <IndexLayout>
      <Page>
        <Container>
          <Box textAlign="center" my={6}>
            <Heading mb={6} fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }} fontWeight="bold" lineHeight="none" letterSpacing="tight">
              A{' '}
              <Text display="inline" w="full" bgClip="text" bgGradient="linear(to-r, orange.400, purple.500)" fontWeight="extrabold">
                Schönherz koli
              </Text>{' '}
              webfejlesztői
            </Heading>
          </Box>

          <AboutParagraph title={ABOUT_MAP.get('inception')} id="inception" titleSize={firstHeadingSize}>
            <AboutParagraph title="Történelem" titleSize={secondHeadingSize}>
              Asd
            </AboutParagraph>
            <AboutParagraph title="Céljaink" titleSize={secondHeadingSize}>
              Asd
            </AboutParagraph>
          </AboutParagraph>

          <AboutParagraph title={ABOUT_MAP.get('softwares')} id="softwares" titleSize={firstHeadingSize}>
            <Flex direction={{ base: 'column', sm: 'row' }}>
              <Box flex={1}>
                <AboutParagraph title="Text editor" titleSize={secondHeadingSize}>
                  <Text mt={6} mb={4}>
                    Szívesen kódolunk többek között a webes fejlesztések leggyakrabban használt text editorjával, a{' '}
                    <Link href="https://code.visualstudio.com/" fontFamily="mono">
                      Visual Studio Code
                    </Link>
                    -dal, illetve a JetBrains IDE-kkel,{' '}
                    <Link href="https://www.jetbrains.com/idea/" fontFamily="mono">
                      IntelliJ IDEA
                    </Link>
                    -val és{' '}
                    <Link href="https://www.jetbrains.com/ruby/" fontFamily="mono">
                      RubyMine
                    </Link>
                    -nal.
                  </Text>
                </AboutParagraph>
              </Box>
              <Box alignSelf="flex-end" mb={{ base: 0, sm: 10 }} ml={3} maxW={{ base: '75%', sm: '10rem', lg: '16rem' }}>
                <StickyNote>
                  <Text>
                    <chakra.span fontWeight="bold">Tudtad-e?</chakra.span> Kari hallgatóként{' '}
                    <Link href="https://admin.sch.bme.hu/profile/">SCH-s accountoddal</Link> szert tehetsz Ultimate verziójú JetBrains
                    IDE-kre. Ismerkedj meg az{' '}
                    <Link href="https://www.jetbrains.com/community/education/#students" fontFamily="mono">
                      IntelliJ IDEA Ultimate-tel
                    </Link>
                    !
                  </Text>
                </StickyNote>
              </Box>
            </Flex>
            <AboutParagraph title="Tech Stack" titleSize={secondHeadingSize}>
              <Grid my={4} templateColumns={`repeat(${useBreakpointValue({ base: 1, md: 3 })}, 1fr)`} gap={{ base: 4, md: 10 }}>
                <InfoBox img={<RailsLogo style={logoStyles} />} title="Ruby on Rails">
                  <Text textAlign={{ base: 'left', md: 'center' }}>
                    Ruby nyelvet használó összetett webes MVC framework. Villámgyorsan lehet benne fejleszteni, izgalmas a nyelv és magas
                    szintű a Rails támogatottsága, óriási a választék a közösség által fejlesztett modulokban.
                  </Text>
                </InfoBox>
                <InfoBox img={<NodeLogo style={logoStyles} />} title="NodeJS">
                  <Text textAlign={{ base: 'left', md: 'center' }}>
                    A piac talán legelterjedtebb technológiája, aszinkron eseményvezérelt webes JavaScriptes runtime. Express
                    keretrendszerrel és TypeScript nyelvvel használjuk együtt. Kényelmesen használható, színes tech stackeket lehet köré
                    varázsolni.
                  </Text>
                </InfoBox>
                <InfoBox img={<SpringLogo style={logoStyles} />} title="Spring Boot">
                  <Text textAlign={{ base: 'left', md: 'center' }}>... Kotlin nyelvvel és Thymeleaf sablonmotorral használjuk együtt.</Text>
                </InfoBox>
              </Grid>
              <Flex direction={{ base: 'column', sm: 'row' }}>
                <Box flex={1}>
                  <Text mt={10} mb={4}>
                    A fentiek a legfőbb webes technológiáink. Ezeken kívül vannak további extra techjeink, amelyek a projektjeinket
                    kiegészítik, ilyenek például: a{' '}
                    <Link href="https://hibernate.org/" fontFamily="mono">
                      Hibernate
                    </Link>
                    , a{' '}
                    <Link href="https://www.gatsbyjs.com/" fontFamily="mono">
                      Gatsby
                    </Link>
                    , a{' '}
                    <Link href="https://hu.reactjs.org/" fontFamily="mono">
                      React
                    </Link>
                    , illetve a{' '}
                    <Link href="https://tailwindcss.com/" fontFamily="mono">
                      TailwindCSS
                    </Link>
                    .
                  </Text>
                </Box>
                <Box alignSelf="flex-end" ml={3} maxW={{ base: '75%', sm: '10rem', lg: '16rem' }}>
                  <StickyNote>
                    <Text>
                      <GatsbyLink to="/projects">
                        <chakra.span fontWeight="bold">Projektjeink:</chakra.span>
                      </GatsbyLink>{' '}
                      Ezen az oldalon bemutatásra kerülnek projektjeink. Megtudhatod többet között azt is, milyen technológiákkal készülnek.
                    </Text>
                  </StickyNote>
                </Box>
              </Flex>
            </AboutParagraph>
          </AboutParagraph>

          <AboutParagraph title={ABOUT_MAP.get('github')} id="github" titleSize={firstHeadingSize}>
            <Flex mt={6} direction={{ base: 'column', sm: 'row' }}>
              <Box flex={1} mb={4}>
                <Text>
                  Alkalmazásaink mind nyílt forráskódúak, ez a fejlesztőeszközeink kiválasztásánál is fő szempont. Verziókezelésre a gitet
                  használjuk, kódbázisunk pedig a GitHubon kap helyet, ott található GitHubos szervezetünk.
                </Text>
                <Text pt={2}>
                  A platform segítségével ismerkedünk a Continuous Integration/Continuous Deployment (CI/CD) működésével például a GitHub
                  Actions-ön keresztül, illetve projektjeink haladását a Project Boardokon keresztül menedzseljük.
                </Text>
              </Box>
              <Box alignSelf="flex-end" ml={3} mb={{ base: 0, sm: 20 }} maxW={{ base: '75%', sm: '10rem', lg: '16rem' }}>
                <StickyNote>
                  <Text>
                    <chakra.span fontWeight="bold">Tipp:</chakra.span> Nézz utána, milyen lehetőségekre tehetsz szert a{' '}
                    <Link href="https://education.github.com/pack">GitHub Student Developer Pack-jével</Link>! Használd egyetemi vagy{' '}
                    <Link href="https://admin.sch.bme.hu/profile/">SCH-s e-mail címed</Link> a csomag feloldására.
                  </Text>
                </StickyNote>
              </Box>
            </Flex>
          </AboutParagraph>

          <AboutParagraph title={ABOUT_MAP.get('ops')} id="ops" titleSize={firstHeadingSize}>
            <Text mt={6}>
              Egy projekt gondozása során fontos visszatérő epizód az üzemeltetés megoldása. Projektjeink Docker konténerek segítségével
              kerülnek elindításra szerverünkön.
            </Text>
            <Text py={2}>
              Van projektünk, amely a szerverünkön kívül, egy Kubernetes klaszterben kerül kiszállításra a KSZK-nak köszönhetően, akik
              gondozzák a klasztert.
            </Text>
            <Text>
              Deploymentjeink során használatba vesszük még különféle felhő szolgáltatók platformjait: ezek a Vercel, a Netlify és az AWS.
            </Text>
          </AboutParagraph>

          <AboutParagraph title={ABOUT_MAP.get('slack')} id="slack" titleSize={firstHeadingSize}>
            <Text mt={6}>
              Kommunikációs főhadiszállásunk a Slack-en foglal helyet. Itt online kerülnek megvitatásra a kör munkafolyamataival és
              közösségi szervezésével kapcsolatos dolgai.
            </Text>
          </AboutParagraph>

          <AboutParagraph title={ABOUT_MAP.get('contact')} id="contact" titleSize={firstHeadingSize}>
            <Text mt={6}>
              Ha maradt még kérdésed, van valami feladatod számunkra, vagy esetleg csatlakoznál hozzánk: írj ránk email címünkön, gyere el
              gyűléseinkre!
            </Text>
          </AboutParagraph>

          <Box textAlign="right" my={10} fontSize={{ base: '3xl', sm: '4xl' }} fontFamily="mono" lineHeight="none" letterSpacing="tight">
            <Text>Üdvözöl: </Text>a{' '}
            <Text display="inline" w="full" bgClip="text" bgGradient="linear(to-r, orange.400, purple.500)" fontWeight="extrabold">
              Kir-Dev
            </Text>{' '}
            csapata
          </Box>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default AboutPage
