import { products } from "./lib/products";
import { ProductCard } from "./components/ProductCard";

export function EcommerceSite() {
    return (
    <div className="bg-[#F6F9FC] min-h-screen">
      <section className="bg-white mb-10 overflow-hidden border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B3445] leading-[1.2] mb-6 tracking-tight">
              Welcome to <span className="text-[#D23F57]">Virellio</span>
            </h1>
            <p className="text-neutral-500 text-base sm:text-lg mb-4 max-w-lg mx-auto lg:mx-0">
              This website is the result of a take-home interview I conducted, built on top of a faulty payments SDK they provided with fraud detection baked in.
            </p>
            <a
              href="#shop"
              className="inline-block bg-[#D23F57] text-white px-8 py-3.5 rounded-md font-bold text-sm hover:bg-[#E3364E] transition-all shadow-lg shadow-[#D23F57]/10"
            >
              Try It Out
            </a>
          </div>
          <div className="relative w-full max-w-sm lg:max-w-md aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-[#FCE9EC] rounded-full opacity-40 scale-125"></div>
            <img
              src={products[0].imgUrl}
              alt="Featured Sneaker"
              className="relative z-10 w-full h-auto drop-shadow-2xl -rotate-12"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div id="shop" className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-6 w-1.5 bg-[#D23F57] rounded-full"></div>
          <h2 className="text-2xl font-bold text-[#2B3445] tracking-tight">Flash Deals</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

