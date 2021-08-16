const { useGatsbyConfig } = require('gatsby-plugin-ts-config')

// eslint-disable-next-line global-require
module.exports = useGatsbyConfig(() => require('./.gatsby/gatsby-config'))
