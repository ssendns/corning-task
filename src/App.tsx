import { useMemo, useState } from 'react'
import Header from './components/Header'
import Table from './components/Table'
import mockData from './constants/mockData.json'
import type { Row } from './types/row'

const rows = mockData as Row[]

function App() {
  const [search, setSearch] = useState('')
  const [activeId, setActiveId] = useState<string>(rows[0]?.id ?? '')

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return rows

    return rows.filter((row) => row.name.toLowerCase().includes(query))
  }, [search])

  return (
    <main className="min-h-screen">
      <Header search={search} onSearchChange={setSearch} />

      <section>
        <Table data={filteredRows} activeId={activeId} onSelect={setActiveId} />
      </section>
    </main>
  )
}

export default App
