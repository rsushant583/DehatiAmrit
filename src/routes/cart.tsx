import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getVariant, inr } from "@/lib/product";
import { QtyStepper } from "@/components/site/cart-drawer";
import galleryTop from "@/assets/gallery-top.jpg";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your bag | Dehati Amrit Ghee" },
      { name: "description", content: "Review the jars in your bag before checking out." },
      { property: "og:title", content: "Your bag | Dehati Amrit Ghee" },
      { property: "og:description", content: "Review the jars in your bag before checking out." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal, mrpTotal, discount, total, coupon, applyCoupon, hydrated } =
    useCart();
  const [code, setCode] = useState("");

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] text-forest-deep">Your bag</h1>
        <Link to="/" className="link-underline text-sm text-muted-foreground">
          Continue shopping
        </Link>
      </div>

      {!hydrated ? (
        <div className="mt-12 space-y-6">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-6">
              <div className="shimmer h-32 w-32 rounded-sm" />
              <div className="flex-1 space-y-3 pt-3">
                <div className="shimmer h-4 w-1/3 rounded-sm" />
                <div className="shimmer h-4 w-1/5 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      ) : lines.length === 0 ? (
        <div className="flex flex-col items-center py-28 text-center">
          <img
            src={galleryTop}
            alt=""
            width={160}
            height={160}
            loading="lazy"
            className="h-36 w-36 rounded-full object-cover opacity-70"
          />
          <p className="mt-8 font-display text-3xl text-forest-deep">Nothing here yet.</p>
          <p className="mt-3 max-w-[34ch] text-sm text-muted-foreground">
            Pick a size and we'll pack a jar from the current batch.
          </p>
          <Link
            to="/"
            hash="product"
            className="mt-8 rounded-full bg-forest px-8 py-4 text-[13px] tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-forest-deep"
          >
            Choose a size
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((l) => {
              const v = getVariant(l.id);
              return (
                <li key={l.id} className="flex flex-col gap-6 py-8 sm:flex-row">
                  <img
                    src={galleryTop}
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                    className="h-32 w-32 rounded-sm object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h2 className="font-display text-2xl text-forest-deep">Dehati Amrit Ghee</h2>
                        <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                          {v.label}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground line-through">
                          {inr(v.mrp * l.qty)}
                        </p>
                        <p className="font-display text-2xl text-forest-deep">
                          {inr(v.price * l.qty)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center gap-6 pt-6">
                      <QtyStepper
                        value={l.qty}
                        onChange={(q) => setQty(l.id, q)}
                        label={`Quantity for ${v.label}`}
                      />
                      <button
                        onClick={() => remove(l.id)}
                        className="link-underline text-sm text-muted-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">Summary</span>
            <dl className="mt-6 space-y-3 border-b border-line pb-6 text-sm">
              <Row label="MRP total" value={inr(mrpTotal)} muted />
              <Row label="Batch price" value={`− ${inr(mrpTotal - subtotal)}`} accent />
              {discount > 0 && <Row label={`Coupon ${coupon}`} value={`− ${inr(discount)}`} accent />}
              <Row label="Shipping" value="Free" muted />
            </dl>
            <div className="mt-6 flex items-baseline justify-between">
              <span className="eyebrow">To pay</span>
              <span className="font-display text-3xl text-forest-deep">{inr(total)}</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const res = applyCoupon(code);
                res.ok ? toast.success(res.message) : toast.error(res.message);
                if (res.ok) setCode("");
              }}
              className="mt-8"
            >
              <label htmlFor="coupon" className="eyebrow">
                Coupon
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-line pb-2 focus-within:border-forest">
                <input
                  id="coupon"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="AMRIT10"
                  className="w-full bg-transparent py-1 text-[15px] uppercase outline-none placeholder:text-muted-foreground/50"
                />
                <button type="submit" className="text-[12px] tracking-[0.2em] text-forest uppercase">
                  Apply
                </button>
              </div>
            </form>

            <Link
              to="/checkout"
              className="mt-8 grid h-14 place-items-center rounded-full bg-forest text-[13px] tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-forest-deep"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export function Row({
  label,
  value,
  muted,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className={muted ? "text-muted-foreground" : "text-forest-deep"}>{label}</dt>
      <dd className={accent ? "text-clay" : "text-forest-deep"}>{value}</dd>
    </div>
  );
}
