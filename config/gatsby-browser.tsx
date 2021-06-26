/**
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import { GatsbyBrowser } from 'gatsby'
import React from 'react'
import '../src/assets/stylesheets/markdown.css'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => <>{element}</>
