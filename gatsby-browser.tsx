/**
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import { GatsbyBrowser } from 'gatsby'
import 'modern-normalize'
import React from 'react'
import '~assets/stylesheets/markdown.css'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => <>{element}</>
