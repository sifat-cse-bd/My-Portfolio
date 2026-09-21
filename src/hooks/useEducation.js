import { useEffect, useState } from 'react'
import { education as initialEducation, getEducationType, sortEducation } from '../data/portfolio.js'
import { readEducation, writeEducation } from '../services/educationStorage.js'
import { readPortfolioCloud, savePortfolioCloud } from '../services/portfolioCloud.js'

export function useEducation() {
  const [items, setItems] = useState(() => {
    const saved = readEducation()
    const source = saved.length ? saved : initialEducation
    return sortEducation(source.map((item) => item.id ? { ...item, type: getEducationType(item) } : { ...item, id: crypto.randomUUID(), type: getEducationType(item) }))
  })

  useEffect(() => {
    readPortfolioCloud().then((cloud) => {
      if (Array.isArray(cloud.education)) setItems(sortEducation(cloud.education.map((item) => ({ ...item, type: getEducationType(item) }))))
    }).catch(() => {})
  }, [])

  function persist(nextItems) {
    const sortedItems = sortEducation(nextItems)
    setItems(sortedItems)
    writeEducation(sortedItems)
    savePortfolioCloud({ education: sortedItems }).catch(() => {})
  }

  function addEducation(item) {
    persist([{ ...item, type: getEducationType(item), id: crypto.randomUUID() }, ...items])
  }

  function updateEducation(id, item) {
    persist(items.map((entry) => entry.id === id ? { ...entry, ...item } : entry))
  }

  function removeEducation(id) {
    persist(items.filter((entry) => entry.id !== id))
  }

  return { items, addEducation, updateEducation, removeEducation }
}
