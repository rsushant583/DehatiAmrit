import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getVariant, inr } from "@/lib/product";
import { cn } from "@/lib/utils";
import gallery from "@/assets/gallery-top.jpg";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal, mrpTotal, hydrated } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "clip" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <div
      className={cn("fixed inset-0 z-[97]", open ? "" : "pointer-events-none")}
      aria-hidden={!open}
      role="dialog"
      aria-label="Shopping bag"
    >
      <div
        className="absolute inset-0 bg-forest-deep/35 backdrop-blur-[2px] transition-opacity duration-700"
        style={{ opacity: open ? 1 : 0 }}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "absolute flex flex-col bg-paper shadow-2xl transition-transform duration-[750ms] [transition-timing-function:var(--ease-silk)]",
          "bottom-0 left-0 right-0 w-full max-h-[88vh] rounded-t-[24px]",
          "lg:top-0 lg:bottom-0 lg:right-0 lg:left-auto lg:max-w-[440px] lg:max-h-none lg:rounded-none",
          open ? "translate-y-0 lg:translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-y-0 lg:translate-x-full"
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <span className="eyebrow">Your bag</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close bag"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
          >
            <X className="h-4 w-4" strokeWidth={1.4} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6">
          {!hydrated ? (
            <div className="space-y-4 py-8">
              {[0, 1].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="shimmer h-20 w-20 rounded-sm" />
                  <div className="flex-1 space-y-2 pt-2">
                    <div className="shimmer h-3 w-2/3 rounded-sm" />
                    <div className="shimmer h-3 w-1/3 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          ) : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <img
                src={gallery}
                alt=""
                width={120}
                height={120}
                loading="lazy"
                className="h-28 w-28 rounded-full object-cover opacity-70 grayscale-[35%]"
              />
              <p className="mt-6 font-display text-2xl text-forest-deep">Your bag is quiet.</p>
              <p className="mt-2 max-w-[26ch] text-sm text-muted-foreground">
                Every jar is churned in small batches. Pick a size and we will pack one for you.
              </p>
              <button
                onClick={() => {
                  setOpen(false);
                  setTimeout(
                    () => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" }),
                    300,
                  );
                }}
                className="mt-7 rounded-full bg-forest px-7 py-3 text-[13px] tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-forest-deep"
              >
                Choose a size
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((l) => {
                const v = getVariant(l.id);
                return (
                  <li key={l.id} className="flex gap-4 py-5">
                    <img
                      src={gallery}
                      alt=""
                      width={80}
                      height={80}
                      loading="lazy"
                      className="h-20 w-20 rounded-sm object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[15px] text-forest-deep">Dehati Amrit Ghee</p>
                          <p className="mt-0.5 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                            {v.label}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(l.id)}
                          aria-label={`Remove ${v.label}`}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <X className="h-4 w-4" strokeWidth={1.4} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <QtyStepper
                          value={l.qty}
                          onChange={(q) => setQty(l.id, q)}
                          label={`Quantity for ${v.label}`}
                        />
                        <div className="text-right">
                          <span className="mr-2 text-xs text-muted-foreground line-through">
                            {inr(v.mrp * l.qty)}
                          </span>
                          <span className="text-[15px] text-forest-deep">{inr(v.price * l.qty)}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-line px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">You save</span>
              <span className="text-clay">{inr(mrpTotal - subtotal)}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="font-display text-2xl text-forest-deep">{inr(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Free shipping across India · taxes included
            </p>
            <div className="mt-5 grid gap-2">
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="grid h-12 place-items-center rounded-full bg-forest text-[13px] tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-forest-deep"
              >
                Checkout
              </Link>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="grid h-12 place-items-center rounded-full border border-forest/25 text-[13px] tracking-[0.14em] text-forest-deep uppercase transition-colors duration-500 hover:bg-secondary"
              >
                View bag
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}

export function QtyStepper({
  value,
  onChange,
  label,
  large,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-forest/20",
        large ? "h-12" : "h-9",
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className={cn(
          "grid place-items-center rounded-full text-forest-deep transition-colors duration-400 hover:bg-secondary",
          large ? "h-12 w-12" : "h-9 w-9",
        )}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.6} />
      </button>
      <span
        aria-live="polite"
        className={cn("min-w-8 text-center tabular-nums", large ? "text-base" : "text-sm")}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={cn(
          "grid place-items-center rounded-full text-forest-deep transition-colors duration-400 hover:bg-secondary",
          large ? "h-12 w-12" : "h-9 w-9",
        )}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
      </button>
    </div>
  );
}
