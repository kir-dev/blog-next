import { useLocation } from '@reach/router'
import React, { FC } from 'react'
import { Helmet, HelmetProps } from 'react-helmet'
import { useSiteMetadata } from '~utils/useSiteMetadata'

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

const SEO: FC<SEOProps> = ({ title, description, image, author, lang, robots, keywords = [], meta = [], links = [] }) => {
  const { pathname } = useLocation()

  const {
    baseUrl,
    lang: defaultLang,
    title: defaultTitle,
    titleTemplate,
    author: defaultAuthor,
    description: defaultDescription,
    image: defaultImage,
    robots: defaultRobots,
    keywords: defaultKeywords
  } = useSiteMetadata()

  const imageUrl = (() => {
    let url = image || defaultImage
    url = url.replace(/^\/+/, '')
    return url.includes('://') ? url : `${baseUrl}${url}`
  })()

  const seo = {
    lang: lang || defaultLang,
    title: title || defaultTitle,
    description: description || defaultDescription,
    author: author || defaultAuthor,
    image: imageUrl,
    url: pathname === '/' ? `${baseUrl}` : `${baseUrl}${pathname}`,
    keywords: keywords.length ? keywords : defaultKeywords,
    robots: robots || defaultRobots
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
          name: 'robots',
          content: seo.robots
        }
      ]
        .concat(
          seo.keywords.length
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
