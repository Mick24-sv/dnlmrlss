import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-neon-cyan/20 bg-cyber-bg/90 py-10">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="font-semibold">SYS_STATUS: OPTIMAL</span>
          </div>
          <p className="mt-1 text-sm text-paper">
            © 2026 {profile.fullName} • Ateneo de Naga University
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-fog">
          <a href="#top" className="transition-colors hover:text-neon-cyan">
             TOP
          </a>
          <a href="#featured" className="transition-colors hover:text-neon-cyan">
             WORK
          </a>
          <a href="#about" className="transition-colors hover:text-neon-cyan">
             ABOUT
          </a>
          <a href="#capabilities" className="transition-colors hover:text-neon-cyan">
             SKILLS
          </a>
          <a href="#work" className="transition-colors hover:text-neon-cyan">
             ARCHIVE
          </a>
          <a href="#contact" className="transition-colors hover:text-neon-cyan">
             CONTACT
          </a>
        </div>
      </div>
    </footer>
  );
}
