import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getVariant, inr } from "@/lib/product";
import { Field } from "@/components/sections/closing";
import { Row } from "./cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Dehati Amrit Ghee" },
      { name: "description", content: "Enter your delivery details and place your order." },
      { property: "og:title", content: "Checkout | Dehati Amrit Ghee" },
      { property: "og:description", content: "Enter your delivery details and place your order." },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number."),
  address: z.string().trim().min(8, "Please enter your street address.").max(200),
  city: z.string().trim().min(2, "Enter your city.").max(60),
  state: z.string().trim().min(2, "Enter your state.").max(60),
  pin: z.string().trim().regex(/^\d{6}$/, "Enter a 6-digit PIN code."),
});

const PAYMENTS = [
  { id: "upi", label: "UPI", note: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Card", note: "Credit or debit" },
  { id: "cod", label: "Cash on delivery", note: "₹49 handling" },
];

function CheckoutPage() {
  const { lines, subtotal, discount, total, coupon, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pay, setPay] = useState("upi");
  const [placing, setPlacing] = useState(false);

  const cod = pay === "cod" ? 49 : 0;
  const payable = total + cod;

  const set = (k: keyof typeof form) => (v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) {
      toast.error("Your bag is empty.");
      return;
    }
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => {
        const key = String(iss.path[0]);
        if (!next[key]) next[key] = iss.message;
      });
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1400));
    const id = "DAG" + Math.floor(100000 + Math.random() * 899999);
    clear();
    setPlacing(false);
    navigate({ to: "/order-confirmed", search: { id, name: form.name.split(" ")[0] ?? "" } });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] text-forest-deep">Checkout</h1>
        <Link to="/cart" className="link-underline text-sm text-muted-foreground">
          Back to bag
        </Link>
      </div>

      <div className="mt-12 grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
        <form onSubmit={submit} noValidate>
          <span className="eyebrow">Delivery address</span>
          <div className="mt-7 grid gap-7 sm:grid-cols-2">
            <Field id="name" label="Full name" value={form.name} onChange={set("name")} error={errors["name"]} autoComplete="name" />
            <Field id="phone" label="Mobile number" value={form.phone} onChange={set("phone")} error={errors["phone"]} autoComplete="tel" />
            <div className="sm:col-span-2">
              <Field id="email" label="Email" type="email" value={form.email} onChange={set("email")} error={errors["email"]} autoComplete="email" />
            </div>
            <div className="sm:col-span-2">
              <Field id="address" label="Street address" value={form.address} onChange={set("address")} error={errors["address"]} autoComplete="street-address" />
            </div>
            <Field id="city" label="City" value={form.city} onChange={set("city")} error={errors["city"]} autoComplete="address-level2" />
            <Field id="state" label="State" value={form.state} onChange={set("state")} error={errors["state"]} autoComplete="address-level1" />
            <Field id="pin" label="PIN code" value={form.pin} onChange={set("pin")} error={errors["pin"]} autoComplete="postal-code" />
          </div>

          <div className="mt-14">
            <span className="eyebrow">Payment</span>
            <div className="mt-5 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment method">
              {PAYMENTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={pay === p.id}
                  onClick={() => setPay(p.id)}
                  className={cn(
                    "relative overflow-hidden rounded-sm border px-4 py-5 text-left transition-colors duration-[600ms]",
                    pay === p.id ? "border-forest" : "border-line hover:border-forest/40",
                  )}
                >
                  <span
                    className="absolute inset-0 origin-bottom bg-secondary transition-transform duration-[700ms] [transition-timing-function:var(--ease-silk)]"
                    style={{ transform: pay === p.id ? "scaleY(1)" : "scaleY(0)" }}
                  />
                  <span className="relative block text-[15px] text-forest-deep">{p.label}</span>
                  <span className="relative mt-1 block text-xs text-muted-foreground">{p.note}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={placing || lines.length === 0}
            className="group relative mt-12 h-14 w-full overflow-hidden rounded-full bg-forest text-[13px] tracking-[0.16em] text-primary-foreground uppercase disabled:opacity-50"
          >
            <span className="relative z-10">
              {placing ? "Placing your order…" : `Place order · ${inr(payable)}`}
            </span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest-deep transition-transform duration-[700ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-y-100" />
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            This is a demonstration checkout — no payment is actually processed.
          </p>
        </form>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">Order summary</span>
          {lines.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Your bag is empty.{" "}
              <Link to="/" hash="product" className="link-underline text-forest-deep">
                Pick a size
              </Link>
              .
            </p>
          ) : (
            <>
              <ul className="mt-6 space-y-4 border-b border-line pb-6">
                {lines.map((l) => {
                  const v = getVariant(l.id);
                  return (
                    <li key={l.id} className="flex items-baseline justify-between text-sm">
                      <span className="text-forest-deep">
                        Dehati Amrit Ghee · {v.label}{" "}
                        <span className="text-muted-foreground">× {l.qty}</span>
                      </span>
                      <span>{inr(v.price * l.qty)}</span>
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-6 space-y-3 border-b border-line pb-6 text-sm">
                <Row label="Subtotal" value={inr(subtotal)} muted />
                {discount > 0 && <Row label={`Coupon ${coupon}`} value={`− ${inr(discount)}`} accent />}
                <Row label="Shipping" value="Free" muted />
                {cod > 0 && <Row label="COD handling" value={inr(cod)} muted />}
              </dl>
              <div className="mt-6 flex items-baseline justify-between">
                <span className="eyebrow">To pay</span>
                <span className="font-display text-3xl text-forest-deep">{inr(payable)}</span>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
