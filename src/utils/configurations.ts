export const environment = {
  pekUrl: 'https://pek.sch.bme.hu',
  socials: {
    githubOrgUrl: 'https://github.com/kir-dev',
    twitterUsername: 'kirdev',
    instagramUrl: 'https://instagram.com/kir.dev',
    youtubeUrl: 'https://youtube.com/channel/UCkpMTj9qST_7RDt2YL4RUEw',
    facebookUrl: 'https://facebook.com/kirdevteam',
    publicEmail: 'kir-dev [kukac] sch.bme.hu'
  },
  rickrollUrl: 'https://bit.ly/3uOVmYt',
  course: {
    form: {
      url: process.env.GATSBY_CURRENT_COURSE_FORM_URL || '',
      closingInfo: process.env.GATSBY_CURRENT_COURSE_FORM_CLOSING_INFO || ''
    },
    semester: process.env.GATSBY_CURRENT_COURSE_SEMESTER || '',
    extraInfo: process.env.GATSBY_CURRENT_COURSE_EXTRA_INFO || ''
  },
  meetingStartTime: process.env.GATSBY_MEETING_START_TIME || '',
  frontAlert: {
    title: process.env.GATSBY_FRONTPAGE_ALERT_TITLE || '',
    desc: process.env.GATSBY_FRONTPAGE_ALERT_DESCRIPTION || ''
  }
}
