'use client';

import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/47643651-gta-west-coast-dr-dre-x-snoop-dogg-criminal-x-murder-minority-292173.mp3"
        preload="metadata"
      />

      {/* Floating Music Player */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

        {/* Volume Slider — shown on hover */}
        {showVolume && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: 'rgba(7, 13, 30, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-cyan-400"
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}

        {/* Main Player Button */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer select-none"
          style={{
            background: 'rgba(7, 13, 30, 0.85)',
            backdropFilter: 'blur(12px)',
            border: isPlaying
              ? '1px solid rgba(0, 240, 255, 0.6)'
              : '1px solid rgba(0, 240, 255, 0.2)',
            boxShadow: isPlaying
              ? '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)'
              : '0 0 10px rgba(0, 240, 255, 0.05)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          {/* Animated Bars (visible when playing) */}
          {isPlaying && (
            <div className="flex items-end gap-[3px] h-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    background: '#00f0ff',
                    boxShadow: '0 0 6px #00f0ff',
                    animation: `musicBar${i} ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                    height: `${8 + i * 3}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Music Icon (visible when paused) */}
          {!isPlaying && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}

          {/* Track Info */}
          <div className="flex flex-col">
            <span
              className="text-xs font-semibold leading-tight"
              style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0,240,255,0.5)' }}
            >
              {isPlaying ? 'NOW PLAYING' : 'MUSIC'}
            </span>
            <span className="text-[10px] leading-tight" style={{ color: 'rgba(0,240,255,0.6)' }}>
              West Coast Vibe
            </span>
          </div>

          {/* Play / Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: isPlaying ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0, 240, 255, 0.15)',
              border: isPlaying ? '1px solid rgba(255, 0, 127, 0.5)' : '1px solid rgba(0, 240, 255, 0.4)',
              boxShadow: isPlaying ? '0 0 10px rgba(255, 0, 127, 0.3)' : 'none',
            }}
          >
            {isPlaying ? (
              // Pause icon
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff007f">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              // Play icon
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#00f0ff">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Animated bar keyframes */}
      <style jsx global>{`
        @keyframes musicBar1 { from { height: 4px; } to { height: 14px; } }
        @keyframes musicBar2 { from { height: 8px; } to { height: 18px; } }
        @keyframes musicBar3 { from { height: 6px; } to { height: 16px; } }
        @keyframes musicBar4 { from { height: 10px; } to { height: 20px; } }
      `}</style>
    </>
  );
}
