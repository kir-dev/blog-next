export interface NavItem {
  label: string
  children?: Array<NavItem>
  href: string
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Kezdőlap',
    href: '/'
  },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      {
        label: 'Legújabb posztok',
        href: '/blog'
      },
      {
        label: 'Archívum',
        href: '/archive'
      }
    ]
  },
  {
    label: 'Rólunk',
    href: '/about',
    children: [
      {
        label: 'Csapatunk',
        href: '/about'
      },
      {
        label: 'Projektjeink',
        href: '/projects'
      }
    ]
  },
  {
    label: 'Tanfolyam',
    href: '/courses'
  },
  {
    label: 'Elérhetőség',
    href: '/contact'
  }
]
