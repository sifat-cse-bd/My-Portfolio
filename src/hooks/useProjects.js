import { useEffect, useState } from 'react'
import { projects as initialProjects } from '../data/portfolio.js'
import { readProjects, writeProjects } from '../services/projectStorage.js'
import { readPortfolioCloud, savePortfolioCloud } from '../services/portfolioCloud.js'

function withIds(items) {
  return items.map((item, index) => ({
    ...item,
    id: item.id || `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${index}`,
    images: Array.isArray(item.images) ? item.images : [],
    features: Array.isArray(item.features) ? item.features : [],
    tags: Array.isArray(item.tags) ? item.tags : [],
  }))
}

export function useProjects() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState(() => withIds(readProjects().length ? readProjects() : initialProjects))

  useEffect(() => {
    readPortfolioCloud().then((cloud) => {
      if (Array.isArray(cloud.projects)) setItems(withIds(cloud.projects))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  function persist(nextItems) {
    setItems(nextItems)
    writeProjects(nextItems)
    savePortfolioCloud({ projects: nextItems }).catch(() => {})
  }

  function addProject(project) {
    const id = `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`
    persist([{ ...project, id }, ...items])
  }

  function updateProject(id, project) {
    persist(items.map((item) => item.id === id ? { ...item, ...project } : item))
  }

  function removeProject(id) {
    persist(items.filter((item) => item.id !== id))
  }

  return { items, loading, addProject, updateProject, removeProject }
}
