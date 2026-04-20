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

export interface ProjectDetail {
  slug: string
  name: string
  headline: string
  badge: string
  badgeVariant: BadgeVariant
  tags: { label: string; color: string }[]
  image?: string
  overview: string
  problem: string
  role: string
  outcome: string
  specs: { key: string; value: string }[]
}

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

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: 'r1',
    name: 'robocon-r1-robot',
    headline: 'DD Robocon 2025 — Vision-Guided Manipulator Robot',
    badge: 'competition',
    badgeVariant: 'green',
    image: '/images/r1.jpg',
    tags: [
      { label: 'Embedded C', color: '#f78166' },
      { label: 'STM32', color: '#e3b341' },
      { label: 'PCB Design', color: '#58a6ff' },
      { label: 'Computer Vision', color: '#3fb950' },
      { label: 'ROS', color: '#bc8cff' },
    ],
    overview:
      'R1 was Team Robomanipal\'s primary robot for DD Robocon 2025 — a vision-guided manipulator capable of picking, orienting, and placing objects in a defined arena sequence. The robot used an omnidirectional chassis with four mecanum wheels for precise positioning, and a 3-DOF arm with a custom gripper for manipulation tasks.',
    problem:
      'Robocon 2025\'s challenge demanded sub-centimetre placement accuracy in a dynamic competition arena — impossible to achieve with pure encoder odometry. Drift accumulates, arena surfaces aren\'t perfectly flat, and opponents can displace your robot mid-task. The core engineering problem was: how do you localise and act accurately without external positioning infrastructure?',
    role:
      'I led the embedded systems and PCB design for R1. Designed and fabricated the main controller PCB (STM32F4-based), all motor driver boards, and the sensor fusion board. Wrote the BLDC FOC control loop in Embedded C, integrated the depth camera (Intel RealSense D435) with ROS 2 running on a companion Raspberry Pi 5, and implemented the inter-board UART communication protocol.',
    outcome:
      'We finished AIR 22 nationally at DD Robocon 2025 — top 10% of all participating teams. Missed ABU Robocon qualification by 10 ranks. The depth camera + vision pipeline achieved reliable localisation within ±3 mm under competition lighting. The custom PCBs had zero field failures across all matches.',
    specs: [
      { key: 'chassis', value: 'Mecanum omni-drive · 4-wheel' },
      { key: 'MCU', value: 'STM32F446RE (main) + STM32F103 (sub)' },
      { key: 'vision', value: 'Intel RealSense D435 + ROS 2 Humble' },
      { key: 'arm DOF', value: '3-DOF + custom pneumatic gripper' },
      { key: 'comms', value: 'UART inter-board + 2.4 GHz RF' },
      { key: 'result', value: 'AIR 22 · DD Robocon 2025' },
    ],
  },
  {
    slug: 'r2',
    name: 'robocon-r2-drum',
    headline: 'DD Robocon 2025 — Drum Scoring Robot',
    badge: 'competition',
    badgeVariant: 'green',
    image: '/images/r2.jpg',
    tags: [
      { label: 'Embedded C', color: '#f78166' },
      { label: 'STM32', color: '#e3b341' },
      { label: 'PCB Design', color: '#58a6ff' },
      { label: 'BLDC Control', color: '#bc8cff' },
    ],
    overview:
      'R2 was the scoring robot — responsible for receiving balls from R1 and delivering them into scoring positions using a high-speed drum mechanism. Designed for reliability and speed: it had to execute its scoring sequence in under 5 seconds per cycle to keep up with R1\'s placement rate.',
    problem:
      'The drum delivery mechanism needed consistent ball trajectory regardless of ball surface wear or variation in loading angle from R1. Early prototypes had a 30% miss rate due to inconsistent drum RPM at load time. The inter-robot coordination also had to be failsafe — if R2 wasn\'t ready, R1 had to hold without disrupting its own task queue.',
    role:
      'Designed all PCBs for R2: power distribution board, BLDC driver board for the drum motor, and the main STM32 controller board. Implemented the drum speed controller with a closed-loop RPM hold using hall-effect feedback. Built the inter-robot comms protocol — a lightweight UART handshake running at 115200 baud with CRC8 error detection.',
    outcome:
      'R2 achieved a >95% delivery success rate in practice runs. The inter-robot protocol had zero communication failures across all scrimmage and competition matches. Drum mechanism produced consistent ball trajectory ±2° across 500+ cycles.',
    specs: [
      { key: 'MCU', value: 'STM32F446RE' },
      { key: 'drum motor', value: 'BLDC 3500 KV · FOC control' },
      { key: 'feedback', value: 'Hall-effect sensor · closed-loop RPM' },
      { key: 'comms', value: 'UART · 115200 baud · CRC8' },
      { key: 'cycle time', value: '<5 s scoring sequence' },
      { key: 'result', value: 'AIR 22 · DD Robocon 2025' },
    ],
  },
  {
    slug: 'quadruped',
    name: 'quadruped-robot',
    headline: '12-DOF Quadruped Walking Robot',
    badge: 'personal',
    badgeVariant: 'blue',
    image: '/images/quadruped.png',
    tags: [
      { label: 'SolidWorks', color: '#bc8cff' },
      { label: 'Kinematics', color: '#3fb950' },
      { label: '3D Printing', color: '#f78166' },
      { label: 'Python', color: '#58a6ff' },
    ],
    overview:
      'A fully 3D-printed quadruped robot with 12 degrees of freedom — 3 per leg. Designed from scratch in SolidWorks with custom leg geometry optimised for printability and torsional stiffness. The goal was to achieve stable static walking gaits and demonstrate the inverse kinematics pipeline.',
    problem:
      'Quadrupeds are hard. The mechanical design has to constrain weight and print-time while maintaining the stiffness needed for dynamic loading. The IK solution for 3-DOF legs has multiple valid configurations — picking the right one based on gait phase requires a coherent state machine. And 3D-printed servo horns strip teeth under load, which I learned the hard way.',
    role:
      'Solo project. Designed all mechanical parts in SolidWorks, iterated 4 versions of the leg assembly to get the joint geometry right. Wrote the IK solver in Python, implemented a trot gait state machine, and did structural validation of the hip joint under maximum stance load.',
    outcome:
      'Partially functional — static stance and slow crawl gait demonstrated. Dynamic trot is still in progress (servo torque is the bottleneck). Full assembly published on GrabCAD. IK solver code open source.',
    specs: [
      { key: 'DOF', value: '12 (3 per leg)' },
      { key: 'actuation', value: 'MG996R servo · 9.4 kg·cm' },
      { key: 'design', value: 'SolidWorks 2023 · fully parametric' },
      { key: 'fabrication', value: 'FDM PLA · 0.2 mm layer height' },
      { key: 'IK solver', value: 'Python · geometric 3R solution' },
      { key: 'status', value: 'Crawl gait ✓ · Trot in progress' },
    ],
  },
  {
    slug: 'stim-toy',
    name: 'stim-toy',
    headline: 'Tactile Stimulation Device — Patent Pending',
    badge: 'patent pending',
    badgeVariant: 'yellow',
    tags: [
      { label: 'Hardware Design', color: '#f78166' },
      { label: 'Product Design', color: '#e3b341' },
      { label: 'Ergonomics', color: '#bc8cff' },
    ],
    overview:
      'A handheld tactile stimulation device designed for sensory regulation — targeting individuals who benefit from repetitive sensory input as a focus or calming aid. The design prioritises portability, durability, and a satisfying tactile response without requiring batteries or electronics.',
    problem:
      'Existing stim toys on the market are either too fragile for frequent use, too visually conspicuous for adult use in professional settings, or too expensive. The design brief was: durable, discreet, manufacturable, and genuinely satisfying to use.',
    role:
      'Led all design work from concept to patent filing. Developed multiple prototype iterations, conducted informal user testing, and refined the mechanism geometry based on feedback. Filed the provisional patent application.',
    outcome:
      'Patent application filed and pending. The final prototype has been in daily use for 6+ months with no mechanical degradation. Exploring manufacturing partnerships for a small production run.',
    specs: [
      { key: 'type', value: 'Passive mechanical · no batteries' },
      { key: 'material', value: 'Engineering grade plastic · metal inserts' },
      { key: 'IP status', value: 'Patent application filed · pending' },
      { key: 'prototypes', value: '4 iterations · FDM + SLA' },
      { key: 'status', value: 'Seeking manufacturing partner' },
    ],
  },
  {
    slug: 'caterbot',
    name: 'CaterBot',
    headline: 'Modular Agri-Robot — Unity 3D Simulation',
    badge: 'simulation',
    badgeVariant: 'blue',
    tags: [
      { label: 'Unity / C#', color: '#3fb950' },
      { label: 'ANSYS', color: '#e3b341' },
      { label: 'SolidWorks', color: '#bc8cff' },
      { label: 'Simulation', color: '#58a6ff' },
    ],
    overview:
      'CaterBot is a redesigned caterpillar-drive agricultural robot with a modular payload architecture. The original concept (a fixed-function bot) was re-engineered to accept swappable sensor and tool modules — so the same chassis can do soil sampling, crop monitoring, or targeted spraying depending on the fitted module.',
    problem:
      'Agricultural robots are expensive because they\'re single-purpose. Farmers in India can\'t justify buying three machines when one field season might need all three functions. The modularity redesign had to maintain structural integrity under uneven terrain loading — which required proper FEA, not guessing.',
    role:
      'Led the mechanical redesign in SolidWorks, defined the modular docking interface, ran ANSYS static structural analysis on the chassis under worst-case terrain loading, and built the Unity 3D simulation with realistic terrain and physics for demonstrating multi-module operation.',
    outcome:
      'ANSYS analysis confirmed structural safety factor >2.5 under all tested load cases. Unity simulation demonstrated all three module configurations with realistic terrain interaction. Project presented at department-level showcase.',
    specs: [
      { key: 'locomotion', value: 'Caterpillar track drive' },
      { key: 'modules', value: 'Soil sensor · crop monitor · sprayer' },
      { key: 'FEA', value: 'ANSYS Static Structural · SF >2.5' },
      { key: 'simulation', value: 'Unity 3D · PhysX terrain' },
      { key: 'design tool', value: 'SolidWorks 2023' },
    ],
  },
  {
    slug: 'soft-gripper',
    name: 'soft-robotic-gripper',
    headline: 'Variable Geometry Soft Robotic Gripper',
    badge: 'research',
    badgeVariant: 'yellow',
    tags: [
      { label: 'Soft Robotics', color: '#bc8cff' },
      { label: 'Research', color: '#e3b341' },
      { label: 'Fabrication', color: '#f78166' },
      { label: 'Python', color: '#58a6ff' },
    ],
    overview:
      'A pneumatically-actuated soft robotic gripper with variable geometry — meaning the finger configuration adapts based on object shape rather than being fixed at design time. Aimed at delicate manipulation tasks where rigid grippers cause surface damage.',
    problem:
      'Rigid grippers fail on irregular, fragile, or deformable objects — fruit, foam, soft electronics. Soft grippers solve compliance but typically sacrifice precision. The research question: can a soft gripper maintain positional repeatability within ±2 mm while still conforming to irregular geometry?',
    role:
      'Designed the pneumatic channel geometry in SolidWorks, fabricated finger bodies using silicone casting (Smooth-On Dragon Skin 20), built the pressure control rig with an STM32 and solenoid valves, and ran the characterisation experiments.',
    outcome:
      'Achieved ±1.8 mm repeatability across 200 grasp cycles on spherical objects. Variable geometry demonstrated on objects ranging from a 30 mm sphere to an irregular foam block. Research paper in progress based on the characterisation data.',
    specs: [
      { key: 'actuation', value: 'Pneumatic · 0–3 bar operating range' },
      { key: 'material', value: 'Dragon Skin 20 silicone · Shore 20A' },
      { key: 'fingers', value: '3-finger · variable geometry' },
      { key: 'control', value: 'STM32 + solenoid valves' },
      { key: 'repeatability', value: '±1.8 mm · 200 grasp cycles' },
      { key: 'status', value: 'Research paper in progress' },
    ],
  },
]

export const CONTACT_LINKS = [
  { href: 'mailto:ishanmechatronics@gmail.com', icon: '✉', label: 'ishanmechatronics@gmail.com', tag: 'email' },
  { href: 'https://linkedin.com/in/ishan-deshmukh-3b7412247', icon: 'in', label: 'ishan-deshmukh-3b7412247', tag: 'linkedin' },
  { href: 'https://github.com/AutoM80r', icon: '⌥', label: 'AutoM80r', tag: 'github' },
  { href: '/resume.html', icon: '↗', label: 'View Full Resume', tag: 'cv' },
]
