const EDUCATION_KEY = 'faruk-portfolio-education'

export function readEducation() {
  try {
    const saved = JSON.parse(localStorage.getItem(EDUCATION_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function writeEducation(items) {
  localStorage.setItem(EDUCATION_KEY, JSON.stringify(items))
}
