import { ResumePDF } from 'adrianeddy-portfolio'

// Résumé section: 920px centered column, filename bar, 8.5×11 document sheet
// (iframe embed of /assets/AdrianEddy.pdf — the PDF doesn't ship with the
// bundle, so the sheet renders as the component's own white frame; that's the
// expected preview), and the Open/Download hairline action footer.
export function Default() {
    return (
        <div className="bg-paper">
            <ResumePDF />
        </div>
    )
}
