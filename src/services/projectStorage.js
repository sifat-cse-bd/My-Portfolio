const PROJECTS_KEY = 'faruk-portfolio-projects'

export function readProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROJECTS_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function writeProjects(items) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(items))
}
