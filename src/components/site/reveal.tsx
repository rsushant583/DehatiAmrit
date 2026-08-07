import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends HTMLElement>(threshold = 0.18, once = true) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) setShown(false);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "mask" | "fade" | "image";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "mask",
}: RevealProps) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const cls =
    variant === "image" ? "reveal-image" : variant === "fade" ? "reveal-fade" : "reveal-mask";
  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(cls, className)}
    >
      {children}
    </Tag>
  );
}

/** Splits a string into lines that reveal from behind a mask, one after another. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 110,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
}) {
  const { ref, shown } = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-2 -my-2">
          <span
            className={cn(
              "block translate-y-full opacity-0 transition-[transform,opacity] duration-[1100ms] [transition-timing-function:var(--ease-silk)]",
              shown && "translate-y-0 opacity-100",
              lineClassName,
            )}
            style={{ transitionDelay: `${i * stagger}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Returns a 0..1 progress value for an element travelling through the viewport. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const p = (vh - r.top) / total;
      setProgress(Math.min(Math.max(p, 0), 1));
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
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}
