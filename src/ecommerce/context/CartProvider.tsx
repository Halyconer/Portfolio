import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '../lib/products'

type CartItem = Product & { quantity: number }

type CartContextType = {
    items: CartItem[]
    getItemQuantity: (id: number) => number
    addItem: (product: Product) => void
    updateQuantity: (id: number, quantity: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product) =>
        setItems((prev) =>
            prev.some((i) => i.id === product.id)
                ? prev.map((i) =>
                      i.id === product.id
                          ? { ...i, quantity: i.quantity + 1 }
                          : i
                  )
                : [...prev, { ...product, quantity: 1 }]
        )

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((i) => i.id !== id))
            return
        }
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        )
    }

    const getItemQuantity = (id: number) =>
        items.find((i) => i.id === id)?.quantity ?? 0

    return (
        <CartContext.Provider
            value={{ items, getItemQuantity, addItem, updateQuantity }}
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
