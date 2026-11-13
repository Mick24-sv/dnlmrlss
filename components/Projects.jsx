'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { projects } from '@/lib/data';
import { Database, ArrowUpRight, ArrowLeft, ArrowRight, MoveHorizontal, CodeXml, Layers, Server, MapPin, Globe, Smartphone, CalendarDays, QrCode, BarChart3, Accessibility, Wrench } from 'lucide-react';

const toolIcons = {
  React: CodeXml, 'Next.js': Layers, 'Tailwind CSS': Layers, Supabase: Database,
  'Leaflet.js': MapPin, Vercel: Server, HTML: CodeXml, CSS: Layers,
  JavaScript: CodeXml, PostgreSQL: Database, 'React Native': Smartphone,
  'Web Application': Globe, Scheduling: CalendarDays, 'QR Attendance': QrCode,
  Reporting: BarChart3, 'In Development': Wrench, 'Responsive Design': Smartphone,
  Accessibility,
};
const step = Math.PI * 2 / projects.length;
const wrap = n => (n % projects.length + projects.length) % projects.length;
export default function Projects() {
  const hostRef = useRef(null), cards = useRef([]), api = useRef(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(true);
  useEffect(() => {
    const host = hostRef.current, scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 1, 5000);
    const renderer = new CSS3DRenderer();
    host.appendChild(renderer.domElement);
    const objects = cards.current.map(el => { const obj = new CSS3DObject(el); scene.add(obj); return obj; });
    const previews = objects.map(obj => obj.element.querySelector('.archive-image img'));
    let angle = 0, target = 0, speed = 0, pointer = null, lastX = 0, startX = 0, lastTime = 0, dragged = false, frame, previous = 0, selected = -1;
    let lastScrollY = window.scrollY, scrollTime = 0, scrollSnap = false;
    let imageTarget = 0, imageOffset = 0;
    let elapsed = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height); camera.aspect = width / height;
      camera.position.z = width < 600 ? 1250 : 1210; camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    const go = n => { elapsed = 0; scrollSnap = false; target = n * step; speed = 0; };
    const scroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (reduced.matches) return;
      const rect = host.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      elapsed = 0;
      imageTarget = THREE.MathUtils.clamp(
        (window.innerHeight / 2 - rect.top - rect.height / 2) / (window.innerHeight / 2 + rect.height / 2), -1, 1
      ) * 14;
      // Let the page scroll normally; feed only visible scrolling into the ring.
      if (pointer !== null || delta === 0) return;
      speed = 0;
      target = (target ?? angle) - THREE.MathUtils.clamp(delta, -100, 100) * .003;
      scrollTime = performance.now();
      scrollSnap = true;
    };
    api.current = {
      move: direction => go(Math.round((target ?? angle) / step) - direction),
      select: index => {
        const current = Math.round(-angle / step);
        let delta = wrap(index - current);
        if (delta > projects.length / 2) delta -= projects.length;
        go(-(current + delta));
      }
    };
    const down = e => {
      if (e.button !== 0 || e.target.closest('a, button')) return;
      pointer = e.pointerId; startX = lastX = e.clientX; lastTime = performance.now();
      elapsed = 0;
      speed = 0; target = null; dragged = false; scrollSnap = false;
      host.setPointerCapture(pointer); host.classList.add('is-dragging');
    };
    const move = e => {
      if (e.pointerId !== pointer) return;
      const now = performance.now(), delta = (e.clientX - lastX) * .004;
      angle += delta;
      speed = THREE.MathUtils.clamp(delta / Math.max((now - lastTime) / 16.667, .5), -.16, .16);
      dragged ||= Math.abs(e.clientX - startX) > 5;
      lastX = e.clientX; lastTime = now;
    };
    const up = e => {
      if (e.pointerId !== pointer) return;
      if (performance.now() - lastTime > 90 || reduced.matches || e.type === 'pointercancel') speed = 0;
      target = Math.round((angle + speed * 10) / step) * step; pointer = null;
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
      host.classList.remove('is-dragging');
    };
    const click = e => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } };
    host.addEventListener('pointerdown', down); host.addEventListener('pointermove', move);
    host.addEventListener('pointerup', up); host.addEventListener('pointercancel', up); host.addEventListener('click', click, true);
    window.addEventListener('scroll', scroll, { passive: true });
    const animate = now => {
      const dt = Math.min((now - (previous || now)) / 16.667, 3); previous = now;
      const rect = host.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * .75 && rect.bottom > window.innerHeight * .25;
      const interacting = pointer !== null || host.querySelector('.archive-card:hover') || host.contains(document.activeElement);
      if (autoplayRef.current && visible && !document.hidden && !interacting) {
        elapsed += dt * 16.667;
        if (elapsed >= 4000) go(Math.round((target ?? angle) / step) - 1);
      } else elapsed = 0;
      if (scrollSnap && now - scrollTime > 160) {
        target = Math.round((target ?? angle) / step) * step;
        scrollSnap = false;
      }
      imageOffset += ((reduced.matches ? 0 : imageTarget) - imageOffset) * (1 - Math.pow(.88, dt));
      previews.forEach(image => { image.style.transform = `translateY(${imageOffset}px) scale(1.16)`; });
      if (pointer === null && target !== null) {
        if (Math.abs(speed) > .006 && !reduced.matches) { angle += speed * dt; speed *= Math.pow(.9, dt); }
        else { angle += (target - angle) * (1 - Math.pow(.94, dt)); if (Math.abs(target - angle) < .0001) angle = target; }
      }
      const current = wrap(Math.round(-angle / step));
      if (current !== selected) { selected = current; setActive(current); }
      objects.forEach((obj, i) => {
        const theta = angle + i * step, front = (Math.cos(theta) + 1) / 2;
        obj.position.set(Math.sin(theta) * 490, -Math.cos(theta) * 10, Math.cos(theta) * 330);
        obj.rotation.y = -Math.sin(theta) * .24; obj.scale.setScalar(.7 + front * .3);
        obj.element.style.opacity = String(.25 + front * .75);
        obj.element.style.filter = `brightness(${.45 + front * .55})`;
        obj.element.style.pointerEvents = i === current ? 'auto' : 'none'; obj.element.inert = i !== current;
      });
      renderer.render(scene, camera); frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); api.current = null;
      host.removeEventListener('pointerdown', down); host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerup', up); host.removeEventListener('pointercancel', up); host.removeEventListener('click', click, true);
      window.removeEventListener('scroll', scroll);
      previews.forEach(image => { image.style.transform = ''; });
      // Return React-owned nodes before disposing the renderer, including Strict Mode remounts.
      objects.forEach(obj => { obj.element.inert = false; scene.remove(obj); host.appendChild(obj.element); });
      renderer.domElement.remove();
    };
  }, []);
  return (
    <section id="archive" className="archive-section relative border-t border-neon-cyan/20 py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="archive-eyebrow"><Database size={14} aria-hidden="true" /> REPOSITORY DATABASE</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-5xl">Complete Project <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Archive</span></h2></div>
          <span className="archive-count">INDEXED NODES: {projects.length} REPOSITORIES</span>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-fog">Direct directory access to deployed web applications, full-stack systems, and reservation platforms with live production URLs.</p>
      </div>
      <div ref={hostRef} className="archive-stage" role="region" aria-roledescription="carousel" aria-label="Project archive. Drag, scroll, or use the arrow keys to rotate." tabIndex={0} onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); api.current?.move(e.key === 'ArrowRight' ? 1 : -1); }
      }}>
        {projects.map((p, i) => <article ref={el => { cards.current[i] = el; }} className="archive-card" key={p.name} aria-label={`${i + 1} of ${projects.length}: ${p.name}`}>
          <div className="archive-image"><img src={p.image} alt={`${p.name} project preview`} draggable="false" />
            <span className="archive-node">NODE {String(i + 1).padStart(2, '0')}</span><span className="archive-live">● DEPLOYED LIVE</span></div>
          <div className="archive-card-body"><p className="archive-path">{p.path}</p><h3>{p.name}</h3>
            <p className="archive-description">{p.description}</p><ul className="archive-tools">{p.tools.map(t => { const Icon = toolIcons[t] || CodeXml; return <li key={t}><Icon size={10} aria-hidden="true" />{t}</li>; })}</ul>
            <a href={p.link} target="_blank" rel="noopener noreferrer" draggable="false">OPEN SYSTEM <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only">: {p.name} (opens in a new tab)</span></a>
          </div>
        </article>)}
      </div>
      <div className="archive-navigation mx-auto max-w-content px-6 md:px-10">
        <div className="archive-hint"><MoveHorizontal size={16} aria-hidden="true" /> <span>AUTO ROTATE · DRAG OR SCROLL</span>
          <button type="button" className="rounded border border-neon-cyan/30 px-3 py-2 text-neon-cyan" aria-pressed={autoplay} onClick={() => {
            autoplayRef.current = !autoplayRef.current;
            setAutoplay(autoplayRef.current);
          }}>{autoplay ? 'PAUSE' : 'PLAY'}</button>
        </div>
        <div className="archive-pagination"><button type="button" aria-label="Previous project" onClick={() => api.current?.move(-1)}><ArrowLeft size={16} className="mx-auto" aria-hidden="true" /></button>
          {projects.map((p, i) => <button type="button" key={p.name} className={`archive-dot ${active === i ? 'active' : ''}`} aria-label={`Show ${p.name}`} aria-current={active === i ? 'true' : undefined} onClick={() => api.current?.select(i)}><span /></button>)}
          <button type="button" aria-label="Next project" onClick={() => api.current?.move(1)}><ArrowRight size={16} className="mx-auto" aria-hidden="true" /></button></div>
        <p className="archive-position" aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true">{String(active + 1).padStart(2, '0')} <span>/ {String(projects.length).padStart(2, '0')}</span></p>
      </div>
    </section>
  );
}
