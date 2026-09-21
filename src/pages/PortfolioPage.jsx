import { Header } from '../components/layout/index.js'
import Footer from '../components/layout/Footer.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import AcademicsSection from '../components/sections/AcademicsSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import ExperienceSection from '../components/sections/ExperienceSection.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ProjectsSection from '../components/sections/ProjectsSection.jsx'
import SkillsSection from '../components/sections/SkillsSection.jsx'

export default function PortfolioPage() {
  return <div className="overflow-hidden"><Header /><main className="mx-auto w-[calc(100%-30px)] max-w-[1180px] sm:w-[calc(100%-48px)]"><HeroSection /><div className="flex flex-wrap items-center justify-between gap-5 border-y border-white/10 py-6 font-mono text-[10px] text-slate-500"><span>Currently exploring</span><div className="flex flex-wrap gap-5 font-sans text-xs font-bold text-slate-400"><span>React</span><span>Jetpack Compose</span><span>Embedded Systems</span><span>Product Design</span></div></div><AboutSection /><AcademicsSection /><SkillsSection /><ProjectsSection /><ExperienceSection /><ContactSection /></main><Footer /></div>
}
