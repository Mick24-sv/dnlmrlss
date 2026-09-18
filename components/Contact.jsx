'use client';

import { useState } from 'react';
import { profile } from '@/lib/data';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative border-t border-neon-cyan/20 py-24 md:py-32">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full bg-neon-cyan/10 blur-[150px]" />

      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="corner-brackets relative overflow-hidden rounded-3xl border border-neon-cyan/40 bg-gradient-to-br from-cyber-card via-cyber-card/90 to-cyber-bg p-8 md:p-14 shadow-[0_0_50px_rgba(0,240,255,0.15)] backdrop-blur-xl">
          {/* Subtle top scanline */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-80" />

          <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan">
            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]" />
            <span className="tracking-widest uppercase">// TRANSMISSION TERMINAL</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold text-white md:text-5xl">
            Let&apos;s build something{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
              extraordinary.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-fog md:text-lg">
            I’m available for full-stack web applications, cross-platform mobile development, API infrastructure, and technical consulting.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            {/* Primary Email CTA */}
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-7 py-3.5 font-mono text-sm font-bold text-ink shadow-neon-cyan transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-neon-cyan-lg"
            >
              <span>SEND EMAIL</span>
              <span className="transition-transform group-hover:translate-x-1">✉</span>
            </a>

            {/* Quick Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-neon-cyan/40 bg-cyber-bg/80 px-5 py-3.5 font-mono text-sm font-medium text-neon-cyan transition-all hover:scale-105 hover:border-neon-cyan hover:bg-neon-cyan/10"
            >
              <span>{copied ? '✓ COPIED TO CLIPBOARD' : profile.email}</span>
            </button>

            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-cyber-bg/80 px-5 py-3.5 font-mono text-sm font-medium text-paper transition-all hover:scale-105 hover:border-neon-pink hover:text-neon-pink hover:shadow-[0_0_15px_rgba(255,0,127,0.3)]"
            >
              <span>GITHUB</span>
              <span className="text-xs">↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-cyber-bg/80 px-5 py-3.5 font-mono text-sm font-medium text-paper transition-all hover:scale-105 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <span>LINKEDIN</span>
              <span className="text-xs">↗</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line/60 pt-6 font-mono text-xs text-fog">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
              <span>COMMUNICATION CHANNELS: OPEN</span>
            </div>
            <div>RESPONSE TIME: &lt; 24 HOURS</div>
            <div>TIMEZONE: GMT+8 (PHILIPPINES)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
