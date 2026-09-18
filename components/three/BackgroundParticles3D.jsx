'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundParticles3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Cyan particles
    const particleCount1 = 280;
    const geometry1 = new THREE.BufferGeometry();
    const positions1 = new Float32Array(particleCount1 * 3);

    for (let i = 0; i < particleCount1 * 3; i += 3) {
      positions1[i] = (Math.random() - 0.5) * 1200;
      positions1[i + 1] = (Math.random() - 0.5) * 1200;
      positions1[i + 2] = (Math.random() - 0.5) * 800;
    }
    geometry1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));

    const material1 = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 2.2,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const points1 = new THREE.Points(geometry1, material1);
    scene.add(points1);

    // Pink / Magenta particles
    const particleCount2 = 140;
    const geometry2 = new THREE.BufferGeometry();
    const positions2 = new Float32Array(particleCount2 * 3);

    for (let i = 0; i < particleCount2 * 3; i += 3) {
      positions2[i] = (Math.random() - 0.5) * 1200;
      positions2[i + 1] = (Math.random() - 0.5) * 1200;
      positions2[i + 2] = (Math.random() - 0.5) * 800;
    }
    geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));

    const material2 = new THREE.PointsMaterial({
      color: 0xff007f,
      size: 2.5,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const points2 = new THREE.Points(geometry2, material2);
    scene.add(points2);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - width / 2) * 0.08;
      mouseY = (event.clientY - height / 2) * 0.08;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      points1.rotation.y += 0.0006;
      points1.rotation.x += 0.0003;
      points2.rotation.y -= 0.0008;
      points2.rotation.z += 0.0004;

      camera.position.x = targetX;
      camera.position.y = -targetY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry1.dispose();
      geometry2.dispose();
      material1.dispose();
      material2.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}
