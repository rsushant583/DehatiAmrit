import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getVariant, type VariantId } from "./product";

export type CartLine = { id: VariantId; qty: number };

type CartState = {
  lines: CartLine[];
  add: (id: VariantId, qty?: number) => void;
  setQty: (id: VariantId, qty: number) => void;
  remove: (id: VariantId) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  mrpTotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  wishlist: VariantId[];
  toggleWishlist: (id: VariantId) => void;
  coupon: string | null;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  discount: number;
  total: number;
  hydrated: boolean;
};

const CartCtx = createContext<CartState | null>(null);

const COUPONS: Record<string, number> = { AMRIT10: 0.1, GAON5: 0.05 };
const KEY = "dag.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<VariantId[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setLines(p.lines ?? []);
        setWishlist(p.wishlist ?? []);
        setCoupon(p.coupon ?? null);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ lines, wishlist, coupon }));
  }, [lines, wishlist, coupon, hydrated]);

  const add = useCallback((id: VariantId, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: VariantId, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 20) } : l)),
    );
  }, []);

  const remove = useCallback((id: VariantId) => setLines((p) => p.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => {
    setLines([]);
    setCoupon(null);
  }, []);

  const toggleWishlist = useCallback(
    (id: VariantId) =>
      setWishlist((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    [],
  );

  const applyCoupon = useCallback((code: string) => {
    const c = code.trim().toUpperCase();
    if (!c) return { ok: false, message: "Enter a coupon code." };
    if (!(c in COUPONS)) return { ok: false, message: `“${c}” is not a valid code.` };
    setCoupon(c);
    return { ok: true, message: `${c} applied — ${(COUPONS[c] ?? 0) * 100}% off.` };
  }, []);

  const value = useMemo<CartState>(() => {
    const subtotal = lines.reduce((s, l) => s + getVariant(l.id).price * l.qty, 0);
    const mrpTotal = lines.reduce((s, l) => s + getVariant(l.id).mrp * l.qty, 0);
    const discount = coupon ? Math.round(subtotal * (COUPONS[coupon] ?? 0)) : 0;
    return {
      lines,
      add,
      setQty,
      remove,
      clear,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      mrpTotal,
      open,
      setOpen,
      wishlist,
      toggleWishlist,
      coupon,
      applyCoupon,
      discount,
      total: Math.max(subtotal - discount, 0),
      hydrated,
    };
  }, [lines, open, wishlist, coupon, hydrated, add, setQty, remove, clear, toggleWishlist, applyCoupon]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
