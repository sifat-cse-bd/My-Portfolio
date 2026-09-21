import { createHmac, timingSafeEqual } from 'node:crypto'

/* global process, Buffer */

const TABLE = 'contact_messages'

export default async function handler(request, response) {
  try {
    if (request.method === 'POST') return await createMessage(request, response)
    if (request.method === 'GET') return await listMessages(request, response)
    return response.status(405).json({ error: 'Method not allowed.' })
  } catch (error) {
    return response.status(500).json({ error: error.message || 'Contact request failed.' })
  }
}

async function createMessage(request, response) {
  const { name, email, subject, message } = request.body || {}
  if (!name || !email || !subject || !message) return response.status(400).json({ error: 'All fields are required.' })
  if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ error: 'Please provide a valid email address.' })

  const saved = await supabaseRequest('POST', TABLE, {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    subject: String(subject).trim(),
    message: String(message).trim(),
    status: 'received',
  }, { Prefer: 'return=representation' })

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.RESEND_FROM_EMAIL) {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    })
    if (!emailResponse.ok) return response.status(502).json({ error: 'Message was saved, but email delivery failed.' })
  }

  return response.status(201).json({ message: saved[0] })
}

async function listMessages(request, response) {
  if (!isValidAdminToken(request.headers.authorization)) return response.status(401).json({ error: 'Unauthorized.' })
  const messages = await supabaseRequest('GET', `${TABLE}?select=id,name,email,subject,message,status,created_at&order=created_at.desc`)
  return response.status(200).json({ messages })
}

async function supabaseRequest(method, path, body, extraHeaders = {}) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Portfolio database is not configured.')
  const supabaseUrl = process.env.SUPABASE_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
  const result = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method,
    headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', ...extraHeaders },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!result.ok) throw new Error(`Supabase request failed: ${result.status}`)
  return result.status === 204 ? [] : result.json()
}

function isValidAdminToken(header) {
  const token = header?.startsWith('Bearer ') ? header.slice(7) : ''
  const parts = token.split('.')
  if (!process.env.ADMIN_ACCESS_CODE || parts.length !== 3 || Date.now() - Number(parts[0]) > 1000 * 60 * 60 * 12) return false
  const expected = createHmac('sha256', process.env.ADMIN_ACCESS_CODE).update(`${parts[0]}.${parts[1]}`).digest('hex')
  return parts[2].length === expected.length && timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))
}