import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[90] h-px bg-transparent" aria-hidden>
      <div
        className="h-full origin-left bg-gold"
        style={{ transform: `scaleX(${p})`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-24 lg:bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-line bg-paper/90 text-forest backdrop-blur-md transition-[opacity,transform,background-color] duration-500 [transition-timing-function:var(--ease-silk)] hover:bg-forest hover:text-primary-foreground"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(10px)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <a
        href="https://wa.me/918851795066"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with us on WhatsApp"
        className="pointer-events-auto group flex h-12 items-center gap-0 overflow-hidden rounded-full bg-forest pl-[14px] pr-[14px] text-primary-foreground shadow-[0_10px_30px_-12px_oklch(0.24_0.05_148/0.6)] transition-[padding] duration-500 [transition-timing-function:var(--ease-silk)] hover:pr-5"
      >
        <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] tracking-wide transition-[max-width,margin] duration-500 [transition-timing-function:var(--ease-silk)] group-hover:ml-2 group-hover:max-w-[120px]">
          Talk to us
        </span>
      </a>
    </div>
  );
}
