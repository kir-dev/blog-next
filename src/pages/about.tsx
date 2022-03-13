import { Box, Flex, Grid, Heading, HStack, Image, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import { Link as GatsbyLink } from 'gatsby'
import * as React from 'react'
import { IconType } from 'react-icons'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import AboutParagraph from '~components/about-components/AboutParagraph'
import StickyNote from '~components/about-components/StickyNote'
import Container from '~components/Container'
import InfoBox from '~components/indexpage-components/InfoBox'
import SEO from '~components/SEO'
import {
  FACEBOOK_PAGE_URL,
  GITHUB_ORG_URL,
  INSTAGRAM_PAGE_URL,
  MEETING_START_TIME,
  PUBLIC_EMAIL,
  TWITTER_USERNAME,
  YOUTUBE_CHANNEL_URL
} from '~utils/configurations'
import IndexLayout from '../layouts'

const ABOUT_MAP: Map<string, string> = new Map([
  ['inception', 'Körünk alakulása'],
  ['softwares', 'Szoftveres világunk'],
  ['github', 'GitHub'],
  ['ops', 'Üzemeltetés'],
  ['slack_dc', 'Slack és Discord'],
  ['contact', 'Kapcsolat']
])
const SOCIALS: Array<{ url: string; Icon: IconType; text: string }> = [
  { url: GITHUB_ORG_URL, Icon: FaGithub, text: 'GitHub szervezetünk' },
  { url: YOUTUBE_CHANNEL_URL, Icon: FaYoutube, text: 'YouTube csatornánk' },
  { url: FACEBOOK_PAGE_URL, Icon: FaFacebook, text: 'Facebook oldalunk' },
  { url: INSTAGRAM_PAGE_URL, Icon: FaInstagram, text: 'Instagram oldalunk' },
  { url: `https://twitter.com/${TWITTER_USERNAME}`, Icon: FaTwitter, text: 'Twitter oldalunk' }
]
const TECH_STACK: Array<{ svg: string; alt: string; title: string; text: string }> = [
  {
    svg: 'rails-logo',
    alt: 'Rails Logo',
    title: 'Ruby on Rails',
    text: 'Ruby nyelvet használó összetett webes MVC framework. Villámgyorsan lehet benne fejleszteni, izgalmas a nyelv és magas szintű a \
    Rails támogatottsága, óriási a választék a közösség által fejlesztett modulokban.'
  },
  {
    svg: 'node-logo',
    alt: 'Node Logo',
    title: 'Node.js',
    text: 'A piac talán legelterjedtebb technológiája, aszinkron eseményvezérelt webes JavaScriptes runtime. NestJS keretrendszerrel és \
    TypeScript nyelvvel használjuk együtt. Kényelmesen használható, színes tech stacket lehet köré varázsolni.'
  },
  {
    svg: 'spring-logo',
    alt: 'Spring Logo',
    title: 'Spring Boot',
    text: 'A Spring platformjának előkonfigurált változata, amely roppant könnyűvé teszi a fejlesztést. Kotlin nyelvvel és Thymeleaf \
    sablonmotorral használjuk együtt. Számításigényes feladatokra alkalmazzák, többszálasan működik, és egyszerű futtatni.'
  }
]

const AboutPage: React.FC = () => {
  const stickyBoxWidth = { base: '75%', sm: '10rem', lg: '14rem' }
  const firstHeadingSize = useBreakpointValue({ base: '4xl', sm: '5xl' })
  const secondHeadingSize = useBreakpointValue({ base: '2xl', sm: '3xl' })
  const rightSideBgs = 'url(/background/top-right4.svg) right top no-repeat,url(/background/bottom-right.svg) right bottom no-repeat'
  const leftSideBgs = 'url(/background/bottom-left.svg) left top no-repeat,url(/background/top-left.svg) left bottom no-repeat'

  return (
    <>
      <SEO title="Rólunk" />
      <IndexLayout
        background={`${useBreakpointValue({
          base: rightSideBgs,
          md: `${rightSideBgs},${leftSideBgs}`
        })}`}
      >
        <Box>
          <Container>
            <Box textAlign="center" my={6}>
              <Heading mb={6} fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }} fontWeight="bold" lineHeight="none" letterSpacing="tight">
                A kollégium{' '}
                <chakra.span px={0.5} bgClip="text" bgGradient="linear(to-r, tomato, orange.300)">
                  webfejlesztő
                </chakra.span>{' '}
                köre
              </Heading>
            </Box>

            <AboutParagraph title={ABOUT_MAP.get('inception')} id="inception" titleSize={firstHeadingSize}>
              <Box>
                <Box float="right" pl={3} pb={3}>
                  <Image
                    width={useBreakpointValue({ base: '4rem', md: '6rem' })}
                    height={useBreakpointValue({ base: '4rem', md: '6rem' })}
                    src="/svg/simonyi-logo.svg"
                    alt="Simonyi Logo"
                  />
                </Box>
                <AboutParagraph title="Történelem" titleSize={secondHeadingSize}>
                  <Text mt={6}>
                    A Kollégiumi Információs Rendszer Fejlesztői és Üzemeltetői – röviden Kir-Dev – a BME VIK hallgatóiból álló webfejlesztő
                    csapat. Körünk 2001-ben alakult, 2009 óta a{' '}
                    <Link href="https://simonyi.bme.hu/" isExternal>
                      Simonyi Károly Szakkollégium
                    </Link>{' '}
                    része. Alakulásunk óta foglalkozunk különféle webes technológiák alkalmazásával és oktatásával, valamint fejlesztünk és
                    üzemeltetünk a kollégiumi közösség számára hasznos webes alkalmazásokat.
                  </Text>
                  <Text py={2}>
                    Fő feladatunk a{' '}
                    <Link as={GatsbyLink} to="/project/pek-next">
                      Profil és Körök
                    </Link>{' '}
                    – röviden PéK – folyamatos fejlesztése és karbantartása. Jelenleg ezen az alkalmazáson keresztül folyik a kar közösségi
                    pontozása. Ez a rendszer már több generációt is megélt az aktív körtagoknak köszönhetően: legelőször Kollégiumi
                    Információs Rendszernek hívtuk (KIR), ez a generáció PHP-ban íródott még. Aztán a kiterjedésével újraírtuk JavaEE-s
                    alapokon, OpenAM mellett, és Villanykari Információs Rendszer (VIR) lett a neve, később pedig megkapta modern nevét, a
                    PéK-et. 2015-ben végül pedig a PéK Ruby on Rails alapokra lett migrálva. További történeteket blogunk archívumában
                    olvashatsz{' '}
                    <Link as={GatsbyLink} to="/post/2014-01-29-pek-jelen-es-jovo-iv/">
                      PÉK jelene és jövője
                    </Link>{' '}
                    címek alatt.
                  </Text>
                  <Text />
                </AboutParagraph>
              </Box>

              <AboutParagraph title="Céljaink" titleSize={secondHeadingSize}>
                <Text mt={6}>
                  Elsősorban a PéK fejlesztése és fenntartása miatt alakult körünk, de ez nem az egyetlen indok körünk létrejöttére. Célja a
                  körnek összetartani a VIK hallgatóságának azon tagjait, akik hasonló érdeklődésűek és inspirációt látnak a webfejlesztés
                  világában. A kör teret ad a webes szakma területeinek felfedezésére, a tapasztalatok megosztására. Projektjeinket
                  törekszünk a legfrissebb csapatszervezési és folyamatirányítási módszereknek megfelelően vezetni, hogy tagjaink minél
                  közelebb kerülhessenek az iparban való munka megtapasztalásához, és jó alapokkal indulhassanak el.
                </Text>
              </AboutParagraph>
            </AboutParagraph>

            <AboutParagraph title={ABOUT_MAP.get('softwares')} id="softwares" titleSize={firstHeadingSize}>
              <Flex direction={{ base: 'column', sm: 'row' }}>
                <Box flex={1}>
                  <AboutParagraph title="Text editor" titleSize={secondHeadingSize}>
                    <Text mt={6}>
                      Szívesen kódolunk többek között a webes fejlesztések leggyakrabban használt text editorjával, a{' '}
                      <Link href="https://code.visualstudio.com/" isExternal>
                        Visual Studio Code
                      </Link>
                      -dal, illetve a JetBrains IDE-kkel,{' '}
                      <Link href="https://www.jetbrains.com/idea/" isExternal>
                        IntelliJ IDEA
                      </Link>
                      -val,{' '}
                      <Link href="https://www.jetbrains.com/webstorm/" isExternal>
                        Webstorm
                      </Link>
                      mal és{' '}
                      <Link href="https://www.jetbrains.com/ruby/" isExternal>
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
                      <Link href="https://admin.sch.bme.hu/profile/" isExternal>
                        SCH-s accountoddal
                      </Link>{' '}
                      szert tehetsz Ultimate verziójú JetBrains IDE-kre. Ismerkedj meg az{' '}
                      <Link href="https://www.jetbrains.com/community/education/#students" isExternal>
                        IntelliJ IDEA Ultimate-tel
                      </Link>
                      !
                    </Text>
                  </StickyNote>
                </Box>
              </Flex>
              <AboutParagraph title="Tech Stack" titleSize={secondHeadingSize}>
                <Grid
                  my={4}
                  templateColumns={`repeat(${useBreakpointValue({ base: 1, md: TECH_STACK.length })}, 1fr)`}
                  gap={{ base: 4, md: 10 }}
                >
                  {TECH_STACK.map(({ svg, alt, title, text }) => (
                    <InfoBox
                      key={alt}
                      img={
                        <Image
                          width={useBreakpointValue({ base: '100%', md: '60%' })}
                          height={useBreakpointValue({ base: '100%', md: '60%' })}
                          src={`/svg/${svg}.svg`}
                          alt={alt}
                        />
                      }
                      title={title}
                    >
                      <Text textAlign={{ base: 'left', md: 'center' }}>{text}</Text>
                    </InfoBox>
                  ))}
                </Grid>
                <Flex direction={{ base: 'column', sm: 'row' }}>
                  <Box flex={1}>
                    <Text mt={10}>
                      A fentiek a legfőbb webes technológiáink. Ezeken kívül vannak további extra techjeink, amelyek a projektjeinket
                      kiegészítik, ilyenek például: a{' '}
                      <Link href="https://hibernate.org/" isExternal>
                        Hibernate
                      </Link>
                      , a{' '}
                      <Link href="https://www.gatsbyjs.com/" isExternal>
                        Gatsby
                      </Link>
                      , a{' '}
                      <Link href="https://hu.reactjs.org/" isExternal>
                        React
                      </Link>
                      , illetve a{' '}
                      <Link href="https://tailwindcss.com/" isExternal>
                        TailwindCSS
                      </Link>
                      .
                    </Text>
                  </Box>
                  <Box alignSelf={{ base: 'flex-end', sm: 'inherit' }} ml={4} mt={4} maxW={stickyBoxWidth}>
                    <StickyNote>
                      <Text>
                        <Link as={GatsbyLink} to="/projects" fontWeight="bold">
                          Projektjeink:
                        </Link>{' '}
                        Ezen az oldalon bemutatásra kerülnek projektjeink. Megtudhatod többet között azt is, milyen technológiákkal
                        készülnek.
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
                    <Link href="https://github.com/kir-dev" isExternal>
                      GitHub szervezetünk
                    </Link>
                    .
                  </Text>
                  <Text pt={2}>
                    A platform segítségével ismerkedünk a{' '}
                    <Link href="https://en.wikipedia.org/wiki/CI/CD" isExternal>
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
                      <Link href="https://education.github.com/pack" isExternal>
                        GitHub Student Developer Pack-jével
                      </Link>
                      ! Használd egyetemi vagy{' '}
                      <Link href="https://admin.sch.bme.hu/profile/" isExternal>
                        SCH-s e-mail címed
                      </Link>{' '}
                      a csomag feloldására.
                    </Text>
                  </StickyNote>
                </Box>
              </Flex>
            </AboutParagraph>

            <AboutParagraph title={ABOUT_MAP.get('ops')} id="ops" titleSize={firstHeadingSize}>
              <Text mt={6}>
                Egy projekt gondozása során fontos visszatérő epizód az üzemeltetés megoldása. Projektjeink{' '}
                <Link href="https://www.docker.com/get-started" isExternal>
                  Docker
                </Link>{' '}
                konténerek segítségével kerülnek elindításra szerverünkön.
              </Text>
              <Text py={2}>
                Van projektünk, amely a szerverünkön kívül, egy{' '}
                <Link href="https://kubernetes.io/" isExternal>
                  Kubernetes
                </Link>{' '}
                klaszterben kerül kiszállításra a{' '}
                <Link href="https://kszk.bme.hu/" isExternal>
                  KSZK-nak
                </Link>{' '}
                köszönhetően, akik gondozzák a klasztert.
              </Text>
              <Text>
                Deploymentjeink során használatba vesszük még különféle felhő szolgáltatók platformjait: ezek a{' '}
                <Link href="https://vercel.com/" isExternal>
                  Vercel
                </Link>
                , a{' '}
                <Link href="https://www.netlify.com/" isExternal>
                  Netlify
                </Link>{' '}
                és az{' '}
                <Link href="https://aws.amazon.com/" isExternal>
                  AWS
                </Link>
                .
              </Text>
            </AboutParagraph>

            <Box>
              <Box mt={10} float="right" pl={3} pb={3}>
                <Image
                  width={useBreakpointValue({ base: '6rem', md: '9rem' })}
                  height={useBreakpointValue({ base: '6rem', md: '9rem' })}
                  src="/svg/slack-dc-logo.svg"
                  alt="Slack and DC Logo"
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
                  mentorprogramunkban, amely során a mentor végig segíti fejlődésed a csapatban, és útközben be is csatlakozhatsz
                  projektjeink fejlesztésébe.{' '}
                  <Link as={GatsbyLink} to="/courses">
                    Tudj meg többet tanfolyamainkról és a jelentkezésről itt!
                  </Link>
                </Text>
              </AboutParagraph>
              <AboutParagraph title="Kommunikáció" id="contact" titleSize={secondHeadingSize}>
                <Flex mt={6} direction={{ base: 'column', sm: 'row' }}>
                  <Text pr={{ base: 0, sm: 10 }}>
                    Ha maradt még kérdésed, hibajegyet szeretnél feladni valamilyen projektünkkel kapcsolatban, vagy van valami izgalmas
                    feladatod számunkra: vedd fel a kapcsolatot velünk email címünkön:{' '}
                    <chakra.span fontWeight="bold">{PUBLIC_EMAIL}</chakra.span>, illetve gyere el gyűléseinkre a Schönherz Kollégium{' '}
                    <chakra.span fontWeight="bold">1319-es szobájába {MEETING_START_TIME}-kor</chakra.span>!
                  </Text>
                  <Flex mt={{ base: 4, sm: 0 }} flex={1} whiteSpace="nowrap" width="full" direction="column" alignItems="flex-end">
                    {SOCIALS.map(({ url, Icon, text }) => (
                      <HStack
                        key={url}
                        pb={2}
                        as="a"
                        target="_blank"
                        _hover={{ color: 'orange.400' }}
                        transition="color 200ms ease-in-out"
                        href={url}
                      >
                        <Text>{text}</Text>
                        <Icon size={useBreakpointValue({ base: '1rem', lg: '1.5rem' })} />
                      </HStack>
                    ))}
                  </Flex>
                </Flex>
              </AboutParagraph>
            </AboutParagraph>

            <Box textAlign="center" my={10} fontSize={{ base: '3xl', sm: '4xl' }} lineHeight="none" letterSpacing="tight">
              <Text>Üdvözöl: </Text>a{' '}
              <chakra.span px={0.5} bgClip="text" bgGradient="linear(to-r, tomato, orange.300)">
                Kir-Dev
              </chakra.span>{' '}
              csapata
            </Box>
          </Container>
        </Box>
      </IndexLayout>
    </>
  )
}

export default AboutPage
