const API_URL = import.meta.env.VITE_PORTFOLIO_API_URL || '/api/portfolio'

export async function readPortfolioCloud() {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Unable to load portfolio data.')
  return response.json()
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
  if (!response.ok) throw new Error('Unable to save portfolio data.')
  return response.json()
}