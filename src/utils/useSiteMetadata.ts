import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadata {
  baseUrl: string
  translations: string[]
  lang: string
  title: string
  titleTemplate: string
  description: string
  author: string
  image: string
  robots: string
  keywords: string[]
}

export const useSiteMetadata = (): SiteMetadata => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            baseUrl
            translations
            lang
            title
            titleTemplate
            description
            author
            image
            keywords
            robots
          }
        }
      }
    `
  )
  return site.siteMetadata
}
