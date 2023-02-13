import { Box, Grid, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { BlogPreviewCard } from 'components/blog-components/BlogPreviewCard'
import { BlogContainer } from 'components/BlogContainer'
import { Header } from 'components/Header'
import { SEO } from 'components/SEO'
import { graphql, Link } from 'gatsby'
import { IndexLayout } from 'layouts'
import React from 'react'
import { BlogPostsProps } from 'types/page-props/blogPosts.props'

const Blog: React.FC<BlogPostsProps> = ({ data }) => (
  <IndexLayout
    background={`${useBreakpointValue({
      base: '',
      sm: 'url(/background/top-left.svg) left top no-repeat, '
    })}url(/background/top-right.svg) right top no-repeat`}
  >
    <Box>
      <Header>
        <BlogContainer>
          <Heading as="h1">Legújabb posztjaink</Heading>
        </BlogContainer>
      </Header>
      <BlogContainer>
        <Grid templateColumns={`repeat(${useBreakpointValue({ base: 1, md: 2 })}, 1fr)`} gap={{ base: 24, sm: 10 }}>
          {data.allMarkdownRemark.nodes.map((post) => (
            <BlogPreviewCard key={post.fields.slug} post={post} />
          ))}
        </Grid>
        <Box textAlign="right" mt={8}>
          <Text as={Link} fontSize="lg" to="/archive" color="orange.400" _hover={{ color: 'tomato', textDecor: 'underline' }}>
            Még több...
          </Text>
        </Box>
      </BlogContainer>
    </Box>
  </IndexLayout>
)

export default Blog

export const Head = () => <SEO title="Blog" />

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark(filter: { fields: { layout: { eq: "post" } } }, sort: { frontmatter: { date: DESC } }, limit: 6) {
      nodes {
        fields {
          slug
        }
        wordCount {
          words
        }
        frontmatter {
          title
          lead
          date
          author
          tags
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`
