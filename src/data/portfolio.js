export const profile = {
  name: 'Faruk Ahmed Sifat',
  initials: 'FAS',
  role: 'Computer Science & Software Engineering Student',
  location: 'Dhaka, Bangladesh',
  availability: 'Open for internships & collaborations',
  email: '23-51221-1@student.aiub.edu',
  bio: 'I build thoughtful web, mobile and connected experiences with a focus on clean architecture, useful interfaces and continuous learning.',
  about: 'I am a Computer Science student who enjoys turning complex requirements into simple, dependable products. My work sits at the intersection of software engineering, product thinking and visual craft.',
}

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
]

export const education = []

export const educationLevels = [
  { value: 'psc', label: 'PSC' },
  { value: 'jsc', label: 'JSC' },
  { value: 'ssc', label: 'SSC' },
  { value: 'hsc', label: 'HSC' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'masters', label: 'Post Graduation / Masters' },
  { value: 'phd', label: 'PhD' },
]

const educationLevelOrder = Object.fromEntries(educationLevels.map((level, index) => [level.value, index]))

export function getEducationType(item) {
  if (item.type) return item.type
  const title = `${item.title} ${item.institution}`.toLowerCase()
  if (title.includes('phd') || title.includes('doctor')) return 'phd'
  if (title.includes('master') || title.includes('msc') || title.includes('m.sc')) return 'masters'
  if (title.includes('hsc') || title.includes('higher secondary')) return 'hsc'
  if (title.includes('ssc') || title.includes('secondary')) return 'ssc'
  if (title.includes('jsc')) return 'jsc'
  if (title.includes('psc') || title.includes('primary')) return 'psc'
  return 'graduation'
}

export function sortEducation(items) {
  return [...items].sort((a, b) => (educationLevelOrder[getEducationType(a)] ?? 99) - (educationLevelOrder[getEducationType(b)] ?? 99))
}

export const skills = {
  Languages: ['Kotlin', 'C++', 'PHP', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML / CSS'],
  'Frontend & UI': ['React', 'Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'UI/UX Design'],
  'Backend & APIs': ['Node.js', 'Express', 'Laravel', 'Django', 'FastAPI', 'REST API Development', 'JWT Authentication'],
  'Databases & Cloud': ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Firebase', 'Supabase', 'Prisma', 'Blynk Cloud'],
  'Mobile Development': ['Android Development', 'Jetpack Compose', 'Kotlin Coroutines', 'Room Database', 'Retrofit', 'Firebase Authentication'],
  'Tools & Hardware': ['Git', 'GitHub', 'Android Studio', 'PlatformIO', 'ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'Figma'],
  'DevOps & Deployment': ['Docker', 'GitHub Actions', 'Vercel', 'Netlify', 'Linux', 'CI/CD'],
  'Professional Skills': ['Problem Solving', 'Data Structures & Algorithms', 'Software Architecture', 'Team Collaboration', 'Technical Documentation', 'Project Management', 'Research', 'Communication'],
}

export const coursework = ['Data Structures', 'Database Systems', 'Microprocessors', 'Web Security', 'Software Engineering']

export const projects = [
  { id: 'nexa-finance', number: '01', type: 'Mobile experience', title: 'Nexa Finance', description: 'A calm, data-rich personal finance companion built to make better money decisions feel effortless.', overview: 'Nexa Finance helps people understand their spending without overwhelming them. The product combines a fast offline-first flow with clear, private financial insights.', tags: ['#Android', '#Kotlin', '#Firebase'], features: ['Offline-first transaction flow', 'Biometric authentication', 'Insightful spending charts'], accent: 'blue', role: 'Product engineer', duration: '12 weeks', images: [], liveUrl: '', sourceUrl: 'https://github.com' },
  { id: 'campus-connect', number: '02', type: 'Full-stack platform', title: 'Campus Connect', description: 'A focused collaboration hub that helps university communities share events, resources and momentum.', overview: 'Campus Connect gives student communities one focused place to discover events, collaborate on initiatives and share useful resources.', tags: ['#React', '#PHP', '#MySQL'], features: ['Role-based workspace', 'Searchable resource library', 'Real-time notifications'], accent: 'violet', role: 'Full-stack developer', duration: '16 weeks', images: [], liveUrl: '', sourceUrl: 'https://github.com' },
  { id: 'aerosense', number: '03', type: 'IoT & hardware', title: 'AeroSense', description: 'A connected environmental monitoring system translating raw sensor data into clear, useful actions.', overview: 'AeroSense connects ESP32 sensors to a lightweight dashboard so users can understand environmental conditions and respond to thresholds quickly.', tags: ['#IoT', '#ESP32', '#Blynk'], features: ['Live sensor telemetry', 'Threshold alerts', 'Low-power architecture'], accent: 'green', role: 'IoT engineer', duration: '8 weeks', images: [], liveUrl: '', sourceUrl: 'https://github.com' },
]

export const experience = [
  { period: '2024 — Now', title: 'Product Engineering Lead · University Tech Society', detail: 'Leading a small team through workshops, project reviews and our first open-source campus toolkit.' },
  { period: '2023 — 2024', title: 'Full-stack Developer · Freelance', detail: 'Designed and built lean web solutions for local teams, from discovery and wireframes to deployment.' },
  { period: '2022 — 2023', title: 'Android Developer · Personal Lab', detail: 'Explored mobile architecture through a series of utility apps focused on offline-first experiences.' },
]
