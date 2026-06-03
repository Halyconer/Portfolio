import { useState, useEffect } from 'react'
import type { Product } from '../lib/products'
import { convertToUSD, formatUSD } from '../utils/currency'
import { useCart } from '../context/CartProvider'
export function ProductCard({ product }: { product: Product }) {
    const { addItem, updateQuantity, getItemQuantity } = useCart()
    const quantity = getItemQuantity(product.id)
    const [usd, setUSD] = useState<number | null>(null)

    useEffect(() => {
        let cancelled = false
        convertToUSD(product.amount, product.currency).then((usd) => {
            if (!cancelled) setUSD(usd)
        })
        return () => {
            cancelled = true
        }
    }, [product.amount, product.currency])

    return (
        <div className="bazaar-card flex flex-col overflow-hidden bg-white h-full border border-neutral-100">
            <div className="relative aspect-square p-6 bg-white flex items-center justify-center">
                <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    loading="lazy"
                />
            </div>

            <div className="p-4 flex flex-col grow">
                <h3 className="text-sm font-semibold text-[#2B3445] truncate">
                    {product.name}
                </h3>
                <div className="text-yellow-400 text-[10px] mb-2">★★★★★</div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-50">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#D23F57]">
                            {usd !== null ? formatUSD(usd) : 'Loading...'}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        {quantity > 0 ? (
                            <div className="flex items-center gap-1 bg-[#FCE9EC] rounded-lg p-0.5 border border-[#D23F57]/10">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateQuantity(product.id, quantity - 1)
                                    }
                                    aria-label="Decrease quantity"
                                    className="w-6 h-6 flex items-center justify-center text-[#D23F57] hover:bg-white rounded transition-colors text-xs font-bold cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="text-xs font-bold text-[#D23F57] min-w-3 text-center">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateQuantity(product.id, quantity + 1)
                                    }
                                    aria-label="Increase quantity"
                                    className="w-6 h-6 flex items-center justify-center text-[#D23F57] hover:bg-white rounded transition-colors text-xs font-bold cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => addItem(product)}
                                className="p-2 border border-[#D23F57]/20 text-[#D23F57] rounded-lg hover:bg-[#D23F57] hover:text-white transition-all cursor-pointer"
                                title="Add item to cart"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
