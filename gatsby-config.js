module.exports = {
  siteMetadata: {
    title: 'Kir-Dev',
    description: 'A Kir-Dev kör blogja',
    keywords: 'gatsbyjs, gatsby, javascript, ruby, rails, nodejs, typescript, community, simonyi',
    siteUrl: 'https://kir-dev.sch.bme.hu'
  },
  plugins: [
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        isResettingCSS: true, // optional, default to true
        isUsingColorMode: true // optional, default to true
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'page',
        path: `${__dirname}/src/content/pages`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: `${__dirname}/src/content/posts`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets\/images/,
        },
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `md-headinglink`,
              isIconAfterHeader: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-gemoji-to-emoji',
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: {
                default: 'Quiet Light',
                parentSelector: {
                  'body[class=chakra-ui-dark]': 'Default Dark+',
                }
              }
            }
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]": "md-h1",
                "heading[depth=2]": "md-h2",
                "heading[depth=3]": "md-h3",
                "heading[depth=4]": "md-h4",
                "heading[depth=5]": "md-h5",
                "heading[depth=6]": "md-h6",
                paragraph: "md-p",
                "list[ordered=false]": "md-ul",
                "list[ordered=true]": "md-ol",
                blockquote: "md-blockquote",
                listItem: "md-li",
                link: "md-a",
                tableCell: "md-td",
                thematicBreak: "md-hr",
                table: "md-table",
                inlineCode: "md-code"
              }
            }
          },
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
