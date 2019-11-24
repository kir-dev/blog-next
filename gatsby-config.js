module.exports = {
  siteMetadata: {
    title: 'Kir-Dev',
    description: 'A Kir-Dev kör blogja',
    keywords: 'gatsbyjs, gatsby, javascript, ruby, rails, nodejs, typescript, community, simonyi',
    siteUrl: 'https://kir-dev.sch.bme.hu'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-chakra-ui',
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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
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
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
