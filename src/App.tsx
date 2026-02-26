import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Table from './components/Table'
import { tableColumns, type ColumnKey } from './constants/tableColumns'
import mockData from './constants/mockData.json'
import type { Row } from './types/row'

const rows = mockData as Row[]
const ACTIVE_ROW_STORAGE_KEY = 'active-row-id'
const ACTIVE_COLUMNS_STORAGE_KEY = 'active-column-keys'
const validColumnKeys = new Set<ColumnKey>(tableColumns.map((column) => column.key))

function App() {
  const [search, setSearch] = useState('')
  const [selectedColumns, setSelectedColumns] = useState<ColumnKey[]>(() => {
    const savedColumns = localStorage.getItem(ACTIVE_COLUMNS_STORAGE_KEY)
    if (!savedColumns) return []

    try {
      const parsed = JSON.parse(savedColumns)
      if (!Array.isArray(parsed)) return []
      return parsed.filter((key): key is ColumnKey => validColumnKeys.has(key))
    } catch {
      return []
    }
  })
  const [activeId, setActiveId] = useState<string>(() => {
    const savedRowId = localStorage.getItem(ACTIVE_ROW_STORAGE_KEY)
    if (!savedRowId || !rows.some((row) => row.id === savedRowId)) return ''
    return savedRowId
  })

  const handleSelectRow = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id))
  }

  const handleToggleColumn = (key: ColumnKey, withShift: boolean) => {
    setSelectedColumns((prev) => {
      const exists = prev.includes(key)

      if (withShift) {
        return exists ? prev.filter((column) => column !== key) : [...prev, key]
      }

      if (prev.length === 1 && exists) {
        return []
      }

      return [key]
    })
  }

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return rows

    if (selectedColumns.length === 0) {
      return rows.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(query)),
      )
    }

    return rows.filter((row) =>
      selectedColumns.some((column) => String(row[column]).toLowerCase().includes(query)),
    )
  }, [search, selectedColumns])

  useEffect(() => {
    if (!activeId) {
      localStorage.removeItem(ACTIVE_ROW_STORAGE_KEY)
      return
    }
    localStorage.setItem(ACTIVE_ROW_STORAGE_KEY, activeId)
  }, [activeId])

  useEffect(() => {
    if (selectedColumns.length === 0) {
      localStorage.removeItem(ACTIVE_COLUMNS_STORAGE_KEY)
      return
    }
    localStorage.setItem(ACTIVE_COLUMNS_STORAGE_KEY, JSON.stringify(selectedColumns))
  }, [selectedColumns])

  return (
    <main className="min-h-screen">
      <Header
        search={search}
        onSearchChange={setSearch}
        selectedColumns={selectedColumns}
      />

      <section>
        <Table
          data={filteredRows}
          activeId={activeId}
          onSelect={handleSelectRow}
          selectedColumns={selectedColumns}
          onToggleColumn={handleToggleColumn}
        />
      </section>
    </main>
  )
}

export default App
