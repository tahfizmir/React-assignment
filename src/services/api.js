import { companies as mockCompanies } from '../data/mockdata'

function applyQuery(data, q) {
  if (!q) return data
  const s = q.toLowerCase()
  return data.filter((c) => (
    c.name.toLowerCase().includes(s) ||
    c.location.toLowerCase().includes(s) ||
    (c.industry || '').toLowerCase().includes(s)
  ))
}

function applyFilters(data, filters = {}) {
  return data.filter((c) => {
    if (filters.location && c.location !== filters.location) return false
    if (filters.industry && c.industry !== filters.industry) return false
    return true
  })
}

function applySort(data, sort = 'name', order = 'asc') {
  const sorted = [...data].sort((a, b) => {
    const va = a[sort]
    const vb = b[sort]
    if (va == null) return 1
    if (vb == null) return -1
    if (typeof va === 'number' && typeof vb === 'number') return va - vb
    return String(va).localeCompare(String(vb))
  })
  return order === 'desc' ? sorted.reverse() : sorted
}

export async function fetchCompanies({ page = 1, limit = 8, q = '', sort = 'name', order = 'asc', filters = {} } = {}) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 150))

  let data = mockCompanies
  data = applyQuery(data, q)
  data = applyFilters(data, filters)
  data = applySort(data, sort, order)

  const total = data.length
  const start = (page - 1) * limit
  const paged = data.slice(start, start + limit)

  return { data: paged, total }
}

