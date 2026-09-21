import { useEffect, useState } from 'react'
import { readProfileAssets, saveProfileAsset } from '../services/profileStorage.js'

export function useAssetPreview(type) {
  const [preview, setPreview] = useState(() => readProfileAssets()[type] || '')

  useEffect(() => () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview)
  }, [preview])

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setPreview(dataUrl)
      saveProfileAsset(type, dataUrl)
    }
    reader.readAsDataURL(file)
  }

  return { preview, handleFileChange }
}
