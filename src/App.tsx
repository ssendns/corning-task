import { useMemo, useState } from 'react'
import Header from './components/Header'
import Table from './components/Table'
import type { ColumnKey } from './constants/tableColumns'
import mockData from './constants/mockData.json'
import type { Row } from './types/row'

const rows = mockData as Row[]

function App() {
  const [search, setSearch] = useState('')
  const [selectedColumn, setSelectedColumn] = useState<ColumnKey | null>(null)
  const [activeId, setActiveId] = useState<string>('')

  const handleSelectRow = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id))
  }

  const handleToggleColumn = (key: ColumnKey) => {
    setSelectedColumn((prev) => (prev === key ? null : key))
  }

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return rows

    if (!selectedColumn) {
      return rows.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(query)),
      )
    }

    return rows.filter((row) => String(row[selectedColumn]).toLowerCase().includes(query))
  }, [search, selectedColumn])

  return (
    <main className="min-h-screen">
      <Header
        search={search}
        onSearchChange={setSearch}
        selectedColumn={selectedColumn}
      />

      <section>
        <Table
          data={filteredRows}
          activeId={activeId}
          onSelect={handleSelectRow}
          selectedColumn={selectedColumn}
          onToggleColumn={handleToggleColumn}
        />
      </section>
    </main>
  )
}

export default App
