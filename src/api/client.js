export const API_BASE = 'https://crm.soft-ora.com/api'

let accessToken = null

export function setAccessToken(token) {
  accessToken = token || null
}

export function getAccessToken() {
  return accessToken
}

export class ApiError extends Error {
  constructor(message, { status, body } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

function firstString(value) {
  if (typeof value === 'string' && value.trim()) return value
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = firstString(item)
      if (found) return found
    }
  }
  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) {
      const found = firstString(item)
      if (found) return found
    }
  }
  return ''
}

export function extractErrorMessage(body, fallback = 'Request failed') {
  if (!body || typeof body !== 'object') return fallback
  return (
    firstString(body.error) ||
    firstString(body.errors) ||
    firstString(body.message) ||
    firstString(body.details) ||
    fallback
  )
}

function toQuery(params) {
  if (!params) return ''
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

export async function request(path, { method = 'GET', body, auth = true, signal, query, raw } = {}) {
  const headers = { Accept: 'application/json' }
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData
  if (body != null && !isForm) headers['Content-Type'] = 'application/json'
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`

  const res = await fetch(`${API_BASE}${path}${toQuery(query)}`, {
    method,
    headers,
    body: body == null ? undefined : isForm ? body : JSON.stringify(body),
    signal,
  })

  if (raw) return res

  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!res.ok) {
    throw new ApiError(extractErrorMessage(data, res.statusText), { status: res.status, body: data })
  }
  return data
}

export function get(path, options) {
  return request(path, { ...options, method: 'GET' })
}

export function post(path, body, options) {
  return request(path, { ...options, method: 'POST', body })
}

export function put(path, body, options) {
  return request(path, { ...options, method: 'PUT', body })
}

export function del(path, body, options) {
  return request(path, { ...options, method: 'DELETE', body })
}
