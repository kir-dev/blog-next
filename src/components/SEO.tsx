import { useLocation } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet, HelmetProps } from 'react-helmet'

type SEOProps = {
  lang?: string
  title?: string
  description?: string
  author?: string
  image?: string
  robots?: string
  keywords?: string[]
  meta?: { name: string; content: string }[]
  links?: { rel: string; href: string }[]
} & HelmetProps

type SiteMetadataProps = {
  site: {
    siteMetadata: {
      siteUrl: string
      translations?: string[]
      lang?: string
      title: string
      titleTemplate: string
      description: string
      author: string
      image: string
      keywords?: string[]
      robots?: string
      social?: {
        twitter?: string
        twitterUsername?: string
        github?: string
        facebook?: string
        instagram?: string
      }
    }
  }
}

const SEO: React.FC<SEOProps> = ({ title, description, image, author, lang, robots, keywords = [], meta = [], links = [] }) => {
  const data: SiteMetadataProps = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          translations
          lang
          title
          titleTemplate
          description
          author
          image
          keywords
          robots
          social {
            twitter
            twitterUsername
            github
            facebook
            instagram
          }
        }
      }
    }
  `)

  const { pathname } = useLocation()

  const {
    siteUrl,
    lang: defaultLang,
    title: defaultTitle,
    titleTemplate,
    author: defaultAuthor,
    description: defaultDescription,
    image: defaultImage,
    robots: defaultRobots,
    keywords: defaultKeywords,
    social
  } = data.site.siteMetadata

  const imageUrl = (() => {
    let url = image || defaultImage
    url = url.replace(/^\/+/, '')
    return url.includes('://') ? url : `${siteUrl}${url}`
  })()

  const seo = {
    lang: lang || defaultLang,
    title: title || defaultTitle,
    description: description || defaultDescription,
    author: author || defaultAuthor,
    image: imageUrl,
    url: pathname === '/' ? `${siteUrl}` : `${siteUrl}${pathname}`,
    keywords: keywords.length ? keywords : defaultKeywords,
    robots: robots || defaultRobots,
    social
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: seo.lang
      }}
      title={seo.title}
      titleTemplate={seo.title === defaultTitle ? seo.title : titleTemplate}
      link={[
        {
          rel: 'canonical',
          href: seo.url
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ].concat(links)}
      meta={[
        {
          name: 'description',
          content: seo.description
        },
        {
          name: 'author',
          content: seo.author
        },
        {
          property: 'og:locale',
          content: seo.lang
        },
        {
          property: 'og:site_name',
          content: seo.title
        },
        {
          property: 'og:url',
          content: seo.url
        },
        {
          property: 'og:title',
          content: seo.title
        },
        {
          property: 'og:description',
          content: seo.description
        },
        {
          property: 'og:image',
          content: seo.image
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:site',
          content: seo.social?.twitter
        },
        {
          name: 'twitter:creator',
          content: seo.social?.twitterUsername
        },
        {
          name: 'twitter:title',
          content: seo.title
        },
        {
          name: 'twitter:description',
          content: seo.description
        },
        {
          name: 'twitter:image',
          content: seo.image
        },
        {
          name: 'robots',
          content: seo.robots
        }
      ]
        .concat(
          seo.keywords?.length
            ? {
                name: 'keywords',
                content: seo.keywords.join(', ')
              }
            : []
        )
        .concat(meta)}
    />
  )
}

export default SEO
