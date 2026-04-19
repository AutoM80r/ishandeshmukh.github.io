export const HERO = {
  chip: 'Mechatronics · MIT Manipal · Batch 2026',
  name: 'Ishan',
  surname: 'Deshmukh.',
  roles: ['Engineer', 'Builder', 'Roboticist'],
  description:
    'I build things that move, sense, and react. From competition robots at national level to smart hydroponics — driven by the idea that engineering should be creative, bold, and a little obsessive.',
  stats: [
    { value: '22', label: 'AIR · Robocon' },
    { value: '4+', label: 'yrs building' },
    { value: '2', label: 'papers in-progress' },
    { value: '1', label: 'patent pending' },
  ],
}

export const ABOUT = {
  bio: [
    'Four years ago I walked into MIT Manipal with one very specific idea — the <strong>Tony Stark model of engineering</strong>. That the best things get built by people who are a little obsessed, who can\'t stop thinking about a problem, who build in the workshop at 2am because they genuinely want to see it work.',
    'I found that energy in <strong>Team Robomanipal</strong>. Joined as a first-year with more enthusiasm than experience, worked my way to Senior Electronics Member, and spent years designing the embedded systems and custom PCBs that drove our competition bots. Year three was Robocon 2025 — vision-guided manipulator arm, omnidirectional drive, depth camera integration. We finished <strong>AIR 22 nationally</strong>. Missed ABU qualification by 10 ranks. It stung, and it taught me more than any result that went our way.',
    'Outside Robomanipal I\'ve been <strong>Robotics Head at IE Mechatronics</strong> — building a culture of builders. Currently interning at <strong>Cosy Farms</strong> in Mumbai, applying sensor fusion and embedded control to indoor hydroponics. Two research papers in progress. One <strong>patent application filed</strong>. Also slowly learning German, which is harder than debugging a BLDC at 3am.',
  ],
  skills: [
    { label: 'STM32 / Embedded C', color: '#f78166' },
    { label: 'PCB Design', color: '#58a6ff' },
    { label: 'Sensor Fusion', color: '#3fb950' },
    { label: 'SolidWorks / CAD', color: '#bc8cff' },
    { label: 'Python', color: '#58a6ff' },
    { label: 'Control Systems', color: '#e3b341' },
    { label: 'Unity 3D / C#', color: '#3fb950' },
    { label: 'Machine Learning', color: '#bc8cff' },
    { label: '3D Printing', color: '#f78166' },
    { label: 'ANSYS', color: '#e3b341' },
    { label: 'Motor Control', color: '#58a6ff' },
    { label: 'Computer Vision', color: '#3fb950' },
  ],
  table: [
    { key: 'degree', value: 'B.Tech · Mechatronics Engineering' },
    { key: 'institute', value: 'MIT, MAHE · Manipal, India' },
    { key: 'batch', value: '2022 – 2026' },
    { key: 'current role', value: 'Electrical & Embedded Intern · Cosy Farms, Mumbai' },
    { key: 'clubs', value: 'Robomanipal · IE Mechatronics' },
    { key: 'languages', value: 'Hindi · Marathi · English · German (learning)' },
  ],
}

export type BadgeVariant = 'green' | 'blue' | 'yellow' | 'orange'

export interface Project {
  slug: string
  name: string
  description: string
  badge: string
  badgeVariant: BadgeVariant
  tags: { label: string; color: string }[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'r1',
    name: 'robocon-r1-robot',
    description:
      'DD Robocon 2025. Vision-guided manipulator arm, omnidirectional drive, depth camera. AIR 22 nationally.',
    badge: 'competition',
    badgeVariant: 'green',
    tags: [
      { label: 'Embedded C', color: '#f78166' },
      { label: 'STM32', color: '#e3b341' },
      { label: 'PCB Design', color: '#58a6ff' },
    ],
  },
  {
    slug: 'r2',
    name: 'robocon-r2-drum',
    description:
      'DD Robocon 2025 scoring robot. Drum-based ball delivery, custom PCBs, inter-robot comms protocol.',
    badge: 'competition',
    badgeVariant: 'green',
    tags: [
      { label: 'Embedded C', color: '#f78166' },
      { label: 'PCB Design', color: '#58a6ff' },
    ],
  },
  {
    slug: 'quadruped',
    name: 'quadruped-robot',
    description:
      '3D-printed 12-DOF walking robot. Custom leg kinematics. Partially functional. Published on GrabCAD.',
    badge: 'personal',
    badgeVariant: 'blue',
    tags: [
      { label: 'SolidWorks', color: '#bc8cff' },
      { label: 'Kinematics', color: '#3fb950' },
    ],
  },
  {
    slug: 'stim-toy',
    name: 'stim-toy',
    description:
      'Tactile stimulation device designed for sensory regulation. Patent application filed.',
    badge: 'patent pending',
    badgeVariant: 'yellow',
    tags: [
      { label: 'Hardware', color: '#f78166' },
      { label: 'Design', color: '#e3b341' },
    ],
  },
  {
    slug: 'caterbot',
    name: 'CaterBot',
    description:
      'Caterpillar agri-robot redesigned for modularity. Unity 3D simulation + ANSYS structural validation.',
    badge: 'simulation',
    badgeVariant: 'blue',
    tags: [
      { label: 'Unity / C#', color: '#3fb950' },
      { label: 'ANSYS', color: '#e3b341' },
    ],
  },
  {
    slug: 'soft-gripper',
    name: 'soft-robotic-gripper',
    description:
      'Variable geometry soft gripper for delicate manipulation. Compliance and adaptability research.',
    badge: 'research',
    badgeVariant: 'yellow',
    tags: [
      { label: 'Soft Robotics', color: '#bc8cff' },
      { label: 'Research', color: '#e3b341' },
    ],
  },
]

export const VIDEOS = [
  { src: '/videos/clip1.mp4', title: 'Robocon Robot — Task Run', sub: 'DD Robocon 2025 · field test' },
  { src: '/videos/clip2.mp4', title: 'Robocon Robot — Mechanism Demo', sub: 'DD Robocon 2025 · arm + drum' },
  { src: '/videos/clip3.mp4', title: 'Robocon Robot — Arena Test', sub: 'DD Robocon 2025 · full run' },
  { src: '/videos/clip4.mp4', title: 'Robocon Robot — Competition', sub: 'DD Robocon 2025 · nationals' },
]

export const CONTACT_LINKS = [
  { href: 'mailto:ishanmechatronics@gmail.com', icon: '✉', label: 'ishanmechatronics@gmail.com', tag: 'email' },
  { href: 'https://linkedin.com/in/ishan-deshmukh-3b7412247', icon: 'in', label: 'ishan-deshmukh-3b7412247', tag: 'linkedin' },
  { href: 'https://github.com/AutoM80r', icon: '⌥', label: 'AutoM80r', tag: 'github' },
  { href: '/resume.html', icon: '↗', label: 'View Full Resume', tag: 'cv' },
]
