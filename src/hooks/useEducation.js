import { useState } from 'react'
import { education as initialEducation, getEducationType, sortEducation } from '../data/portfolio.js'
import { readEducation, writeEducation } from '../services/educationStorage.js'

export function useEducation() {
  const [items, setItems] = useState(() => {
    const saved = readEducation()
    const source = saved.length ? saved : initialEducation
    return sortEducation(source.map((item) => item.id ? { ...item, type: getEducationType(item) } : { ...item, id: crypto.randomUUID(), type: getEducationType(item) }))
  })

  function persist(nextItems) {
    const sortedItems = sortEducation(nextItems)
    setItems(sortedItems)
    writeEducation(sortedItems)
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
