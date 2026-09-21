import { useEffect, useState } from 'react'
import { readProfileAssets, saveProfileAsset } from '../services/profileStorage.js'
import { readPortfolioCloud, savePortfolioCloud } from '../services/portfolioCloud.js'

export function useAssetPreview(type) {
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(() => readProfileAssets()[type] || '__loading__')

  useEffect(() => {
    readPortfolioCloud().then((cloud) => {
      setPreview(cloud.assets?.[type] || '')
    }).catch(() => {}).finally(() => setLoading(false))
  }, [type])

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
      readPortfolioCloud().then((cloud) => savePortfolioCloud({ assets: { ...(cloud.assets || {}), [type]: dataUrl } })).catch(() => {})
    }
    reader.readAsDataURL(file)
  }

  return { preview, loading, handleFileChange }
}
