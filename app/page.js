import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import About from '@/components/About';
import Capabilities from '@/components/Capabilities';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const BackgroundParticles3D = dynamic(
  () => import('@/components/three/BackgroundParticles3D'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cyber-bg text-paper cyber-grid overflow-hidden selection:bg-neon-cyan selection:text-ink">
      {/* Ambient 3D Three.js particle starfield */}
      <BackgroundParticles3D />

      <Nav />
      <Hero />
      <FeaturedProjects />
      <About />
      <Capabilities />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
