import { createHmac, timingSafeEqual } from 'node:crypto'

/* global process, Buffer */

const TABLE = 'portfolio_content'
const ROW_ID = 'main'

export default async function handler(request, response) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return response.status(500).json({ error: 'Portfolio database is not configured.' })
    }

    if (request.method === 'GET') {
      const row = await supabaseRequest('GET', `${TABLE}?id=eq.${ROW_ID}&select=projects,education,assets`)
      return response.status(200).json(row[0] || {})
    }

    if (request.method === 'POST') {
      if ((request.body || {}).accessCode !== process.env.ADMIN_ACCESS_CODE) return response.status(401).json({ error: 'Unauthorized.' })
      return response.status(200).json({ token: createAdminToken() })
    }

    if (request.method !== 'PUT') return response.status(405).json({ error: 'Method not allowed.' })
    if (!isValidAdminToken(request.headers.authorization)) {
      return response.status(401).json({ error: 'Unauthorized.' })
    }

    const body = request.body || {}
    const payload = {}
    if (Array.isArray(body.projects)) payload.projects = body.projects
    if (Array.isArray(body.education)) payload.education = body.education
    if (body.assets && typeof body.assets === 'object' && !Array.isArray(body.assets)) payload.assets = body.assets
    if (!Object.keys(payload).length) return response.status(400).json({ error: 'No portfolio data supplied.' })

    const current = await supabaseRequest('GET', `${TABLE}?id=eq.${ROW_ID}&select=projects,education,assets`)
    const next = { id: ROW_ID, ...(current[0] || {}), ...payload, updated_at: new Date().toISOString() }
    const saved = await supabaseRequest('POST', TABLE, next, { Prefer: 'resolution=merge-duplicates,return=representation' })
    return response.status(200).json(saved[0] || next)
  } catch (error) {
    return response.status(500).json({ error: error.message || 'Portfolio request failed.' })
  }
}

async function supabaseRequest(method, path, body, extraHeaders = {}) {
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!result.ok) throw new Error(`Supabase request failed: ${result.status}`)
  return result.status === 204 ? [] : result.json()
}

function createAdminToken() {
  const payload = `${Date.now()}.${Math.random().toString(36).slice(2)}`
  const signature = createHmac('sha256', process.env.ADMIN_ACCESS_CODE).update(payload).digest('hex')
  return `${payload}.${signature}`
}

function isValidAdminToken(header) {
  const token = header?.startsWith('Bearer ') ? header.slice(7) : ''
  const parts = token.split('.')
  if (parts.length !== 3 || Date.now() - Number(parts[0]) > 1000 * 60 * 60 * 12) return false
  const expected = createHmac('sha256', process.env.ADMIN_ACCESS_CODE).update(`${parts[0]}.${parts[1]}`).digest('hex')
  return parts[2].length === expected.length && timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))
}