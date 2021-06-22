import { Box, chakra, Flex, Grid, Heading, HStack, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import * as React from 'react'
import { FaAt, FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa'
import NodeLogo from '../assets/images/node-logo.svg'
import RailsLogo from '../assets/images/rails-logo.svg'
import SimonyiLogo from '../assets/images/simonyi-logo.svg'
import SlackDcLogo from '../assets/images/slack-dc-logo.svg'
import SpringLogo from '../assets/images/spring-logo.svg'
import AboutParagraph from '../components/about-components/AboutParagraph'
import StickyNote from '../components/about-components/StickyNote'
import Container from '../components/Container'
import InfoBox from '../components/indexpage-components/InfoBox'
import IndexLayout from '../layouts'
import { FACEBOOK_PAGE_URL, GITHUB_ORG_URL, PUBLIC_EMAIL, YOUTUBE_CHANNEL_URL } from '../utils/configurations'

const ABOUT_MAP: Map<string, string> = new Map([
  ['inception', 'Körünk alakulása'],
  ['softwares', 'Szoftveres világunk'],
  ['github', 'GitHub'],
  ['ops', 'Üzemeltetés'],
  ['slack_dc', 'Slack és Discord'],
  ['contact', 'Kapcsolat']
])

const AboutPage: React.FC = () => {
  const linkColor = 'orange.400'
  const linkHover = { color: 'tomato', textDecor: 'underline' }
  const stickyBoxWidth = { base: '75%', sm: '10rem', lg: '14rem' }
  const socialSize = useBreakpointValue({ base: '1rem', lg: '1.5rem' })
  const firstHeadingSize = useBreakpointValue({ base: '4xl', sm: '5xl' })
  const secondHeadingSize = useBreakpointValue({ base: '2xl', sm: '3xl' })
  const logoStyles = { width: useBreakpointValue({ base: '100%', md: '60%' }), height: useBreakpointValue({ base: '100%', md: '60%' }) }

  return (
    <IndexLayout>
      <Box>
        <Container>
          <Box textAlign="center" my={6}>
            <Heading mb={6} fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }} fontWeight="bold" lineHeight="none" letterSpacing="tight">
              A kollégium{' '}
              <Text display="inline" w="full" bgClip="text" bgGradient="linear(to-r, tomato, orange.300)" fontWeight="extrabold">
                webfejlesztő
              </Text>{' '}
              köre
            </Heading>
          </Box>

          <AboutParagraph title={ABOUT_MAP.get('inception')} id="inception" titleSize={firstHeadingSize}>
            <Box>
              <Box float="right" pl={3} pb={3}>
                <SimonyiLogo
                  style={{
                    width: useBreakpointValue({ base: '4rem', md: '6rem' }),
                    height: useBreakpointValue({ base: '4rem', md: '6rem' })
                  }}
                />
              </Box>
              <AboutParagraph title="Történelem" titleSize={secondHeadingSize}>
                <Text mt={6}>
                  A Kollégiumi Információs Rendszer Fejlesztői és Üzemeltetői – röviden Kir-Dev – a BME VIK hallgatóiból álló webfejlesztő
                  csapat. Körünk 2001-ben alakult, 2009 óta a{' '}
                  <Link href="https://simonyi.bme.hu/" color={linkColor} _hover={linkHover}>
                    Simonyi Károly Szakkollégium
                  </Link>{' '}
                  része. Alakulásunk óta foglalkozunk különféle webes technológiák alkalmazásával és oktatásával, valamint fejlesztünk és
                  üzemeltetünk a kollégiumi közösség számára hasznos webes alkalmazásokat.
                </Text>
                <Text py={2}>
                  Fő feladatunk a{' '}
                  <GatsbyLink to="/project/pek-next">
                    <chakra.span color={linkColor} _hover={linkHover}>
                      Profil és Körök
                    </chakra.span>
                  </GatsbyLink>{' '}
                  – röviden PéK – folyamatos fejlesztése és karbantartása. Jelenleg ezen az alkalmazáson keresztül folyik a kar közösségi
                  pontozása. Ez a rendszer már több generációt is megélt az aktív körtagoknak köszönhetően: legelőször Kollégiumi
                  Információs Rendszernek hívtuk (KIR), ez a generáció PHP-ban íródott még. Aztán a kiterjedésével újraírtuk JavaEE-s
                  alapokon, OpenAM mellett, és Villanykari Információs Rendszer (VIR) lett a neve, később pedig megkapta modern nevét, a
                  PéK-et. 2015-ben végül pedig a PéK Ruby on Rails alapokra lett migrálva. További történeteket blogunk archívumában
                  olvashatsz{' '}
                  <GatsbyLink to="/post/2014-01-29-pek-jelen-es-jovo-iv/">
                    <chakra.span color={linkColor} _hover={linkHover}>
                      PÉK jelene és jövője
                    </chakra.span>
                  </GatsbyLink>{' '}
                  címek alatt.
                </Text>
                <Text />
              </AboutParagraph>
            </Box>

            <AboutParagraph title="Céljaink" titleSize={secondHeadingSize}>
              <Text mt={6}>
                Elsősorban a PéK fejlesztése és fenntartása miatt alakult körünk, de ez nem az egyetlen indok körünk létrejöttére. Célja a
                körnek összetartani a VIK hallgatóságának azon tagjait, akik hasonló érdeklődésűek és inspirációt látnak a webfejlesztés
                világában. A kör teret ad a webes szakma területeinek felfedezésére, a tapasztalatok megosztására. Projektjeinket törekszünk
                a legfrissebb csapatszervezési és folyamatirányítási módszereknek megfelelően vezetni, hogy tagjaink minél közelebb
                kerülhessenek az iparban való munka megtapasztalásához, és jó alapokkal indulhassanak el.
              </Text>
            </AboutParagraph>
          </AboutParagraph>

          <AboutParagraph title={ABOUT_MAP.get('softwares')} id="softwares" titleSize={firstHeadingSize}>
            <Flex direction={{ base: 'column', sm: 'row' }}>
              <Box flex={1}>
                <AboutParagraph title="Text editor" titleSize={secondHeadingSize}>
                  <Text mt={6}>
                    Szívesen kódolunk többek között a webes fejlesztések leggyakrabban használt text editorjával, a{' '}
                    <Link href="https://code.visualstudio.com/" color={linkColor} _hover={linkHover}>
                      Visual Studio Code
                    </Link>
                    -dal, illetve a JetBrains IDE-kkel,{' '}
                    <Link href="https://www.jetbrains.com/idea/" color={linkColor} _hover={linkHover}>
                      IntelliJ IDEA
                    </Link>
                    -val és{' '}
                    <Link href="https://www.jetbrains.com/ruby/" color={linkColor} _hover={linkHover}>
                      RubyMine
                    </Link>
                    -nal.
                  </Text>
                </AboutParagraph>
              </Box>
              <Box alignSelf={{ base: 'flex-end', sm: 'inherit' }} mt={{ base: 4, sm: 10 }} ml={4} maxW={stickyBoxWidth}>
                <StickyNote>
                  <Text>
                    <chakra.span fontWeight="bold">Tudtad-e?</chakra.span> Kari hallgatóként{' '}
                    <Link href="https://admin.sch.bme.hu/profile/">SCH-s accountoddal</Link> szert tehetsz Ultimate verziójú JetBrains
                    IDE-kre. Ismerkedj meg az{' '}
                    <Link href="https://www.jetbrains.com/community/education/#students">IntelliJ IDEA Ultimate-tel</Link>!
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
                  <Text textAlign={{ base: 'left', md: 'center' }}>
                    A Spring platformjának előkonfigurált változata, amely roppant könnyűvé teszi a fejlesztést. Kotlin nyelvvel és
                    Thymeleaf sablonmotorral használjuk együtt. Számításigényes feladatokra alkalmazzák, többszálasan működik, és egyszerű
                    futtatni.
                  </Text>
                </InfoBox>
              </Grid>
              <Flex direction={{ base: 'column', sm: 'row' }}>
                <Box flex={1}>
                  <Text mt={10}>
                    A fentiek a legfőbb webes technológiáink. Ezeken kívül vannak további extra techjeink, amelyek a projektjeinket
                    kiegészítik, ilyenek például: a{' '}
                    <Link href="https://hibernate.org/" color={linkColor} _hover={linkHover}>
                      Hibernate
                    </Link>
                    , a{' '}
                    <Link href="https://www.gatsbyjs.com/" color={linkColor} _hover={linkHover}>
                      Gatsby
                    </Link>
                    , a{' '}
                    <Link href="https://hu.reactjs.org/" color={linkColor} _hover={linkHover}>
                      React
                    </Link>
                    , illetve a{' '}
                    <Link href="https://tailwindcss.com/" color={linkColor} _hover={linkHover}>
                      TailwindCSS
                    </Link>
                    .
                  </Text>
                </Box>
                <Box alignSelf={{ base: 'flex-end', sm: 'inherit' }} ml={4} mt={4} maxW={stickyBoxWidth}>
                  <StickyNote>
                    <Text>
                      <GatsbyLink to="/projects">
                        <chakra.span fontWeight="bold" _hover={{ textDecor: 'underline' }}>
                          Projektjeink:
                        </chakra.span>
                      </GatsbyLink>{' '}
                      Ezen az oldalon bemutatásra kerülnek projektjeink. Megtudhatod többet között azt is, milyen technológiákkal készülnek.
                    </Text>
                  </StickyNote>
                </Box>
              </Flex>
            </AboutParagraph>
          </AboutParagraph>

          <AboutParagraph title={ABOUT_MAP.get('github')} id="github" titleSize={firstHeadingSize}>
            <Flex direction={{ base: 'column', sm: 'row' }}>
              <Box mt={6} flex={1} mb={4}>
                <Text>
                  Alkalmazásaink mind nyílt forráskódúak, ez a fejlesztőeszközeink kiválasztásánál is fő szempont. Verziókezelésre a gitet
                  használjuk, kódbázisunk pedig a GitHubon kap helyet, ott található{' '}
                  <Link href="https://github.com/kir-dev" color={linkColor} _hover={linkHover}>
                    GitHub szervezetünk
                  </Link>
                  .
                </Text>
                <Text pt={2}>
                  A platform segítségével ismerkedünk a{' '}
                  <Link href="https://en.wikipedia.org/wiki/CI/CD" color={linkColor} _hover={linkHover}>
                    Continuous Integration/Continuous Deployment (CI/CD)
                  </Link>{' '}
                  működésével például a GitHub Actions-ön keresztül, illetve projektjeink haladását a Project Boardokon keresztül
                  menedzseljük.
                </Text>
              </Box>
              <Box alignSelf={{ base: 'flex-end', sm: 'inherit' }} ml={4} maxW={stickyBoxWidth}>
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
              Egy projekt gondozása során fontos visszatérő epizód az üzemeltetés megoldása. Projektjeink{' '}
              <Link href="https://www.docker.com/get-started" color={linkColor} _hover={linkHover}>
                Docker
              </Link>{' '}
              konténerek segítségével kerülnek elindításra szerverünkön.
            </Text>
            <Text py={2}>
              Van projektünk, amely a szerverünkön kívül, egy{' '}
              <Link href="https://kubernetes.io/" color={linkColor} _hover={linkHover}>
                Kubernetes
              </Link>{' '}
              klaszterben kerül kiszállításra a{' '}
              <Link href="https://kszk.bme.hu/" color={linkColor} _hover={linkHover}>
                KSZK-nak
              </Link>{' '}
              köszönhetően, akik gondozzák a klasztert.
            </Text>
            <Text>
              Deploymentjeink során használatba vesszük még különféle felhő szolgáltatók platformjait: ezek a{' '}
              <Link href="https://vercel.com/" color={linkColor} _hover={linkHover}>
                Vercel
              </Link>
              , a{' '}
              <Link href="https://www.netlify.com/" color={linkColor} _hover={linkHover}>
                Netlify
              </Link>{' '}
              és az{' '}
              <Link href="https://aws.amazon.com/" color={linkColor} _hover={linkHover}>
                AWS
              </Link>
              .
            </Text>
          </AboutParagraph>

          <Box>
            <Box mt={10} float="right" pl={3} pb={3}>
              <SlackDcLogo
                style={{
                  width: useBreakpointValue({ base: '6rem', md: '9rem' }),
                  height: useBreakpointValue({ base: '6rem', md: '9rem' })
                }}
              />
            </Box>
            <AboutParagraph title={ABOUT_MAP.get('slack_dc')} id="slack_dc" titleSize={firstHeadingSize}>
              <Text mt={6}>
                Mindenféle online kommunikációt a Slack-en folytatunk, itt kerülnek megvitatásra a kör munkafolyamataival és közösségi
                szervezésével kapcsolatos dolgai. Discordon pedig a csapatépüléseket, valamint az online körgyűléseket tartjuk meg.
              </Text>
            </AboutParagraph>
          </Box>

          <AboutParagraph title={ABOUT_MAP.get('contact')} id="contact" titleSize={firstHeadingSize}>
            <AboutParagraph title="Csatlakozz!" titleSize={secondHeadingSize}>
              <Text mt={6}>
                Kedved támadt csapatban hasznos webes alkalmazásokat programozni, amik akár többezer hallgatót is elérhetnek? Esetleg már
                van tapasztalatod a webfejlesztés terén? Csatlakozz hozzánk akármikor, mindig nyitottak vagyunk lelkes érdeklődök felé! A
                projektek vezetői szívesen bevezetnek mindenkit a fejlesztés folyamatába. Ha megjött a kedved csatlakozni, írj ránk a
                lentebb található e-mail címen!
              </Text>
              <Text pt={2}>
                Ha még nincs mély ismereted a területen, akkor se félj, tavasszal lehetőséged van részt venni tanfolyamainkon, majd
                mentorprogramunkban, amely során a mentor végig segíti fejlődésed a csapatban, és útközben be is csatlakozhatsz projektjeink
                fejlesztésébe.{' '}
                <GatsbyLink to="/courses">
                  <chakra.span color={linkColor} _hover={linkHover}>
                    Tudj meg többet tanfolyamainkról és a jelentkezésről itt!
                  </chakra.span>
                </GatsbyLink>
              </Text>
            </AboutParagraph>
            <AboutParagraph title="Kommunikáció" id="contact" titleSize={secondHeadingSize}>
              <Flex mt={6} direction={{ base: 'column', sm: 'row' }}>
                <Text pr={{ base: 0, sm: 10 }}>
                  Ha maradt még kérdésed, hibajegyet szeretnél feladni valamilyen projektünkkel kapcsolatban, vagy van valami izgalmas
                  feladatod számunkra: vedd fel a kapcsolatot velünk email címünkön, esetleg gyere el gyűléseinkre a Schönherz Kollégium
                  1319-es szobájába!
                </Text>
                <Flex flex={1} whiteSpace="nowrap" width="full" direction="column" alignItems="flex-end">
                  <HStack pb={2} as={Link} _hover={{ color: 'orange.400' }} href={GITHUB_ORG_URL}>
                    <Text>GitHub szervezetünk</Text>
                    <FaGithub size={socialSize} />
                  </HStack>
                  <HStack py={2} as={Link} _hover={{ color: 'orange.400' }} href={YOUTUBE_CHANNEL_URL}>
                    <Text>YouTube csatornánk</Text>
                    <FaYoutube size={socialSize} />
                  </HStack>
                  <HStack py={2} as={Link} _hover={{ color: 'orange.400' }} href={FACEBOOK_PAGE_URL}>
                    <Text>Facebook oldalunk</Text>
                    <FaFacebook size={socialSize} />
                  </HStack>
                  <HStack py={2}>
                    <Text>{PUBLIC_EMAIL}</Text>
                    <FaAt size={socialSize} />
                  </HStack>
                </Flex>
              </Flex>
            </AboutParagraph>
          </AboutParagraph>

          <Box textAlign="center" my={10} fontSize={{ base: '3xl', sm: '4xl' }} lineHeight="none" letterSpacing="tight">
            <Text>Üdvözöl: </Text>a{' '}
            <Text display="inline" w="full" bgClip="text" bgGradient="linear(to-r, tomato, orange.300)" fontWeight="extrabold">
              Kir-Dev
            </Text>{' '}
            csapata
          </Box>
        </Container>
      </Box>
    </IndexLayout>
  )
}

export default AboutPage
