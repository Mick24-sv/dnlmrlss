'use client';

import { featuredProjects } from '@/lib/data';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" className="shrink-0">
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

export default function FeaturedProjects() {
  return (
    <section id="featured" className="relative border-t border-neon-cyan/20 py-24 md:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-neon-cyan/5 blur-[120px]" />

      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan">
            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]" />
            <span className="tracking-widest uppercase">// FEATURED REPOSITORIES</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-5xl">
            Selected Mission{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Deployments
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog">
            Production full-stack platforms and mobile systems engineered for real-time safety, high resilience, and community impact.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {featuredProjects.map((project, idx) => (
            <TiltCard
              key={project.id}
              className="group corner-brackets rounded-3xl border border-neon-cyan/25 bg-cyber-card/80 transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_35px_rgba(0,240,255,0.25)]"
              glowColor="rgba(0, 240, 255, 0.2)"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
              >
                {/* Project Screenshot with Neon Overlay */}
                {project.image && (
                  <div className="relative h-52 w-full overflow-hidden bg-black md:h-60">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 left-3 rounded-lg border border-neon-cyan/40 bg-cyber-bg/90 px-2.5 py-1 font-mono text-[10px] text-neon-cyan backdrop-blur-md">
                      SYS // {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                )}

                <div className="p-8 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-neon-pink">{project.category}</p>
                      <h3 className="mt-1 text-2xl font-bold text-white transition-colors group-hover:text-neon-cyan md:text-3xl">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:bg-neon-cyan group-hover:text-ink">
                      <ArrowIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-grow flex-col px-8 pb-8">
                  <p className="mb-5 leading-relaxed text-fog text-[14px]">
                    {project.description}
                  </p>

                  <div className="mb-6 rounded-xl border border-neon-green/30 bg-neon-green/10 px-3.5 py-2">
                    <p className="font-mono text-xs text-neon-green flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
                      {project.impact}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-lg border border-line bg-cyber-bg/90 px-2.5 py-1 font-mono text-[11px] text-fog/90 transition-colors group-hover:border-neon-cyan/30 group-hover:text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glowing bottom line indicator */}
                <div className="h-1 w-full bg-gradient-to-r from-neon-cyan via-neon-pink to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </TiltCard>
          ))}
        </div>

        <div className="mt-16 border-t border-neon-cyan/20 pt-10">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-paper transition-all hover:text-neon-cyan"
          >
            <span>ACCESS REPOSITORY ARCHIVE</span>
            <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
