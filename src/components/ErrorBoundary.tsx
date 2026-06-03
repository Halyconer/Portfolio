import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
}

/**
 * Catches render-time errors in its subtree so a single broken component
 * doesn't blank the whole site. React only triggers error boundaries for
 * synchronous render errors — async errors still need try/catch.
 */
export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // Surface to the console for debugging; in production you'd want to
        // send this to an error-tracking service (Sentry, etc.).
        console.error('ErrorBoundary caught', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="px-8 py-20 text-center">
                        <div className="text-eyebrow mb-4">
                            § Error — something broke
                        </div>
                        <p className="font-serif text-[1.5rem] text-ink mb-6">
                            This section failed to render. Refresh the page
                            to try again.
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="btn-reset bg-ink text-paper py-3 px-5 font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-ink-soft transition-colors"
                        >
                            Reload page
                        </button>
                    </div>
                )
            )
        }
        return this.props.children
    }
}
