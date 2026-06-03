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
            const existing = prev.find((i) => i.id === product.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }
            return [...prev, { ...product, quantity: 1, usdAmount }]
        })
    }

    function removeItem(id: number) {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }

    function updateQuantity(id: number, quantity: number) {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        )
    }

    function getItemQuantity(id: number) {
        return items.find((i) => i.id === id)?.quantity ?? 0
    }

    const totalUSD = items.reduce((sum, i) => sum + i.usdAmount * i.quantity, 0)
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                getItemQuantity,
                addItem,
                updateQuantity,
                removeItem,
                clear: () => setItems([]),
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
