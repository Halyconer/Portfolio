import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

// Catches render-time errors in its subtree so one broken component doesn't
// blank the whole site. React only triggers boundaries for synchronous render
// errors — async errors still need try/catch.
export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="px-8 py-20 text-center">
                    <div className="text-eyebrow mb-4">
                        § Error — something broke
                    </div>
                    <p className="font-serif text-[1.5rem] text-ink mb-6">
                        This section failed to render. Refresh the page to try
                        again.
                    </p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="btn-ink py-3 px-5 font-mono text-[11px] tracking-[0.14em] uppercase"
                    >
                        Reload page
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}
