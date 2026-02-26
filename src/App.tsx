import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Table from './components/Table'
import { tableColumns, type ColumnKey } from './constants/tableColumns'
import mockData from './constants/mockData.json'
import useFilteredSortedRows from './hooks/useFilteredSortedRows'
import usePersistentMultiSelect from './hooks/usePersistentMultiSelect'
import type { SortConfig } from './types/props'
import type { Row } from './types/row'

const rows = mockData as Row[]
const ACTIVE_ROWS_STORAGE_KEY = 'active-row-ids'
const ACTIVE_COLUMNS_STORAGE_KEY = 'active-column-keys'
const validColumnKeys = new Set<ColumnKey>(tableColumns.map((column) => column.key))
const validRowIds = new Set<string>(rows.map((row) => row.id))

function App() {
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const { selected: selectedColumns, toggleSelected: toggleColumn } =
    usePersistentMultiSelect<ColumnKey>({
      storageKey: ACTIVE_COLUMNS_STORAGE_KEY,
      validValues: validColumnKeys,
    })
  const { selected: selectedRows, toggleSelected: toggleRow, setSelected: setSelectedRows } =
    usePersistentMultiSelect<string>({
      storageKey: ACTIVE_ROWS_STORAGE_KEY,
      validValues: validRowIds,
    })

  const sortedRows = useFilteredSortedRows({
    rows,
    search,
    selectedColumns,
    sortConfig,
  })

  const visibleRowIds = useMemo(() => new Set(sortedRows.map((row) => row.id)), [sortedRows])

  useEffect(() => {
    if (selectedRows.every((id) => visibleRowIds.has(id))) return
    setSelectedRows((prev) => prev.filter((id) => visibleRowIds.has(id)))
  }, [selectedRows, setSelectedRows, visibleRowIds])

  return (
    <main className="min-h-screen">
      <Header
        search={search}
        onSearchChange={setSearch}
        selectedColumns={selectedColumns}
      />

      <section>
        <Table
          data={sortedRows}
          selectedRows={selectedRows}
          onToggleRow={toggleRow}
          selectedColumns={selectedColumns}
          onToggleColumn={toggleColumn}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
        />
      </section>
    </main>
  )
}

export default App
