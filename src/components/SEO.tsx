import React from 'react'
import { format } from 'util'
import { environment } from '~utils/configurations'
import { useSiteMetadata } from '~utils/useSiteMetadata'

type Props = {
  title?: string
  description?: string
  pathname?: string
  robots?: string
  lang?: string
  type?: string
  image?: string
}

export const SEO: React.FC<React.PropsWithChildren<Props>> = ({ title, description, pathname, robots, lang, type, image, children }) => {
  const {
    title: defaultTitle,
    titleTemplate,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
    robots: defaultRobots,
    keywords,
    author,
    lang: defaultLang
  } = useSiteMetadata()

  const seo = {
    title: title ? format(titleTemplate, title) : defaultTitle,
    description: description || defaultDescription,
    image: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname || ''}`,
    robots: robots || defaultRobots,
    keywords: keywords.join(',') || 'gatsby,theme,react',
    author: author || 'kir-dev',
    lang: lang || defaultLang,
    type: type || 'website'
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="author" content={seo.author} />
      <meta name="og:locale" content={seo.lang} />
      <meta name="og:site_name" content={seo.title} />
      <meta name="og:url" content={seo.url} />
      <meta name="og:title" content={seo.title} />
      <meta name="og:image" content={seo.image} />
      <meta name="og:type" content={seo.type} />
      <meta name="og:description" content={seo.description} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={environment.socials.twitterUsername} />
      <meta name="twitter:site" content={`https://twitter.com/${environment.socials.twitterUsername}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="og:description" content={seo.description} />
      <meta name="robots" content={seo.robots} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      {children}
    </>
  )
}
