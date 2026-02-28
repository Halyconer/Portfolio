import { Link } from 'react-router-dom'

export function ArchitectureNote() {
    return (
        <div className="bg-white border border-border border-l-4 border-l-primary py-1.5 px-2.5 rounded mt-1 mb-1 text-left">
            <p className="text-slate-muted text-[0.9rem] m-0">
                <strong>How it works:</strong> Both demos hit my Raspberry Pi
                through an ngrok tunnel &rarr; nginx reverse proxy &rarr; Flask
                APIs. This demonstrates my ability to build IoT systems with
                remote access and real-time control.{' '}
                <Link
                    to="/dev-roadtrip"
                    className="text-link hover:text-link-dark hover:underline"
                >
                    See the architecture
                </Link>
            </p>
        </div>
    )
}
