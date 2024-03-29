import path from 'path'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const socials = {
  githubOrgUrl: 'https://github.com/kir-dev',
  twitterUsername: 'kirdev',
  instagramUrl: 'https://instagram.com/kir.dev',
  youtubeUrl: 'https://youtube.com/channel/UCkpMTj9qST_7RDt2YL4RUEw',
  facebookUrl: 'https://facebook.com/kirdevteam',
  publicEmail: 'kir-dev [kukac] sch.bme.hu'
}

export default {
  siteMetadata: {
    siteUrl: 'https://kir-dev.hu/',
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
    keywords: ['web-development', 'software', 'devops', 'rails', 'nodejs', 'spring-boot', 'community', 'simonyi', 'kir-dev'],
    robots: 'index, follow',
    social: {
      twitter: `https://twitter.com/${socials.twitterUsername}`,
      twitterUsername: socials.twitterUsername,
      github: socials.githubOrgUrl,
      facebook: socials.facebookUrl,
      instagram: socials.instagramUrl
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
        path: `${path.join(__dirname, 'src/content/images')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'post',
        path: `${path.join(__dirname, 'src/content/posts')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'project',
        path: `${path.join(__dirname, 'src/content/projects')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'member',
        path: `${path.join(__dirname, 'src/content/members')}`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'course',
        path: `${path.join(__dirname, 'src/content/courses')}`
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
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/about`, `/post/*`, `/project/*`]
      }
    },
    `gatsby-plugin-root-import`
  ]
}
