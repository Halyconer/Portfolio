import { useCart } from "../context/CartProvider";
import { supabase } from "@/ecommerce/lib/supabase/client";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSearch } from "../context/SearchProvider";
import { LoginModal } from "./LoginModal";
import type { User } from "@supabase/supabase-js";

export function NavBar() {
  const { itemCount } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then((result) => {
      const data = result.data;
      setUser(data.user?.is_anonymous ? null : data.user);
    });

    const data = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user?.is_anonymous ? null : session?.user ?? null );
    })

    const subscription = data.data.subscription;

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div className="flex flex-col">
      {/* Top Bar - Bazaar style */}
      <div className="bg-[#0F3460] py-2 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 text-[12px] font-medium tracking-tight">
          <div className="flex items-center gap-4">
            <span>+88012 3456 7890</span>
            <span className="hidden sm:inline">support@virellio.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-[#D23F57] transition-colors">Theme FAQ&apos;s</span>
            <span className="cursor-pointer hover:text-[#D23F57] transition-colors">Need Help?</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-100">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-[#D23F57] rounded-md flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#2B3445]">
              VIRELLIO
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-12">
            <div className="relative w-full" suppressHydrationWarning>
              <input
                type="text"
                placeholder="Search shoes..."
                className="w-full rounded-full border border-neutral-200 bg-[#F6F9FC] py-2.5 pl-5 pr-12 text-sm focus:border-[#D23F57] focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                suppressHydrationWarning
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-full bg-neutral-100 p-2.5 text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="rounded-full bg-neutral-100 p-2.5 text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
                title="Login"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}

            <Link to="/cart" className="relative group p-2.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D23F57] text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => {
          setShowLogin(false);
        }}
      />
    </div>
  );
}
