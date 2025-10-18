import CompanyList from './components/CompanyList'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50 text-gray-900">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Company Directory</h1>
            <p className="text-sm opacity-90 mt-1">Browse, filter and sort companies</p>
          </div>
         
        </div>
      </header>
      <main className="py-8">
        <CompanyList />
      </main>
    </div>
  )
}
