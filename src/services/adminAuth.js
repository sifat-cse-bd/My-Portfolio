const ADMIN_SESSION_KEY = 'faruk-portfolio-admin-session'

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated'
}

export function signInAdmin(accessCode) {
  const configuredCode = import.meta.env.VITE_ADMIN_ACCESS_CODE
  if (!configuredCode || accessCode !== configuredCode) return false
  sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated')
  return true
}

export function signOutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}
