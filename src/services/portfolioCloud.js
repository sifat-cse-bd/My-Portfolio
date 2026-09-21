const API_URL = import.meta.env.VITE_PORTFOLIO_API_URL || '/api/portfolio'
let portfolioRequest

export async function readPortfolioCloud() {
  if (!portfolioRequest) {
    portfolioRequest = fetch(API_URL).then(async (response) => {
      if (!response.ok) throw new Error('Unable to load portfolio data.')
      return response.json()
    }).catch((error) => {
      portfolioRequest = undefined
      throw error
    })
  }
  return portfolioRequest
}

export async function savePortfolioCloud(data) {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('faruk-portfolio-admin-session') || ''}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}))
    throw new Error(detail.error || 'Unable to save portfolio data.')
  }
  return response.json()
}