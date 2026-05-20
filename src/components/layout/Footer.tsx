// Editorial pass: lighter weight, hairline top border (classic magazine
// footer move), smaller text, less verbose ("All rights reserved" was
// boilerplate that didn't earn its space).
export function Footer() {
    return (
        <footer className="flex justify-between items-center py-7 mt-8 border-t border-border">
            <p className="text-[0.7rem] text-muted/40 font-inter tracking-[0.08em]">
                &copy; 2025 Adrian Eddy
            </p>
            <div className="flex gap-6">
                <a
                    href="https://github.com/Halyconer"
                    target="_blank"
                    rel="noopener"
                    className="text-[0.7rem] text-muted/50 hover:text-ink font-inter tracking-[0.08em] no-underline transition-colors duration-200"
                >
                    GitHub
                </a>
                <a
                    href="mailto:ae2422@nyu.edu"
                    className="text-[0.7rem] text-muted/50 hover:text-ink font-inter tracking-[0.08em] no-underline transition-colors duration-200"
                >
                    Email
                </a>
            </div>
        </footer>
    )
}
