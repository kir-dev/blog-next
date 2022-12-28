import { GatsbyNode, Node } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import path from 'path'

interface ExtendedNode extends Node {
  frontmatter: {
    layout: string
  }
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const { layout } = (node as ExtendedNode).frontmatter
    createNodeField({
      node,
      name: `slug`,
      value: `/${layout}${slug}`
    })
    createNodeField({
      node,
      name: `layout`,
      value: layout
    })
  }
}

interface EdgesData {
  errors?: any
  data?: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            layout: string
            slug: string
          }
        }
      }[]
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const allMarkdown: EdgesData = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { layout: { ne: "other" } } }, limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data?.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout } = node.fields

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout}.tsx`),
      context: {
        slug
      }
    })
  })
}

/// todo: check why this method broke the image processing job and made the gatsby-image plugin miss the images
/*
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type MarkdownRemarkFrontmatter @infer {
      featuredImage: File
      funnyImage: File
      ogImage: File
    }
  `

  createTypes(typeDefs)
}
*/
