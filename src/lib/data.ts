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
  { href: '/resume', icon: '↗', label: 'View Full Resume', tag: 'cv' },
]

/* ── journal ─────────────────────────────────────────────── */
export interface JournalPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string[]
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: 'robocon-2025-air22',
    title: 'AIR 22 — What Robocon Actually Feels Like From the Inside',
    date: '2025-04-20',
    tags: ['competition', 'robocon', 'reflection'],
    excerpt: 'We missed ABU Robocon qualification by 10 ranks. Everyone congratulated us. I didn\'t know what to feel. Here\'s what that experience actually looked like from inside the team.',
    content: [
      'There\'s a specific kind of silence that happens in the pits when the final scoreboard goes up and you realise you\'re rank 22. Not bad enough to feel like failure. Not good enough to go to Thailand. Just — 22nd.',
      'Team Robomanipal had been building toward Robocon 2025 for eight months. Two robots. R1 with the vision-guided manipulator arm, omnidirectional drive, depth camera integration. R2 with the drum mechanism and the inter-robot comms protocol I\'d spent three weeks debugging at 2am. We had tested every subsystem until it was boring to test.',
      'The competition itself was three days of controlled chaos. Our BLDC controllers survived. The RealSense depth camera did exactly what we needed it to do — ±3mm localisation accuracy under arena lighting that wasn\'t designed for computer vision. The custom PCBs I\'d designed had zero field failures across every match we played.',
      'We beat teams we weren\'t supposed to beat. We lost to teams we\'d hoped to beat. We fixed a motor driver issue between matches by desoldering and reflowing a component in the pit with eight minutes on the clock. That worked.',
      'The number that sticks with me isn\'t 22. It\'s 12. We were 12 ranks from ABU qualification. That\'s not a comfortable margin. That\'s a result that tells you exactly where the ceiling is, and how much further the ceiling needs to move.',
      'I don\'t think of it as failure. Failure would have been robots that didn\'t work, or a team that gave up after the first loss. What we had was a result that was precise enough to learn from — and that\'s genuinely useful. The vision pipeline needs to be more robust to lighting changes. The arm\'s cycle time needs to drop by 0.8 seconds. I know exactly what to fix.',
      'The silence in the pits eventually broke. People packed up equipment, someone made a bad joke, we went and got food. That\'s how it ends. Not dramatically. Just — packing up, going home, and already thinking about next season.',
    ],
  },
  {
    slug: 'quadruped-lessons',
    title: 'What Building a Quadruped Taught Me About Engineering Failure',
    date: '2025-01-14',
    tags: ['robotics', 'mechanical', 'lessons'],
    excerpt: 'I designed four versions of the same leg assembly before one actually worked. Here\'s what I got wrong each time, and why I think getting things wrong is the only way to actually understand kinematics.',
    content: [
      'The first leg I designed for my quadruped stripped its servo horn in about 40 seconds of operation. Not 40 minutes. 40 seconds. I had calculated the torque requirement, I had added a safety factor, and it still stripped. The issue was that I\'d calculated static load torque and completely ignored impact loading during the stance-to-swing transition.',
      'That was version one. Version two had better servo horns (metal, not plastic) and a slightly different joint geometry. It lasted longer — maybe 10 minutes before the hip joint developed so much slop that the IK solution became meaningless. The printed PLA at the hip bore 100% of the reaction force with no metal reinforcement. Obvious in hindsight.',
      'What makes mechanical design genuinely hard is that your mistakes are invisible until they\'re catastrophic. Software bugs throw exceptions. Mechanical failures just happen — sometimes slowly, sometimes immediately, always at the worst possible moment.',
      'Version three introduced proper steel inserts at every load-bearing joint. It also introduced a new problem: the leg was now heavy enough that the servo at the hip couldn\'t actually lift it fast enough for a dynamic gait. I had optimised for stiffness and completely ignored the inertial budget.',
      'Version four finally worked. Shorter links, lighter materials in non-critical areas, servo selection based on the actual required torque at max angular velocity rather than the static holding torque. The crawl gait runs cleanly. The dynamic trot is still in progress — servo torque is still the bottleneck, just a much smaller one.',
      'The thing I learned that I hadn\'t expected to learn: engineering intuition is mostly scar tissue. Every wrong assumption I made about the leg design became knowledge I genuinely own now, in a way that reading about it never would have given me. I know why PLA creeps under sustained load. I know why MG996R specs lie about stall torque. I know that impact loading is almost always bigger than you think.',
      'The quadruped isn\'t finished. It might not ever be fully finished — that\'s true of most personal projects. But version four can crawl across a flat surface with all four legs moving in sequence, and that\'s an outcome that required knowing exactly how to fail four times first.',
    ],
  },
  {
    slug: 'why-firmware-at-2am',
    title: 'Why I Write Firmware at 2am (And Why That\'s Probably Fine)',
    date: '2024-11-02',
    tags: ['personal', 'embedded', 'mindset'],
    excerpt: 'There is a specific kind of flow state that happens when you\'re debugging a BLDC controller at 2am and the oscilloscope suddenly shows exactly the waveform it should. I have no good explanation for why this feels better than it does at 2pm.',
    content: [
      'I want to be clear that I don\'t romanticise sleep deprivation. That\'s not what this is about. What I want to try to describe is something more specific: the way certain kinds of technical problems are only fully visible when everything else is quiet.',
      'Embedded systems debugging, specifically, has this quality. When you\'re chasing a timing bug in a UART protocol — the kind where the first byte of every fifth transmission gets corrupted, but only when the motor is running — you need to hold a lot of state in your head simultaneously. The DMA configuration, the interrupt priorities, the baud rate tolerance, the electrical noise spectrum from the BLDC drive. That\'s a lot of context to maintain.',
      'At 2am, there are no notifications. No one is going to message me. The lab is empty. The oscilloscope is the most interesting thing in the room. I can actually just — think.',
      'I found the Robocon R2 UART corruption issue at 2:47am on a Thursday about six weeks before competition. It was a DMA transfer length mismatch — off by one byte — that only manifested when the motor controller was generating significant electrical noise on the ground plane. The fix took four lines of code. The finding took five hours.',
      'I\'ve started to think the 2am thing isn\'t about the time. It\'s about the depth of attention. You can recreate that depth at 2pm if you have enough uninterrupted focus, enough context loaded, enough commitment to staying with the problem even when it doesn\'t yield immediately. It\'s just harder to protect that space during daylight hours.',
      'The Tony Stark model of engineering, which I think about more than I probably should, is built on this idea: the best things get built by people who are genuinely obsessed with the problem. Not as a personality trait to perform, but because the problem is actually interesting enough to deserve that level of attention.',
      'The BLDC controller at 2am is interesting. The quadruped leg that stripped its servo horn is interesting. The depth camera localisation pipeline that had to work under arena lighting that wasn\'t designed for vision systems — that was a genuinely hard, genuinely interesting problem. I don\'t think the timing matters that much. I think the obsession does.',
    ],
  },
]

/* ── resume ───────────────────────────────────────────────── */
export const RESUME = {
  experience: [
    {
      role: 'Electrical & Embedded Systems Intern',
      org: 'Cosy Farms',
      location: 'Mumbai, India',
      period: 'Jan 2025 – Present',
      points: [
        'Designed STM32-based embedded control systems for automated indoor hydroponic farming',
        'Implemented sensor fusion for real-time monitoring of CO₂, humidity, pH, and nutrient levels',
        'Built data logging and alert systems reducing manual monitoring overhead by ~60%',
        'Developed actuator control loops for lighting, irrigation, and climate management',
      ],
    },
    {
      role: 'Robotics Head',
      org: 'IE Mechatronics · MIT Manipal',
      location: 'Manipal, India',
      period: '2024 – Present',
      points: [
        'Leading robotics division — workshops on PCB design, embedded systems, and kinematics',
        'Mentoring 20+ junior students across project development and competition preparation',
        'Organised inter-college robotics events and technical talk series',
      ],
    },
    {
      role: 'Senior Electronics Member',
      org: 'Team Robomanipal',
      location: 'Manipal, India',
      period: '2022 – 2025',
      points: [
        'Designed and fabricated custom PCBs for STM32-based controllers across 3 competition seasons',
        'Led embedded software for DD Robocon 2025 — vision-guided omnidirectional robot (AIR 22)',
        'Implemented BLDC FOC motor control, depth camera integration, and inter-robot comms protocol',
        'Contributed to sensor fusion pipeline achieving ±3 mm localisation accuracy under competition conditions',
      ],
    },
  ],
  education: {
    degree: 'B.Tech · Mechatronics Engineering',
    institution: 'MIT, MAHE · Manipal, India',
    period: '2022 – 2026',
    courses: ['Robotics & Automation', 'Embedded Systems', 'Control Systems', 'Machine Learning', 'CAD/CAM', 'IoT Systems'],
  },
  achievements: [
    { title: 'AIR 22 · DD Robocon 2025', sub: 'National robotics championship · top 10%' },
    { title: 'Patent Application Filed', sub: 'Tactile stimulation device · provisional application' },
    { title: '2 Research Papers In Progress', sub: 'Soft robotics · embedded control systems' },
    { title: 'GrabCAD Publication', sub: 'Quadruped robot design · 200+ downloads' },
  ],
  skills: [
    { category: 'Embedded', items: ['STM32 / Embedded C', 'BLDC FOC Control', 'PCB Design · KiCad', 'UART / SPI / I2C / CAN', 'ROS 2'] },
    { category: 'Mechanical', items: ['SolidWorks', 'ANSYS Structural', '3D Printing · FDM / SLA', 'Kinematics & Dynamics', 'GD&T'] },
    { category: 'Software', items: ['Python', 'C / C++', 'Unity 3D · C#', 'OpenCV', 'MATLAB'] },
    { category: 'Research', items: ['Sensor Fusion', 'Computer Vision', 'Soft Robotics', 'Control Theory', 'Machine Learning'] },
  ],
}
