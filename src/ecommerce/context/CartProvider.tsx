import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '../lib/products'
import { convertToUSD } from '../utils/currency'

export type CartItem = Product & {
    quantity: number
    usdAmount: number
}

type CartContextType = {
    items: CartItem[]
    getItemQuantity: (id: number) => number
    addItem: (product: Product) => void
    updateQuantity: (id: number, quantity: number) => void
    removeItem: (id: number) => void
    clear: () => void
    totalUSD: number
    itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    async function addItem(product: Product) {
        const usdAmount = await convertToUSD(product.amount, product.currency)

        setItems((prev) => {
            let existing
            for (const item of prev) {
                if (item.id === product.id) {
                    existing = item
                    break
                }
            }

            if (existing) {
                const updated = []
                for (const item of prev) {
                    if (item.id === product.id) {
                        updated.push({ ...item, quantity: item.quantity + 1 })
                    } else {
                        updated.push(item)
                    }
                }
                return updated
            }

            return [...prev, { ...product, quantity: 1, usdAmount }]
        })
    }

    function updateQuantity(id: number, quantity: number) {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        setItems((prev) => {
            return prev.map((i) => {
                if (i.id === id) {
                    return { ...i, quantity }
                }
                return i
            })
        })
    }

    function getItemQuantity(id: number) {
        const item = items.find((i) => i.id === id)
        return item ? item.quantity : 0
    }

    function removeItem(id: number) {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }

    function clear() {
        setItems([])
    }

    let totalUSD = 0
    let itemCount = 0
    for (const item of items) {
        totalUSD += item.usdAmount * item.quantity
        itemCount += item.quantity
    }

    return (
        <CartContext.Provider
            value={{
                items,
                getItemQuantity,
                addItem,
                updateQuantity,
                removeItem,
                clear,
                totalUSD,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
