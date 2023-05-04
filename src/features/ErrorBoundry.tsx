import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  fallback?: ReactNode
  children?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  }

  public static getDerivedStateFormError(error: Error) {
    console.warn('[ErrorBoundary] getDerivedStateFormError error', error)

    return { hasError: true }
  }

  public static componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[ErrorBoundary] componentDidCatch error', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry... Something went wrong...</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
