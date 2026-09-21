const ADMIN_SESSION_KEY = 'faruk-portfolio-admin-session'

export function isAdminAuthenticated() {
  return Boolean(sessionStorage.getItem(ADMIN_SESSION_KEY))
}

export async function signInAdmin(accessCode) {
  const response = await fetch(import.meta.env.VITE_PORTFOLIO_API_URL || '/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessCode }),
  })
  if (!response.ok) return false
  const { token } = await response.json()
  sessionStorage.setItem(ADMIN_SESSION_KEY, token)
  return true
}

export function signOutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}
