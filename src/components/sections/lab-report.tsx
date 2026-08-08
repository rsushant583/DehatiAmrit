import { ShieldCheck, ArrowRight, FlaskConical, Beaker, Droplets, Leaf } from "lucide-react";
import { Reveal, RevealLines } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const PURITY_METRICS = [
  { label: "Trans Fat", value: "0%", icon: ShieldCheck, desc: "Completely free of unhealthy trans fats." },
  { label: "Mineral Oil", value: "Absent", icon: Droplets, desc: "No cheap adulterants or mineral oils used." },
  { label: "Rancidity", value: "Absent", icon: Leaf, desc: "Fresh, pure, and free from any spoilage." },
  { label: "Total Fat", value: "99.86g", icon: FlaskConical, desc: "Per 100g. Pure, unadulterated clarified butter." },
];

const NUTRITION_FACTS = [
  { label: "Energy", value: "898.74 kcal" },
  { label: "Protein", value: "0g" },
  { label: "Carbohydrate", value: "0g" },
  { label: "Sugar", value: "0g" },
  { label: "Saturated Fat", value: "4.13g" },
  { label: "Monounsaturated Fat", value: "63.24g" },
  { label: "Polyunsaturated Fat", value: "30.28g" },
];

export function LabReportSection() {
  return (
    <section id="lab-report" className="relative overflow-hidden bg-forest text-primary-foreground py-16 md:py-24">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #fff 0%, transparent 40%)' }} />
      
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="lg:w-1/2">
            <Reveal variant="fade" className="flex items-center gap-3 text-gold mb-6">
              <Beaker className="w-5 h-5" />
              <span className="eyebrow text-gold">NABL Accredited Lab Report</span>
            </Reveal>
            
            <RevealLines
              lines={["Scientifically Proven", "Purity."]}
              className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.05] text-white"
            />
            
            <Reveal variant="fade" delay={200} className="mt-8 text-[16px] md:text-lg leading-relaxed text-white/80 max-w-lg">
              We don't just promise purity; we prove it. Every batch of Dehati Amrit Ghee is tested in a NABL accredited laboratory to ensure it meets the highest standards of quality, authenticity, and nutritional value.
            </Reveal>

            <Reveal variant="fade" delay={300} className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
              <h4 className="text-sm font-medium tracking-[0.15em] text-white/50 uppercase mb-4">Nutritional Information (Per 100g)</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {NUTRITION_FACTS.map((fact, idx) => (
                  <li key={fact.label} className="flex justify-between items-baseline border-b border-white/10 pb-2">
                    <span className="text-sm text-white/80">{fact.label}</span>
                    <span className="text-sm font-medium text-white">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {PURITY_METRICS.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <Reveal 
                    key={metric.label}
                    variant="fade"
                    delay={i * 150}
                    className="group bg-forest-deep/40 rounded-2xl p-6 border border-white/5 hover:border-gold/30 transition-all duration-500 hover:bg-forest-deep/60 shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-display text-white mb-1">{metric.value}</div>
                    <div className="text-sm font-medium tracking-wide text-gold mb-3">{metric.label}</div>
                    <p className="text-[13px] text-white/60 leading-relaxed">{metric.desc}</p>
                  </Reveal>
                );
              })}
            </div>
            
            <Reveal variant="fade" delay={600} className="mt-8 flex items-center justify-center sm:justify-start gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-forest flex items-center justify-center backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-forest flex items-center justify-center backdrop-blur-md text-[10px] font-bold text-white tracking-widest">
                  ISO
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-forest flex items-center justify-center backdrop-blur-md text-[9px] font-bold text-white tracking-widest">
                  FSSAI
                </div>
              </div>
              <span className="text-xs font-medium tracking-widest uppercase text-white/50">Tested by Cognosmed Laboratories</span>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
