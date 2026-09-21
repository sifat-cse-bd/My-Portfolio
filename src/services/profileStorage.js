const PROFILE_ASSETS_KEY = 'faruk-portfolio-assets'

export function readProfileAssets() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_ASSETS_KEY)) || {}
  } catch {
    return {}
  }
}

export function saveProfileAsset(type, dataUrl) {
  const assets = readProfileAssets()
  const nextAssets = { ...assets, [type]: dataUrl }
  localStorage.setItem(PROFILE_ASSETS_KEY, JSON.stringify(nextAssets))
  return nextAssets
}
