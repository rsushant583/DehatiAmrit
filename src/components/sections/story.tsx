import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, RotateCw, Flame, ShieldCheck, Award } from "lucide-react";
import { Reveal, RevealLines, useScrollProgress } from "@/components/site/reveal";
import villageImg from "@/assets/village.jpg";
import craftImg from "@/assets/craft-churn.jpg";
import pourImg from "@/assets/pour.jpg";
import textureImg from "@/assets/texture.jpg";

/* ————————————————————— Brand philosophy ————————————————————— */

export function Philosophy() {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setReady(true), 200);
  }, []);

  return (
    <section id="story" className="relative bg-cream py-32 md:py-48 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 w-full">
        <div 
          className="transition-all duration-[2000ms] ease-out mb-24 md:mb-32"
          style={{ opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(40px)' }}
        >
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.1] text-forest-deep">
            Tradition deserves patience.
          </h2>
          <p className="mt-12 font-deva text-[clamp(1.8rem,4vw,3.5rem)] text-gold italic">
            "हम जल्दी नहीं करते। हम समय देते हैं।"
          </p>
        </div>

        {/* Purity Promise Banner */}
        <Reveal variant="fade" delay={300}>
          <div className="mx-auto max-w-[1200px] rounded-3xl bg-forest-deep text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden relative text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
            
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-3 text-gold mb-4">
                <ShieldCheck className="h-6 w-6 shrink-0" />
                <span className="tracking-widest uppercase text-xs md:text-sm font-semibold">Our Purity Promise</span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl leading-tight mb-4">The ₹10,000 Guarantee.</h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                We stand by our ancient process. If you find any adulteration in our ghee, we offer a ₹10,000 reward. 
                Pure, authentic, and completely uncompromised.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 md:gap-6 relative z-10 shrink-0 w-full md:w-auto">
              <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4 backdrop-blur-sm border border-white/20">
                <Award className="h-7 w-7 md:h-8 md:w-8 text-gold shrink-0" />
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">FSSAI Certified</p>
                  <p className="text-xs md:text-sm text-white/70">Verified Quality</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4 backdrop-blur-sm border border-white/20">
                <Award className="h-7 w-7 md:h-8 md:w-8 text-gold shrink-0" />
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">Made in India</p>
                  <p className="text-xs md:text-sm text-white/70">Sourced Locally</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— The Promise (Replaces Meet The Makers) ————————————————————— */

const PROMISES = [
  {
    icon: Leaf,
    title: "शुद्ध A2 दूध",
    desc: "खुले खेतों में चरने वाली देसी गायों और भैंसों के ताज़े दूध से तैयार।"
  },
  {
    icon: RotateCw,
    title: "पारंपरिक बिलोना विधि",
    desc: "हाथों से मंथन कर तैयार, ताकि स्वाद और पोषण दोनों सुरक्षित रहें।"
  },
  {
    icon: Flame,
    title: "धीमी लकड़ी की आँच",
    desc: "छोटे बैच में धीरे-धीरे पकाया जाता है, जिससे प्राकृतिक खुशबू और सुनहरा रंग बना रहता है।"
  },
  {
    icon: ShieldCheck,
    title: "100% शुद्ध",
    desc: "बिना किसी मिलावट, कृत्रिम रंग या प्रिज़र्वेटिव।"
  }
];

export function Craft() {
  return (
    <section id="craft" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
          <span className="eyebrow tracking-[0.2em] text-gold uppercase mb-8 block font-medium">
            02 — Our Promise
          </span>
          <RevealLines
            lines={["हर चम्मच में", "गाँव की शुद्धता।"]}
            className="font-deva text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.15] text-forest-deep"
          />
          <Reveal variant="fade" delay={300}>
            <p className="mt-8 font-deva text-[clamp(1.2rem,2vw,1.5rem)] text-forest-deep/80 leading-relaxed md:leading-[1.8] max-w-2xl mx-auto">
              देहाती अमृत सिर्फ घी नहीं, बल्कि पारंपरिक बिलोना विधि, शुद्ध A2 दूध और वर्षों पुराने विश्वास का संगम है। हर बैच को धैर्य और सावधानी से तैयार किया जाता है ताकि आपको हर बार वही शुद्ध स्वाद और गुणवत्ता मिले।
            </p>
          </Reveal>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PROMISES.map((item, i) => (
            <Reveal key={item.title} variant="fade" delay={200 + i * 150} className="group">
              <div className="h-full bg-paper p-10 lg:p-12 border border-line hover:border-gold/30 rounded-[2rem] transition-all duration-700 flex flex-col items-start shadow-sm hover:shadow-2xl hover:shadow-gold/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-125" />
                <div className="relative w-16 h-16 rounded-full bg-forest-deep/5 flex items-center justify-center mb-8 group-hover:bg-gold/10 transition-colors duration-700">
                  <item.icon className="w-7 h-7 text-forest-deep group-hover:text-gold transition-colors duration-700" strokeWidth={1.2} />
                </div>
                <h3 className="relative font-deva text-[1.6rem] text-forest-deep mb-4 group-hover:text-forest transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="relative font-deva text-[1.1rem] leading-relaxed text-clay">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        
      </div>
    </section>
  );
}

/* ————————————————————— Journey ————————————————————— */

const STEPS = [
  "Open Fields",
  "Morning Milking",
  "Fresh A2 Milk",
  "Curd Overnight",
  "Hand Bilona",
  "Slow Wood Fire",
  "Natural Grain",
  "Glass Jar",
  "Your Kitchen"
];

export function Journey() {
  return (
    <section className="relative bg-forest-deep text-cream py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 md:px-10 text-center">
        <div className="mb-24">
          <span className="eyebrow text-gold">03 — The Journey</span>
        </div>
        <div className="flex flex-col items-center gap-16 md:gap-24 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2"></div>
          
          {STEPS.map((step, i) => (
            <Reveal key={step} variant="fade" delay={100} className="relative z-10 bg-forest-deep py-4 px-8 rounded-full border border-gold/30">
              <span className="font-display text-2xl md:text-4xl text-cream tracking-wide">{step}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— WhyUs -> Why Dehati Amrit ————————————————————— */

const REASONS = [
  { title: "Open Grazing", desc: "Our cattle roam free on sunlit pastures, feeding on natural greens, ensuring the milk is rich, pure, and full of life." },
  { title: "Fresh A2 Milk", desc: "Only the morning's freshest A2 milk is used, brimming with natural nutrients and wholesome goodness." },
  { title: "Traditional Bilona", desc: "Curd is gently churned by hand using a wooden bilona in small batches, preserving the true essence of ghee." },
  { title: "Slow Wood Fire", desc: "Simmered over a slow, crackling wood fire for hours until it develops a rich golden hue and a deep, nutty aroma." },
  { title: "100% Pure", desc: "No preservatives, no additives, no compromises. Just raw, unadulterated purity in every single drop." },
  { title: "Made for Families", desc: "Crafted with the exact same care and devotion as the ghee we serve to our own children and grandparents." }
];

export function WhyUs() {
  return (
    <section className="bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-20 text-center">
          <span className="eyebrow text-gold mb-6 block">04 — Why Dehati Amrit</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-forest-deep">The Standard of Purity</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} variant="fade" delay={i * 100} className="bg-paper p-10 md:p-14 border border-line rounded-lg hover:border-gold/40 transition-colors duration-700">
              <h3 className="font-display text-2xl md:text-3xl text-forest-deep mb-4">{reason.title}</h3>
              <p className="text-clay text-sm leading-loose">
                {reason.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— Showcase -> Signature Section ————————————————————— */

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Camera push and focus pull
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.8, 0.9, 0]);

  // Typography cinematic reveal
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.5], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [40, -40]);

  // Additional cinematic light bloom that pulses as you scroll
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.6, 0]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image Layer */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: bgScale, opacity: bgOpacity, filter: bgBlur }}
        >
          <img src={pourImg} alt="Golden ghee pouring slowly" className="w-full h-full object-cover" />
        </motion.div>

        {/* Volumetric Light Bloom Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{ opacity: bloomOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gold/30 via-transparent to-black/80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gold/20 blur-[100px] rounded-full" />
        </motion.div>

        {/* Typography Layer */}
        <motion.div 
          className="relative z-10 text-center px-5 flex flex-col items-center justify-center"
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
        >
          <h2 className="font-display text-[clamp(3.5rem,10vw,7rem)] text-gold leading-none tracking-wider mix-blend-screen drop-shadow-2xl">
            Time becomes gold.
          </h2>
          <p className="mt-8 font-deva text-[clamp(1.2rem,3vw,2rem)] text-cream/90 max-w-2xl mx-auto drop-shadow-md">
            Slowly churned. Patiently simmered.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
