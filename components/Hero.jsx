'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { profile } from '@/lib/data';

// Dynamically import Three.js scene to prevent SSR issues
const NeonCyberScene = dynamic(() => import('@/components/three/NeonCyberScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 font-mono text-xs text-neon-cyan">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
      <span className="tracking-widest animate-pulse">INITIALIZING 3D ENGINE...</span>
    </div>
  ),
});

export default function Hero() {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'

  return (
    <section id="top" className="relative mx-auto max-w-[1280px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      {/* Cyber ambient glow orbs */}
      <div className="pointer-events-none absolute -left-20 top-24 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-neon-pink/10 blur-[140px]" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left column */}
        <div className="relative z-10">
          {/* Cyber Status Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <span className="h-2 w-2 animate-ping rounded-full bg-neon-cyan" />
            <span>CORE PROTOCOL {profile.name.toUpperCase()}</span>
          </div>

          {/* Glowing Headline */}
          <h1 className="max-w-[760px] text-[3.8rem] font-extrabold leading-[0.92] tracking-[-0.06em] text-white md:text-[6.5rem]">
            Building{' '}
            <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-pink bg-clip-text text-transparent neon-text-cyan">
              clean
            </span>
            ,<br />
            useful{' '}
            <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent neon-text-pink">
              digital
            </span>
            <br />
            products.
          </h1>

          {/* Subtext */}
          <p className="mt-7 max-w-[640px] text-[1.05rem] leading-8 text-fog md:text-[1.2rem]">
            I&apos;m a full-stack developer and IT student at <span className="text-neon-cyan font-medium">Ateneo de Naga University</span>, building resilient, user-first software across web, mobile, and network systems.
          </p>

          {/* Telemetry Chips */}
          <div className="mt-7 flex flex-wrap gap-2.5 font-mono text-[11px]">
            <div className="rounded-lg border border-neon-cyan/30 bg-cyber-card px-3 py-1.5 text-neon-cyan/90">
              ⚡ FULL-STACK ARCHITECTURE
            </div>
            <div className="rounded-lg border border-neon-pink/30 bg-cyber-card px-3 py-1.5 text-neon-pink/90">
              📱 MOBILE & REACT NATIVE
            </div>
            <div className="rounded-lg border border-neon-green/30 bg-cyber-card px-3 py-1.5 text-neon-green/90">
              🌐 NETWORK & CLOUD DEVOPS
            </div>
          </div>

          {/* Call to Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#featured"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-neon-cyan px-7 py-3.5 font-mono text-[13px] font-bold tracking-wider text-ink shadow-neon-cyan transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-neon-cyan-lg"
            >
              <span>EXPLORE WORK</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-neon-pink/50 bg-neon-pink/10 px-7 py-3.5 font-mono text-[13px] font-semibold tracking-wider text-neon-pink shadow-[0_0_15px_rgba(255,0,127,0.2)] transition-all duration-300 hover:scale-105 hover:border-neon-pink hover:bg-neon-pink/20 hover:shadow-neon-pink"
            >
              <span>TRANSMIT MESSAGE</span>
            </a>
          </div>
        </div>

        {/* Right column: 3D Hologram / Cyber Portrait Showcase */}
        <div className="relative">
          {/* Outer Cyber Frame Container */}
          <div className="corner-brackets relative h-[460px] w-full overflow-hidden rounded-3xl border border-neon-cyan/30 bg-cyber-card/90 shadow-[0_0_50px_rgba(0,240,255,0.15)] backdrop-blur-xl">
            {/* Top View Mode Switcher */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 rounded-xl border border-neon-cyan/30 bg-cyber-bg/90 p-1 font-mono text-[11px] backdrop-blur-md">
              <button
                onClick={() => setViewMode('3d')}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  viewMode === '3d'
                    ? 'border border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                    : 'text-fog hover:text-paper'
                }`}
              >
                ✦ 3D HOLO
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  viewMode === 'photo'
                    ? 'border border-neon-pink bg-neon-pink/20 text-neon-pink shadow-[0_0_10px_rgba(255,0,127,0.4)]'
                    : 'text-fog hover:text-paper'
                }`}
              >
                ✦ PORTRAIT
              </button>
            </div>

            {/* Mode 1: 3D Hologram Scene */}
            {viewMode === '3d' ? (
              <div className="h-full w-full">
                <NeonCyberScene />
              </div>
            ) : (
              /* Mode 2: Cyber Portrait View with Laser Scanner Effect */
              <div className="relative h-full w-full">
                <Image
                  src="/images/Formal.jpg"
                  alt="Mick Daniel Morales"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-top filter brightness-95 contrast-105"
                  priority
                />
                {/* Cyber scanner beam */}
                <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-80 shadow-[0_0_15px_#00f0ff] animate-scanline" />
                
                {/* Holographic overlay tint */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-neon-cyan/10" />
                
                {/* Portrait HUD overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-neon-cyan/30 bg-cyber-bg/80 p-3 font-mono text-[11px] backdrop-blur-md">
                  <div className="flex items-center justify-between text-neon-cyan">
                    <span>DEV ID: DNLMRLSS</span>
                    <span className="text-neon-green">STATUS: VERIFIED</span>
                  </div>
                  <div className="mt-1 text-fog text-[10px]">
                    LOCATION: NAGA CITY, BICOL / ADNU CS/IT
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
