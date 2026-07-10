import { MetaField, StatusDot } from 'adrianeddy-portfolio'

// TLDR-style card grid: rule under the label, serif display value.
export function CardGrid() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <MetaField label="Based in">New York City</MetaField>
            <MetaField label="Studying">Economics @ NYU</MetaField>
            <MetaField label="Focus">Markets &amp; hardware</MetaField>
        </div>
    )
}

// Sidebar-style inline variant: tight label, sans body value.
export function InlineList() {
    return (
        <div style={{ display: 'grid', gap: 16, maxWidth: 260 }}>
            <MetaField label="Role" variant="inline">
                Frontend &amp; systems
            </MetaField>
            <MetaField label="Stack" variant="inline">
                React 19, Flask, Raspberry Pi
            </MetaField>
            <MetaField label="Backend" variant="inline">
                <StatusDot tone="online">Pi online</StatusDot>
            </MetaField>
        </div>
    )
}
