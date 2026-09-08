"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  onSelectSector?: (sectorName: string) => void;
  className?: string;
}

export default function Hero3DCanvas({ onSelectSector, className = "" }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePlotInfo, setActivePlotInfo] = useState<string>("Hover or click buildings to inspect sectors");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070d18, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7, 13);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 2.2);
    dirLight.position.set(10, 15, 8);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xd97706, 3, 20);
    pointLight.position.set(-4, 6, 2);
    scene.add(pointLight);

    // Root Group
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(24, 24, 0xf59e0b, 0x1e293b);
    gridHelper.position.y = -0.01;
    cityGroup.add(gridHelper);

    // Base Circular Podium
    const podiumGeo = new THREE.CylinderGeometry(10, 10.5, 0.4, 48);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x0b1320,
      metalness: 0.8,
      roughness: 0.3,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.2;
    cityGroup.add(podium);

    // Glowing Ring
    const ringGeo = new THREE.RingGeometry(9.8, 10.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    cityGroup.add(ring);

    // Buildings & Plots creation
    const interactiveObjects: THREE.Mesh[] = [];

    // Building definitions
    const buildingsData = [
      // Commercial Frontage (taller, gold accent)
      { x: -4.5, z: 4.0, w: 1.4, h: 4.8, d: 1.4, color: 0xf59e0b, name: "Commercial Block — Plaza 1 (GT Road Frontage)" },
      { x: -2.5, z: 4.2, w: 1.2, h: 3.5, d: 1.2, color: 0xd97706, name: "Commercial Block — Retail Center" },
      { x: 2.5, z: 4.2, w: 1.2, h: 4.0, d: 1.2, color: 0xd97706, name: "Commercial Block — Business Center" },
      { x: 4.5, z: 4.0, w: 1.5, h: 5.2, d: 1.5, color: 0xf59e0b, name: "Commercial Block — Plaza 2 (Direct GT Road)" },
      
      // Sector A (Premium Residential, modern cubes)
      { x: -3.5, z: 0.5, w: 1.2, h: 2.4, d: 1.4, color: 0x38bdf8, name: "Sector A — 1 Kanal Executive Villa Zone" },
      { x: -1.5, z: 0.0, w: 1.0, h: 2.0, d: 1.1, color: 0x60a5fa, name: "Sector A — 10 Marla Residential Block" },
      { x: -3.5, z: -2.5, w: 0.9, h: 1.8, d: 1.0, color: 0x93c5fd, name: "Sector A — 5 Marla Premium Plots" },
      { x: -1.2, z: -3.0, w: 0.9, h: 1.7, d: 1.0, color: 0x93c5fd, name: "Sector A — Residential Sector" },

      // Sector B (Family Residential)
      { x: 1.5, z: 0.0, w: 1.0, h: 2.0, d: 1.1, color: 0x34d399, name: "Sector B — 10 Marla Family Zone" },
      { x: 3.5, z: 0.5, w: 1.2, h: 2.2, d: 1.4, color: 0x10b981, name: "Sector B — 1 Kanal Residential Block" },
      { x: 1.2, z: -3.0, w: 0.9, h: 1.6, d: 1.0, color: 0x6ee7b7, name: "Sector B — 5 Marla Affordable Plots" },
      { x: 3.5, z: -2.5, w: 0.9, h: 1.7, d: 1.0, color: 0x6ee7b7, name: "Sector B — 5 Marla Family Plots" },

      // Central Grand Mosque & Civic Zone
      { x: 0, z: -1.0, w: 1.8, h: 2.8, d: 1.8, color: 0xfef08a, name: "Green & Community Zone — Grand Mosque" },
    ];

    buildingsData.forEach((b) => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        metalness: 0.5,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, b.h / 2, b.z);
      mesh.userData = { name: b.name };

      // Add edge lines for high-tech architectural wireframe look
      const edges = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      cityGroup.add(mesh);
      interactiveObjects.push(mesh);
    });

    // Golden Floating Particles
    const particlesCount = 90;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 18;
      pPos[i + 1] = Math.random() * 8 + 0.5;
      pPos[i + 2] = (Math.random() - 0.5) * 18;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.15;

      // Raycasting for hover tooltip
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);
      if (intersects.length > 0) {
        const item = intersects[0].object as THREE.Mesh;
        setActivePlotInfo(item.userData.name || "Interactive 3D Sector");
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);
      if (intersects.length > 0) {
        const item = intersects[0].object as THREE.Mesh;
        if (onSelectSector && item.userData.name) {
          onSelectSector(item.userData.name);
        }
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow idle rotation + mouse responsiveness
      cityGroup.rotation.y += (targetRotationY + elapsedTime * 0.05 - cityGroup.rotation.y) * 0.05;
      cityGroup.rotation.x += (targetRotationX - cityGroup.rotation.x) * 0.05;

      // Pulse ring
      ring.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.02);

      // Float particles
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      document.body.style.cursor = "default";
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isClient, onSelectSector]);

  return (
    <div className={`relative w-full h-[450px] lg:h-[550px] rounded-3xl overflow-hidden bg-gradient-to-b from-navy-900/80 via-navy-950 to-navy-900/90 border border-saffron-500/20 shadow-2xl ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/90 border border-saffron-500/30 backdrop-blur-md text-xs text-saffron-300 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>3D Master Plan Visualizer (Live Interactive)</span>
      </div>

      {/* Bottom Tooltip / Inspector */}
      <div className="absolute bottom-4 inset-x-4 z-10 p-3 rounded-2xl bg-navy-900/90 border border-saffron-500/30 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-saffron-400 animate-pulse" />
          <p className="text-xs lg:text-sm text-slate-200 font-medium tracking-wide">
            {activePlotInfo}
          </p>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-saffron-400/80 bg-saffron-500/10 px-2.5 py-1 rounded-full border border-saffron-500/20">
          Move cursor to orbit
        </span>
      </div>
    </div>
  );
}
