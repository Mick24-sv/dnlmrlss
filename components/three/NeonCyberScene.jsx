'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function NeonCyberScene({ shape = 'core' }) {
  const mountRef = useRef(null);
  const [activeShape, setActiveShape] = useState(shape);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const activeShapeRef = useRef(activeShape);
  const wireframeOnlyRef = useRef(wireframeOnly);

  useEffect(() => {
    activeShapeRef.current = activeShape;
  }, [activeShape]);

  useEffect(() => {
    wireframeOnlyRef.current = wireframeOnly;
  }, [wireframeOnly]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group to hold our models
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 4, 50);
    cyanPointLight.position.set(5, 5, 5);
    scene.add(cyanPointLight);

    const pinkPointLight = new THREE.PointLight(0xff007f, 3.5, 50);
    pinkPointLight.position.set(-5, -4, 4);
    scene.add(pinkPointLight);

    const greenRimLight = new THREE.PointLight(0x00ff9d, 2, 30);
    greenRimLight.position.set(0, 5, -5);
    scene.add(greenRimLight);

    // Models dictionary
    const models = {
      core: new THREE.Group(),
      torus: new THREE.Group(),
      matrix: new THREE.Group(),
    };

    // -------------------------------------------------------------
    // 1. MODEL: CYBER CORE (Icosahedron + Crystal Octahedron + Ring)
    // -------------------------------------------------------------
    const icoGeo = new THREE.IcosahedronGeometry(2, 1);
    const icoWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const icoWire = new THREE.Mesh(icoGeo, icoWireMat);
    models.core.add(icoWire);

    // Vertices glowing points
    const icoPointsMat = new THREE.PointsMaterial({
      color: 0x00ff9d,
      size: 0.09,
      transparent: true,
      opacity: 0.9,
    });
    const icoPoints = new THREE.Points(icoGeo, icoPointsMat);
    models.core.add(icoPoints);

    // Inner glowing crystal octahedron
    const octaGeo = new THREE.OctahedronGeometry(1.1, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      emissive: 0x880044,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    models.core.add(octaMesh);

    const octaWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const octaWire = new THREE.Mesh(octaGeo, octaWireMat);
    models.core.add(octaWire);

    // Orbital ring 1
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    models.core.add(ring1);

    // Orbital ring 2
    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    models.core.add(ring2);

    // -------------------------------------------------------------
    // 2. MODEL: TORUS MATRIX
    // -------------------------------------------------------------
    const torusGeo = new THREE.TorusKnotGeometry(1.4, 0.38, 120, 20, 2, 3);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x052e42,
      roughness: 0.1,
      metalness: 0.9,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    models.torus.add(torusMesh);

    const torusWireMat = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const torusWire = new THREE.Mesh(torusGeo, torusWireMat);
    models.torus.add(torusWire);

    // -------------------------------------------------------------
    // 3. MODEL: QUANTUM SPHERE / CYBER GLOBE
    // -------------------------------------------------------------
    const sphereGeo = new THREE.SphereGeometry(1.9, 24, 24);
    const sphereWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const sphereWire = new THREE.Mesh(sphereGeo, sphereWireMat);
    models.matrix.add(sphereWire);

    const sphereInnerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const sphereInnerMat = new THREE.MeshStandardMaterial({
      color: 0x00ff9d,
      emissive: 0x003322,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: false,
    });
    const sphereInner = new THREE.Mesh(sphereInnerGeo, sphereInnerMat);
    models.matrix.add(sphereInner);

    // Floating particle field around models
    const particlesCount = 200;
    const pGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const particlePoints = new THREE.Points(pGeometry, pMaterial);
    mainGroup.add(particlePoints);

    // Add all model groups to mainGroup
    mainGroup.add(models.core);
    mainGroup.add(models.torus);
    mainGroup.add(models.matrix);

    // Mouse drag / inertia state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.004, y: 0.007 };

    const onPointerDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        rotationVelocity.x = deltaY * 0.005;
        rotationVelocity.y = deltaX * 0.005;

        mainGroup.rotation.x += rotationVelocity.x;
        mainGroup.rotation.y += rotationVelocity.y;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Show/hide based on activeShape
      const curShape = activeShapeRef.current;
      models.core.visible = curShape === 'core';
      models.torus.visible = curShape === 'torus';
      models.matrix.visible = curShape === 'matrix';

      // Toggle wireframes
      const isWire = wireframeOnlyRef.current;
      octaMesh.visible = !isWire;
      torusMesh.visible = !isWire;
      sphereInner.visible = !isWire;

      if (!isDragging) {
        // Smooth continuous rotation
        mainGroup.rotation.y += 0.006;
        mainGroup.rotation.x += 0.002;
      }

      // Orbital animations
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.35;
      particlePoints.rotation.y = -elapsedTime * 0.08;

      // Floating bobbing
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Light oscillation
      cyanPointLight.intensity = 3.5 + Math.sin(elapsedTime * 3) * 0.8;
      pinkPointLight.intensity = 3.0 + Math.cos(elapsedTime * 2.5) * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-full w-full select-none">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        title="Click & drag to rotate 3D Hologram"
      />

      {/* Futuristic HUD Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neon-cyan/25 bg-cyber-bg/90 px-3 py-2 text-[11px] font-mono backdrop-blur-md">
        {/* Model selector buttons */}
        <div className="flex items-center gap-1.5">
          <span className="mr-1 text-neon-cyan/70 hidden sm:inline">3D MODEL:</span>
          {[
            { id: 'core', label: 'CYBER-CORE' },
            { id: 'torus', label: 'TORUS' },
            { id: 'matrix', label: 'SPHERE' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveShape(item.id)}
              className={`rounded px-2 py-0.5 transition-all ${
                activeShape === item.id
                  ? 'border border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                  : 'border border-line/40 text-fog hover:border-neon-cyan/40 hover:text-paper'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Wireframe Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWireframeOnly(!wireframeOnly)}
            className={`rounded px-2 py-0.5 transition-all ${
              wireframeOnly
                ? 'border border-neon-pink bg-neon-pink/20 text-neon-pink shadow-[0_0_10px_rgba(255,0,127,0.4)]'
                : 'border border-line/40 text-fog hover:border-neon-pink/40 hover:text-paper'
            }`}
          >
            {wireframeOnly ? 'WIREFRAME: ON' : 'WIREFRAME: OFF'}
          </button>
          <span className="hidden items-center gap-1 text-neon-green sm:flex">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-neon-green" />
            LIVE 3D
          </span>
        </div>
      </div>

      {/* Top HUD Telemetry */}
      <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] tracking-wider text-neon-cyan/80">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
          <span>HOLO-ENGINE // THREE.JS</span>
        </div>
        <div className="mt-0.5 text-fog/70">DRAG TO ROTATE • INTERACTIVE MODEL</div>
      </div>
    </div>
  );
}
