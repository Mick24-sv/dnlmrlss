export const profile = {
  name: 'Mick Daniel Morales',
  fullName: 'Mick Daniel Q. Morales',
  title: 'Full Stack Developer',
  location: 'Naga City, Bicol, Philippines',
  school: 'Ateneo de Naga University',
  tagline: 'Building clean, working software from the network up.',
  bio: 'Hi, Im Mick a Information Technology student with hands-on experience in full-stack web and mobile development, network administration, and UI/UX design. Adept at building scalable applications using React Native and Firebase. Driven by solving complex technical problems and creating clean, user-centric interfaces.',
  linkedin: 'https://www.linkedin.com/in/danielmrlss/',
  facebook: 'https://www.facebook.com/Dnlmrlss',
  instagram: 'https://www.instagram.com/danielmrlss/',
  github: 'https://github.com/Mick24-sv',
};

export const capabilities = [
  {
    number: '01',
    label: 'Full-Stack Web',
    detail:
      'End-to-end web applications - React and Next.js on the front end, PostgreSQL and Supabase for data, deployed on Vercel.',
    deliverables: [
      'Web applications with React & Next.js',
      'Database design & implementation',
      'REST API development',
      'Deployment & DevOps',
      'Performance optimization',
    ],
  },
  {
    number: '02',
    label: 'Mobile Development',
    detail:
      'Cross-platform apps with React Native, backed by Firebase and Supabase for auth, storage, and real-time sync.',
    deliverables: [
      'Cross-platform mobile apps',
      'Firebase authentication & cloud functions',
    ],
  },
  {
    number: '03',
    label: 'Network Administration',
    detail:
      'Configuring and troubleshooting network protocols, from routing basics to keeping systems reliably connected.',
    deliverables: [
      'Network configuration',
      'System troubleshooting',
      'Infrastructure documentation',
    ],
  },
  {
    number: '04',
    label: 'UI/UX Design',
    detail:
      'Interfaces designed around how people actually use them - clear flows, sensible defaults, intuitive navigation.',
    deliverables: [
      'Responsive interface design',
      'Interaction prototypes',
      'Design systems & documentation',
    ],
  },
];

export const featuredProjects = [
  {
    id: 1,
    category: 'Full-Stack Development',
    name: 'Tag-Abantay',
    description:
      'A real-time safety monitoring and incident reporting platform with live check-in updates, interactive hazard maps, and credential-based access control.',
    impact: 'Real-time incident tracking for community safety',
    image: '/images/tag-abantay.png',
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Supabase', 'Leaflet.js'],
    link: 'https://tag-abantay.vercel.app/',
  },
  {
    id: 2,
    category: 'Mobile Development',
    name: 'Fiesta Finder',
    description:
      'A web and mobile platform that aggregates event schedules, locations, and real-time updates for local Bicol cultural festivals.',
    impact: 'Centralized event discovery for local community',
    image: '/images/fiesta-finder.png',
    tools: ['React', 'React Native', 'PostgreSQL', 'Firebase'],
    link: 'https://fiesta-finder-seven.vercel.app/',
  },
];

export const projects = [
  {
    path: '~/projects/tag-abantay',
    name: 'Tag-Abantay',
    image: '/images/tag-abantay.png',
    description:
      'A real-time safety monitoring and incident reporting platform with live check-in updates, interactive hazard maps, and credential-based access control.',
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Supabase', 'Leaflet.js', 'Vercel'],
    link: 'https://tag-abantay.vercel.app/',
  },
  {
    path: '~/projects/fiesta-finder',
    name: 'Fiesta Finder',
    image: '/images/fiesta-finder.png',
    description:
      'A web and mobile platform that aggregates event schedules, locations, and real-time updates for local Bicol cultural festivals.',
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'PostgreSQL'],
    link: 'https://fiesta-finder-seven.vercel.app/',
  },
  {
    path: '~/projects/minnies-farm-resort',
    name: "Minnie's Farm Resort",
    image: '/images/Minnies Farm Resort.png',
    description:
      'An online booking and availability system for resort accommodations and guest inquiries.',
    tools: ['React Native', 'Supabase'],
    link: 'https://minnies-farm-resort.vercel.app/',
  },
];

export const experience = [
  {
    period: '2023 — Present',
    role: 'IT Student',
    org: 'Ateneo de Naga University',
  },
];