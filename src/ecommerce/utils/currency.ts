// Cache the rates fetch promise itself, not just the resolved data, so
// concurrent first-load calls share one in-flight request instead of each
// hitting the network. Without this, a page mounting N ProductCards fires
// N identical fetches for the same JSON.
let ratesPromise: Promise<Record<string, number>> | null = null
function getRates(): Promise<Record<string, number>> {
    if (!ratesPromise) {
        ratesPromise = fetch('https://cdn.moneyconvert.net/api/latest.json')
            .then((r) => r.json())
            .then((d) => d.rates)
            .catch((err) => {
                // Clear cache on failure so a later retry can fetch again.
                ratesPromise = null
                throw err
            })
    }
    return ratesPromise
}

export async function convertToUSD(
    amount: number,
    fromCurrency: string
): Promise<number> {
    const rates = await getRates()
    const rate = rates[fromCurrency] ?? 1.0

    // JPY amounts come in as whole yen; everything else is already in cents.
    // Bring JPY into cents so all return values share the same unit.
    if (fromCurrency === 'JPY') {
        return Math.round(amount * rate * 100)
    }
    return Math.round(amount * rate)
}

export function formatPrice(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: currency === 'JPY' ? 0 : 2,
        maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(currency === 'JPY' ? amount : amount / 100)
}

export function formatUSD(cents: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(cents / 100)
}
