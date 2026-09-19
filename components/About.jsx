'use client';

import Image from 'next/image';
import { profile } from '@/lib/data';
import TiltCard from '@/components/TiltCard';

export default function About() {
  return (
    <section id="about" className="relative border-t border-neon-cyan/20 py-24 md:py-32">
      {/* Background glow orb */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-neon-pink/10 blur-[130px]" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Cyber Image Frame with Tilt */}
          <TiltCard
            className="corner-brackets relative h-[520px] overflow-hidden rounded-3xl border border-neon-pink/30 bg-cyber-card shadow-[0_0_40px_rgba(255,0,127,0.15)]"
            glowColor="rgba(255, 0, 127, 0.2)"
          >
            <Image
              src="/images/Fashion.jpg"
              alt="Mick Daniel Morales"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-center filter brightness-95 contrast-105"
            />
            {/* Ambient cyber scanline */}
            <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-75 shadow-[0_0_15px_#ff007f] animate-scanline" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-neon-pink/10" />

            {/* Diagnostic tag */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-neon-pink/30 bg-cyber-bg/85 p-3.5 font-mono text-[11px] backdrop-blur-md">
              <div className="flex items-center justify-between text-neon-pink">
                <span>IDENTITY: MICK DANIEL MORALES</span>
                <span className="text-neon-cyan">CLASS: DEV / IT</span>
              </div>
              <p className="mt-1 text-fog/80 text-[10px]">
                PASSIONATE ABOUT SCALABLE SYSTEMS & UI/UX
              </p>
            </div>
          </TiltCard>

          {/* About Narrative */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 font-mono text-xs text-neon-pink">
              <span className="h-2 w-2 rounded-full bg-neon-pink shadow-[0_0_8px_#ff007f]" />
              <span className="tracking-widest uppercase">ABOUT</span>
            </div>

            <h2 className="mt-3 max-w-[620px] text-3xl font-extrabold text-white md:text-[3.8rem] md:leading-[1.02]">
              Problem-solver with a{' '}
              <span className="bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
                product mindset.
              </span>
            </h2>

            <p className="mt-6 max-w-[660px] text-[1.03rem] leading-8 text-fog md:text-[1.15rem]">
              {profile.bio}
            </p>

            {/* System Specs */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="corner-brackets rounded-2xl border border-neon-cyan/25 bg-cyber-card/70 p-4 backdrop-blur-sm">
                <p className="font-mono text-xs text-neon-cyan">LOCATION</p>
                <p className="mt-2 text-[1.05rem] font-medium text-white">{profile.location}</p>
              </div>
              <div className="corner-brackets rounded-2xl border border-neon-pink/25 bg-cyber-card/70 p-4 backdrop-blur-sm">
                <p className="font-mono text-xs text-neon-pink">ACADEMIC INSTITUTION</p>
                <p className="mt-2 text-[1.05rem] font-medium text-white">{profile.school}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-neon-pink px-7 py-3.5 font-mono text-[13px] font-bold tracking-wider text-white shadow-neon-pink transition-all duration-300 hover:scale-105 hover:bg-white hover:text-ink"
              >
                <span>INITIATE CONTACT</span>
                <span>→</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 px-6 py-3.5 font-mono text-[13px] font-semibold text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all hover:scale-105 hover:bg-neon-cyan hover:text-ink hover:shadow-neon-cyan"
              >
                <span>VIEW GITHUB</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}