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
            <span className="tracking-widest uppercase">TRANSMISSION TERMINAL</span>
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
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GITHUB</span>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-cyber-bg/80 px-5 py-3.5 font-mono text-sm font-medium text-paper transition-all hover:scale-105 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LINKEDIN</span>
            </a>

            {/* Instagram */}
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-cyber-bg/80 px-5 py-3.5 font-mono text-sm font-medium text-paper transition-all hover:scale-105 hover:border-neon-pink hover:text-neon-pink hover:shadow-[0_0_15px_rgba(255,0,127,0.3)]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              <span>INSTAGRAM</span>
            </a>

            {/* Facebook */}
            <a
              href={profile.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-cyber-bg/80 px-5 py-3.5 font-mono text-sm font-medium text-paper transition-all hover:scale-105 hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              <span>FACEBOOK</span>
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
