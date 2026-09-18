/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030712',
        paper: '#f3f4f6',
        fog: '#94a3b8',
        signal: '#00f0ff',
        signal2: '#ff007f',
        panel: '#070d1e',
        line: '#162544',
        neon: {
          cyan: '#00f0ff',
          pink: '#ff007f',
          purple: '#a855f7',
          green: '#00ff9d',
          amber: '#ffb703',
          blue: '#3b82f6',
        },
        cyber: {
          bg: '#030712',
          card: '#080f24',
          cardHover: '#0d1838',
          border: 'rgba(0, 240, 255, 0.2)',
          borderHover: 'rgba(0, 240, 255, 0.7)',
        },
      },
      maxWidth: {
        content: '1180px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.5)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.45), 0 0 40px rgba(0, 240, 255, 0.2)',
        'neon-cyan-lg': '0 0 35px rgba(0, 240, 255, 0.6), 0 0 70px rgba(0, 240, 255, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 0, 127, 0.45), 0 0 40px rgba(255, 0, 127, 0.2)',
        'neon-green': '0 0 20px rgba(0, 255, 157, 0.45), 0 0 40px rgba(0, 255, 157, 0.2)',
        'cyber-card': '0 10px 40px -10px rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 2.5s ease-in-out infinite alternate',
        'glow-pink': 'glowPink 2.5s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.7), 0 0 60px rgba(0, 240, 255, 0.3)' },
        },
        glowPink: {
          '0%': { boxShadow: '0 0 15px rgba(255, 0, 127, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 0, 127, 0.7), 0 0 60px rgba(255, 0, 127, 0.3)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
