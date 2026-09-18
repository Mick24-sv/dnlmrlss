'use client';

import Image from 'next/image';
import { profile } from '@/lib/data';

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neon-cyan/20 bg-cyber-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="group flex items-center gap-4 transition-all">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-neon-cyan/50 bg-[#070e24] shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-transform group-hover:scale-105 group-hover:border-neon-cyan">
            <Image
              src="/images/Formal.jpg"
              alt="Mick Daniel Morales"
              fill
              sizes="44px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-semibold text-paper tracking-wide transition-colors group-hover:text-neon-cyan">
                Mick Daniel Q. Morales
              </p>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-neon-green/40 bg-neon-green/10 px-2 py-0.5 text-[10px] font-mono text-neon-green">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
                ONLINE
              </span>
            </div>
            <p className="mt-1 text-[12px] font-mono text-fog/80 tracking-wider">
              FULL-STACK / IT DEVELOPER
            </p>
          </div>
        </a>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-fog">
          <a href="#featured" className="transition hover:text-neon-cyan">
             WORK
          </a>
          <a href="#about" className="transition hover:text-neon-cyan">
             ABOUT
          </a>
          <a href="#capabilities" className="transition hover:text-neon-cyan">
             SKILLS
          </a>
          <a href="#work" className="transition hover:text-neon-cyan">
             ARCHIVE
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-neon-cyan/60 bg-neon-cyan/10 px-5 py-2 text-[13px] font-mono font-medium text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300 hover:scale-105 hover:bg-neon-cyan hover:text-ink hover:shadow-neon-cyan"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>GET IN TOUCH</span>
              <span className="text-xs">→</span>
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
