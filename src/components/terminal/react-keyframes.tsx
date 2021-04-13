/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/require-default-props */
// basically react-keyframes v1.0.0-canary.3
// with an added onEnd prop for the Keyframes component
import React from 'react'

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

export function Frame({ component, ...rest }: FrameInput) {
  return React.createElement(component, rest)
}

export class KeyFrames extends React.Component<Props, State> {
  timer: any

  constructor(props: Props) {
    super(props)
    this.state = {
      frameNum: 0
    }
  }

  componentDidMount() {
    this.requestNextFrame()
  }

  shouldComponentUpdate(_nextProps: Props, nextState: State) {
    const { frameNum } = nextState
    if (this.state.frameNum === frameNum) {
      return false
    }
    return frameNum >= 0 && frameNum < this.props.children.length
  }

  componentDidUpdate() {
    this.requestNextFrame()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  getFrame() {
    return this.props.children[this.state.frameNum]
  }

  waitForDelay(fn: () => void) {
    const currentFrame = this.getFrame()
    // Defaults duration to 0
    const delay = currentFrame.props.duration ?? 0
    clearTimeout(this.timer)
    this.timer = setTimeout(fn, delay)
  }

  requestNextFrame() {
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

  render() {
    const frame = this.getFrame()
    if (!frame) {
      return null
    }

    const { component = 'span', children, onEnd, ...rest } = this.props

    return React.cloneElement(frame, { component, ...rest, ...frame.props })
  }
}
