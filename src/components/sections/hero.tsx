import { useEffect, useState } from "react";
import heroJarImg from "@/assets/branded-jar.jpg";
import { Reveal, RevealLines } from "@/components/site/reveal";

export function Hero({ onBuy }: { onBuy: () => void }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream pt-32 pb-16 lg:py-0 flex items-center">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-center z-10">
        
        {/* Left: Text & CTA */}
        <div className="flex flex-col items-start pt-10 lg:pt-0">
          <div className="mb-6 flex gap-3 text-[11px] tracking-[0.2em] uppercase text-forest-deep/60">
            <span>शुद्ध</span>
            <span>•</span>
            <span>सात्विक</span>
            <span>•</span>
            <span>स्वदेशी</span>
          </div>

          <RevealLines
            lines={["Made slowly."]}
            className="font-display text-[clamp(4rem,7.5vw,7rem)] leading-[1.05] text-forest-deep"
          />
          <RevealLines
            lines={["Shared proudly."]}
            className="font-display text-[clamp(4rem,7.5vw,7rem)] leading-[1.05] text-clay italic -mt-2 md:-mt-4"
          />

          <Reveal variant="fade" delay={400}>
            <p className="mt-8 font-sans text-[15px] md:text-base text-forest-deep/80 max-w-[42ch] leading-[1.8]">
              Crafted using the traditional Bilona method from fresh A2 milk of free-grazing desi cows and buffaloes. One jar. Nothing else in it.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={600}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full">
              <button
                type="button"
                onClick={onBuy}
                className="group relative flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-[20px] bg-forest-deep px-8 py-[18px] text-[12px] font-bold tracking-[0.15em] text-cream uppercase transition-transform duration-500 hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">Buy Fresh Batch</span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-[700ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-y-100" />
              </button>

              <button
                type="button"
                onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-[20px] border border-forest-deep/20 bg-transparent px-8 py-[18px] text-[12px] font-bold tracking-[0.15em] text-forest-deep uppercase transition-all duration-[600ms] ease-out hover:border-forest-deep hover:scale-[1.02] active:scale-95"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest-deep transition-transform duration-[700ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-y-100" />
                <span className="relative z-10 transition-colors duration-[600ms] ease-out group-hover:text-cream">
                  Explore Story
                </span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right: Arch Image */}
        <div className="relative flex justify-center lg:justify-end">
          <Reveal variant="fade" delay={200} className="w-full">
            <div className="relative w-full max-w-[500px] aspect-[4/5] mx-auto lg:mr-0 overflow-hidden rounded-t-[500px] rounded-b-md bg-paper shadow-2xl isolate">
              <img
                src={heroJarImg}
                alt="Dehati Amrit Jar"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Ticker tape at bottom */}
      <div className="absolute bottom-0 inset-x-0 border-t border-line bg-cream/90 backdrop-blur-sm py-4 hidden md:flex items-center justify-between px-10 text-[10px] tracking-[0.2em] text-forest-deep/60 uppercase">
        <span>शुद्ध</span>
        <span>सात्विक</span>
        <span>स्वदेशी</span>
        <span>NO PRESERVATIVES</span>
        <span>FREE SHIPPING IN INDIA</span>
        <span className="flex items-center gap-2">SCROLL <span className="w-4 h-4 border border-forest-deep/30 rounded-full flex items-center justify-center text-[8px]">↓</span></span>
      </div>
    </section>
  );
}
