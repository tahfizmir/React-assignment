import { useEffect, useMemo, useState } from 'react'
import { fetchCompanies } from '../services/api'

export default function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const [query, setQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [order, setOrder] = useState('asc')
  const [total, setTotal] = useState(0)

  const filters = useMemo(() => ({ location: locationFilter, industry: industryFilter }), [locationFilter, industryFilter])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    fetchCompanies({ page, limit, q: query, sort: sortBy, order, filters })
      .then((res) => {
        if (!mounted) return
        setCompanies(res.data)
        setTotal(res.total)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message)
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [page, limit, query, sortBy, order, filters])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  const locations = Array.from(new Set(companies.map((c) => c.location))).filter(Boolean)
  const industries = Array.from(new Set(companies.map((c) => c.industry))).filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Companies</h2>

      <div className="flex flex-col md:flex-row gap-2 md:items-end md:justify-between mb-4">
        <div className="flex gap-2 items-center">
          <input
            className="border rounded px-3 py-2 w-64"
            placeholder="Search by name or keyword"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
          />

          <select className="border rounded px-3 py-2" value={locationFilter} onChange={(e) => { setLocationFilter(e.target.value); setPage(1) }}>
            <option value="">All locations</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>

          <select className="border rounded px-3 py-2" value={industryFilter} onChange={(e) => { setIndustryFilter(e.target.value); setPage(1) }}>
            <option value="">All industries</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm">Sort</label>
          <select className="border rounded px-3 py-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="employees">Employees</option>
            <option value="location">Location</option>
          </select>
          <select className="border rounded px-3 py-2" value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {loading && <div className="py-6 text-center">Loading companies…</div>}
      {error && <div className="py-6 text-center text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((c) => (
              <div key={c.id} className="border rounded p-4 bg-white/5">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="text-sm text-gray-300">{c.industry} • {c.location}</p>
                <p className="mt-2 text-sm">Employees: <strong>{c.employees}</strong></p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">Showing page {page} of {totalPages} — {total} companies</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
              <button className="px-3 py-1 border rounded" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
