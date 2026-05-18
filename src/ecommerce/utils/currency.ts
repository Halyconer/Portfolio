export async function convertToUSD(
    amount: number,
    fromCurrency: string
): Promise<number> {
    const res = await fetch('https://cdn.moneyconvert.net/api/latest.json')
    const data = await res.json()
    console.log(data)
    const EXCHANGE_RATES = data.rates
    const rate = EXCHANGE_RATES[fromCurrency] || 1.0

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
