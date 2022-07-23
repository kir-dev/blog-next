import dotenv from 'dotenv'
import path from 'path'
import { FACEBOOK_PAGE_URL, GITHUB_ORG_URL, INSTAGRAM_PAGE_URL, TWITTER_USERNAME } from '../src/utils/configurations'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

export default {
  siteMetadata: {
    siteUrl: 'https://kir-dev.sch.bme.hu/',
    translations: ['hu'],
    lang: 'hu',
    title: 'Kir-Dev',
    titleTemplate: '%s | Kir-Dev',
    description:
      `A Schönherz kollégium webfejlesztő körének, azaz a Kir-Dev kör blog és portfolió weboldala. Olvashatsz körünk ` +
      `történetéről, szakmai újdonságokról, tanfolyamainkról és projektjeink haladásáról. Körünk a BME VIK Simonyi Károly ` +
      `Szakkollégiumának tagja.`,
    author: 'kir-dev',
    image: '/default-og.png',
    keywords: ['gatsbyjs', 'typescript', 'javascript', 'ruby', 'rails', 'nodejs', 'typescript', 'community', 'simonyi'],
    robots: 'index, follow',
    social: {
      twitter: `https://twitter.com/${TWITTER_USERNAME}`,
      twitterUsername: TWITTER_USERNAME,
      github: GITHUB_ORG_URL,
      facebook: FACEBOOK_PAGE_URL,
      instagram: INSTAGRAM_PAGE_URL
    }
  },
  plugins: [
    `@chakra-ui/gatsby-plugin`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`],
          placeholder: `blurred`,
          quality: 75
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${path.join(__dirname, '../src/content/images')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'post',
        path: `${path.join(__dirname, '../src/content/posts')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'project',
        path: `${path.join(__dirname, '../src/content/projects')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'member',
        path: `${path.join(__dirname, '../src/content/members')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'course',
        path: `${path.join(__dirname, '../src/content/courses')}`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Tartalomjegyzék',
              tight: true,
              ordered: true,
              fromHeading: 1,
              toHeading: 6,
              className: 'md-toc'
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `md-headinglink`,
              isIconAfterHeader: true,
              elements: [`h1`, `h2`, `h3`, `h4`]
            }
          },
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: 'Quiet Light',
                parentSelector: {
                  'body[class=chakra-ui-dark]': 'Default Dark+'
                }
              }
            }
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                'heading[depth=1]': 'md-h1',
                'heading[depth=2]': 'md-h2',
                'heading[depth=3]': 'md-h3',
                'heading[depth=4]': 'md-h4',
                'heading[depth=5]': 'md-h5',
                'heading[depth=6]': 'md-h6',
                paragraph: 'md-p',
                'list[ordered=false]': 'md-ul',
                'list[ordered=true]': 'md-ol',
                blockquote: 'md-blockquote',
                listItem: 'md-li',
                link: 'md-a',
                tableCell: 'md-td',
                thematicBreak: 'md-hr',
                table: 'md-table',
                inlineCode: 'md-code'
              }
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: 'https://kir-dev.sch.bme.hu'
      }
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `React`,
        allExtensions: true
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-tsconfig-paths`
  ]
}
