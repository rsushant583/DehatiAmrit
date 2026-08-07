import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { VARIANTS, getVariant, inr, savings, savingsPct, type VariantId } from "@/lib/product";
import { Reveal, RevealLines } from "@/components/site/reveal";
import { QtyStepper } from "@/components/site/cart-drawer";
import { cn } from "@/lib/utils";
import label from "@/assets/label.jpg.asset.json";
import heroJar from "@/assets/hero-jar.jpg";
import galleryTop from "@/assets/gallery-top.jpg";
import textureImg from "@/assets/texture.jpg";
import pourImg from "@/assets/pour.jpg";
import transparencyImg from "@/assets/transparency.jpg";

const GALLERY = [
  { src: heroJar, alt: "Jar of Dehati Amrit Ghee in morning light" },
  { src: galleryTop, alt: "Open jar of ghee seen from above" },
  { src: textureImg, alt: "Close-up of the grain in the ghee" },
  { src: pourImg, alt: "Warm ghee poured from a brass spoon" },
];

const SIZE_LABELS: Record<VariantId, string> = {
  "200gm": "First Taste",
  "500gm": "Daily Kitchen",
  "1kg": "Family Jar",
  "5kg": "Grand Feast"
};

export function ProductSection({ registerBuy }: { registerBuy?: (fn: () => void) => void }) {
  const [variant, setVariant] = useState<VariantId>("1kg");
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const imgWrap = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { add, setOpen, wishlist, toggleWishlist } = useCart();

  const v = useMemo(() => getVariant(variant), [variant]);
  const wished = wishlist.includes(variant);

  const addToCart = useCallback(() => {
    add(variant, qty);
    setOpen(true);
    toast.success("Added to your bag", { description: `${v.label} × ${qty}` });
  }, [add, variant, qty, setOpen, v.label]);

  const buyNow = useCallback(() => {
    add(variant, qty);
    navigate({ to: "/checkout" });
  }, [add, variant, qty, navigate]);

  registerBuy?.(() => {
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  });

  const onMove = (e: React.MouseEvent) => {
    const r = imgWrap.current?.getBoundingClientRect();
    if (!r) return;
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const current = GALLERY[index] ?? GALLERY[0]!;

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const jarRotate = useTransform(scrollYProgress, [0, 1], [-3, 8]);
  const lightShiftX = useTransform(scrollYProgress, [0, 1], ["-50%", "150%"]);
  const breathingScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1]);
  const steamY = useTransform(scrollYProgress, [0, 1], [20, -40]);

  return (
    <section id="product" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 flex items-baseline justify-between border-b border-line pb-4">
          <span className="eyebrow">05 — The ghee</span>
          <span className="font-deva text-sm text-muted-foreground">एक ही उत्पाद, चार आकार</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24" ref={sectionRef}>
          {/* Gallery */}
          <div className="relative group perspective-[1000px]">
            <Reveal variant="image" className="relative aspect-[4/5] w-full rounded-2xl bg-cream shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-3xl">
              {/* Dynamic Scrolling Light/Reflection */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-60"
                style={{ 
                  background: "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.8) 60%, transparent 80%)",
                  x: lightShiftX,
                  scale: 2
                }}
              />
              {/* Scroll-driven Steam Effect */}
              <motion.div 
                className="absolute -top-10 left-1/4 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none z-10"
                style={{ y: steamY }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                style={{ rotateZ: jarRotate, scale: breathingScale }}
                className="h-full w-full origin-bottom"
              >
                <div
                ref={imgWrap}
                onMouseMove={onMove}
                onMouseLeave={() => setZoom(null)}
                className="h-full w-full cursor-zoom-in overflow-hidden relative z-0"
              >
                {GALLERY.map((g, i) => (
                  <img
                    key={g.src}
                    src={g.src}
                    alt={g.alt}
                    width={1200}
                    height={1500}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] [transition-timing-function:var(--ease-silk)]"
                    style={{
                      opacity: index === i ? 1 : 0,
                      transform:
                        index === i && zoom
                          ? "scale(1.8)"
                          : index === i
                            ? "scale(1)"
                            : "scale(1.05)",
                      transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
                      filter: index === i ? "blur(0px)" : "blur(4px)",
                    }}
                  />
                ))}
              </div>
              </motion.div>
              <button
                type="button"
                aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                aria-pressed={wished}
                onClick={() => {
                  toggleWishlist(variant);
                  toast(wished ? "Removed from wishlist" : "Saved to your wishlist");
                }}
                className="absolute right-6 top-6 z-20 grid h-12 w-12 place-items-center rounded-full bg-paper/85 backdrop-blur-md transition-colors duration-500 hover:bg-paper shadow-sm"
              >
                <Heart
                  className={cn("h-5 w-5 transition-colors", wished ? "fill-clay text-clay" : "text-forest")}
                  strokeWidth={1.5}
                />
              </button>
            </Reveal>

            <div className="mt-6 flex justify-center gap-4">
              {GALLERY.map((g, i) => (
                <button
                  key={g.src}
                  onClick={() => setIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={index === i}
                  className={cn(
                    "aspect-square w-20 overflow-hidden rounded-md transition-all duration-500 outline outline-2 outline-offset-2",
                    index === i ? "opacity-100 outline-forest shadow-md" : "opacity-60 outline-transparent hover:opacity-100",
                  )}
                >
                  <img
                    src={g.src}
                    alt=""
                    width={200}
                    height={200}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <p className="mt-6 text-center text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Hover to zoom · {current.alt}
            </p>
          </div>

          {/* Sticky purchase panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <RevealLines
              lines={["Dehati Amrit", "Premium Ghee"]}
              className="font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] text-forest-deep"
            />
            <div className="mt-4 flex items-center gap-3">
              <p className="font-deva text-lg text-clay">देहाती अमृत घी</p>
              <span className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                <Sparkles className="h-3 w-3" />
                Authentic Bilona
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-baseline gap-4">
              <span className="font-display text-5xl text-forest-deep">{inr(v.price)}</span>
              <span className="text-xl text-muted-foreground line-through">{inr(v.mrp)}</span>
              <span className="rounded-full bg-forest/5 px-3 py-1.5 text-[12px] font-medium tracking-[0.16em] text-forest uppercase">
                Save {inr(savings(v))} · {savingsPct(v)}%
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Inclusive of all taxes · Complimentary shipping across India
            </p>

            <div className="mt-12">
              <span className="eyebrow text-forest-deep">Select your jar</span>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {VARIANTS.map((opt) => {
                  const on = opt.id === variant;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setVariant(opt.id)}
                      aria-pressed={on}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border p-5 text-left transition-all duration-[600ms] [transition-timing-function:var(--ease-silk)] shadow-sm",
                        on ? "border-forest bg-forest/5 shadow-md scale-[1.02]" : "border-line hover:border-forest/40 hover:shadow-md bg-transparent",
                      )}
                    >
                      <span className="relative flex justify-between items-start">
                        <span className="block text-[16px] font-medium text-forest-deep">{SIZE_LABELS[opt.id] || opt.label}</span>
                        {on && <Check className="h-4 w-4 text-forest" />}
                      </span>
                      <span className="relative mt-1 block text-sm text-muted-foreground">
                        {opt.label} • {inr(opt.price)}
                      </span>
                      <span className="relative mt-3 block text-[11px] font-medium tracking-[0.18em] text-clay uppercase">
                        {opt.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <QtyStepper large value={qty} onChange={(q) => setQty(Math.max(1, Math.min(q, 20)))} label="Quantity" />
              <span className="text-base text-muted-foreground">
                Subtotal: <span className="font-medium text-forest-deep">{inr(v.price * qty)}</span>
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                onClick={addToCart}
                className="group relative h-16 overflow-hidden rounded-full border-2 border-forest text-[14px] font-medium tracking-[0.16em] text-forest-deep uppercase transition-transform hover:scale-[1.02] duration-300"
              >
                <span className="relative z-10 transition-colors duration-[600ms] group-hover:text-primary-foreground">
                  Add to bag
                </span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-[700ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-y-100" />
              </button>
              <button
                onClick={buyNow}
                className="group relative h-16 overflow-hidden rounded-full bg-forest text-[14px] font-medium tracking-[0.16em] text-primary-foreground uppercase shadow-lg shadow-forest/30 transition-transform hover:scale-[1.02] hover:shadow-xl duration-300"
              >
                <span className="relative z-10">Buy now</span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest-deep transition-transform duration-[700ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-y-100" />
              </button>
            </div>

            <ul className="mt-12 space-y-4 border-t border-line pt-8">
              {[
                "Traditional Vedic Bilona method",
                "Milk from free-grazing indigenous cows",
                "Nutrient-dense with rich aroma",
                "Crafted in small batches with love",
              ].map((t) => (
                <li key={t} className="flex items-center gap-4 text-[15px] text-muted-foreground">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-forest/10 text-forest">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ProductDetails />
    </section>
  );
}

function ProductDetails() {
  const rows: [string, string][] = [
    ["Product", "Dehati Amrit Premium Ghee"],
    ["Net quantity", "200 gm · 500 gm · 1 Kg · 5 Kg"],
    ["Best before", "9 months from the date of packing"],
    ["Storage", "Store in a cool, dry place away from direct sunlight."],
    ["Ingredients", "100% Pure Clarified Butter (Ghee)."],
    ["Packed by", "Dehati Amrit Foods"],
    ["Origin", "Proudly a Product of India"],
  ];

  return (
    <div className="mx-auto mt-28 max-w-[1400px] px-5 md:mt-40 md:px-10">
      <div className="mb-12 flex items-baseline justify-between border-b border-line pb-4">
        <span className="eyebrow">06 — Uncompromising Quality</span>
        <span className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">FSSAI Certified</span>
      </div>

      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
        <Reveal variant="image" className="relative group rounded-3xl overflow-hidden shadow-xl transition-all duration-700 hover:shadow-2xl aspect-[4/5] md:aspect-square">
          <img
            src={transparencyImg}
            alt="Dehati Amrit Ghee"
            width={900}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
          />
        </Reveal>

        <div>
          <RevealLines
            lines={["Pure transparency.", "Nothing hidden."]}
            className="font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.05] text-forest-deep"
          />
          <dl className="mt-12 divide-y divide-line border-y border-line">
            {rows.map(([k, val], i) => (
              <Reveal
                as="div"
                variant="fade"
                delay={i * 60}
                key={k}
                className="group grid grid-cols-[140px_1fr] gap-6 py-5 md:grid-cols-[200px_1fr] transition-colors hover:bg-forest/5 px-2 -mx-2 rounded-lg"
              >
                <dt className="text-[12px] font-medium tracking-[0.2em] text-muted-foreground uppercase flex items-center group-hover:text-forest transition-colors">{k}</dt>
                <dd className="text-[16px] text-forest-deep leading-relaxed">{val}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
