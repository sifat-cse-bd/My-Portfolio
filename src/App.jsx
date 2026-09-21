import PortfolioPage from './pages/PortfolioPage.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AcademicsPage from './pages/AcademicsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import HomePage from './pages/HomePage.jsx'
import PageLayout from './pages/PageLayout.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'

export default function App() {
  return <ThemeProvider><BrowserRouter><Routes><Route element={<PageLayout />}><Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} /><Route path="academics" element={<AcademicsPage />} /><Route path="skills" element={<SkillsPage />} /><Route path="projects" element={<ProjectsPage />} /><Route path="projects/:projectId" element={<ProjectDetailPage />} /><Route path="experience" element={<ExperiencePage />} /><Route path="contact" element={<ContactPage />} /><Route path="admin" element={<AdminPage />} /><Route path="portfolio" element={<PortfolioPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></BrowserRouter></ThemeProvider>
}
