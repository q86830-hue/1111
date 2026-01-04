import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-blue-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h2 className="text-4xl mb-4">😯</h2>
            <h3 className="text-xl font-bold text-gray-800 mb-2">抱歉，发生了错误</h3>
            <p className="text-gray-500 mb-6">应用遇到了一些问题，请刷新页面重试</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              className="bg-brand-blue text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transition-all"
            >
              刷新页面
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 text-left text-xs text-gray-600">
                <h4 className="font-bold mb-1">错误信息：</h4>
                <p className="mb-2">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <>
                    <h4 className="font-bold mb-1">错误栈：</h4>
                    <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}