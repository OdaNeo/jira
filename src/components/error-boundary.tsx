import React, { Component, PropsWithChildren } from 'react'

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }
  // 子组件抛出异常，会被捕捉到
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props

    if (error) {
      return fallbackRender({ error })
    }

    return children
  }
}
