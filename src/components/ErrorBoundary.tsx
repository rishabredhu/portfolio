import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for the ErrorBoundary component.
 * @property {ReactNode} children - The child components to be rendered.
 * @property {ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode)} fallback - The fallback UI to render when an error occurs.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);
}

/**
 * State for the ErrorBoundary component.
 * @property {Error | null} error - The error that was caught, if any.
 * @property {ErrorInfo | null} errorInfo - Additional information about the error.
 */
interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in the child component tree.
 * It logs error information and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  /**
   * Lifecycle method called when an error is thrown in a child component.
   * @param {Error} error - The error that was thrown.
   * @param {ErrorInfo} errorInfo - Object containing information about where the error was thrown.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Update state with error details
    this.setState({ error, errorInfo });

    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
    // TODO: You can add your error logging service here, e.g., Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.error) {
      // Render fallback UI if an error occurred
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.state.errorInfo!);
      }
      return this.props.fallback;
    }

    // If no error occurred, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
