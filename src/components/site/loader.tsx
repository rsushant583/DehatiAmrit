import { useEffect, useState } from "react";
import logoImg from "@/assets/logo-transparent.png";

const LOADER_KEY = "dag.loader.shown";

export function Loader() {
  const [skip] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return sessionStorage.getItem(LOADER_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [loaded, setLoaded] = useState(skip);

  useEffect(() => {
    if (skip) return;
    try {
      sessionStorage.setItem(LOADER_KEY, "1");
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, [skip]);

  if (skip) return null;

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center bg-cream transition-all duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
      style={{
        clipPath: loaded ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        pointerEvents: loaded ? "none" : "auto",
      }}
      aria-hidden={loaded}
    >
      <div
        className="flex flex-col items-center gap-6 overflow-hidden transition-all duration-[1500ms] ease-out"
        style={{
          opacity: loaded ? 0 : 1,
          transform: loaded ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
        }}
      >
        <img
          src={logoImg}
          alt="Dehati Amrit"
          className="w-40 md:w-48 h-auto opacity-90 animate-pulse duration-[3000ms]"
        />
      </div>
    </div>
  );
}
