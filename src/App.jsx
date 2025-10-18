import CompanyList from './components/CompanyList'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl font-bold">Company Directory</h1>
          <p className="text-sm text-gray-500">Browse, filter and sort companies</p>
        </div>
      </header>
      <main className="py-8">
        <CompanyList />
      </main>
    </div>
  )
}
