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
  // Start the requested scroll experience on every device; the list toggle
  // remains available for visitors who prefer a static presentation.
  const [motionOverride, setMotionOverride] = useState(true);
  const [animated, setAnimated] = useState(true);
  useEffect(() => {
    let dispose = () => {};
    const setup = () => {
      dispose();
      const enabled = motionOverride;
      setAnimated(enabled);
      if (!enabled) return;
      const container = host.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, 1, 1, 18000);
      const labels = new CSS3DRenderer();
      labels.domElement.className = 'rail-labels';
      container.append(labels.domElement);
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
      // One canvas replaces hundreds of independently composited DOM dots.
      const routeCanvas = document.createElement('canvas');
      routeCanvas.className = 'rail-route-canvas';
      routeCanvas.setAttribute('aria-hidden', 'true');
      container.prepend(routeCanvas);
      const context = routeCanvas.getContext('2d');
      const routePoints = curve.getSpacedPoints(180).map(point => point.add(new THREE.Vector3(0, -250, 0)));
      const projected = new THREE.Vector3(), view = new THREE.Vector3();
      let target = 0, progress = 0, frame, previousActive = -1;
      let visible = false, sectionTop = 0, scrollRange = 1, width = 1, height = 1;
      let lastProgress = -1, lastTime = 0;
      const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      visibilityObserver.observe(section.current);
      const updateScroll = () => {
        target = THREE.MathUtils.clamp((window.scrollY - sectionTop) / scrollRange, 0, 1);
      };
      const resize = () => {
        ({ width, height } = container.getBoundingClientRect());
        sectionTop = window.scrollY + section.current.getBoundingClientRect().top;
        scrollRange = Math.max(1, section.current.offsetHeight - window.innerHeight);
        const mobile = width < 900;
        objects.forEach((object, index) => {
          object.position.copy(curve.getPointAt(.12 + index * .10));
          object.position.x += (index % 2 ? 1 : -1) * (mobile ? 85 : 390);
          object.scale.setScalar(mobile ? .62 : 1);
        });
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        labels.setSize(width, height);
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        routeCanvas.width = Math.round(width * pixelRatio);
        routeCanvas.height = Math.round(height * pixelRatio);
        context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        lastProgress = -1;
        updateScroll();
      };
      const observer = new ResizeObserver(resize); observer.observe(container);
      window.addEventListener('scroll', updateScroll, { passive: true });
      resize(); progress = target;
      const draw = (now = performance.now()) => {
        frame = requestAnimationFrame(draw);
        const elapsed = Math.min(50, now - (lastTime || now));
        lastTime = now;
        if (!visible || document.hidden) return;
        if (lastProgress >= 0 && Math.abs(target - progress) < .00001) return;
        progress = THREE.MathUtils.lerp(progress, target, 1 - Math.exp(-elapsed / 110));
        lastProgress = progress;
        const t = .025 + progress * .70;
        camera.position.copy(curve.getPointAt(t));
        const focus = curve.getPointAt(Math.min(t + .105, 1));
        camera.lookAt(focus);
        camera.updateMatrixWorld();
        const current = Math.min(7, Math.round(progress * 7));
        if (current !== previousActive) { previousActive = current; setActive(current); }
        objects.forEach(object => {
          object.quaternion.copy(camera.quaternion);
          const depth = -view.copy(object.position).applyMatrix4(camera.matrixWorldInverse).z;
          const show = depth > 600 && depth < 3300;
          if (object.visible !== show) {
            object.visible = show;
            object.element.inert = !show;
          }
          if (show) object.element.style.opacity = Math.min(
            THREE.MathUtils.clamp((depth - 600) / 300, 0, 1),
            THREE.MathUtils.clamp((3300 - depth) / 700, 0, 1)
          ).toFixed(3);
        });
        labels.render(scene, camera);
        if (context) {
          context.clearRect(0, 0, width, height);
          context.fillStyle = '#00f0ff';
          context.beginPath();
          routePoints.forEach(point => {
            const depth = -view.copy(point).applyMatrix4(camera.matrixWorldInverse).z;
            if (depth < 150 || depth > 4000) return;
            projected.copy(point).project(camera);
            if (Math.abs(projected.x) > 1.05 || Math.abs(projected.y) > 1.05) return;
            const x = (projected.x + 1) * width / 2, y = (1 - projected.y) * height / 2;
            const radius = THREE.MathUtils.clamp(1600 / depth, 1, 3);
            context.moveTo(x + radius, y);
            context.arc(x, y, radius, 0, Math.PI * 2);
          });
          context.fill();
        }
      };
      draw();
      dispose = () => {
        cancelAnimationFrame(frame); observer.disconnect(); visibilityObserver.disconnect();
        window.removeEventListener('scroll', updateScroll);
        objects.forEach(object => {
          object.element.inert = false;
          object.element.removeAttribute('style');
          scene.remove(object); container.appendChild(object.element);
        });
        routeCanvas.remove();
        labels.domElement.remove();
        section.current?.classList.remove('rail-enabled');
      };
    };
    setup();
    return () => { dispose(); };
  }, [motionOverride]);

  return <section id="featured" ref={section} className="portfolio-rail border-t border-neon-cyan/20">
    <span id="work" className="absolute left-0 top-0" aria-hidden="true" />
    <div className="rail-sticky">
      <header className="rail-heading mx-auto max-w-content px-6 md:px-10">
        <p className="font-mono text-xs tracking-widest text-neon-cyan">SELECTED MISSIONS / ENGINEERING DISCIPLINES</p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Follow the <span className="bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">build path.</span></h2>
        <p className="mt-3 text-sm text-fog">Eight stops through my projects and capabilities. Scroll to explore.</p>
        <button type="button" className="rail-motion-toggle" aria-pressed={animated} onClick={() => setMotionOverride(!animated)}>
          {animated ? '3D SCROLL ON · SWITCH TO LIST' : 'ENABLE 3D SCROLL'}
        </button>
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
