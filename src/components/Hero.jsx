import { useState, useEffect } from 'react';
import kochiMetro from '../assets/hero/kochi-metro.jpg';
import chineseFishingNets from '../assets/hero/chinese-fishing-nets.jpg';

const slides = [kochiMetro, chineseFishingNets];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--color-navy)]"
    >
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === current ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[var(--color-navy)]/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/20 via-transparent to-[var(--color-navy)]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/85 via-[var(--color-navy)]/30 to-transparent" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-6 bg-[var(--color-brass-light)]' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-5 md:px-8 py-24 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <div>
          <span className="titleblock">Est. 1920 &middot; Royal Charter 1935</span>
          <h1 className="font-[family-name:var(--font-gothic)] text-5xl md:text-7xl leading-[1.05] mt-6 text-[var(--color-yellow)] [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
            The Institution of
            <br />
            Engineers <span className="text-[var(--color-yellow)]">(India)</span>
          </h1>
          <p className="font-mono tracking-[0.25em] text-sm md:text-base text-[var(--color-cyan)] mt-4 uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            Kochi Local Centre
          </p>
          <p className="text-white/90 max-w-xl mt-6 leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            The second-largest local centre in India, serving 13,000+ members across 13
            engineering disciplines in Ernakulam, Idukki and Lakshadweep.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="/#events"
              className="bg-[var(--color-safety)] text-white font-semibold px-6 py-3 rounded-sm hover:brightness-110 transition focus-ring"
            >
              Explore Events
            </a>
            <a
              href="/#membership"
              className="border border-[var(--color-cyan)] text-[var(--color-cyan)] font-semibold px-6 py-3 rounded-sm hover:bg-[var(--color-cyan)]/10 transition focus-ring"
            >
              Apply for Membership
            </a>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <img
            src="/logo.png"
            alt="The Institution of Engineers (India) official seal"
            className="w-72 h-72 md:w-80 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.15)]"
          />
        </div>
      </div>
    </section>
  );
}