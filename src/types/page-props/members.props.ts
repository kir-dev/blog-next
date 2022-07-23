import { MemberProps } from '~types/member.props'

export interface AllMarkdownRemark {
  nodes: {
    fields: {
      slug: string
    }
    frontmatter: MemberProps
  }[]
}

export interface MembersProps {
  data: {
    actives: AllMarkdownRemark
    inactives: AllMarkdownRemark
  }
}
