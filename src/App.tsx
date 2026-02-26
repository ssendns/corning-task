import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Table from './components/Table'
import { tableColumns, type ColumnKey } from './constants/tableColumns'
import mockData from './constants/mockData.json'
import type { Row } from './types/row'

const rows = mockData as Row[]
const ACTIVE_ROW_STORAGE_KEY = 'active-row-id'
const ACTIVE_COLUMN_STORAGE_KEY = 'active-column-key'
const validColumnKeys = new Set<ColumnKey>(tableColumns.map((column) => column.key))

function App() {
  const [search, setSearch] = useState('')
  const [selectedColumn, setSelectedColumn] = useState<ColumnKey | null>(() => {
    const savedColumn = localStorage.getItem(ACTIVE_COLUMN_STORAGE_KEY)
    if (!savedColumn || !validColumnKeys.has(savedColumn as ColumnKey)) return null
    return savedColumn as ColumnKey
  })
  const [activeId, setActiveId] = useState<string>(() => {
    const savedRowId = localStorage.getItem(ACTIVE_ROW_STORAGE_KEY)
    if (!savedRowId || !rows.some((row) => row.id === savedRowId)) return ''
    return savedRowId
  })

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

  useEffect(() => {
    if (!activeId) {
      localStorage.removeItem(ACTIVE_ROW_STORAGE_KEY)
      return
    }
    localStorage.setItem(ACTIVE_ROW_STORAGE_KEY, activeId)
  }, [activeId])

  useEffect(() => {
    if (!selectedColumn) {
      localStorage.removeItem(ACTIVE_COLUMN_STORAGE_KEY)
      return
    }
    localStorage.setItem(ACTIVE_COLUMN_STORAGE_KEY, selectedColumn)
  }, [selectedColumn])

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
