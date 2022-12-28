import { MemberProps } from 'types/member.props'

export interface MembersProps {
  data: {
    actives: {
      nodes: MemberProps[]
    }
    inactives: {
      nodes: MemberProps[]
    }
  }
}
