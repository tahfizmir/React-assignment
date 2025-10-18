const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export async function fetchCompanies({ page = 1, limit = 8, q = '', sort = 'name', order = 'asc', filters = {} } = {}) {
  const params = new URLSearchParams()
  params.set('_page', String(page))
  params.set('_limit', String(limit))
  if (q) params.set('q', q)
  if (sort) params.set('_sort', sort)
  if (order) params.set('_order', order)

  // simple filters: location, industry
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.set(k, v)
  })

  const url = `${API_BASE}/companies?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch companies: ' + res.status)
  const data = await res.json()
  // json-server sets x-total-count header for pagination
  const total = Number(res.headers.get('x-total-count') || data.length)
  return { data, total }
}
