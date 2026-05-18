import { useState } from "react";
import { supabase } from "@/ecommerce/lib/supabase/client";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  showGuestOption?: boolean;
  onGuestCheckout?: () => void;
}


export function LoginModal({ open, onClose, onSuccess, showGuestOption, onGuestCheckout }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setisSigningUp] = useState(false);

  if (!open) return null;

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSigningUp) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.is_anonymous) {
          const { error } = await supabase.auth.updateUser({ email, password });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }

      setLoading(false);
      setEmail("");
      setPassword("");
      setError(null);
      setisSigningUp(false);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  function handleClose() {
    setEmail("");
    setPassword("");
    setError(null);
    setLoading(false);
    setisSigningUp(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bazaar-card bg-white w-full max-w-115 p-8 border border-neutral-100 shadow-xl relative text-center">
        <button
          type="button"
          title="Close"
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-16 w-16 bg-[#F6F9FC] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[#D23F57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-[#2B3445] mb-1">
          {isSigningUp ? "Create Your Account" : "Welcome To Virellio"}
        </h2>
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">
          {isSigningUp ? "Fill in your details to register" : "Log in to your account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="text-xs font-bold text-[#4B566B]">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
              className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-[#D23F57] focus:outline-none transition-all placeholder:text-neutral-300"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="login-password" className="text-xs font-bold text-[#4B566B]">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              minLength={6}
              className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-[#D23F57] focus:outline-none transition-all placeholder:text-neutral-300"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-[11px] font-bold p-3 rounded-md border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D23F57] text-white py-3.5 rounded-md font-bold text-sm hover:bg-[#E3364E] transition-all shadow-lg shadow-[#D23F57]/10 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Processing..." : isSigningUp ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-neutral-400 font-bold tracking-widest">or</span>
            </div>
          </div>

          {showGuestOption && onGuestCheckout ? (
            <button
              type="button"
              onClick={() => {
                handleClose();
                onGuestCheckout();
              }}
              className="w-full border border-neutral-200 text-[#2B3445] py-3.5 rounded-md font-bold text-sm hover:bg-neutral-50 transition-all cursor-pointer"
            >
              Continue as Guest
            </button>
          ) : null}

          <p className="text-sm font-bold text-[#2B3445]">
            {isSigningUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setisSigningUp(!isSigningUp);
                setError(null);
              }}
              className="text-[#D23F57] hover:underline cursor-pointer"
            >
              {isSigningUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}



