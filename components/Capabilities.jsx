'use client';

import { capabilities } from '@/lib/data';
import TiltCard from '@/components/TiltCard';
import { CodeXml, Smartphone, Network, PanelsTopLeft, Check, Cpu } from 'lucide-react';

const capabilityIcons = [CodeXml, Smartphone, Network, PanelsTopLeft];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative border-t border-neon-cyan/20 py-24 md:py-32">
      {/* Glow orb */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-neon-cyan/10 blur-[130px]" />

      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs text-neon-green">
            <Cpu size={16} aria-hidden="true" />
            <span className="tracking-widest uppercase">SYSTEM MODULES & CAPABILITIES</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-5xl">
            Engineering{' '}
            <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Disciplines
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fog">
            Specialized technical competencies spanning modern web architectures, cross-platform mobile runtimes, network infrastructure, and high-fidelity interface design.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length];
            return (
            <TiltCard
              key={capability.number}
              className="group corner-brackets rounded-3xl border border-neon-cyan/25 bg-cyber-card/75 p-8 transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              glowColor="rgba(0, 240, 255, 0.18)"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-neon-cyan">
                  // {capability.number}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-neon-green">
                  <span className="h-2 w-2 rounded-full bg-neon-green shadow-[0_0_6px_#00ff9d]" />
                  ACTIVE MODULE
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-neon-cyan">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
                {capability.label}
              </h3>
              <p className="text-[15px] leading-7 text-fog">{capability.detail}</p>

              <div className="mt-6 border-t border-line/60 pt-5">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-fog/70">
                  Deliverables & Tooling:
                </p>
                <ul className="space-y-2.5">
                  {capability.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-fog">
                      <Check size={14} className="shrink-0 text-neon-pink" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ); })}
        </div>
      </div>
    </section>
  );
}
