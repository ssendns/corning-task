import { useMemo, useState } from 'react'
import Header from './components/Header'
import Table from './components/Table'
import type { ColumnKey } from './constants/tableColumns'
import mockData from './constants/mockData.json'
import type { Row } from './types/row'

const rows = mockData as Row[]

function App() {
  const [search, setSearch] = useState('')
  const [selectedColumn, setSelectedColumn] = useState<ColumnKey>('name')
  const [activeId, setActiveId] = useState<string>(rows[0]?.id ?? '')

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return rows

    return rows.filter((row) => String(row[selectedColumn]).toLowerCase().includes(query))
  }, [search, selectedColumn])

  return (
    <main className="min-h-screen">
      <Header
        search={search}
        onSearchChange={setSearch}
        selectedColumn={selectedColumn}
        onSelectedColumnChange={setSelectedColumn}
      />

      <section>
        <Table data={filteredRows} activeId={activeId} onSelect={setActiveId} />
      </section>
    </main>
  )
}

export default App
