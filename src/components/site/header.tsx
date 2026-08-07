import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, Home, Heart, User } from "lucide-react";
import logoUrl from "@/assets/logo-transparent.png";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { RECIPES, FAQS, VARIANTS } from "@/lib/product";

const NAV = [
  { label: "Story", to: "/", hash: "story" },
  { label: "Craft", to: "/", hash: "craft" },
  { label: "The Ghee", to: "/", hash: "product" },
  { label: "Kitchen", to: "/", hash: "recipes" },
  { label: "Questions", to: "/", hash: "faq" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { count, setOpen } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onHome = path === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu || search ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setSearch(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[85] transition-[background-color,backdrop-filter,border-color,padding] duration-700 [transition-timing-function:var(--ease-silk)]",
          scrolled
            ? "border-b border-line bg-cream/85 py-2 backdrop-blur-xl shadow-sm"
            : "border-b border-transparent py-4 bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[88px] max-w-[1400px] items-center justify-between px-5 md:px-10 relative">
          <div className="w-[140px] flex items-center justify-start shrink-0">
            <Link
              to="/"
              className="flex items-center"
              aria-label="देहाती अमृत घी — home"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <img
                src={logoUrl}
                alt="देहाती अमृत घी"
                className={cn(
                  "object-contain transition-all duration-700 [transition-timing-function:var(--ease-silk)]",
                  scrolled ? "h-14 opacity-100" : "h-[72px] opacity-90 drop-shadow-sm",
                )}
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-9 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-label="Primary">
            {NAV.map((item) =>
              onHome ? (
                <button
                  key={item.label}
                  onClick={() => scrollToId(item.hash)}
                  className="link-underline text-[13px] tracking-[0.12em] text-forest-deep/80 uppercase transition-colors duration-700 hover:text-forest-deep"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to="/"
                  hash={item.hash}
                  className="link-underline text-[13px] tracking-[0.12em] text-forest-deep/80 uppercase transition-colors duration-700 hover:text-forest-deep"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1 w-[140px] justify-end shrink-0">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearch(true)}
              className="grid h-[44px] w-[44px] place-items-center rounded-full text-forest-deep transition-colors duration-500 hover:bg-secondary/50"
            >
              <Search className="h-[20px] w-[20px]" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              className="hidden sm:grid h-[44px] w-[44px] place-items-center rounded-full text-forest-deep transition-colors duration-500 hover:bg-secondary/50"
            >
              <Heart className="h-[20px] w-[20px]" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              onClick={() => setOpen(true)}
              className="relative hidden sm:grid h-[44px] w-[44px] place-items-center rounded-full text-forest-deep transition-colors duration-500 hover:bg-secondary/50"
            >
              <ShoppingBag className="h-[20px] w-[20px]" strokeWidth={1.4} />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-forest-deep">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
              className="grid h-[44px] w-[44px] place-items-center rounded-full text-forest-deep transition-colors duration-500 hover:bg-secondary/50 lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn("fixed inset-0 z-[95] lg:hidden", menu ? "" : "pointer-events-none")}
        aria-hidden={!menu}
      >
        <div
          className="absolute inset-0 bg-forest-deep/30 backdrop-blur-[2px] transition-opacity duration-700"
          style={{ opacity: menu ? 1 : 0 }}
          onClick={() => setMenu(false)}
        />
        <div
          className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-paper transition-transform duration-[750ms] [transition-timing-function:var(--ease-silk)]"
          style={{ transform: menu ? "none" : "translateX(100%)" }}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="eyebrow">Menu</span>
            <button
              aria-label="Close menu"
              onClick={() => setMenu(false)}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-16">
            {NAV.map((item, i) => (
              <button
                key={item.label}
                onClick={() => {
                  setMenu(false);
                  if (onHome) setTimeout(() => scrollToId(item.hash), 350);
                  else window.location.href = `/#${item.hash}`;
                }}
                className="group flex items-baseline justify-between border-b border-line py-5 text-left transition-opacity duration-700"
                style={{
                  opacity: menu ? 1 : 0,
                  transform: menu ? "none" : "translateY(14px)",
                  transition: `opacity 700ms var(--ease-silk) ${i * 60 + 120}ms, transform 700ms var(--ease-silk) ${i * 60 + 120}ms`,
                }}
              >
                <span className="font-display text-3xl text-forest-deep">{item.label}</span>
                <span className="text-[11px] text-muted-foreground">0{i + 1}</span>
              </button>
            ))}
            <a
              href="tel:8851795066"
              className="mt-8 text-sm tracking-[0.18em] text-muted-foreground uppercase"
            >
              8851795066
            </a>
          </nav>
        </div>
      </div>

      {/* Search overlay */}
      <SearchOverlay open={search} onClose={() => setSearch(false)} />

      {/* Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-[80] lg:hidden bg-cream/90 backdrop-blur-xl border-t border-line/50 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-around px-2 py-2 pb-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-1.5 p-2 w-[44px] text-forest-deep hover:text-forest transition-colors active:scale-95">
            <Home className="w-[22px] h-[22px]" strokeWidth={1.5} />
            <span className="text-[9px] font-medium tracking-wide">Home</span>
          </button>
          <button onClick={() => { if (onHome) scrollToId('product'); else window.location.href = '/#product'; }} className="flex flex-col items-center gap-1.5 p-2 w-[44px] text-forest-deep hover:text-forest transition-colors active:scale-95">
            <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.5} />
            <span className="text-[9px] font-medium tracking-wide">Shop</span>
          </button>
          <button onClick={() => setSearch(true)} className="flex flex-col items-center gap-1.5 p-2 w-[44px] text-forest-deep hover:text-forest transition-colors active:scale-95">
            <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />
            <span className="text-[9px] font-medium tracking-wide">Search</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 p-2 w-[44px] text-forest-deep hover:text-forest transition-colors active:scale-95">
            <Heart className="w-[22px] h-[22px]" strokeWidth={1.5} />
            <span className="text-[9px] font-medium tracking-wide">Wishlist</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 p-2 w-[44px] text-forest-deep hover:text-forest transition-colors active:scale-95">
            <User className="w-[22px] h-[22px]" strokeWidth={1.5} />
            <span className="text-[9px] font-medium tracking-wide">Account</span>
          </button>
        </div>
      </div>
    </>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const pool = [
    ...VARIANTS.map((v) => ({ title: `Dehati Amrit Ghee — ${v.label}`, kind: "Product", hash: "product" })),
    ...RECIPES.map((r) => ({ title: r.title, kind: "Kitchen", hash: "recipes" })),
    ...FAQS.map((f) => ({ title: f.q, kind: "Question", hash: "faq" })),
  ];
  const results = q.trim()
    ? pool.filter((p) => p.title.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6)
    : pool.slice(0, 4);

  return (
    <div className={cn("fixed inset-0 z-[96]", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      <div
        className="absolute inset-0 bg-cream/80 backdrop-blur-xl transition-opacity duration-700"
        style={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
      />
      <div
        className="relative mx-auto mt-[18vh] w-[92%] max-w-2xl transition-[opacity,transform] duration-[800ms] [transition-timing-function:var(--ease-silk)]"
        style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(18px)" }}
      >
        <div className="flex items-center gap-4 border-b border-forest/30 pb-4">
          <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.4} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the ghee, the kitchen, the questions…"
            aria-label="Search"
            className="w-full bg-transparent font-display text-2xl text-forest-deep outline-none placeholder:text-muted-foreground/70 md:text-3xl"
          />
          <button onClick={onClose} aria-label="Close search" className="text-muted-foreground">
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>
        <ul className="mt-6 space-y-1">
          {results.map((r) => (
            <li key={r.title}>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => scrollToId(r.hash), 250);
                }}
                className="flex w-full items-baseline justify-between rounded-sm px-3 py-3 text-left transition-colors duration-500 hover:bg-secondary/70"
              >
                <span className="text-[15px] text-forest-deep">{r.title}</span>
                <span className="eyebrow">{r.kind}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-6 text-sm text-muted-foreground">
              Nothing here yet. Try “ghee”, “halwa” or “delivery”.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
