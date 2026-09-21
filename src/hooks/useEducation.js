import { useEffect, useState } from 'react'
import { getEducationType, sortEducation } from '../data/portfolio.js'
import { readPortfolioCloud, savePortfolioCloud } from '../services/portfolioCloud.js'

function normalizeEducation(items) {
  return sortEducation(items.map((item) => ({
    ...item,
    id: item.id || crypto.randomUUID(),
    type: getEducationType(item),
  })))
}

export function useEducation() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    readPortfolioCloud().then((cloud) => {
      if (Array.isArray(cloud.education)) {
        const normalizedItems = normalizeEducation(cloud.education)
        setItems(normalizedItems)
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  function persist(nextItems) {
    const sortedItems = normalizeEducation(nextItems)
    setItems(sortedItems)
    savePortfolioCloud({ education: sortedItems }).catch(() => {})
  }

  function addEducation(item) {
    persist([{ ...item, type: getEducationType(item), id: crypto.randomUUID() }, ...items])
  }

  function updateEducation(target, item) {
    persist(items.map((entry) => entry === target || entry.id === target ? { ...entry, ...item } : entry))
  }

  function removeEducation(target) {
    persist(items.filter((entry) => entry !== target && entry.id !== target))
  }

  function clearEducation() {
    persist([])
  }

  return { items, loading, addEducation, updateEducation, removeEducation, clearEducation }
}
