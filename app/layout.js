import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import MusicPlayer from '@/components/MusicPlayer';

export const metadata = {
  title: 'Mick Daniel Morales | Full-Stack Developer & IT Specialist',
  description: 'Cyberpunk 3D Neon portfolio of Mick Daniel Morales — Full-stack developer and IT student at Ateneo de Naga University.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030712] text-[#f3f4f6] antialiased">
        {children}
        <MusicPlayer />
        <Analytics />
      </body>
    </html>
  );
}
