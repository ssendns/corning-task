import type { HeaderProps } from '../types/props'
import { tableColumns } from '../constants/tableColumns'
import HeaderActions from './HeaderActions'
import SearchBar from './SearchBar'

function Header({
  search,
  onSearchChange,
  selectedColumns,
  selectedRowCount,
  isEditing,
  onDeleteClick,
  onAddClick,
  onSaveEditClick,
  onCancelEditClick,
  canUndo,
  canRedo,
  onUndoClick,
  onRedoClick,
}: HeaderProps) {
  const selectedLabel =
    selectedColumns.length === 0
      ? 'all columns'
      : selectedColumns.length === 1
        ? (tableColumns.find((column) => column.key === selectedColumns[0])?.label ?? 'all columns')
        : `${selectedColumns.length} columns`

  return (
    <header className="w-full border-b-2 border-app-border bg-white px-4 py-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <SearchBar
            search={search}
            onSearchChange={onSearchChange}
            placeholder={`Search by ${selectedLabel.toLowerCase()}...`}
          />
        </div>
        <div className="h-px w-full bg-slate-200 sm:h-8 sm:w-px" />
        <HeaderActions
          selectedRowCount={selectedRowCount}
          isEditing={isEditing}
          onDeleteClick={onDeleteClick}
          onAddClick={onAddClick}
          onSaveEditClick={onSaveEditClick}
          onCancelEditClick={onCancelEditClick}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndoClick={onUndoClick}
          onRedoClick={onRedoClick}
        />
      </div>
    </header>
  )
}

export default Header
