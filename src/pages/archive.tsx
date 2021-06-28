import { Box, chakra, Heading, useBreakpointValue } from '@chakra-ui/react'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Container from '~components/Container'
import Header from '~components/Header'
import IndexLayout from '../layouts'
import { BlogPostsProps } from './blog'

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { layout: { eq: "post" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          lead
          date
        }
      }
    }
  }
`

const Archive: React.FC<BlogPostsProps> = ({ data }) => (
  <IndexLayout
    background={
      `url(/background/pattern-right.svg) right top repeat-y,url(/background/pattern-left.svg) left top repeat-y,` +
      `${useBreakpointValue({
        base: '',
        sm: 'url(/background/bottom-left.svg) left top no-repeat, url(/background/top-left.svg) left bottom no-repeat,'
      })}url(/background/top-right4.svg) right top no-repeat, url(/background/bottom-right.svg) right bottom no-repeat`
    }
  >
    <Box>
      <Header>
        <Container>
          <Heading as="h1">Archívum</Heading>
        </Container>
      </Header>
      <Container>
        {data.allMarkdownRemark.nodes.map((post) => (
          <Box key={post.fields.slug} fontSize={{ base: 'md', md: 'lg' }} py={1}>
            <span>{post.frontmatter.date.split('T')[0]} » </span>
            <Link to={post.fields.slug}>
              <chakra.span fontWeight="bold" _hover={{ textDecor: 'underline', color: 'tomato', transition: '.2s ease-in-out' }}>
                {post.frontmatter.title}
              </chakra.span>
            </Link>
          </Box>
        ))}
      </Container>
    </Box>
  </IndexLayout>
)

export default Archive
