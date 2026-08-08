import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import logoUrl from "@/assets/logo.jpg";
import { Reveal } from "./reveal";
import { HeartHandshake } from "lucide-react";

const emailSchema = z.string().trim().email("Enter a valid email address.").max(255);

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }
    setError(null);
    setEmail("");
    toast.success("You're on the list.", {
      description: "We write rarely — only when a new batch is ready.",
    });
  };

  return (
    <footer className="grain relative overflow-hidden bg-forest-deep text-primary-foreground pt-24 md:pt-32 pb-32 lg:pb-10">
      {/* Massive Typography Closing */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 mb-16 md:mb-24 text-center">
        <Reveal variant="fade">
          <HeartHandshake className="mx-auto h-12 w-12 text-gold mb-8 opacity-80" strokeWidth={1} />
          <h2 className="font-deva text-[clamp(2.2rem,6vw,5.5rem)] leading-tight text-white mb-6">
            हर चम्मच में सिर्फ घी नहीं,<br className="hidden sm:block"/> एक पीढ़ी का विश्वास है।
          </h2>
          <p className="font-display text-[clamp(1.4rem,3vw,2.5rem)] text-gold/80 italic tracking-wide">
            Crafted with Time. Rooted in Tradition.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-10 md:px-10">
        <div className="flex flex-col gap-12 border-t border-primary-foreground/15 pt-16">
          <Reveal variant="fade" className="flex flex-col items-center text-center">
            <img
              src={logoUrl}
              alt="Dehati Amrit Logo"
              width={80}
              height={80}
              loading="lazy"
              className="h-20 w-20 rounded-full object-cover border-2 border-gold/20 mb-6 bg-white"
            />
            <h3 className="font-display text-4xl text-white tracking-wide mb-4">Dehati Amrit</h3>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-primary-foreground/70">
              देहाती अमृत घी — शुद्ध • सात्विक • स्वदेशी. Packed by Dehati Amrit Foods and
              delivered fresh across India. A promise of purity from our family to yours.
            </p>
          </Reveal>

          <Reveal variant="fade" className="flex flex-col gap-8 w-full max-w-sm mx-auto">
            <a href="https://wa.me/918851795066" target="_blank" rel="noreferrer noopener" className="w-full bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 py-[18px] rounded-[20px] text-center font-bold tracking-[0.15em] uppercase text-[12px] transition-colors active:scale-95 flex items-center justify-center gap-2">
              Chat on WhatsApp
            </a>
            
            <div className="flex flex-col gap-4 text-center">
              <a href="tel:8851795066" className="text-[18px] text-primary-foreground/90 hover:text-white transition-colors py-2">
                +91 88517 95066
              </a>
              <a href="mailto:dehatiamritfoods@gmail.com" className="text-[16px] text-primary-foreground/70 hover:text-white transition-colors py-2">
                dehatiamritfoods@gmail.com
              </a>
            </div>
            
            <div className="border-t border-primary-foreground/10 pt-6 mt-4 flex flex-wrap items-center justify-center gap-6">
              <Link to="/policy" className="text-[13px] text-primary-foreground/50 hover:text-white uppercase tracking-widest py-1 transition-colors">Privacy Policy</Link>
              <span className="text-primary-foreground/20">·</span>
              <Link to="/terms" className="text-[13px] text-primary-foreground/50 hover:text-white uppercase tracking-widest py-1 transition-colors">Terms of Service</Link>
              <span className="text-primary-foreground/20">·</span>
              <Link to="/refund" className="text-[13px] text-primary-foreground/50 hover:text-white uppercase tracking-widest py-1 transition-colors">Refund Policy</Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center text-center gap-4 border-t border-primary-foreground/15 pt-8 text-[12px] text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Dehati Amrit Foods. All rights reserved.</p>
          <p className="font-deva text-[14px] tracking-wide text-gold/60">
            गाँव की शुद्धता, स्वास्थ्य का वादा
          </p>
        </div>
      </div>
    </footer>
  );
}
