import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Minus, Plus, Star, ShieldCheck, Award } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { FAQS, REVIEWS } from "@/lib/product";
import { Reveal, RevealLines, useScrollProgress } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import halwa from "@/assets/recipe-halwa.jpg";
import dal from "@/assets/recipe-dal.jpg";
import paratha from "@/assets/recipe-paratha.jpg";
import khichdi from "@/assets/recipe-khichdi.jpg";
import rice from "@/assets/recipe-rice.jpg";
import ladoo from "@/assets/recipe-ladoo.jpg";
import trustGheeImg from "@/assets/trust-ghee-1.png";

/* ————————————————————— Benefits ————————————————————— */

const TRUST_FEATURES = [
  { k: "01", t: "Traditional Bilona Process", d: "Made by churning curd, not cream. A slow, ancient Vedic process that yields less but preserves the true essence, aroma, and health benefits of pure ghee." },
  { k: "02", t: "Free Grazing Cattle", d: "Our indigenous cows roam freely and graze on natural pastures, ensuring milk that is naturally rich, healthy, and full of vitality." },
  { k: "03", t: "Small Batch Craftsmanship", d: "Never mass-produced. We craft in small, careful batches to maintain absolute control over quality, texture, and the signature golden grain." },
  { k: "04", t: "No Compromise on Purity", d: "Free from artificial colors, preservatives, or additives. Just 100% pure, natural ghee straight from the village to your kitchen." },
];

export function Benefits() {
  const [open, setOpen] = useState<number>(0);
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  
  return (
    <section className="relative overflow-hidden bg-cream py-12 md:py-16">
      <div ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className="eyebrow tracking-widest text-forest">07 — The Foundation</span>
            <RevealLines
              lines={["Why Families", "Trust Us."]}
              className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.05] text-forest-deep"
            />
            
            <div className="mt-16 space-y-2">
              {TRUST_FEATURES.map((b, i) => (
                <div key={b.k} className="border-b border-line pb-2">
                  <button
                    onClick={() => setOpen(i)}
                    className="flex w-full items-center justify-between py-6 text-left group transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-deva text-xl text-gold opacity-60 transition-opacity group-hover:opacity-100">{b.k}</span>
                      <h3 className={cn("font-display text-2xl md:text-3xl transition-colors", open === i ? "text-forest" : "text-forest-deep group-hover:text-forest")}>{b.t}</h3>
                    </div>
                    <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line group-hover:border-forest/50 transition-colors">
                      <Plus className={cn("absolute h-4 w-4 text-forest transition-all duration-500", open === i ? "rotate-90 opacity-0 scale-50" : "opacity-100 scale-100")} />
                      <Minus className={cn("absolute h-4 w-4 text-forest transition-all duration-500", open === i ? "opacity-100 scale-100 rotate-0" : "-rotate-90 opacity-0 scale-50")} />
                    </span>
                  </button>
                  <div className="grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ gridTemplateRows: open === i ? "1fr" : "0fr", opacity: open === i ? 1 : 0 }}>
                    <div className="overflow-hidden">
                      <p className="pl-14 pb-8 pr-4 text-[16px] leading-relaxed text-muted-foreground max-w-xl">
                        {b.d}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Reveal variant="image" className="hidden lg:block aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl sticky top-32">
            <img
              src={trustGheeImg}
              alt="Dehati Amrit Ghee Bottle"
              width={1200}
              height={1500}
              loading="lazy"
              className="h-full w-full object-cover object-[75%_center]"
              style={{ transform: `scale(${1 + progress * 0.1})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-white/90 text-lg font-medium tracking-wide">"The authentic texture of patience and tradition."</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— Reviews (Testimonials) ————————————————————— */

export function Reviews() {
  const [i, setI] = useState(0);
  const total = REVIEWS.length;
  const go = (d: number) => setI((p) => (p + d + total) % total);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % total), 8000);
    return () => clearInterval(t);
  }, [total]);

  const r = REVIEWS[i]!;

  return (
    <section className="bg-forest text-primary-foreground py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%)' }} />
      
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary-foreground/15 pb-6 gap-6">
          <div>
            <span className="eyebrow text-gold">08 — Testimonials</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">Real Families, Real Kitchens.</h2>
          </div>
          <span className="text-[12px] tracking-[0.2em] text-primary-foreground/50 font-medium">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-12 py-20 lg:grid-cols-[1fr_2fr] items-center">
          {/* Portrait Placeholder */}
          <div className="flex justify-center lg:justify-start">
             <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl relative bg-forest-deep/50 flex items-center justify-center">
               <span className="font-display text-6xl text-gold/20">{r.name.charAt(0)}</span>
             </div>
          </div>

          <blockquote>
            <div className="flex gap-1.5" aria-label={`${r.rating} out of 5`}>
              {Array.from({ length: r.rating }).map((_, s) => (
                <Star key={s} className="h-5 w-5 fill-gold text-gold drop-shadow-md" strokeWidth={0} />
              ))}
            </div>
            <p
              key={r.name}
              className="mt-10 max-w-[28ch] font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.2] text-white/95 animate-[fadeInUp_1s_ease-out]"
            >
              “{r.text}”
            </p>
            <footer className="mt-10 flex items-center gap-4 text-base text-primary-foreground/70 animate-[fadeInUp_1s_ease-out_0.2s_both]">
              <span className="font-semibold text-white tracking-wide">{r.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
              <span>{r.city}</span>
            </footer>
          </blockquote>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3 w-full max-w-md">
            {REVIEWS.map((_, d) => (
              <button
                key={d}
                onClick={() => setI(d)}
                aria-label={`Review ${d + 1}`}
                className="h-1.5 flex-1 rounded-full bg-primary-foreground/20 overflow-hidden"
              >
                <span
                  className="block h-full origin-left bg-gold transition-transform duration-[1000ms] ease-out"
                  style={{ transform: `scaleX(${d === i ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-14 w-14 place-items-center rounded-full border border-primary-foreground/20 transition-all duration-500 hover:bg-white hover:text-forest"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-14 w-14 place-items-center rounded-full border border-primary-foreground/20 transition-all duration-500 hover:bg-white hover:text-forest"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}

/* ————————————————————— Recipes (Everyday Kitchen) ————————————————————— */

const EVERYDAY_RECIPES = [
  { title: "Classic Dal Tadka", time: "20 min", img: dal, line: "A generous pour of ghee with cumin and garlic transforms humble lentils into comfort in a bowl." },
  { title: "Garma Garam Paratha", time: "15 min", img: paratha, line: "Crispy, flaky layers sealed with golden ghee. The perfect companion to any meal." },
  { title: "Festive Moong Halwa", time: "45 min", img: halwa, line: "Slow-roasted in pure bilona ghee until golden brown, releasing a rich, nutty aroma." },
  { title: "Comforting Khichdi", time: "30 min", img: khichdi, line: "A dollop of ghee on piping hot khichdi is the ultimate remedy for the soul." },
  { title: "Steamed Rice", time: "10 min", img: rice, line: "Simple steamed rice elevated with a spoonful of aromatic ghee." },
  { title: "Besan Ladoo", time: "40 min", img: ladoo, line: "Roasted gram flour bound entirely by the richness of pure ghee." }
];

export function RecipesSection() {
  return (
    <section id="recipes" className="bg-paper py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-line pb-6 gap-6">
          <div>
            <span className="eyebrow tracking-widest text-forest">09 — Everyday Kitchen</span>
            <RevealLines
              lines={["Every Spoon", "Has A Purpose."]}
              className="mt-4 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.05] text-forest-deep"
            />
          </div>
          <span className="font-deva text-xl text-clay">हर चम्मच में स्वाद</span>
        </div>

        <div className="mt-12 md:mt-20 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 md:gap-x-8 md:gap-y-16">
          {EVERYDAY_RECIPES.map((r, i) => (
            <Reveal
              variant="fade"
              delay={(i % 3) * 150}
              key={r.title}
              className={cn("group")}
            >
              <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
                <img
                  src={r.img}
                  alt={r.title}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
              </div>
              <div className="mt-4 md:mt-8">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-line pb-3 md:pb-4 gap-2">
                  <h3 className="font-display text-[1rem] md:text-2xl text-forest-deep group-hover:text-forest transition-colors leading-tight">{r.title}</h3>
                  <span className="self-start xl:self-auto rounded-full bg-forest/5 px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-[11px] font-medium tracking-[0.2em] text-forest uppercase">
                    {r.time}
                  </span>
                </div>
                <p className="mt-3 md:mt-4 text-[12px] md:text-[15px] leading-relaxed text-muted-foreground line-clamp-3 md:line-clamp-none">
                  {r.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— FAQ + Promise + contact ————————————————————— */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  message: z.string().trim().min(10, "A little more detail helps.").max(1000),
});

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = async (data: any) => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    reset();
    toast.success("Message received", { description: "We usually reply within a day." });
  };

  return (
    <section id="faq" className="bg-cream py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        


        <div className="mb-14 flex items-baseline justify-between border-b border-line pb-4">
          <span className="eyebrow">10 — Questions</span>
          <a href="tel:8851795066" className="link-underline text-sm font-medium text-forest-deep">
            Call: 8851795066
          </a>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <ul className="border-t border-line">
              {FAQS.map((f, i) => (
                <li key={f.q} className="border-b border-line">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="flex w-full items-start justify-between gap-8 py-7 text-left group"
                  >
                    <span className="font-display text-xl text-forest-deep md:text-2xl group-hover:text-forest transition-colors">{f.q}</span>
                    <span className="relative mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest/5 group-hover:bg-forest/10 transition-colors">
                      <Plus
                        className={cn(
                          "absolute h-4 w-4 text-forest transition-all duration-[600ms] [transition-timing-function:var(--ease-silk)]",
                          open === i && "rotate-90 opacity-0 scale-50",
                        )}
                        strokeWidth={2}
                      />
                      <Minus
                        className={cn(
                          "absolute h-4 w-4 text-forest transition-all duration-[600ms] [transition-timing-function:var(--ease-silk)]",
                          open === i ? "opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50",
                        )}
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-[700ms] [transition-timing-function:var(--ease-silk)]"
                    style={{
                      gridTemplateRows: open === i ? "1fr" : "0fr",
                      opacity: open === i ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[54ch] pb-8 pr-4 text-[16px] leading-[1.85] text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-line">
            <h3 className="font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-tight text-forest-deep">
              Still wondering? <br/><span className="text-forest">Write to us.</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-8">
              <Field
                id="c-name"
                label="Your name"
                error={errors.name?.message as string}
                register={register("name")}
              />
              <Field
                id="c-email"
                label="Email address"
                type="email"
                error={errors.email?.message as string}
                register={register("email")}
              />
              <Field
                id="c-message"
                label="Your message"
                textarea
                error={errors.message?.message as string}
                register={register("message")}
              />
              <button
                type="submit"
                disabled={sending}
                className="group relative h-16 w-full overflow-hidden rounded-full bg-forest px-8 py-4 text-[14px] font-medium tracking-[0.16em] text-primary-foreground uppercase disabled:opacity-60 shadow-lg shadow-forest/20 hover:shadow-xl transition-all"
              >
                <span className="relative z-10">{sending ? "Sending message…" : "Send message"}</span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest-deep transition-transform duration-[700ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-y-100" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Field({
  id,
  label,
  error,
  type = "text",
  textarea,
  autoComplete,
  register,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  register?: any;
}) {
  // Local focus/fill state for underline motion — avoid peer-focus / :focus-within
  // CSS (those selectors previously triggered Chromium style storms on keypress).
  const [active, setActive] = useState(false);
  const { onBlur: registerOnBlur, onChange: registerOnChange, ...registerRest } = register ?? {};

  const shared = {
    id,
    ...registerRest,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      registerOnChange?.(e);
      // Keep underline while focused; after blur use filled state only.
      setActive(true);
    },
    onFocus: () => setActive(true),
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setActive(!!e.target.value);
      registerOnBlur?.(e);
    },
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "w-full bg-transparent py-3 text-[16px] text-forest-deep outline-none placeholder:text-muted-foreground/40 transition-colors duration-300",
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium tracking-wide text-forest-deep uppercase">
        {label}
      </label>
      <div className="relative mt-2">
        {textarea ? (
          <textarea
            {...shared}
            rows={4}
            className={shared.className + " resize-none"}
            placeholder="How can we help you?"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            data-lpignore="true"
            data-1p-ignore="true"
          />
        ) : (
          <input
            {...shared}
            type={type}
            autoComplete={autoComplete}
            placeholder={type === "email" ? "you@example.com" : "John Doe"}
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            data-lpignore="true"
            data-1p-ignore="true"
          />
        )}
        <span className="block h-[2px] w-full bg-line/80 rounded-full" />
        <span
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-forest rounded-full transition-transform duration-[600ms] ease-out"
          style={{ transform: `scaleX(${active ? 1 : 0})` }}
          aria-hidden
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
