export type Product = {
    id: number
    name: string
    description: string
    keywords: string[]
    imgUrl: string
    amount: number
    currency: 'USD' | 'EUR' | 'JPY'
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Noir Gold Sneaker',
        description:
            'A luxury black leather sneaker featuring suede paneling and polished gold accents. Designed with a bold metallic V emblem and a durable rubber outsole, this silhouette blends everyday comfort with elevated craftsmanship.',
        keywords: [
            'black sneaker',
            'luxury footwear',
            'gold accents',
            'leather shoes',
            'designer sneakers',
        ],
        imgUrl: 'https://i.imgur.com/UTreggu.png',
        amount: 3250,
        currency: 'USD',
    },
    {
        id: 2,
        name: 'Alpine White Sneaker',
        description:
            'A refined white leather sneaker with contrasting black detailing and gold hardware. Built for versatility, this premium low-top silhouette delivers a clean, modern aesthetic suitable for both casual and elevated looks.',
        keywords: [
            'white sneaker',
            'minimal design',
            'premium leather',
            'luxury brand',
            'modern footwear',
        ],
        imgUrl: 'https://i.imgur.com/SiJRsGi.png',
        amount: 850,
        currency: 'USD',
    },
    {
        id: 3,
        name: 'Sandstone Luxe Runner',
        description:
            'Crafted from taupe suede and smooth white leather, this contemporary runner features subtle gold detailing and a cushioned sole for all-day comfort. A perfect balance of sport-inspired performance and refined luxury.',
        keywords: [
            'taupe sneakers',
            'suede shoes',
            'neutral tones',
            'luxury runner',
            'comfort footwear',
        ],
        imgUrl: 'https://i.imgur.com/MRWWgBn.png',
        amount: 1250,
        currency: 'USD',
    },
    {
        id: 4,
        name: 'Blush Elevate Sneaker',
        description:
            "A women's-inspired blush and ivory sneaker with soft suede overlays and signature gold accents. The chunky sole and elegant detailing create a feminine yet bold statement silhouette.",
        keywords: [
            'women sneakers',
            'blush pink shoes',
            'chunky sneaker',
            'fashion footwear',
            'gold logo',
        ],
        imgUrl: 'https://i.imgur.com/RjfRI1t.png',
        amount: 450,
        currency: 'EUR',
    },
    {
        id: 5,
        name: 'Aurelia Stiletto Sandal',
        description:
            'An elegant metallic gold high-heeled sandal featuring delicate ankle straps and crystal embellishments. Designed for evening wear, this refined silhouette combines glamour with sophisticated craftsmanship.',
        keywords: [
            'high heels',
            'gold sandals',
            'evening shoes',
            'luxury heels',
            'formal footwear',
        ],
        imgUrl: 'https://i.imgur.com/DKWbBTq.png',
        amount: 2200,
        currency: 'EUR',
    },
    {
        id: 6,
        name: 'Classic Luxe Sneakers',
        description:
            'Premium low-top leather sneakers crafted in white and cognac tones with refined gold accents. Designed for elevated everyday wear, featuring textured leather panels, signature Virellio metal hardware, and a cushioned sole for all-day comfort.',
        keywords: [
            'luxury sneakers',
            'leather sneakers',
            'designer shoes',
            'premium footwear',
            'gold accents',
            'white sneakers',
            'mens luxury',
        ],
        imgUrl: 'https://i.imgur.com/VWxrCFV.png',
        amount: 1050,
        currency: 'USD',
    },
    {
        id: 7,
        name: 'Executive Cap-Toe Oxfords',
        description:
            'Hand-polished black leather Oxford dress shoes featuring a sleek cap-toe silhouette and refined stitching. A timeless formal essential crafted for sophistication, business wear, and formal occasions.',
        keywords: [
            'oxford shoes',
            'dress shoes',
            'formal footwear',
            'business shoes',
            'luxury leather',
            'cap toe',
            'classic menswear',
        ],
        imgUrl: 'https://i.imgur.com/AToMKgn.png',
        amount: 580000,
        currency: 'JPY',
    },
    {
        id: 8,
        name: 'Croc-Embossed Signature Loafers',
        description:
            'Elegant slip-on loafers crafted in rich brown crocodile-embossed leather. Accented with polished gold V hardware across the vamp, offering a bold yet refined statement for luxury styling.',
        keywords: [
            'luxury loafers',
            'croc embossed',
            'designer loafers',
            'slip on shoes',
            'gold hardware',
            'premium leather',
            'statement footwear',
        ],
        imgUrl: 'https://i.imgur.com/xvChCYW.png',
        amount: 4750,
        currency: 'EUR',
    },
    {
        id: 9,
        name: 'Luxe Strap Sandals',
        description:
            'High-end black leather sandals with dual strap construction and signature gold V embellishments. Designed with cushioned footbeds and adjustable buckles for modern luxury comfort.',
        keywords: [
            'luxury sandals',
            'designer sandals',
            'leather sandals',
            'gold accents',
            'premium footwear',
            'summer luxury',
            'minimalist design',
        ],
        imgUrl: 'https://i.imgur.com/MSmYtgW.png',
        amount: 2600,
        currency: 'USD',
    },
    {
        id: 10,
        name: 'Neo-Future Elevation Sneakers',
        description:
            'Futuristic luxury sneakers featuring metallic silver panels, iridescent detailing, and a translucent illuminated sole unit. Engineered for bold style and cutting-edge design aesthetics.',
        keywords: [
            'futuristic sneakers',
            'metallic shoes',
            'designer sneakers',
            'luxury streetwear',
            'iridescent finish',
            'modern footwear',
            'statement sneakers',
        ],
        imgUrl: 'https://i.imgur.com/QZqy8xe.png',
        amount: 1000000,
        currency: 'JPY',
    },
]
