// basically react-keyframes v1.0.0-canary.3
// with an added onEnd prop for the Keyframes component
import { cloneElement, Component, createElement } from 'react'

type Props = {
  children: any
  component?: any
  [frameProp: string]: any
}

type State = {
  frameNum: number
}

interface FrameInput {
  children?: any
  component?: any
  duration?: number
  [prop: string]: any
}

export const Frame = ({ component, ...rest }: FrameInput) => {
  return createElement(component, rest)
}

export class Keyframes extends Component<Props, State> {
  timer: any

  constructor(props: Props) {
    super(props)
    this.state = {
      frameNum: 0
    }
  }

  componentDidMount(): void {
    this.requestNextFrame()
  }

  shouldComponentUpdate(_nextProps: Props, nextState: State): boolean {
    const { frameNum } = nextState
    if (this.state.frameNum === frameNum) {
      return false
    }
    return frameNum >= 0 && frameNum < this.props.children.length
  }

  componentDidUpdate(): void {
    this.requestNextFrame()
  }

  componentWillUnmount(): void {
    clearTimeout(this.timer)
  }

  getFrame(): any {
    return this.props.children[this.state.frameNum]
  }

  waitForDelay(fn: () => void): void {
    const currentFrame = this.getFrame()
    // Defaults duration to 0
    const delay = currentFrame.props.duration ?? 0
    clearTimeout(this.timer)
    this.timer = setTimeout(fn, delay)
  }

  requestNextFrame(): void {
    this.waitForDelay(() => {
      const frameNum = this.state.frameNum + 1
      if (this.props.children.length <= frameNum) {
        if (this.props.onEnd) {
          this.props.onEnd()
        }
        return
      }

      this.setState({ frameNum })
    })
  }

  render(): any {
    const frame = this.getFrame()
    if (!frame) {
      return null
    }

    const { component = 'span', children, onEnd, ...rest } = this.props

    return cloneElement(frame, { component, ...rest, ...frame.props })
  }
}
