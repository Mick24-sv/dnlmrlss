'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { projects, capabilities } from '@/lib/data';

const stops = projects.flatMap((project, index) => [
  { ...project, label: 'MISSION DEPLOYMENT' },
  { ...capabilities[index], name: capabilities[index].label, description: capabilities[index].detail, label: 'ENGINEERING DISCIPLINE' },
]);

export default function PortfolioRail() {
  const section = useRef(null), host = useRef(null), cards = useRef([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (!media.matches) return;
      const container = host.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, 1, 1, 18000);
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
      catch { return; }
      const labels = new CSS3DRenderer();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.domElement.className = 'rail-webgl';
      labels.domElement.className = 'rail-labels';
      container.append(renderer.domElement, labels.domElement);
      section.current.classList.add('rail-enabled');
      const curve = new THREE.CatmullRomCurve3(Array.from({ length: 12 }, (_, i) =>
        new THREE.Vector3(Math.sin(i * .85) * 340, Math.sin(i * .6) * 65, 900 - i * 850)));
      const objects = cards.current.map((element, index) => {
        const object = new CSS3DObject(element);
        const point = curve.getPointAt(.12 + index * .10);
        object.position.copy(point).add(new THREE.Vector3(index % 2 ? 390 : -390, 0, 0));
        scene.add(object);
        return object;
      });
      const routeGeometry = new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(600).map(p => p.add(new THREE.Vector3(0, -290, 0))));
      const routeMaterial = new THREE.PointsMaterial({ color: '#00f0ff', size: 5, sizeAttenuation: true, transparent: true, opacity: .85 });
      const route = new THREE.Points(routeGeometry, routeMaterial);
      scene.add(route);
      let target = 0, progress = 0, frame, previousActive = -1;
      const updateScroll = () => {
        const rect = section.current.getBoundingClientRect();
        target = THREE.MathUtils.clamp(-rect.top / (section.current.offsetHeight - window.innerHeight), 0, 1);
      };
      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height); labels.setSize(width, height);
        updateScroll();
      };
      const observer = new ResizeObserver(resize); observer.observe(container);
      window.addEventListener('scroll', updateScroll, { passive: true });
      resize(); progress = target;
      const draw = () => {
        frame = requestAnimationFrame(draw);
        progress = THREE.MathUtils.lerp(progress, target, .085);
        const t = .025 + progress * .70;
        camera.position.copy(curve.getPointAt(t));
        const focus = curve.getPointAt(Math.min(t + .105, 1));
        camera.lookAt(focus);
        const current = Math.min(7, Math.round(progress * 7));
        if (current !== previousActive) { previousActive = current; setActive(current); }
        objects.forEach(object => {
          object.quaternion.copy(camera.quaternion);
          const distance = camera.position.distanceTo(object.position);
          const visible = object.position.z < camera.position.z - 120 && distance < 3800;
          object.element.style.visibility = visible ? 'visible' : 'hidden';
          object.element.inert = !visible;
          object.element.style.opacity = String(THREE.MathUtils.clamp((3800 - distance) / 1000, 0, 1));
        });
        renderer.render(scene, camera); labels.render(scene, camera);
      };
      draw();
      dispose = () => {
        cancelAnimationFrame(frame); observer.disconnect();
        window.removeEventListener('scroll', updateScroll);
        objects.forEach(object => {
          object.element.inert = false;
          object.element.removeAttribute('style');
          container.appendChild(object.element); scene.remove(object);
        });
        routeGeometry.dispose(); routeMaterial.dispose(); renderer.dispose();
        renderer.domElement.remove(); labels.domElement.remove();
        section.current?.classList.remove('rail-enabled');
      };
    };
    setup(); media.addEventListener('change', setup);
    return () => { media.removeEventListener('change', setup); dispose(); };
  }, []);

  return <section id="featured" ref={section} className="portfolio-rail border-t border-neon-cyan/20">
    <div className="rail-sticky">
      <header className="rail-heading mx-auto max-w-content px-6 md:px-10">
        <p className="font-mono text-xs tracking-widest text-neon-cyan">SELECTED MISSIONS / ENGINEERING DISCIPLINES</p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Follow the <span className="bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">build path.</span></h2>
        <p className="mt-3 text-sm text-fog">Eight stops through my projects and capabilities. Scroll to explore.</p>
      </header>
      <div id="capabilities" className="rail-stage" ref={host}>
        {stops.map((stop, index) => <article key={stop.name} ref={el => { cards.current[index] = el; }} className="rail-card">
          {stop.image && <img src={stop.image} alt={`${stop.name} preview`} className="rail-preview" />}
          <div className="rail-card-content">
            <p className="font-mono text-[10px] tracking-widest text-neon-cyan">{String(index + 1).padStart(2, '0')} / {stop.label}</p>
            <h3 className="mt-4 text-2xl font-bold text-white">{stop.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fog">{stop.description}</p>
            {stop.deliverables && <ul className="mt-5 space-y-2 text-sm text-fog">{stop.deliverables.map(item => <li key={item}><span className="text-neon-pink">✓ </span>{item}</li>)}</ul>}
            {stop.tools && <ul className="mt-4 flex flex-wrap gap-2">{stop.tools.map(tool => <li className="rounded border border-neon-cyan/20 px-2 py-1 font-mono text-[10px] text-fog" key={tool}>{tool}</li>)}</ul>}
            {stop.link && <a className="mt-5 inline-block font-mono text-xs text-neon-cyan" href={stop.link} target="_blank" rel="noopener noreferrer">OPEN SYSTEM ↗<span className="sr-only">: {stop.name} (opens in a new tab)</span></a>}
          </div>
        </article>)}
      </div>
      <nav aria-label="Rail stops" className="rail-progress"><span>SCROLL TO EXPLORE ↓</span><div>{stops.map((stop, index) => <button key={stop.name} type="button" aria-label={`Go to ${stop.name}`} aria-current={index === active ? 'step' : undefined} onClick={() => {
        if (section.current.classList.contains('rail-enabled')) window.scrollTo({ top: window.scrollY + section.current.getBoundingClientRect().top + index / 7 * (section.current.offsetHeight - window.innerHeight), behavior: 'smooth' });
        else cards.current[index]?.scrollIntoView({ behavior: 'instant', block: 'center' });
      }} className={index === active ? 'active' : ''}>{String(index + 1).padStart(2, '0')}</button>)}</div><span>{String(active + 1).padStart(2, '0')} / 08</span></nav>
    </div>
  </section>;
}
