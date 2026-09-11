export type Product = {
    id: number
    name: string
    imgUrl: string
    amount: number
    currency: 'USD' | 'EUR' | 'JPY'
}

// [name, imgur id, amount, currency] — id is the row index + 1.
const ROWS: Array<[string, string, number, Product['currency']]> = [
    ['Noir Gold Sneaker', 'UTreggu', 3250, 'USD'],
    ['Alpine White Sneaker', 'SiJRsGi', 850, 'USD'],
    ['Sandstone Luxe Runner', 'MRWWgBn', 1250, 'USD'],
    ['Blush Elevate Sneaker', 'RjfRI1t', 450, 'EUR'],
    ['Aurelia Stiletto Sandal', 'DKWbBTq', 2200, 'EUR'],
    ['Classic Luxe Sneakers', 'VWxrCFV', 1050, 'USD'],
    ['Executive Cap-Toe Oxfords', 'AToMKgn', 580000, 'JPY'],
    ['Croc-Embossed Signature Loafers', 'xvChCYW', 4750, 'EUR'],
    ['Luxe Strap Sandals', 'MSmYtgW', 2600, 'USD'],
    ['Neo-Future Elevation Sneakers', 'QZqy8xe', 1000000, 'JPY'],
]

export const products: Product[] = ROWS.map(
    ([name, imgId, amount, currency], i) => ({
        id: i + 1,
        name,
        imgUrl: `https://i.imgur.com/${imgId}.png`,
        amount,
        currency,
    })
)
