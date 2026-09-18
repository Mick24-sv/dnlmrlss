'use client';

import { projects } from '@/lib/data';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0">
      <path
        d="M3 12L12 3M12 3H5M12 3V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative border-t border-neon-cyan/20 py-24 md:py-32">
      {/* Background neon ambient */}
      <div className="pointer-events-none absolute left-1/3 bottom-1/4 h-80 w-80 rounded-full bg-neon-pink/10 blur-[130px]" />

      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan">
              <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]" />
              <span className="tracking-widest uppercase"> REPOSITORY DATABASE</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-5xl">
              Complete Project{' '}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                Archive
              </span>
            </h2>
          </div>
          <div className="rounded-xl border border-neon-cyan/30 bg-cyber-card px-4 py-2 font-mono text-xs text-neon-cyan">
            INDEXED NODES: {projects.length} REPOSITORIES
          </div>
        </div>

        <p className="mb-14 max-w-2xl text-base leading-relaxed text-fog">
          Direct directory access to deployed web applications, full-stack systems, and reservation platforms with live production URLs.
        </p>

        <div className="flex flex-col gap-6">
          {projects.map((p, idx) => (
            <TiltCard
              key={p.name}
              className="group corner-brackets rounded-2xl border border-neon-cyan/25 bg-cyber-card/75 transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              glowColor="rgba(0, 240, 255, 0.15)"
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-full gap-0 md:grid-cols-3"
              >
                {p.image && (
                  <div className="relative h-48 w-full overflow-hidden bg-black md:h-auto">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover filter brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyber-card hidden md:block" />
                    <div className="absolute top-3 left-3 rounded border border-neon-cyan/40 bg-cyber-bg/90 px-2 py-0.5 font-mono text-[10px] text-neon-cyan">
                      NODE {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                )}

                <div className={`${p.image ? 'md:col-span-2' : ''} flex flex-col justify-between p-7 md:p-8`}>
                  <div>
                    <div className="mb-2 flex items-baseline gap-4">
                      <p className="font-mono text-xs text-neon-cyan">{p.path}</p>
                      <span className="font-mono text-[10px] text-fog/60">DEPLOYED LIVE</span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-neon-cyan md:text-2xl">
                      {p.name}
                    </h3>

                    <p className="mb-5 max-w-2xl text-sm leading-relaxed text-fog">{p.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-4">
                    <ul className="flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <li
                          key={t}
                          className="rounded-lg border border-line bg-cyber-bg/90 px-2.5 py-1 font-mono text-[10px] text-fog group-hover:border-neon-cyan/30 group-hover:text-white"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1.5 font-mono text-xs text-neon-cyan group-hover:underline">
                      <span>OPEN SYSTEM</span>
                      <ArrowIcon />
                    </div>
                  </div>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
